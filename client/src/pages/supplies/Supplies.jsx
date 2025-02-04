"use client";
import { lazy, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Paper, Box, Stack, TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, TablePagination, IconButton, Typography, Divider, TextField, Button, Modal /* Autocomplete */ } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as xlsx from "xlsx";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import dateFormatter from "../../components/utils/dateFormatter";
const AddSupply = lazy(() => import("./AddSupply"));
const UpdateSupply = lazy(() => import("./UpdateSupply"));
const ViewSupply = lazy(() => import("./ViewSupply"));

// Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
};

// Table Header List
const columns = [
  { field: `id`, label: `ID` },
  { field: `name`, label: `Name` },
  { field: `note`, label: `Note` },
  { field: `createdAt`, label: `Created At` },
  { field: `updatedAt`, label: `Updated At` },
  { field: `deletedAt`, label: `Deleted At` },
  { field: `actions`, label: `Actions`, align: "center" },
];

// Pagination Function
const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (e) => onPageChange(e, 0);
  const handleBackButtonClick = (e) => onPageChange(e, page - 1);
  const handleNextButtonClick = (e) => onPageChange(e, page + 1);
  const handleLastPageButtonClick = (e) => onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const Supplies = () => {
  const log = useRef(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [supplies, setSupplies] = useState([]);
  const [supply, setSupply] = useState({});
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);

  // Get Supplies from API function
  const getSupplies = async () => {
    setIsLoading(true);
    try {
      await axios.get(`/api/v1/supply`, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((res) => {
        setSupplies(res.data.rows);
        return setCount(res.data.count);
      });
    } catch (err) {
      setError(err.response.data);
      return toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!log.current) return;
    log.current = false;
    getSupplies();
    // eslint-disable-next-line
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0;

  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Download File Data Function
  const handleDownload = async () => {
    try {
      // Create a new workbook and add a worksheet
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(supplies);
      // Add the worksheet to the workbook
      xlsx.utils.book_append_sheet(workbook, worksheet, "Supplies");
      // Save the worksheet to a file
      xlsx.writeFile(workbook, "supplies.xlsx");
    } catch (err) {
      setError(err.response.data);
      return toast.error(error);
    }
  };

  // Modal Open functions
  const handleAddOpen = () => setModalAddOpen(true);
  const handleEditOpen = () => setModalEditOpen(true);
  const handleViewOpen = () => setModalViewOpen(true);

  // Modal Close functions
  const handleAddClose = () => setModalAddOpen(false);
  const handleEditClose = () => setModalEditOpen(false);
  const handleViewClose = () => setModalViewOpen(false);

  // Create function
  const handleCreate = () => getSupplies();

  // View function
  const handleView = async (id) => {
    try {
      await axios.get(`/api/v1/supply/${id}`, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((res) => {
        return setSupply(res.data);
      });
      handleViewOpen();
    } catch (err) {
      return toast.error(err.response.data);
    }
  };

  // Edit function
  const handleEdit = async (id) => {
    try {
      await axios.get(`/api/v1/supply/${id}`, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((res) => {
        return setSupply(res.data);
      });
      handleEditOpen();
    } catch (err) {
      return toast.error(err.response.data);
    }
  };

  // Delete function
  const handleDelete = async (id) => {
    return await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (res) => {
      if (res.value) {
        try {
          await axios.delete(`/api/v1/supply/${id}`, { headers: { accessToken: localStorage.getItem("accessToken") } });
          getSupplies();
          return toast.success(`Supply ${id} deleted successfully!`);
        } catch (err) {
          return toast.error(err.response.data);
        }
      }
    });
  };

  // If Loading
  if (isLoading) return <Stack>Page is Loading data...</Stack>;

  return (
    <>
      {/* Create modal */}
      <Stack>
        <Box>
          <Modal keepMounted open={modalAddOpen} aria-labelledby="responsive-modal-title" aria-describedby="responsive-modal-description">
            <Box sx={style}>
              <AddSupply newSupply={handleCreate} closeEvent={handleAddClose} />
            </Box>
          </Modal>
        </Box>
        <Modal keepMounted open={modalEditOpen} aria-labelledby="responsive-modal-title" aria-describedby="responsive-modal-description">
          <Box sx={style}>
            <UpdateSupply updatedSupply={handleCreate} closeEvent={handleEditClose} supply={supply} />
          </Box>
        </Modal>
        <Modal keepMounted open={modalViewOpen} aria-labelledby="responsive-modal-title" aria-describedby="responsive-modal-description">
          <Box sx={style}>
            <ViewSupply closeEvent={handleViewClose} supply={supply} />
          </Box>
        </Modal>
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Stack ml={1} mr={1} direction="row" spacing={2}>
          <Typography gutterBottom variant="h6" component="div" sx={{ pl: "10px", pt: "10px" }}>
            Supplies List
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <Button variant="contained" disableRipple disableElevation sx={{ maxHeight: "35px", minHeight: "35px" }} startIcon={<DownloadIcon />} onClick={handleDownload}>
            download
          </Button>
        </Stack>
        <Divider />
        <Box height={5} />
        {/* Search Box */}
        <Stack ml={1} mr={1} direction="row" spacing={2}>
          <TextField type="search" size="small" sx={{ width: 300 }} onChange={(e) => setSearch(e.target.value)} label={`${count} Search Supply...`} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 12 }}></Typography>
          <Button variant="contained" disableRipple disableElevation sx={{ maxHeight: "35px", minHeight: "35px" }} startIcon={<AddCircleIcon />} onClick={handleAddOpen}>
            Add
          </Button>
        </Stack>
        <Box height={5} />
        <Divider />
        {/* Table */}
        <TableContainer sx={{ width: "100%", overflow: "hidden" }}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field} align={column.align} sx={{ fontWeight: "bold" }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {count > 0 && rowsPerPage > 0 ? (
                supplies
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((supply) => (search.toLowerCase() === "" ? supply : supply.id.toString().includes(search) || supply.name.toLowerCase().includes(search) || supply.note.toLowerCase().includes(search)))
                  .map((supply) => (
                    <TableRow key={supply.id}>
                      <TableCell>{supply.id}</TableCell>
                      <TableCell>{supply.name}</TableCell>
                      <TableCell>{supply.note}</TableCell>
                      <TableCell>{dateFormatter(new Date(supply.createdAt), "YYYY-MM-DD HH:mm:ss")}</TableCell>
                      <TableCell>{dateFormatter(new Date(supply.updatedAt), "YYYY-MM-DD HH:mm:ss")}</TableCell>
                      <TableCell>{supply.deletedAt ? dateFormatter(new Date(supply.deletedAt), "YYYY-MM-DD HH:mm:ss") : "Null"}</TableCell>
                      <TableCell>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.3}>
                          <VisibilityIcon style={{ fontSize: "20px", color: "green", cursor: "pointer" }} onClick={() => handleView(supply.id)} />
                          <EditIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }} onClick={() => handleEdit(supply.id)} />
                          <DeleteIcon style={{ fontSize: "20px", color: "red", cursor: "pointer" }} onClick={() => handleDelete(supply.id)} />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <Typography align="center">No data available in this table</Typography>
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={columns.length} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={columns.length}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Supplies;
