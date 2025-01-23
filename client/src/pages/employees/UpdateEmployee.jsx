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
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const UpdateEmployee = ({ employee, updatedEmployee, closeEvent }) => {
  // Initial Values
  const initialValues = {
    name: employee.name,
    gender: employee.gender,
    address: employee.address,
    phone: employee.phone,
    jobTitle: employee.jobTitle,
    salary: employee.salary,
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
    jobTitle: yup
      .string()
      .min(3)
      .max(25)
      .matches(/^[A-Za-z ]+$/, "Job Title must be Letters")
      .required(),
    salary: yup.number().typeError().positive().min(100).max(9999.99).required(),
  });

  // Submit Form Data function
  const onSubmit = async (formData, onSubmitProps) => {
    try {
      await axios.put(`/api/v1/employee/${employee.id}`, formData, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((res) => {
        setTimeout(() => {
          onSubmitProps.resetForm();
          onSubmitProps.setSubmitting(false);
        }, 500);
        updatedEmployee(formData);
        closeEvent();
        return toast.success(`Employee updated successfully!`);
      });
    } catch (err) {
      closeEvent();
      return toast.error(err.response.data);
    }
  };

  // Gender Array Object
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <>
      {/* Add your form here */}
      <Typography variant="h6" fontWeight="bold" align="center">
        Update Employee
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
                <Grid item xs={6}>
                  <Box height={7} />
                  <FastField type="text" name="jobTitle" label="Job Title" component={TextField} />
                </Grid>
                <Grid item xs={6}>
                  <Box height={7} />
                  <FastField type="number" name="salary" label="Salary" step="0.00" component={TextField} />
                </Grid>
                <Grid item xs={12}>
                  <Box height={7} />
                  <Button type="submit" label="Submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                    {formik.isSubmitting ? "Loading" : "Update Employee"}
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

export default UpdateEmployee;
