"use client";
import { lazy, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Paper, Box, Stack, TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, TablePagination, IconButton, Typography, Divider, TextField, Button, Modal } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import UploadIcon from "@mui/icons-material/FileUploadOutlined";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as xlsx from "xlsx";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import currencyFormatter from "../../components/utils/currencyFormatter";
const AddEmployee = lazy(() => import("./AddEmployee"));
const UpdateEmployee = lazy(() => import("./UpdateEmployee"));
const ViewEmployee = lazy(() => import("./ViewEmployee"));

// Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
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
  { field: `gender`, label: `Gender` },
  { field: `address`, label: `Address` },
  { field: `phone`, label: `Phone` },
  { field: `jobTitle`, label: `Title` },
  { field: `salary`, label: `salary`, align: "right" },
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

const Employees = () => {
  const log = useRef(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({});
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);

  // Get Employees from API function
  const getEmployees = async () => {
    setIsLoading(true);
    try {
      await axios.get(`/api/v1/employee`, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((res) => {
        setEmployees(res.data.rows);
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
    getEmployees();
    // eslint-disable-next-line
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0;

  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Setting File data to state function
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    return selectedFile ? setFile(selectedFile) : setFile(null);
  };

  // Upload File Data Function
  const handleUpload = async () => {
    try {
      if (file) {
        const fileData = new FormData();
        fileData.append(`file`, file);
        await axios.post(`/api/v1/employee/bulkCreate`, fileData, { headers: { "Content-Type": "multipart/form-data" } });
        getEmployees();
        return toast.success(`Employees uploaded successfully!`);
      } else {
        return toast.error(`Please select a file!`);
      }
    } catch (err) {
      return toast.error(`Employees weren't uploaded!`);
    }
  };

  // Download File Data Function
  const handleDownload = async () => {
    try {
      // Create a new workbook and add a worksheet
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(employees);
      // Add the worksheet to the workbook
      xlsx.utils.book_append_sheet(workbook, worksheet, "Employees");
      // Save the worksheet to a file
      xlsx.writeFile(workbook, "employees.xlsx");
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
  const handleCreate = () => getEmployees();

  // View function
  const handleView = async (id) => {
    try {
      await axios.get(`/api/v1/employee/${id}`, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((res) => {
        return setEmployee(res.data);
      });
      handleViewOpen();
    } catch (err) {
      return toast.error(err.response.data);
    }
  };

  // Edit function
  const handleEdit = async (id) => {
    try {
      await axios.get(`/api/v1/employee/${id}`, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((res) => {
        return setEmployee(res.data);
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
          await axios.delete(`/api/v1/employee/${id}`, { headers: { accessToken: localStorage.getItem("accessToken") } });
          getEmployees();
          return toast.success(`Employee ${id} deleted successfully!`);
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
              <AddEmployee newEmployee={handleCreate} closeEvent={handleAddClose} />
            </Box>
          </Modal>
        </Box>
        <Modal keepMounted open={modalEditOpen} aria-labelledby="responsive-modal-title" aria-describedby="responsive-modal-description">
          <Box sx={style}>
            <UpdateEmployee updatedEmployee={handleCreate} closeEvent={handleEditClose} employee={employee} />
          </Box>
        </Modal>
        <Modal keepMounted open={modalViewOpen} aria-labelledby="responsive-modal-title" aria-describedby="responsive-modal-description">
          <Box sx={style}>
            <ViewEmployee closeEvent={handleViewClose} employee={employee} />
          </Box>
        </Modal>
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Stack ml={1} mr={1} direction="row" spacing={2}>
          <Typography gutterBottom variant="h6" component="div" sx={{ pl: "10px", pt: "10px" }}>
            Employees List
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <TextField type="file" size="small" sx={{ width: 120 }} onChange={handleFileChange} />
          <Button variant="contained" disableRipple disableElevation sx={{ maxHeight: "35px", minHeight: "35px" }} startIcon={<UploadIcon />} onClick={handleUpload}>
            upload
          </Button>
          <Button variant="contained" disableRipple disableElevation sx={{ maxHeight: "35px", minHeight: "35px" }} startIcon={<DownloadIcon />} onClick={handleDownload}>
            download
          </Button>
        </Stack>
        <Divider />
        <Box height={5} />
        {/* Search Box */}
        <Stack ml={1} mr={1} direction="row" spacing={2}>
          <TextField type="search" size="small" sx={{ width: 300 }} onChange={(e) => setSearch(e.target.value)} label={`${count} Search Employee...`} />
          {/* <Autocomplete disablePortal id="combo-box-demo" size="small" options={employees} sx={{ width: 300 }} onChange={v => filterEmployee(v)} getOptionLabel={employees => employees.name || ""} renderInput={params => <TextField {...params} label={`${count} Search Employee...`} />} /> */}
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
                employees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((employee) => {
                    return search.toLowerCase() === "" ? employee : employee.name.toLowerCase().includes(search) || employee.jobTitle.toLowerCase().includes(search) || employee.phone.toLowerCase().includes(search);
                  })
                  .map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.gender}</TableCell>
                      <TableCell>{employee.address}</TableCell>
                      <TableCell>{employee.phone}</TableCell>
                      <TableCell>{employee.jobTitle}</TableCell>
                      <TableCell align="right">{currencyFormatter(employee.salary)}</TableCell>
                      <TableCell>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.3}>
                          <VisibilityIcon style={{ fontSize: "20px", color: "green", cursor: "pointer" }} onClick={() => handleView(employee.id)} />
                          <EditIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }} onClick={() => handleEdit(employee.id)} />
                          <DeleteIcon style={{ fontSize: "20px", color: "red", cursor: "pointer" }} onClick={() => handleDelete(employee.id)} />
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

export default Employees;
