"use client";
import { TextField, MenuItem } from "@mui/material";

const MenuItemWrapper = ({ field, form, options, ...props }) => {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const fieldError = errors[name] && touched[name];

  return (
    <TextField size="small" required select variant="outlined" color="primary" autoComplete="off" fullWidth {...props} name={name} value={value || ""} onChange={onChange} onBlur={onBlur} error={Boolean(fieldError)} helperText={fieldError || ""}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default MenuItemWrapper;
