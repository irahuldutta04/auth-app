"use client";

import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      alert("OTP sent to your email");
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );
      localStorage.setItem("token", data.token);
      alert("Login successful");
      router.push("/profile");
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      {step === 1 ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}
