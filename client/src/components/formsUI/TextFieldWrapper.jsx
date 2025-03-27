"use client";
import { TextField } from "@mui/material";

const TextFieldWrapper = ({ field = {}, form = {}, ...props }) => {
  const { name, value, onChange, onBlur } = field;
  const { errors = {}, touched = {} } = form;
  const fieldError = touched[name] && errors[name];

  return <TextField variant="outlined" color="primary" size="small" sx={{ minWidth: "100%" }} autoComplete="off" fullWidth {...props} name={name} value={value || ""} onChange={onChange} onBlur={onBlur} error={Boolean(fieldError)} helperText={fieldError} />;
};

export default TextFieldWrapper;
