"use client";

// app/profile/page.js

export default function Profile() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   axios
  //     .get("http://localhost:5000/api/auth/profile", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => setUser(res.data))
  //     .catch(() => {
  //       localStorage.removeItem("token");
  //       window.location.href = "/login";
  //     });
  // }, []);

  return (
    <div>
      <h1>Profile</h1>
      {/* {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : "Loading..."} */}
    </div>
  );
}
