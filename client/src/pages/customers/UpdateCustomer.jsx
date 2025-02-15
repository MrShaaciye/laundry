"use client";
import { lazy } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { Form, Formik, FastField } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
const TextField = lazy(() => import("../../components/formsUI/TextFieldWrapper"));
const RadioGroup = lazy(() => import("../../components/formsUI/RadioGroupWrapper"));
const MenuItem = lazy(() => import("../../components/formsUI/MenuItemWrapper"));
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const UpdateCustomer = ({ customer, updatedCustomer, closeEvent }) => {
  // Initial Values
  const initialValues = {
    name: customer.name,
    gender: customer.gender,
    address: customer.address,
    phone: customer.phone,
    depositAmount: customer.depositAmount,
    allowedUnit: customer.allowedUnit,
    paymentStatus: customer.paymentStatus,
  };

  // Validation Schema with Yup
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3)
      .max(50)
      .matches(/^[A-Za-z ]+$/, "Name must be Letters")
      .required(),
    gender: yup.string().min(4).max(6).oneOf(["Male", "Female"]).required(),
    address: yup
      .string()
      .min(5)
      .max(100)
      .matches(/^[A-Za-z0-9_., ]+$/, "Address must be Letters/Numbers")
      .required(),
    phone: yup
      .string()
      .min(9)
      .max(9)
      .matches(/^[0-9]+$/, "Phone must be numbers")
      .required(),
    depositAmount: yup.number().typeError().positive().min(0.5).max(499.99).required(),
    allowedUnit: yup.number().typeError().positive().min(1).max(9).integer().required(),
    paymentStatus: yup.string().min(8).max(12).oneOf(["Full Paid", "Partial Paid", "Not Paid"]).required(),
  });

  // Submit Form Data function
  const onSubmit = async (formData, onSubmitProps) => {
    try {
      await axios.put(`/api/v1/customer/${customer.id}`, formData, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((res) => {
        setTimeout(() => {
          onSubmitProps.resetForm();
          onSubmitProps.setSubmitting(false);
        }, 500);
        updatedCustomer(formData);
        closeEvent();
        return toast.success(`Customer updated successfully`);
      });
    } catch (err) {
      closeEvent();
      return toast.error(err.response.data);
    }
  };

  // Payment Array Object
  const paymentOptions = [
    { value: "Full Paid", label: "Full Paid" },
    { value: "Partial Paid", label: "Partial Paid" },
    { value: "Not Paid", label: "Not Paid" },
  ];

  // Gender Array Object
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <>
      {/* Add your form here */}
      <Typography variant="h6" fontWeight="bold" align="center">
        Update Customer
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
                <Grid item xs={8}>
                  <Box height={7} />
                  <FastField type="text" name="name" label="Full Name" component={TextField} />
                </Grid>
                <Grid item xs={4}>
                  <Box height={7} />
                  <FastField type="text" name="gender" label="Gender" component={RadioGroup} options={genderOptions} />
                </Grid>
                <Grid item xs={7}>
                  <Box height={7} />
                  <FastField type="text" name="address" label="Address" component={TextField} />
                </Grid>
                <Grid item xs={5}>
                  <Box height={7} />
                  <FastField type="text" name="phone" label="Phone" component={TextField} />
                </Grid>
                <Grid item xs={4}>
                  <Box height={7} />
                  <FastField type="number" name="depositAmount" label="Deposit Amount" step="0.00" component={TextField} />
                </Grid>
                <Grid item xs={4}>
                  <Box height={7} />
                  <FastField type="number" name="allowedUnit" label="Allowed Unit" component={TextField} />
                </Grid>
                <Grid item xs={4}>
                  <Box height={7} />
                  <FastField type="text" name="paymentStatus" label="Select Payment Status" component={MenuItem} options={paymentOptions} />
                </Grid>
                <Grid item xs={12}>
                  <Box height={7} />
                  <Button type="submit" label="Submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                    {formik.isSubmitting ? "Loading" : "Update Customer"}
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

export default UpdateCustomer;
