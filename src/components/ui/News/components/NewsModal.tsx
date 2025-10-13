import { Box, Button, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  image: string;
  contentSnippet: string;
  title?: string;
  author?: string;
  publishedAt?: string;
}

const NewsModal = ({ open, onClose, image, contentSnippet, title, author, publishedAt }: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={onClose}
        >
          {/* Main Modal Box */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              width: "80%",
              height: "80%",
              backgroundColor: "#111",
              borderRadius: "8px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "row",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Image */}
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#000" }}>
              <Box component="img" src={image} alt="Modal Image" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>

            {/* Right: Text */}
            <Box sx={{ flex: 1, p: 3, overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <Typography variant="h5" sx={{ color: "#fff", mb: 2, fontWeight: "bold" }}>
                {title || "News Article"}
              </Typography>
              {author && publishedAt && (
                <Typography variant="subtitle2" sx={{ color: "#aaa", mb: 2 }}>
                  By {author} • {publishedAt}
                </Typography>
              )}

              {/* Render full HTML */}
              <Box sx={{ color: "#ddd", lineHeight: 1.6 }}>
                <div dangerouslySetInnerHTML={{ __html: contentSnippet }} />
              </Box>
            </Box>

            {/* Close Button */}
            <Button
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#fff",
                fontSize: "24px",
                minWidth: "auto",
                padding: "4px",
                background: "rgba(0,0,0,0.6)",
                borderRadius: "50%",
                "&:hover": { background: "rgba(255,255,255,0.2)" },
              }}
            >
              ✕
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsModal;
