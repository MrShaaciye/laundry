"use client";
import { lazy } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { Form, Formik, FastField } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
const MenuItem = lazy(() => import("../../components/formsUI/MenuItemWrapper"));
const TextField = lazy(() => import("../../components/formsUI/TextFieldWrapper"));
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const UpdateDelivery = ({ customers, employees, delivery, updatedDelivery, closeEvent }) => {
  // Initial Values
  const initialValues = {
    customerId: delivery.customerId,
    employeeId: delivery.employeeId,
    fee: delivery.fee,
    note: delivery.note,
  };

  // Validation Schema with Yup
  const validationSchema = yup.object().shape({
    customerId: yup.number().typeError().positive().required(),
    employeeId: yup.number().typeError().positive().required(),
    fee: yup.number().typeError().positive().min(0.5).max(99.99).required(),
    note: yup
      .string()
      .min(3)
      .max(50)
      .matches(/^[A-Za-z0-9_.,'!@#$%^&* ]+$/, "Note must be Letters/Numbers/Some Symbols.")
      .required(),
  });

  // Submit Form Data function
  const onSubmit = async (formData, onSubmitProps) => {
    try {
      await axios.put(`/api/v1/delivery/${delivery.id}`, formData, { headers: { accessToken: localStorage.getItem("accessToken") } });
      setTimeout(() => {
        onSubmitProps.resetForm();
        onSubmitProps.setSubmitting(false);
      }, 500);
      updatedDelivery(formData);
      closeEvent();
      return toast.success(`Delivery updated successfully`);
    } catch (err) {
      closeEvent();
      return toast.error(err.response.data);
    }
  };

  return (
    <>
      {/* Add your form here */}
      <Typography variant="h6" fontWeight="bold" align="center">
        Update Delivery
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
                  <FastField type="number" name="customerId" label="Select Customer" component={MenuItem} options={customers.map((customer) => ({ value: customer.id, label: customer.name }))} />
                </Grid>
                <Grid item xs={12}>
                  <Box height={7} />
                  <FastField type="number" name="employeeId" label="Select Customer" component={MenuItem} options={employees.map((employee) => ({ value: employee.id, label: employee.name }))} />
                </Grid>
                <Grid item xs={12}>
                  <Box height={7} />
                  <FastField type="number" name="fee" label="Fee" step="0.00" component={TextField} />
                </Grid>
                <Grid item xs={12}>
                  <Box height={7} />
                  <FastField type="text" name="note" label="Note" component={TextField} />
                </Grid>
                <Grid item xs={12}>
                  <Box height={7} />
                  <Button type="submit" label="Submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                    {formik.isSubmitting ? "Loading" : "Update Delivery"}
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

export default UpdateDelivery;
