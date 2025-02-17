"use client";

// app/page.js
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear local storage to remove the token
    localStorage.removeItem("token");

    // Optionally, redirect the user to the login page after logout
    router.push("/login");
  };

  return (
    <div>
      <h1>Welcome to OTP Auth System</h1>
      <Link href="/signup">Signup</Link> |<Link href="/login">Login</Link>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
