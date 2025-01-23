"use client";
import { useContext, lazy } from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import { Form, Formik, FastField } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../helper/AuthContext";
const TextField = lazy(() => import("../../components/formsUI/TextFieldWrapper"));
const Button = lazy(() => import("../../components/formsUI/ButtonWrapper"));

const Login = () => {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

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
        res.data.type === "admin" ? navigate("/dashboard") : res.data.type === "manager" ? navigate("/customers") : res.data.type === "user" ? navigate("/expenses") : navigate("/login");
        return toast.success(`Welcome back ${res.data.username}!`);
      }, 500);
    } catch (err) {
      return toast.error(err.response.data);
    }
  };

  return (
    <div style={{ display: "block", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", padding: "250px" }}>
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
                      <FastField type="password" name="password" label="Password" component={TextField} />
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
