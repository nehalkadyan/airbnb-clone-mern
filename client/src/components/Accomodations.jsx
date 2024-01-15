import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import Perks from "./Perks";
import axios from "axios";

const Accomodations = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post(
      "http://localhost:4000/api/upload-by-link",
      {
        link: photoLink,
      }
    );
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhoto = (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("http://localhost:4000/api/upload-from-device", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  const addNewPlace = async (ev) => {
    ev.preventDefault();
    const accomodationData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    await axios.post(
      "http://localhost:4000/api/accomodation/places",
      accomodationData
    );
    setRedirect(true);
  };

  if (redirect && action !== "new") {
    return <Navigate to={"/account/accomodation"} />;
  }

  console.log("photo link", photoLink);
  console.log("addedPhotos", addedPhotos);

  return (
    <div>
      {action !== "new" && (
        <div className="text-center mt-8">
          <Link
            className="flex mx-auto items-center gap-4 p-4 bg-red-700 md:w-1/3 lg:w-1/6 rounded-full"
            to={`/account/accomodations/new`}
          >
            <div className="text-white">
              <FaPlus />
            </div>
            <div className="text-white">Add new accomodation</div>
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">title for your place</p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
            />
            <h2 className="text-2xl mt-4">Address</h2>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Address"
            />
            <h2 className="text-2xl mt-4">Photos</h2>
            <div className="flex ">
              <input
                type="text"
                placeholder="Add using a Link"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button
                onClick={addPhotoByLink}
                className="p-3 rounded bg-red-700 text-white"
              >
                Add photo
              </button>
            </div>
            <div className="border mt-4 flex items-center gap-2 w-1/4 bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
              <input type="file" multiple className="" onChange={uploadPhoto} />
              <div>
                <IoMdCloudUpload />
              </div>
              <button className="">Upload</button>
            </div>

            {addedPhotos.map((link, id) => (
              <div key={id}>
                <img
                  className="rounded-2xl"
                  src={"http://localhost:4000/uploads/" + link}
                />
              </div>
            ))}

            <h1 className="text-2xl mt-4">Description</h1>
            <p className="text-gray-500 text-sm">description of the place</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <h1 className="text-2xl mt-4">Perks</h1>
            <p className="text-gray-500 text-sm">
              select all the perks of your accomodation
            </p>
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            <h1 className="text-2xl mt-4">Extra Info</h1>
            <p className="text-gray-500 text-sm">houses rules, etc</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            <h1>Check in and out times</h1>
            <p>add check in and out times</p>
            <div className="grid gap-2 grid-cols-2  md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="text"
                  placeholder="14"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  type="text"
                  placeholder="11"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <button className="my-4 ">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Accomodations;
