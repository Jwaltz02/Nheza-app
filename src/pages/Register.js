import React from "react";
import Backdrop from "../assets/register-backdrop.webp";
import "../styles/Register.css";
import RegisterButton from "../components/RegisterButton";

function Register({ registerCards }) {
  return (
    <>
      <div className="backdrop" style={{ backgroundImage: `url(${Backdrop})` }}>
        <div className="register-heading">Register Now</div>
      </div>
      <div className="registration-cards">
        {registerCards.map((x, index) => {
          return (
            <div key={index} className="member">
              <img src={x.imageMember} />
              <h1>{x.headerMember}</h1>
              <p>{x.contentMember}</p>
              <RegisterButton
                styleVariant="btn-member-registration"
                path="/member-registration"
              />
            </div>
          );
        })}

        {registerCards.map((x, index) => {
          return (
            <div key={index} className="partner">
              <img src={x.imagePartner} />
              <h1>{x.headerPartner}</h1>
              <p>{x.contentPartner}</p>
              <RegisterButton
                styleVariant="btn-partner-registration"
                path="/partner-registration"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Register;
