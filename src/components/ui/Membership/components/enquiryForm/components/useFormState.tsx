"use client";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

type FormData = {
  firstName: string;
  lastName: string;
  homePhone: string;
  cellPhone: string;
  email: string;
  placeOfBirth: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  maritalStatus: string;
  primarySchool: string;
  secondarySchool: string;
  tertiarySchool: string;
  internationalPassport: string;
  passportUpload: File | null;
  nin: string;
  ninNumber: string;
  dualCitizen: string;
  occupation: string;
  countryOfResidence: string;
  address: string;
  cityStateZip: string;
  residentialAddress: string;
  businessAddress: string;
  state: string;
  localGovernment: string;
  hearAboutUs: string[];
  enquiryNature: string;
  establishments: string;
  establishmentsDetails: string;
  convicted: string;
  healthChallenge: string;
  disability: string;
  description: string;
  businessRole: string;
  reasonToJoin: string;
};

export const useFormState = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    homePhone: "",
    cellPhone: "",
    email: "",
    placeOfBirth: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    maritalStatus: "",
    primarySchool: "",
    secondarySchool: "",
    tertiarySchool: "",
    internationalPassport: "",
    passportUpload: null,
    nin: "",
    ninNumber: "",
    dualCitizen: "",
    occupation: "",
    countryOfResidence: "",
    address: "",
    cityStateZip: "",
    residentialAddress: "",
    businessAddress: "",
    state: "",
    localGovernment: "",
    hearAboutUs: [],
    enquiryNature: "",
    establishments: "",
    establishmentsDetails: "",
    convicted: "",
    healthChallenge: "",
    disability: "",
    description: "",
    businessRole: "",
    reasonToJoin: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handles standard input changes (TextField, TextArea, file)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === "file") {
      const fileInput = target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: fileInput.files?.[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handles MUI Select change, supporting single and multiple selections
  const handleSelectChange = (e: SelectChangeEvent<string | string[]>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? value : value, // Handle both single string and array
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOpenSnackbar(true);
      console.log("Enquiry Form Submitted:", formData);
    }, 2000);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return {
    formData,
    isLoading,
    openSnackbar,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleCloseSnackbar,
  };
};