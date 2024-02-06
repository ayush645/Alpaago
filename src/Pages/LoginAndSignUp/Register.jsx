import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import {
  auth,
  registerWithEmailAndPassword,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
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
          <div>
            <Typography
              style={{

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
              Register
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
            Register into your account
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
                Full Name
              </Typography>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="Full Name"
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
                type="value"
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={register}
                  variant="contained"
                  style={{
                    textTransform: "none",
                    background: "#4285F4",
                    borderRadius: "5px",
                    width: "356.77px",
                    height: "43.91px",
                    marginTop: "20px",
                  }}
                >
                  Register
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
                Already have an account
                <Link
                  to="/"
                  style={{
                    color: "#4285F4",
                    textDecoration: "none",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  Login here
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
