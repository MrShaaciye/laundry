"use client";
import { lazy } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { Form, Formik, FastField } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
const TextField = lazy(() => import("../../components/formsUI/TextFieldWrapper"));
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const UpdateSupply = ({ supply, updatedSupply, closeEvent }) => {
  // Initial Values
  const initialValues = {
    name: supply.name,
    note: supply.note,
  };

  // Validation Schema with Yup
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3)
      .max(20)
      .matches(/^[A-Za-z ]+$/, "Name must be Letters")
      .required(),
    note: yup
      .string()
      .min(3)
      .max(50)
      .matches(/^[A-Za-z ]+$/, "Note must be Letters")
      .required(),
  });

  // Submit Form Data function
  const onSubmit = async (formData, onSubmitProps) => {
    try {
      await axios.put(`/api/v1/supply/${supply.id}`, formData, { headers: { accessToken: localStorage.getItem("accessToken") } });
      setTimeout(() => {
        onSubmitProps.resetForm();
        onSubmitProps.setSubmitting(false);
      }, 500);
      updatedSupply(formData);
      closeEvent();
      return toast.success(`Supply updated successfully`);
    } catch (err) {
      closeEvent();
      return toast.error(err.response.data);
    }
  };

  return (
    <>
      {/* Add your form here */}
      <Typography variant="h6" fontWeight="bold" align="center">
        Update Supply
      </Typography>
      <Box sx={{ m: 2 }} />
      <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      {/* Formik Starts here */}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
        {(formik) => {
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box height={7} />
                  <FastField type="text" name="name" label="Name" component={TextField} />
                </Grid>
                <Grid item xs={12}>
                  <Box height={7} />
                  <FastField type="text" name="note" label="Note" component={TextField} />
                </Grid>
                <Grid item xs={12}>
                  <Box height={7} />
                  <Button type="submit" label="Submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                    {formik.isSubmitting ? "Loading" : "Update Supply"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default UpdateSupply;
