"use client";
import { lazy } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dateFormatter from "../../components/utils/dateFormatter";
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const ViewService = ({ service, closeEvent }) => {
    return (
        <>
            {/* Add your form here */}
            <Typography variant="h6" fontWeight="bold" align="center">
                View Service
            </Typography>
            <Box sx={{ m: 2 }} />
            <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Stack direction="row" spacing={2}>
                <Box height="130px" width="150px" textAlign="left" p={1}>
                    <Typography variant="body" fontWeight="bold" display="block">
                        ID No
                    </Typography>
                    <Typography variant="body" fontWeight="bold" display="block">
                        Name
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
                <Box height="130px" width="500px" textAlign="left" p={1}>
                    <Typography variant="body" display="block">
                        : {service.id}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {service.name}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {dateFormatter(new Date(service.createdAt), "YYYY-MM-DD HH:mm:ss")}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {dateFormatter(new Date(service.updatedAt), "YYYY-MM-DD HH:mm:ss")}
                    </Typography>
                    <Typography variant="body" display="block">
                        : {service.deletedAt ? dateFormatter(new Date(service.deletedAt), "YYYY-MM-DD HH:mm:ss") : "Null"}
                    </Typography>
                </Box>
            </Stack>
            <Button type="submit" label="Return to List" onClick={closeEvent} />
        </>
    );
};

export default ViewService;
