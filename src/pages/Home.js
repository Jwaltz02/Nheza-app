import React from "react";
import Backdrop from "../assets/homepage-backdrop.webp";
import RegisterButton from "../components/RegisterButton";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <div
        className="homepage-backdrop"
        style={{ backgroundImage: `url(${Backdrop})` }}>
        <div className="backdrop-text">
          <p style={{ paddingTop: "7vw" }}>
            Digital Services Platform for the Diaspora
          </p>
          <h1>Support your loved ones in Africa.</h1>
          <p>
            We enable the diaspora to seamlessly pay for healthcare services
            that their loved ones need in Africa. Your payments will be made
            directly to the healthcare service provider, allowing you to know
            exactly where your money goes. Sign up today to get a free medical
            device!
          </p>
        </div>
        <RegisterButton styleVariant="btn-homepage" path="/Register" />
      </div>
    </>
  );
}

export default Home;
