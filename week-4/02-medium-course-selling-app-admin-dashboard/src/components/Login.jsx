import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    return (
      <>
        <div style={{height:"100vh", display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <div style={{display:"flex", justifyContent:"center"}}>
            <Typography variant="h6">
              Welcome to Coursera. Sign in below
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant="outlined" style={{ width: 400, padding: 20 }}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                fullWidth={true}
                label="Email"
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                fullWidth={true}
                label="Password"
                variant="outlined"
              />
              <br />
              <br />
              <Button
              size="large"
              variant="contained"
              onClick= {async (e) => {
                  e.preventDefault();
                  const existingUser = {
                      username: email,
                      password: password
                  }
                  const response = await fetch("http://localhost:3000/admin/login", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(existingUser),
                    });
  
                    if(response.ok) {
                      const resData = await response.json();
                      const token = resData.token;
                      localStorage.setItem("token", token);
                    }
                    else {
                        console.log("Signin failed");
                    }
              }}>
                  Sign In
              </Button>
            </Card>
          </div>
        </div>
      </>
    );
}

export default Login