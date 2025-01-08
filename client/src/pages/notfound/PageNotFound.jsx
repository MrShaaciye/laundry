import { Container } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = async () => {
    return await navigate("/");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", width: "100vw" }}>
      <Container maxWidth="sm">
        {/* <div style={{ textAlign: "center", marginTop: "50px" }}> */}
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>

        <NavLink to="/" onClick={handleRedirect} style={{ textDecoration: "none" }}>
          Go back to login page
        </NavLink>
      </Container>
    </div>
  );
};

export default PageNotFound;
