import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./admin/AdminPage";
import ReportPage from "./admin/ReportPage";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import "./index.css";
import Services from "./screens";
import About from "./screens/AboutScreen/About";
import HomePage from "./screens/HomePage/HomePage";
import LandingPage from "./screens/Landingpage/LandingPage";
import Login from "./screens/LoginScreen/Login";
import MyReports from "./screens/MyReports/MyReports";
import PdfReport from "./screens/MyReports/PdfReport";
import NotFound from "./screens/NotFound/NotFound";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import Register from "./screens/RegisterScreen/Register";
import ReportCards from "./screens/ReportCards/ReportCards";
import UpdateReport from "./screens/UpdateReport/UpdateReport";
const App = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="App">
        <Router>
          <Header setSearch={setSearch} />
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/myreports" element={<MyReports search={search} />} />
            <Route path="/cards" element={<ReportCards />} />
            <Route path="/pdf/:id" element={<PdfReport />} />
            <Route
              path="/reports/:id"
              element={<UpdateReport search={search} />}
            />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
};

export default App;
