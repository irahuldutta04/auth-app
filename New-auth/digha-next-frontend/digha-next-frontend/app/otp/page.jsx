"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { verifyOTP } from "../API_FILE/auth";
import { useRouter } from "next/navigation";

const OTPComponent = () => {
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      let payload = {
        otp: otp,
        email: email,
      };
      try {
        const response = await verifyOTP(payload);
        console.log(response, "response");
        if (response.status === 200) {
          alert("OTP verified");
        //  router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
      }
    } else {
      alert("Please enter a valid 4-digit OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded px-16 pt-8 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Enter OTP</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <OTPInput
            value={otp}
            onChange={handleChange}
            numInputs={6}
            isInputNum
            shouldAutoFocus
            inputStyle={{
              width: "3rem",
              height: "3rem",
              margin: "0 0.5rem",
              fontSize: "2rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              textAlign: "center",
            }}
            containerStyle="flex justify-center"
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPComponent;
