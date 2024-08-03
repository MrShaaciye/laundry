"use client";
import { lazy } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dateFormatter from "../../components/utils/dateFormatter";
import currencyFormatter from "../../components/utils/currencyFormatter";
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const ViewEmployee = ({ employee, closeEvent }) => {
    return (
        <>
            {/* Add your form here */}
            <Typography variant="h6" fontWeight="bold" align="center">
                View Employee
            </Typography>
            <Box sx={{ m: 2 }} />
            <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Stack direction="row" spacing={2}>
                <Box height="250px" width="150px" textAlign="left" p={1}>
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
                        Job Title
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Salary
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
                <Box height="250px" width="500px" textAlign="left" p={1}>
                    <Typography variant="body" display="block">
                        : {employee.id}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {employee.name}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {employee.gender}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {employee.address}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {employee.phone}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {employee.jobTitle}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {currencyFormatter(employee.salary)}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {dateFormatter(new Date(employee.createdAt), "YYYY-MM-DD HH:mm:ss")}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {dateFormatter(new Date(employee.updatedAt), "YYYY-MM-DD HH:mm:ss")}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {employee.deletedAt ? dateFormatter(new Date(employee.deletedAt), "YYYY-MM-DD HH:mm:ss") : "Null"}
                    </Typography>
                </Box>
            </Stack>
            <Button type="submit" label="Return to List" onClick={closeEvent} />
        </>
    );
};

export default ViewEmployee;
