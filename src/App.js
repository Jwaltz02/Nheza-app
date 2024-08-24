import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cancel from "./pages/CancelPage";
import Success from "./pages/SuccessPage";
import PartnerPic from "./assets/partner-pic.jpeg";
import MemberPic from "./assets/member-pic.webp";
import MemberRegistration from "./pages/MemberRegistration";
import PartnerRegistration from "./pages/PartnerRegistration";
import FirstAidKit from "./assets/FirstAidKit.jpeg";
import GlucoseMonitor from "./assets/GlucoseMonitor.jpeg";
import FitnessTracker from "./assets/FitnessTracker.jpeg";
import GiftPack from "./assets/GiftPack.jpeg";

function App() {
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const registerCards = [
    {
      imagePartner: MemberPic,
      headerPartner: "Partner Registration",
      contentPartner:
        "Join our growing network of service providers that are helping the diaspora keep their loved ones happy and healthy back home in Africa.",
      imageMember: PartnerPic,
      headerMember: "Member Registration",
      contentMember:
        "Sign up to get access to our wide network of service providers that will help your loved ones back home in Africa for only $199 USD per year.",
    },
  ];

  const medicalDevice = [
    { image: FirstAidKit, content: "First Aid Kit" },
    { image: GlucoseMonitor, content: "Blood Glucose Monitor" },
    { image: FitnessTracker, content: "Digital Fitness Tracker" },
    { image: GiftPack, content: "Medical Gift Pack" },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home />}></Route>
          <Route
            path="/Register"
            element={<Register registerCards={registerCards} />}></Route>
          <Route
            path="/member-registration"
            element={
              <MemberRegistration medicalDevice={medicalDevice} />
            }></Route>
          <Route
            path="/partner-registration"
            element={<PartnerRegistration />}></Route>
          <Route path="/cancel" element={<Cancel />}></Route>
          <Route path="/success" element={<Success />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
