import React from "react";
import { FaWifi } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { MdRadio } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";

const Perks = () => {
  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="wifi" />
        <div>
          <FaWifi />
        </div>
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="parking" />
        <div>
          <FaCarSide />
        </div>
        <span>Free Parking</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="tv" />
        <div>
          <MdMonitor />
        </div>
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="radio" />
        <div>
          <MdRadio />
        </div>
        <span>Radio</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="pets" />
        <div>
          <MdOutlinePets />
        </div>
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="private" />
        <div>
          <RiGitRepositoryPrivateLine />
        </div>
        <span>Private Entrance</span>
      </label>
    </>
  );
};

export default Perks;
