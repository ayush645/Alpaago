import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Typography,
  CircularProgress,
  Card,
  CardContent,
  TextField,
  Grid,
} from "@mui/material";

import "../assets/Css/userTable.css";
import { createUser, getAllUsers, deleteUser, updateTask } from "../firebase";

const UserTable = () => {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("active");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For the filter
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    let filteredList = users;

    // Apply sorting
    if (sortBy) {
      filteredList.sort((a, b) => {
        const comparison = a[sortBy].localeCompare(b[sortBy]);
        return sortOrder === "asc" ? comparison : -comparison;
      });
    }

    setFilteredUsers(filteredList);
  }, [users, sortBy, sortOrder]);

  const handleSort = (column, selectedSortOrder) => {
    if (sortBy === column) {
      // If switching between "Asc" and "Desc"
      setSortOrder((prevSortOrder) => {
        if (selectedSortOrder === "all") {
          // If switching to "All" from "Asc" or "Desc"
          setSortBy(null); // Reset the sorting column
        }
        return selectedSortOrder;
      });
    } else {
      // If switching between columns
      setSortBy(column);
      setSortOrder(selectedSortOrder);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        setUsers(users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError(error);
        setLoading(false);
      });
  }, [users]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toLocaleDateString();
    createUser(username, currentDate, status);
    setUsername("");
    setStatus("active");
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await updateTask(userId, { status: newStatus });

      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        className="heading1"
        style={{ marginTop: "60px" }}
      >
        Table
      </Typography>
      <Card style={{ background: "#1f293b", border: "white 2px solid" }}>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <label style={{ color: "white", fontFamily: "Poppins" }}>
              Username:
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                style={{
                  outline: "none",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "none",
                  fontFamily: "Poppins",
                }}
              />
            </label>
            <br />
            <label style={{ color: "white", fontFamily: "Poppins" }}>
              Status:
              <select
                value={status}
                onChange={handleStatusChange}
                style={{
                  padding: "5px",
                  fontFamily: "Poppins",
                  borderRadius: "5px",
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <br />
            <button
              className="submit"
              type="submit"
              style={{ padding: "10px", borderRadius: "5px", border: "none" }}
            >
              Submit
            </button>
          </form>
        </CardContent>
      </Card>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="success" />
        </div>
      ) : (
        "Good"
      )}
      <TableContainer
        component={Paper}
        style={{ background: "#1f293b", border: "white 1px solid" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white", fontSize: "20px" }}>
                UserName
              </TableCell>
              <TableCell
                style={{ color: "white", fontSize: "20px" }}
                align="right"
              >
                Added Date
              </TableCell>
              <TableCell
                style={{ color: "white", fontSize: "20px" }}
                align="right"
              >
                Status
              </TableCell>
              <TableCell
                style={{ color: "white", fontSize: "20px" }}
                align="right"
              >
                Actions
              </TableCell>
              <TableCell
                style={{ color: "white", fontSize: "20px" }}
                align="right"
              ></TableCell>

              <TableCell style={{ color: "white", fontSize: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <span>Filter</span>
                  <select
                    value={sortBy === "userName" ? sortOrder : "sort"} // Set default to "sort"
                    onChange={(e) => handleSort("userName", e.target.value)}
                    style={{
                      marginLeft: "5px",
                      padding: "3px",
                      fontFamily: "Poppins",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="sort">All</option>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                  </select>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="user"
                  style={{ color: "white" }}
                >
                  {user.userName}
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}>
                  {user.currentDate}
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}>
                  {user.status}
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="delete"
                        style={{
                          padding: "5px",
                          borderRadius: "5px",
                          border: "none",

                          cursor: "pointer",
                          background: "red",
                          color: "white",
                        }}
                      >
                        Delete
                      </button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <button
                        style={{
                          padding: "5px",
                          borderRadius: "5px",
                          border: "none",
                        }}
                        onClick={() =>
                          handleToggleUserStatus(user.id, user.status)
                        }
                      >
                        {user.status === "active" ? "Inactive" : "Active"}
                      </button>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}></TableCell>
                <TableCell align="right" style={{ color: "white" }}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default UserTable;
