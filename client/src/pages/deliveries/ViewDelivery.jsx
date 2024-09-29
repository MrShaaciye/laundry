"use client";
import { lazy } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dateFormatter from "../../components/utils/dateFormatter";
import currencyFormatter from "../../components/utils/currencyFormatter";
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const ViewDelivery = ({ delivery, closeEvent }) => {
    return (
        <>
            {/* Add your form here */}
            <Typography variant="h6" fontWeight="bold" align="center">
                View Delivery
            </Typography>
            <Box sx={{ m: 2 }} />
            <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Stack direction="row" spacing={2}>
                <Box height="200px" width="150px" textAlign="left" p={1}>
                    <Typography variant="body" fontWeight="bold" display="block">
                        ID No
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Customer
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Employee
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Fee
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Note
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
                <Box height="200px" width="500px" textAlign="left" p={1}>
                    <Typography variant="body" display="block">
                        : {delivery.id}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {delivery.customerId ? `${delivery.customers?.name} [${delivery.customers?.phone}] ${delivery.customers?.address}` : "N/A"}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {delivery.employeeId ? `${delivery.employees?.name} [${delivery.employees?.jobTitle}]` : "N/A"}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {currencyFormatter(delivery.fee)}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {delivery.note}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {dateFormatter(new Date(delivery.createdAt), "YYYY-MM-DD HH:mm:ss")}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {dateFormatter(new Date(delivery.updatedAt), "YYYY-MM-DD HH:mm:ss")}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {delivery.deletedAt ? dateFormatter(new Date(delivery.deletedAt), "YYYY-MM-DD HH:mm:ss") : "Null"}
                    </Typography>
                </Box>
            </Stack>
            <Button type="submit" label="Return to List" onClick={closeEvent} />
        </>
    );
};

export default ViewDelivery;
