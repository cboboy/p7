import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ({ AllUsers }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch("http://localhost:3000/users/");
      setUser(await response.json());
    }

    fetchUserData();
  }, [AllUsers]);
  if (!user) {
    return <div>t'es dans la merde !!!</div>;
  }
  const userD = user.data;
  console.log("userD", userD);
  return (
    <div>
      {userD.map((userD) => (
        <div className="card">
          <h1>
            <Link to={`/oneuser/${userD.id}`}>{userD.email}</Link>
          </h1>
          <p>{userD.id}</p>
          <p>{userD.password}</p>
        </div>
      ))}
    </div>
  );
}
