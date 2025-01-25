"use client";
import { Button } from "@mui/material";

const ButtonWrapper = ({ label, ...props }) => {
  return (
    <Button variant="contained" color="primary" fullWidth {...props}>
      {label}
    </Button>
  );
};

export default ButtonWrapper;
