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

const UpdatePrice = ({ supplies, inventory, updatedInventory, closeEvent }) => {
    // Initial Values
    const initialValues = {
        supplyId: inventory.supplyId,
        quantity: inventory.quantity,
        type: inventory.type,
        note: inventory.note,
    };

    // Validation Schema with Yup
    const validationSchema = yup.object().shape({
        supplyId: yup.number().typeError().positive().required(),
        quantity: yup.number().typeError().positive().min(1).max(999999).required(),
        type: yup.string().min(8).max(9).oneOf(["Stoke in", "Stoke out"]).required(),
        note: yup
            .string()
            .min(3)
            .max(50)
            .matches(/^[A-Za-z0-9_.,'!@#$%^&* ]+$/, "Address must be Letters/Numbers")
            .required(),
    });

    // Submit Form Data function
    const onSubmit = async (formData, onSubmitProps) => {
        try {
            await axios.put(`/api/v1/inventory/${inventory.id}`, formData);
            setTimeout(() => {
                onSubmitProps.resetForm();
                onSubmitProps.setSubmitting(false);
            }, 500);
            updatedInventory(formData);
            closeEvent();
            return toast.success(`Inventory updated successfully`);
        } catch (err) {
            closeEvent();
            return toast.error(err.response.data);
        }
    };

    // Type Array Object
    const typeOptions = [
        { value: "Stoke in", label: "Stoke in" },
        { value: "Stoke out", label: "Stoke out" },
    ];

    return (
        <>
            {/* Add your form here */}
            <Typography variant="h6" fontWeight="bold" align="center">
                Update Inventory
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
                                    <FastField type="number" name="supplyId" label="Select Supply" component={MenuItem} options={supplies.map(supply => ({ value: supply.id, label: supply.name }))} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <FastField type="number" name="quantity" label="Quantity" component={TextField} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <FastField type="text" name="type" label="Select Type" component={MenuItem} options={typeOptions} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <FastField type="text" name="note" label="Note" component={TextField} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box height={7} />
                                    <Button type="submit" label="Submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                                        {formik.isSubmitting ? "Loading" : "Update Inventory"}
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

export default UpdatePrice;
