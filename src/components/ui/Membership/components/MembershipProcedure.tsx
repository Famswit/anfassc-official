"use client"
import { Box, Typography, Stepper, Step, StepLabel, StepContent } from "@mui/material"
import { useTheme } from "@mui/material/styles"

const MembershipProcedure = () => {
  const theme = useTheme()

  const steps = [
    {
      label: "REQUEST FOR ENQUIRY FORM",
      content: (
        < >
          All intending members are to complete an enquiry form and pay a non-refundable ₦20,000 only.
           After the payment, the intending member can proceed to registration or wait for a message/call from our team.<br/>
           <Typography variant="body2" sx={{color:'red'}}>NOTE: YOUR ENQUIRY FORM PAYMENT VALIDATE YOUR FORM SUBMISSION. PROCEED TO THE ENQUIRY FORM PAGE FOR PAYMENT</Typography>
        </>
      ),
    },
    {
      label: "REGISTRATION",
      content: (
        <>
          During this stage, you will see information about different membership types and procedure to get your Membership Form.
        </>
      ),
    },
    {
      label: "CONFIRMATION",
      content: (
        <>
          At this stage, the legal team and private security team will conduct a self-assessment on you based on the information submitted during the two stages above. Once certified, you will be issued a registration number and your pack will be packaged for pickup or delivery.
        </>
      ),
    },
  ]

  return (
    <Box sx={{ bgcolor: theme.palette.background.paper, p: 3, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Membership Procedure
      </Typography>
      <Stepper orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index} active={true}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.content}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default MembershipProcedure