"use client";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { CustomTextField } from "../customFieldText";
import { SubmitButton } from "../SubmitButton";
import { useFormState } from "./components/useFormState";
import { useCart } from "@/context/CartContext";

const EnquiryForm = () => {
  const {
    formData,
    isLoading,
    openSnackbar,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleCloseSnackbar,
  } = useFormState();

  const { addToCart } = useCart();

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleSubmit(e);

    const fullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();

    const enquiryItem = {
      id: Date.now(),
      name: fullName || "Enquiry Form",
      price: 20000,
      quantity: 1,
      image: "/enquiry.png",
    };

    addToCart(enquiryItem);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, textAlign: "center" }}>
        Enquiry Form
      </Typography>
      <Typography variant="body1" sx={{ color: "red", mb: 3 }}>
        NOTE: YOUR ENQUIRY FORM PAYMENT VALIDATES YOUR FORM SUBMISSION.
        PROCEED TO FILL THE ENQUIRY FORM AND CLICK THE BUTTON
      </Typography>

      <Box
        component="form"
        onSubmit={handleEnquirySubmit}
        sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <CustomTextField sx={{ flex: "1 1 48%" }} label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />

          <CustomTextField sx={{ flex: "1 1 48%" }} label="Home Phone" name="homePhone" value={formData.homePhone} onChange={handleInputChange} required />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="Cell Phone" name="cellPhone" value={formData.cellPhone} onChange={handleInputChange} required />

          <CustomTextField sx={{ flex: "1 1 48%" }} label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="Place of Birth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleInputChange} required />

          <CustomTextField sx={{ flex: "1 1 48%" }} label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} required InputLabelProps={{ shrink: true }} />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="Age" name="age" type="number" value={formData.age} onChange={handleInputChange} required />

          <FormControl sx={{ flex: "1 1 48%" }} required>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={formData.gender} onChange={handleSelectChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ flex: "1 1 48%" }} required>
            <InputLabel>Marital Status</InputLabel>
            <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleSelectChange}>
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Divorced">Divorced</MenuItem>
              <MenuItem value="Widowed">Widowed</MenuItem>
            </Select>
          </FormControl>

          <CustomTextField sx={{ flex: "1 1 48%" }} label="Primary School" name="primarySchool" value={formData.primarySchool} onChange={handleInputChange} required />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="Secondary School" name="secondarySchool" value={formData.secondarySchool} onChange={handleInputChange} required />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="Tertiary School" name="tertiarySchool" value={formData.tertiarySchool} onChange={handleInputChange} />

          <FormControl sx={{ flex: "1 1 48%" }} required>
            <InputLabel>Do you have International Passport?</InputLabel>
            <Select name="internationalPassport" value={formData.internationalPassport} onChange={handleSelectChange}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

          {formData.internationalPassport === "Yes" && (
            <TextField sx={{ flex: "1 1 100%" }} label="Upload International Passport" name="passportUpload" type="file" onChange={handleInputChange} InputLabelProps={{ shrink: true }} inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }} fullWidth />
          )}

          <FormControl sx={{ flex: "1 1 48%" }} required>
            <InputLabel>Do you have an NIN?</InputLabel>
            <Select name="nin" value={formData.nin} onChange={handleSelectChange}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

          {formData.nin === "Yes" && (
            <CustomTextField sx={{ flex: "1 1 48%" }} label="National Identification Number" name="ninNumber" value={formData.ninNumber} onChange={handleInputChange} required />
          )}

          <FormControl sx={{ flex: "1 1 48%" }} required>
            <InputLabel>Are you a Dual Citizen?</InputLabel>
            <Select name="dualCitizen" value={formData.dualCitizen} onChange={handleSelectChange}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

          <CustomTextField sx={{ flex: "1 1 48%" }} label="Occupation" name="occupation" value={formData.occupation} onChange={handleInputChange} required />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="Country of Residence" name="countryOfResidence" value={formData.countryOfResidence} onChange={handleInputChange} required />

          <CustomTextField sx={{ flex: "1 1 48%" }} label="Address" name="address" value={formData.address} onChange={handleInputChange} required />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="City/State Zip Code" name="cityStateZip" value={formData.cityStateZip} onChange={handleInputChange} required />

          <CustomTextField sx={{ flex: "1 1 48%" }} label="Residential Address" name="residentialAddress" value={formData.residentialAddress} onChange={handleInputChange} required />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="Business/Office Address" name="businessAddress" value={formData.businessAddress} onChange={handleInputChange} required />

          <CustomTextField sx={{ flex: "1 1 48%" }} label="State" name="state" value={formData.state} onChange={handleInputChange} required />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="Local Government" name="localGovernment" value={formData.localGovernment} onChange={handleInputChange} required />

          <FormControl sx={{ flex: "1 1 48%" }} required>
            <InputLabel>How did you hear about us?</InputLabel>
            <Select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleSelectChange} multiple>
              <MenuItem value="WhatsApp">WhatsApp</MenuItem>
              <MenuItem value="Instagram">Instagram</MenuItem>
              <MenuItem value="Twitter">Twitter</MenuItem>
              <MenuItem value="Facebook">Facebook</MenuItem>
              <MenuItem value="Referral">Referral</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ flex: "1 1 48%" }} required>
            <InputLabel>Nature of Enquiry</InputLabel>
            <Select name="enquiryNature" value={formData.enquiryNature} onChange={handleSelectChange}>
              <MenuItem value="Merchandise Sale">Merchandise Sale</MenuItem>
              <MenuItem value="Membership">Membership</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ flex: "1 1 48%" }} required>
            <InputLabel>Any Establishments?</InputLabel>
            <Select name="establishments" value={formData.establishments} onChange={handleSelectChange}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

          {formData.establishments === "Yes" && (
            <CustomTextField sx={{ flex: "1 1 48%" }} label="State Establishments" name="establishmentsDetails" value={formData.establishmentsDetails} onChange={handleInputChange} required />
          )}

          <FormControl sx={{ flex: "1 1 48%" }} required>
            <InputLabel>Have you been convicted before?</InputLabel>
            <Select name="convicted" value={formData.convicted} onChange={handleSelectChange}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

          <CustomTextField sx={{ flex: "1 1 48%" }} label="Any health challenge?" name="healthChallenge" value={formData.healthChallenge} onChange={handleInputChange} required />
          <CustomTextField sx={{ flex: "1 1 48%" }} label="Please state any disability" name="disability" value={formData.disability} onChange={handleInputChange} required />

          <CustomTextField sx={{ flex: "1 1 100%" }} label="Brief description about yourself" name="description" value={formData.description} onChange={handleInputChange} multiline rows={4} required />
          <CustomTextField sx={{ flex: "1 1 100%" }} label="Describe your role or business" name="businessRole" value={formData.businessRole} onChange={handleInputChange} multiline rows={4} required />
          <CustomTextField sx={{ flex: "1 1 100%" }} label="Why do you want to join ANFASSC?" name="reasonToJoin" value={formData.reasonToJoin} onChange={handleInputChange} multiline rows={4} required />
        </Box>

        <SubmitButton isLoading={isLoading}>Submit Enquiry (₦20,000)</SubmitButton>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            Enquiry Form submitted successfully and added to cart!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default EnquiryForm;