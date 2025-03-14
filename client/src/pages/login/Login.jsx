"use client";
import { useContext, useState } from "react";
import { Container, Typography, Box, Grid, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Form, Formik, FastField } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../helper/AuthContext";
import TextField from "../../components/formsUI/TextFieldWrapper";
import Button from "../../components/formsUI/ButtonWrapper";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // Initial Values
  const initialValues = {
    username: "",
    password: "",
  };

  // Validation Schema with Yup
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3)
      .max(20)
      .matches(/^[A-Za-z0-9_.]+$/, "Username must be Letters or mixed Letters/Numbers/Underscore/Dot")
      .required(),
    password: yup
      .string()
      .min(6)
      .max(20)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$])/, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character")
      .required(),
  });

  const onSubmit = async (user, onSubmitProps) => {
    const data = { username: user.username, password: user.password };
    try {
      const res = await axios.post(`/api/v1/user/login`, data);
      if (res.data.err) return toast.error(res.data.err);
      setTimeout(() => {
        localStorage.setItem("accessToken", res.data.token);
        setAuthState({ id: res.data.id, name: res.data.name, username: res.data.username, type: res.data.type });
        onSubmitProps.resetForm();
        onSubmitProps.setSubmitting(false);
        if (res.data.type === "admin") {
          navigate("/dashboard", { replace: true });
        } else if (res.data.type === "manager") {
          navigate("/customers", { replace: true });
        } else if (res.data.type === "user") {
          navigate("/expenses", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
        return toast.success(`Welcome back ${res.data.username}!`);
      }, 500);
    } catch (err) {
      return toast.error(err.response.data);
    }
  };

  return (
    <div style={{ display: "block", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", padding: "250px", background: "linear-gradient(45deg,rgb(191, 209, 179) 30%,rgb(205, 217, 228) 90%)" }}>
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box height={7} />
                      <FastField type="text" name="username" label="Username" component={TextField} />
                    </Grid>
                    <Grid item xs={12}>
                      <Box height={7} />
                      <FastField
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        component={TextField}
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box height={7} />
                      <Button type="submit" label="Submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                        {formik.isSubmitting ? "Loading" : "Login"}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
