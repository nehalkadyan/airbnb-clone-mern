import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className="flex  justify-between md:justify-around border-b border-neutral-200 items-center w-full h-[90px]">
      <div className="flex items-center gap-8">
        <div>
          <img
            className="w-32 lg:w-40"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGF9uptZMemMSNtpIUdbERmYA15tY-ia6Dfg&usqp=CAU"
            alt="logo"
          />
        </div>

        <div className="hidden md:flex items-center p-4 rounded-3xl border border-neutral-200 gap-4">
          <div className="border-r pr-4 border-e-neutral-300">Anywhere</div>
          <div className="border-r pr-4 border-neutral-300">Any week</div>
          <div className="flex items-center gap-4 ">
            <div>Add guests</div>
            <div className="p-2 bg-yellow-400 cursor-pointer rounded-full text-white">
              <IoSearchSharp className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div>
          <FaGlobeAmericas className="text-2xl cursor-pointer" />
        </div>

        <div className="border rounded-2xl py-2 px-3 flex items-center gap-4">
          <div>
            <GiHamburgerMenu className="text-2xl cursor-pointer" />
          </div>
          <div className="p-2 rounded-full bg-slate-800">
            <Link to={currentUser?.username ? "/account" : "/login"}>
              <FaUser className="text-2xl text-white cursor-pointer" />
            </Link>
          </div>
          {!!currentUser && <div>{currentUser.username}</div>}
        </div>
      </div>
    </nav>
  );
};

export default Header;
