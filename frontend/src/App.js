import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";

//create a function called App
//this function will return the routes of the app. because we want to use the routes in the index.js file

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/home" element={<Home />} exact />
      </Routes>
    </div>
  );
}

//export the App function
export default App;
