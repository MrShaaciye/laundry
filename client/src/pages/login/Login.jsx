import React from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { Formik, FastField, Form } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().min(6, "Password too short").required("Required"),
});

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Box mb={3}>
                <FastField name="username">{({ field }) => <TextField {...field} label="Username" variant="outlined" fullWidth error={touched.username && !!errors.username} helperText={touched.username && errors.username} />}</FastField>
              </Box>
              <Box mb={3}>
                <FastField name="password">{({ field }) => <TextField {...field} label="Password" type="password" variant="outlined" fullWidth error={touched.password && !!errors.password} helperText={touched.password && errors.password} />}</FastField>
              </Box>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
