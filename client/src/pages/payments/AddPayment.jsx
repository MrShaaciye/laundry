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

const AddPayment = ({ expenses, newPayment, closeEvent }) => {
    // Initial Values
    const initialValues = {
        expenseId: "",
        date: "",
        amount: "",
        note: "",
    };

    // Validation Schema with Yup
    const validationSchema = yup.object().shape({
        expenseId: yup.number().typeError().positive().integer().required(),
        date: yup
            .date()
            .transform(value => (value ? value : new Date()))
            .max(new Date(), "Payment Date can't be in the future")
            .required(),
        amount: yup.number().typeError().positive().min(0.5).max(99999.99).required(),
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
            await axios.post(`/api/v1/payment`, formData);
            setTimeout(() => {
                onSubmitProps.resetForm();
                onSubmitProps.setSubmitting(false);
            }, 500);
            newPayment(formData);
            closeEvent();
            return toast.success(`Payment added successfully`);
        } catch (err) {
            closeEvent();
            return toast.error(err.response.data);
        }
    };

    return (
        <>
            {/* Add your form here */}
            <Typography variant="h6" fontWeight="bold" align="center">
                Add Payment
            </Typography>
            <Box sx={{ m: 2 }} />
            <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            {/* Formik Starts here */}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
                {formik => {
                    return (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <FastField type="number" name="expenseId" label="Select Payment" component={MenuItem} options={expenses.map(expense => ({ value: expense.id, label: expense.name }))} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <FastField type="date" name="date" label="Payment Date" component={TextField} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <FastField type="number" name="amount" label="Amount" step="0.00" component={TextField} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <FastField type="text" name="note" label="Note" component={TextField} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <Button type="submit" label="Submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                                        {formik.isSubmitting ? "Loading" : "Create Payment"}
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

export default AddPayment;
