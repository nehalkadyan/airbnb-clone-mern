import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, useParams } from "react-router-dom";
import { logoutSuccess } from "../redux/user/userSlice";
import Accomodations from "../components/Accomodations";

const Account = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const [activeItem, setActiveItem] = useState(1);

  let { subpage } = useParams();
  console.log(subpage);

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!currentUser.username) {
    return <Navigate to={`/login`} />;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(logoutSuccess());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <nav className="flex justify-center gap-8 w-full mt-8">
        <Link
          onClick={() => setActiveItem(1)}
          className={`${
            activeItem == 1 ? "bg-red-700 text-white" : "bg-neutral-200"
          } py-2 px-6 rounded`}
          to={`/account`}
        >
          My Profile
        </Link>
        <Link
          onClick={() => setActiveItem(2)}
          className={`${
            activeItem == 2 ? "bg-red-700 text-white" : "bg-neutral-200"
          } py-2 px-6 rounded`}
          to={`/account/bookings`}
        >
          My bookings
        </Link>
        <Link
          onClick={() => setActiveItem(3)}
          className={`${
            activeItem == 3 ? "bg-red-700 text-white" : "bg-neutral-200"
          } py-2 px-6 rounded`}
          to={`/account/accomodations`}
        >
          My accomodations
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto mt-8">
          Logged in as {currentUser.username} ({currentUser.email})<br />
          <button
            onClick={handleLogout}
            className="max-w-medium text-white rounded-lg mt-4 py-2 px-6 bg-slate-700"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "accomodations" && <Accomodations />}
    </div>
  );
};

export default Account;
