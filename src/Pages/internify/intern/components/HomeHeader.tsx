import { useState, useEffect } from "react";
import api from "../../../../lib/api";

const HomeHeader = () => {
  const [name, setName] = useState("");

  useEffect(() => {
  api.get("/auth-api/me")
    .then((res) => {
      setName(res.data.data.full_name || res.data.data.nama_depan);
    })
    .catch((err) => {
      console.error("Failed to fetch user:", err);
    });
}, []);

  return (
    <div>
      <div className="flex items-start px-0 mb-5">
        <h1 className="page-title">Hi, {name || "..."}!</h1>
      </div>
    </div>
  );
};

export default HomeHeader;