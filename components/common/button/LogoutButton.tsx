"use client";

import { deleteCookie, getCookie } from "cookies-next";

export default function LogoutButton() {
  const token = getCookie("token");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    deleteCookie("token");
    window.location.href = "/";
  };

  return (
    !!token && (
      <form onSubmit={handleSubmit}>
        <button className="text-white bg-red-600/70 hover:text-white hover:bg-red-600 transition-colors duration-300 py-2 px-3 rounded-md">
          Logout
        </button>
      </form>
    )
  );
}
