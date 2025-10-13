"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { setCookie, destroyCookie } from "nookies";

interface User {
  email: string;
  name: string;
  phone?: string;
  address?: string;
  city?: string;
  stateCountry?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  redirectToLogin: (currentPath?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        firebaseUser.getIdToken().then((token) => {
          setCookie(null, "authToken", token, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60, // 30 days
            sameSite: "strict",
          });
        });
        setUser({
          email: firebaseUser.email || "",
          name:
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "User",
        });
      } else {
        setUser(null);
        destroyCookie(null, "authToken");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((err: unknown) => {
        if (
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          (err as { code: string }).code === "auth/email-already-in-use"
        ) {
          return signInWithEmailAndPassword(auth, email, password);
        }
        throw err;
      });

      if (!userCredential) {
        throw new Error("User authentication failed");
      }

      const token = await userCredential.user.getIdToken();
      setCookie(null, "authToken", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60,
        sameSite: "strict",
      });

      // Sync with WordPress/WooCommerce
      await fetch("/api/sync-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userCredential.user.email || email,
          name:
            userCredential.user.displayName || email.split("@")[0] || "User",
        }),
      });

      setUser({
        email: userCredential.user.email || email,
        name:
          userCredential.user.displayName || email.split("@")[0] || "User",
      });

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login error:", err.message);
      } else {
        console.error("Login error:", err);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      destroyCookie(null, "authToken");
      router.push("/");
    });
  };

  const redirectToLogin = (currentPath?: string) => {
    const redirect = currentPath || window.location.pathname;
    router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    redirectToLogin,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
