import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import {
  auth,
  logInWithEmailAndPassword,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ boxShadow: "none", backgroundColor: "#0f172a" }}>
        <CardContent>
          <div
            style={{
              marginTop: "100px",
            }}
          >
            <Typography
              style={{
                /* Sign In */

                width: "143.81px",
                height: "48.3px",
                left: "813.18px",
                top: "235.32px",

                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "36px",
                lineHeight: "44px",

                color: "white",
              }}
            >
              Sign In
            </Typography>
          </div>
          <Typography
            style={{
              /* Sign in to your account */
              marginTop: "5px",

              height: "20.86px",
              left: "813.18px",
              top: "289.11px",

              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "19px",

              color: "white",
            }}
          >
            Sign into your account
          </Typography>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
          </div>
          <Card
            style={{
              width: "422.64px",
              height: "390.8px",
              background: "#FFFFFF",
              borderRadius: "5px",
              marginTop: "40px",
            }}
          >
            <CardContent style={{ margin: "auto", marginTop: "20px" }}>
              <Typography
                style={{
                  height: "20.86px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "19px",
                  marginBottom: "10px",
                }}
              >
                Email address
              </Typography>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "356.77px",
                  height: "43.91px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "19px",
                  background: "#F5F5F5",
                  borderRadius: "5px",
                  border: "2px solid #F5F5F5",
                  paddingLeft: "20px",
                }}
                type="text"
                placeholder="Email"
              />
              <Typography
                style={{
                  height: "20.86px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "19px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                Password
              </Typography>
              <input
                style={{
                  width: "356.77px",
                  height: "43.91px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "19px",
                  background: "#F5F5F5",
                  borderRadius: "5px",
                  border: "2px solid #F5F5F5",
                  paddingLeft: "20px",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Link
                  to="/reset"
                  style={{
                    width: "136.12px",
                    height: "20.86px",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "19px",
                    /* Link */
                    color: "#346BD5",
                    textDecoration: "none",
                    marginTop: "20px",
                  }}
                >
                  Forgot Password?
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => logInWithEmailAndPassword(email, password)}
                  variant="contained"
                  style={{
                    textTransform: "none",
                    background: "#4285F4",
                    borderRadius: "5px",
                    width: "356.77px",
                    height: "43.91px",
                  }}
                >
                  Sign in
                </Button>
              </div>
              <Typography
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  height: "20.86px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: "#858585",
                }}
              >
                Don't have an account
                <Link
                  to="/register"
                  style={{
                    color: "#4285F4",
                    textDecoration: "none",
                    marginLeft: "10px",
                  }}
                >
                  Register here
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
