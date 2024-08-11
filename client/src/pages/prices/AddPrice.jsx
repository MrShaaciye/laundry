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

const AddPrice = ({ newPrice, prices, closeEvent }) => {
    // Initial Values
    const initialValues = {
        type: "",
        cost: "",
    };

    // Validation Schema with Yup
    const validationSchema = yup.object().shape({
        type: yup.string().min(2).max(3).oneOf(["Kg", "Qty"]).required(),
        cost: yup.number().typeError().positive().min(0.5).max(999.99).required(),
    });

    // Submit Form Data function
    const onSubmit = async (formData, onSubmitProps) => {
        try {
            const { type } = formData;
            const priceExist = prices.find(price => price.type === type);
            if (priceExist) {
                closeEvent();
                return toast.error(`Price already exists`);
            }
            await axios.post(`/api/v1/price`, formData);
            setTimeout(() => {
                onSubmitProps.resetForm();
                onSubmitProps.setSubmitting(false);
            }, 500);
            newPrice(formData);
            closeEvent();
            return toast.success(`Price added successfully`);
        } catch (err) {
            closeEvent();
            return toast.error(err.response.data);
        }
    };

    // Type Array Object
    const typeOptions = [
        { value: "Qty", label: "Qty" },
        { value: "Kg", label: "Kg" },
    ];

    return (
        <>
            {/* Add your form here */}
            <Typography variant="h6" fontWeight="bold" align="center">
                Add Price
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
                                    <FastField type="text" name="type" label="Select Type" component={MenuItem} options={typeOptions} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <FastField type="number" name="cost" label="Cost" step="0.00" component={TextField} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <Button type="submit" label="Submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                                        {formik.isSubmitting ? "Loading" : "Create Price"}
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

export default AddPrice;
