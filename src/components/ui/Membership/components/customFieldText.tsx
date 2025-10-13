import { TextField, type TextFieldProps } from "@mui/material"

export const CustomTextField = (props: TextFieldProps) => (
  <TextField
    variant="outlined"
    size="small"
    fullWidth
    InputProps={{
      sx: { borderRadius: 2 },
      ...props.InputProps, 
    }}
    {...props}
  />
)
