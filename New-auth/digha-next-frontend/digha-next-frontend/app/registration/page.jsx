"use client"
import Input from "../components/Input";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { register } from "../API_FILE/auth";

const defaultData = {
    fname: "",
    lname: "",
    email: "",
    phone_no: "",
    devotee_type: "indian"
};

const Registration = () => {
    const [data, setData] = useState(defaultData);

    const router = useRouter();
    
    const onValueChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({ 
            ...data, 
            [name]: type === "checkbox" ? (checked ? "non-indian" : "indian") : value
        });
    }

    const onRegister = async (e) => {
        e.preventDefault();

        if (!data.fname || !data.lname || !data.email || !data.phone_no || !data.devotee_type) {
            alert("Please fill all mandatory parameters");
            return;
        }
        
        try {
            const response = await register(data);
            console.log(response, "response");
           // setData(defaultData);
            
            if (response?.status === 201) {
                router.push(`/otp?email=${encodeURIComponent(data.email)}`);
            }
        } catch (error) {
            alert(error?.response?.data?.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div  className="bg-white shadow-md rounded px-16 pt-8 pb-12 mb-4">
                <h1 className="text-3xl mb-4 text-center">Register</h1>
                <form className="space-y-4">
                    <Input 
                        label="First Name"
                        id="fname"
                        type="text"
                        value={data.fname}
                        onChange={onValueChange}
                    />
                    <Input 
                        label="Last Name"
                        id="lname"
                        type="text"
                        value={data.lname}
                        onChange={onValueChange}
                    />  
                    <Input 
                        label="Email"
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={onValueChange}
                    />
                    <Input 
                        label="Phone Number"
                        id="phone_no"
                        type="text"
                        value={data.phone_no}
                        onChange={onValueChange}
                    />
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            id="devotee_type" 
                            name="devotee_type" 
                            checked={data.devotee_type === "non-indian"}
                            onChange={onValueChange} 
                        />
                        <label htmlFor="devotee_type" className="ml-2">Foreign Devotee</label>
                    </div>
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                        onClick={(e) => onRegister(e)}    
                    >
                        Submit
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Registration;
