"use client";
import { lazy } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dateFormatter from "../../components/utils/dateFormatter";
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const ViewExpense = ({ expense, closeEvent }) => {
  return (
    <>
      {/* Add your form here */}
      <Typography variant="h6" fontWeight="bold" align="center">
        View Expense
      </Typography>
      <Box sx={{ m: 2 }} />
      <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Stack direction="row" spacing={2}>
        <Box height="150px" width="150px" textAlign="left" p={1}>
          <Typography variant="body" fontWeight="bold" display="block">
            ID No
          </Typography>
          <Typography variant="body" fontWeight="bold" display="block">
            Name
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
        <Box height="150px" width="500px" textAlign="left" p={1}>
          <Typography variant="body" display="block">
            : {expense.id}
          </Typography>
          <Typography variant="body" display="block">
            : {expense.name}
          </Typography>
          <Typography variant="body" display="block">
            : {expense.note}
          </Typography>
          <Typography variant="body" display="block">
            : {dateFormatter(new Date(expense.createdAt), "YYYY-MM-DD HH:mm:ss")}
          </Typography>
          <Typography variant="body" display="block">
            : {dateFormatter(new Date(expense.updatedAt), "YYYY-MM-DD HH:mm:ss")}
          </Typography>
          <Typography variant="body" display="block">
            : {expense.deletedAt ? dateFormatter(new Date(expense.deletedAt), "YYYY-MM-DD HH:mm:ss") : "Null"}
          </Typography>
        </Box>
      </Stack>
      <Button type="submit" label="Return to List" onClick={closeEvent} />
    </>
  );
};

export default ViewExpense;
