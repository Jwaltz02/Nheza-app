import React, { useState } from "react";
import MemberBackdrop from "../assets/member-backdrop.avif";
import "../styles/MemberRegistration.css";
import { CiCircleRemove } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

function MemberRegistration({ medicalDevice }) {
  const [selection, updateSelection] = useState("");

  const makePayment = async () => {
    const response = await fetch(`/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        items: [{ id: 1, quantity: 1 }],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  const showDate = new Date();
  const displaytodaysdate =
    showDate.getDate() +
    "/" +
    (showDate.getMonth() + 1) +
    "/" +
    showDate.getFullYear();

  const formInitialDetails = {
    device: "",
    date: `${displaytodaysdate}`,
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Checkout");
  const [selectionImage, updateSelectionImage] = useState("");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Checkout...");
    makePayment();
    let response = await fetch("/getInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formDetails),
    });
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${MemberBackdrop})`,
        }}
        className="MemberBackdrop">
        <h1 className="backdrop-title">Member Registration</h1>
      </div>
      <div className="left-and-right">
        <div className="left-side-page">
          <h1>
            By becoming a Nheza member, you will get one of these medical
            devices free of charge:
          </h1>
          <p className="display-selection">
            {selection === "" ? (
              <span style={{ color: "red" }}>* Please make a selection</span>
            ) : (
              <i>{selection} selected</i>
            )}
          </p>
          <div className="medical-device-list">
            {medicalDevice.map((x, index) => {
              return (
                <div key={index} className="devices">
                  <div className="content">
                    <img src={x.image} />
                    <button
                      onClick={() => {
                        onFormUpdate("device", x.content);
                        updateSelection(x.content);
                        updateSelectionImage(x.image);
                      }}>
                      {x.content}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="checkout-container">
          <div className="row">
            {selection === "" ? (
              <span style={{ color: "red" }} className="mb-[35px]">
                <h1 className="mt-[-20px] checkout-title">Checkout Now</h1>
                *Please make a device selection
                <button className="button">{buttonText}</button>
              </span>
            ) : (
              <div className="flex-column">
                <h1 className="mt-[-10px] checkout-title">Checkout Now</h1>
                <img src={selectionImage} className="selection-image" />
                <div className="flex">
                  <CiCircleRemove
                    className="text-lg cursor-pointer hover:fill-red-500 mr-1 text-[25px] sticky"
                    onClick={() => updateSelection("")}
                  />
                  <p className="text-sm device-selection">
                    Device selected: <i>{selection}</i>
                  </p>
                </div>
              </div>
            )}
          </div>
          {selection === "" ? null : (
            <button onClick={handleSubmit}>{buttonText}</button>
          )}
          {status.message && (
            <div className="row">
              <p className={status.success === false ? "danger" : "success"}>
                {status.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MemberRegistration;
