import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LoggedInContext } from "../../App";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [credentials, setCredentials] = useState({
    Username: "",
    password: "",
  });

  const { setIsLoggedIn, isLoggedIn } = useContext(LoggedInContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoggedIn(true);
  };

  const handleLogin = () => {
    if (
      credentials.Username !== import.meta.env.VITE_USERNAME ||
      credentials.password !== import.meta.env.VITE_pASSWORD
    ) {
      setErrMsg(true);
      return;
    }
    setErrMsg(false);
    setOpen(false);
    setIsLoggedIn(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOpen(false);
    setCredentials({ Username: "", password: "" });
  };

  console.log(isLoggedIn);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AppBar
        position="static"
        sx={{
          maxWidth: 1500,
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hot Dog stores
          </Typography>
          <Button variant="text" color="inherit" onClick={handleClickOpen}>
            Open form dialog
          </Button>
          {!isLoggedIn && (
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Login</DialogTitle>
              <DialogContent>
                <TextField
                  onChange={handleInputChange}
                  autoFocus
                  margin="dense"
                  id="Username"
                  name="Username"
                  label="Username"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  onChange={handleInputChange}
                  autoFocus
                  margin="dense"
                  id="password"
                  label="password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="standard"
                />
                {errMsg && (
                  <Typography color="error">
                    Incorrect username or password
                  </Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleLogin}>login</Button>
              </DialogActions>
            </Dialog>
          )}
          {isLoggedIn && (
            <Dialog open={open} onClose={handleClose}>
              <Box
                sx={{
                  padding: "30px",
                }}
              >
                <DialogTitle>Logout</DialogTitle>
                <DialogActions>
                  <Button onClick={handleLogout} variant="contained">
                    logout
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Login;
