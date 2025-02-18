'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Note: use `next/navigation` for Next.js App Router

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });  // Don't automatically redirect after sign out
    router.push('/login');  // Manually redirect to the login page
  };

  return (
    <div>
      <h1>Welcome to the protected Dashboard page!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
