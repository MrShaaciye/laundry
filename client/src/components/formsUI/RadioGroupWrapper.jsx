"use client";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

const RadioGroupWrapper = ({ field, form, options, ...props }) => {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const fieldError = errors[name] && touched[name];

  return (
    <RadioGroup {...field} {...props} value={value || ""} onChange={onChange} onBlur={onBlur} row>
      {options.map((option) => (
        <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
      ))}
      {fieldError && <div style={{ color: "red" }}>{fieldError}</div>}
    </RadioGroup>
  );
};

export default RadioGroupWrapper;
