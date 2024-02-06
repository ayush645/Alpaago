import React, { useState, useEffect } from "react";

// Material ui
import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { UserTable } from "../../Components";

// Icons
import CloudIcon from "@mui/icons-material/Cloud";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import WindPowerIcon from "@mui/icons-material/WindPower";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Loader from material ui
import CircularProgress from "@mui/material/CircularProgress";

// Css
import "./dashboard.css";

// Error component
import Error from "./Error";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");

  // For Loader
  const [isLoading, setIsLoading] = useState(true);

  const isSmallScreen = useMediaQuery("(max-width:767px)");

  // Api key
  const apiKey = "e9a602fadd6809be186580fe9024224d";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (searchCity) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${unit}&appid=${apiKey}`
          );
          if (!response.ok) {
            throw new Error("City not found or API error");
          }
          const result = await response.json();
          setData(result);
          setError(null);
        } catch (error) {
          setError("City not found or API error");
        }
      } else if (lat !== null && long !== null) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`
          );
          if (!response.ok) {
            throw new Error("API error");
          }
          const result = await response.json();
          setData(result);
          setError(null);
        } catch (error) {
          setError("Check Your Internet Connection");
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [searchCity, lat, long, unit,]);

  useEffect(() => {
    const fetchCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        function (error) {
          setError(
            "Error getting geolocation data Check Your Internet Connection"
          );
        }
      );
    };

    if (searchCity === "") {
      fetchCurrentLocation();
    }
  }, [searchCity]);
  console.log(data);

  // Convert Unix timestamp to milliseconds
  const sunriseTimestamp = data?.sys?.sunrise * 1000;
  const sunsetTimestamp = data?.sys?.sunset * 1000;
  

  // Create Date objects
  const sunriseDate = sunriseTimestamp ? new Date(sunriseTimestamp) : null;
  const sunsetDate = sunsetTimestamp ? new Date(sunsetTimestamp) : null;

  // Convert Date objects to human-readable time (hours and minutes only)
  const sunriseTime = sunriseDate
    ? sunriseDate.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";
  const sunsetTime = sunsetDate
    ? sunsetDate.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  // Output the results
  console.log("Sunrise time:", sunriseTime);
  console.log("Sunset time:", sunsetTime);

  return (
    <>
      <Card style={{ boxShadow: "none" }}>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#0f172a",
          }}
        >
          {isSmallScreen ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1f293b",
                marginRight: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "5px",
              }}
            >
              <CloudIcon style={{ color: "white" }} />
            </div>
          ) : (
            <Card
              style={{
                backgroundColor: "#1f293b",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "10px",
                paddingRight: "10px",
                height: "55px",
              }}
            >
              <CloudIcon style={{ color: "white" }} />
              <Typography
                style={{
                  color: "white",
                  fontFamily: "Poppins",
                  marginLeft: "5px",
                }}
              >
                Weather
              </Typography>
            </Card>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: isSmallScreen ? "100%" : "40%",
            }}
          >
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                flex: 1,

                border: "none",
                outline: "none",
                backgroundColor: "#1f293b",
                fontSize: "16px",
                fontFamily: "Poppins",
                height: "50px",
                borderRadius: "5px",
                color: "white",
                paddingLeft: "10px",
                paddingRight: "10px",
                width: isSmallScreen ? "50%" : "100%",
              }}
            />
            <button className="button" onClick={() => setSearchCity(city)}>
              Search
            </button>
          </div>
        </CardContent>
      </Card>
      {isLoading && (
        <div
          style={{
            display: "flex",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress
            style={{ color: "white", height: "50px", width: "50px" }}
          />
        </div>
      )}
      {error && (
        <div style={{ color: "white" }}>
          <Error error={error} />
        </div>
      )}
      {error === null && data.main && data.sys ? (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                backgroundColor: "#1f293b",
                width: "280px",
                display: "flex",
                justifyContent: "center",
                paddingTop: "15px",
                paddingBottom: "15px",
                borderRadius: "5px",
                marginBottom: "10px",
                border: "1px solid white",
              }}
            >
              <label
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontFamily: "Poppins",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  style={{
                    color: "white",
                    marginRight: "10px",
                    width: "20px",
                    height: "20px",
                  }}
                  type="radio"
                  value="metric"
                  checked={unit === "metric"}
                  onChange={() => setUnit("metric")}
                />
                Celsius
              </label>

              <label
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontFamily: "Poppins",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  value="imperial"
                  checked={unit === "imperial"}
                  onChange={() => setUnit("imperial")}
                  style={{
                    color: "white",
                    marginRight: "10px",
                    width: "20px",
                    height: "20px",
                  }}
                />
                Fahrenheit
              </label>
            </div>
          </div>
          <Grid
            container
            spacing={2}
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} md={3} sm={4}>
              <Card
                style={{
                  height: "353px",
                  backgroundColor: "#1f293b",
                  border: "1px solid white",
                }}
              >
                <CardContent>
                  <img
                    src="/icons/sun.svg"
                    alt="sun"
                    style={{
                      height: "60px",
                      width: "60px",
                      paddingLeft: "20px",
                      paddingTop: "20px",
                    }}
                  />
                  <Typography
                    variant="h4"
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      paddingTop: "50px",
                      paddingLeft: "20px",
                    }}
                  >
                    {data?.main?.temp}°{unit === "metric" ? "C" : "F"}
                  </Typography>
                  <Typography
                    style={{
                      color: "white",
                      fontFamily: "Poppins",
                      paddingLeft: "20px",
                      paddingTop: "10px",
                      paddingBottom: "20px",
                    }}
                  >
                    {data.weather && data.weather[0]
                      ? data.weather[0].description
                      : null}
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Divider
                      style={{
                        width: "83%", // Set width to 100%
                        border: "1px solid white",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      paddingLeft: "20px",
                      paddingTop: "30px",
                    }}
                  >
                    <FmdGoodOutlinedIcon
                      style={{ color: "white", height: "30px", width: "30px" }}
                    />
                    <Typography
                      style={{
                        color: "white",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        marginLeft: "5px",
                        marginTop: "3px",
                      }}
                    >
                      {searchCity === "" && data.sys ? (
                        <>
                          {data.name}
                          <span style={{ marginLeft: "10px" }}>
                            ({data?.sys?.country})
                          </span>
                        </>
                      ) : (
                        searchCity
                      )}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Card style={{ backgroundColor: "#1f293b" }}>
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src="/icons/humidity.svg"
                          alt="humidity"
                          style={{ width: "30px", height: "30px" }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",

                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          style={{
                            color: "#6b757b",
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          Humidity
                        </Typography>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: isSmallScreen ? "20px" : "30px",
                            fontWeight: "500",
                          }}
                        >
                          {data?.main?.humidity} %
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {/* Wind Speed */}
                  <Card style={{ backgroundColor: "#1f293b" }}>
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <WindPowerIcon
                          style={{
                            width: "30px",
                            height: "30px",
                            color: "white",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",

                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          style={{
                            color: "#6b757b",
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            fontWeight: "500",
                            textAlign: "end",
                          }}
                        >
                          Wind Speed
                        </Typography>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: isSmallScreen ? "20px" : "30px",
                            fontWeight: "500",
                          }}
                        >
                          {data?.wind?.speed} Km/h
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Pressure */}
                <Grid item xs={12} sm={6} md={6}>
                  <Card style={{ backgroundColor: "#1f293b" }}>
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TireRepairIcon
                          style={{
                            width: "30px",
                            height: "30px",
                            color: "white",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",

                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          style={{
                            color: "#6b757b",
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            fontWeight: "500",
                            textAlign: "end",
                          }}
                        >
                          Pressure
                        </Typography>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: isSmallScreen ? "20px" : "30px",
                            fontWeight: "500",
                          }}
                        >
                          {data?.main?.pressure} Hpa
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Visibility */}
                <Grid item xs={12} sm={6} md={6}>
                  <Card style={{ backgroundColor: "#1f293b" }}>
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <VisibilityIcon
                          style={{
                            width: "30px",
                            height: "30px",
                            color: "white",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",

                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          style={{
                            color: "#6b757b",
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            fontWeight: "500",
                            textAlign: "end",
                          }}
                        >
                          Visibility
                        </Typography>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: isSmallScreen ? "20px" : "30px",
                            fontWeight: "500",
                          }}
                        >
                          {data?.visibility / 1000} Km
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Sunrise */}
                <Grid item xs={12} sm={6} md={6}>
                  <Card style={{ backgroundColor: "#1f293b" }}>
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src="icons/sunrise.svg"
                          alt="sunrise"
                          style={{
                            width: "40px",
                            height: "40px",
                            color: "white",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",

                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          style={{
                            color: "#6b757b",
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            fontWeight: "500",
                            textAlign: "end",
                          }}
                        >
                          Sunrise
                        </Typography>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: isSmallScreen ? "20px" : "30px",
                            fontWeight: "500",
                          }}
                        >
                          {sunriseTime}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Sunset */}
                <Grid item xs={12} sm={6} md={6}>
                  <Card style={{ backgroundColor: "#1f293b" }}>
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src="icons/sunset.svg"
                          alt="sunset"
                          style={{
                            width: "40px",
                            height: "40px",
                            color: "white",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",

                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          style={{
                            color: "#6b757b",
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            fontWeight: "500",
                            textAlign: "end",
                          }}
                        >
                          Sunset
                        </Typography>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: isSmallScreen ? "20px" : "30px",
                            fontWeight: "500",
                          }}
                        >
                          {sunsetTime}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
       
      ) : (
        null
      )}
      <UserTable/>
    </>
  );
};

export default Dashboard;
