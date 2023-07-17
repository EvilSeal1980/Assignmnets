import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Appbar";
import CreateCourse from "./components/CreateCourse";
import Register from "./components/Register";
import ShowCourses from "./components/ShowCourses";
import AppBar from "./components/AppBar";
import { CssBaseline } from "@mui/material";
import Image from "./assets/image.jpg";

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
  return (
    <>
      <CssBaseline />
      <AppBar />
      <div style={{
        backgroundColor: "#6133B4",
        height: "100vh",
        width: "100%",
      }}>
        <Router>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<CreateCourse />} />
            <Route path="/courses" element={<ShowCourses />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
