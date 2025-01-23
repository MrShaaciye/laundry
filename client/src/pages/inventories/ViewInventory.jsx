"use client";
import { lazy } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dateFormatter from "../../components/utils/dateFormatter";
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const ViewInventory = ({ inventory, closeEvent }) => {
  return (
    <>
      {/* Add your form here */}
      <Typography variant="h6" fontWeight="bold" align="center">
        View Inventory
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
            Supply Name
          </Typography>
          <Typography variant="body" fontWeight="bold" display="block">
            Quantity
          </Typography>
          <Typography variant="body" fontWeight="bold" display="block">
            Type
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
            : {inventory.id}
          </Typography>
          <Typography variant="body" display="block">
            : {inventory.supplyId ? `${inventory.supplies?.name}` : "N/A"}
          </Typography>
          <Typography variant="body" display="block">
            : {inventory.quantity}
          </Typography>
          <Typography variant="body" display="block">
            : {inventory.type}
          </Typography>
          <Typography variant="body" display="block">
            : {inventory.note}
          </Typography>
          <Typography variant="body" display="block">
            : {dateFormatter(new Date(inventory.createdAt), "YYYY-MM-DD HH:mm:ss")}
          </Typography>
          <Typography variant="body" display="block">
            : {dateFormatter(new Date(inventory.updatedAt), "YYYY-MM-DD HH:mm:ss")}
          </Typography>
          <Typography variant="body" display="block">
            : {inventory.deletedAt ? dateFormatter(new Date(inventory.deletedAt), "YYYY-MM-DD HH:mm:ss") : "Null"}
          </Typography>
        </Box>
      </Stack>
      <Button type="submit" label="Return to List" onClick={closeEvent} />
    </>
  );
};

export default ViewInventory;
