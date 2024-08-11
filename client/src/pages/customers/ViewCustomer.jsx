"use client";
import { lazy } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dateFormatter from "../../components/utils/dateFormatter";
import currencyFormatter from "../../components/utils/currencyFormatter";
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const ViewCustomer = ({ customer, closeEvent }) => {
    return (
        <>
            {/* Add your form here shaaciye */}
            <Typography variant="h6" fontWeight="bold" align="center">
                View Customer
            </Typography>
            <Box sx={{ m: 2 }} />
            <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Stack direction="row" spacing={2}>
                <Box height="275px" width="150px" textAlign="left" p={1}>
                    <Typography variant="body" fontWeight="bold" display="block">
                        ID No
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Name
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Gender
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Address
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Phone
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Deposit Amount
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Allowed Unit
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Payment Status
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Created At
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Updated At
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Deleted At
                    </Typography>
                </Box>
                <Box height="275px" width="500px" textAlign="left" p={1}>
                    <Typography variant="body" display="block">
                        : {customer.id}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {customer.name}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {customer.gender}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {customer.address}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {customer.phone}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {currencyFormatter(customer.depositAmount)}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {customer.allowedUnit}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {customer.paymentStatus}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {dateFormatter(new Date(customer.createdAt), "YYYY-MM-DD HH:mm:ss")}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {dateFormatter(new Date(customer.updatedAt), "YYYY-MM-DD HH:mm:ss")}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {customer.deletedAt ? dateFormatter(new Date(customer.deletedAt), "YYYY-MM-DD HH:mm:ss") : "Null"}
                    </Typography>
                </Box>
            </Stack>
            <Button type="submit" label="Return to List" onClick={closeEvent} />
        </>
    );
};

export default ViewCustomer;
