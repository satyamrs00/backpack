import React from "react";
import Navbar from "./Navbar";
import data from "../data_json/data.json"
import maths from "../components/images/bookbg.jpg";
const Profile = () => {
  return (
    <div>
      <div
        style={{
          paddingTop: "2rem",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <h3 className="pb-4 text-center">User Profile</h3>
      </div>
      <div className="bg-light container-fluid py-5">
        <div class="row">
          <div class="col-md-3" style={{ paddingLeft: "10rem" }}>
            <img src="https://picsum.photos/100/100" alt="" srcset="" />
            <h4 className="mt-4">
               {data.user.first_name}  {data.user.last_name}
            </h4>
            <h5 className="mt-3">{data.user.username}</h5>
            <h5 className="mt-3">{data.user.email}</h5>
            <hr />
          </div>
          <div class="col-md-9 " style={{ paddingLeft: "10rem" }}>
            <div className="py-5" style={{ boxShadow: "0 0 10px grey" }}>
              <h3 className="mb-5 ms-4">Books Given</h3>
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3" style={{ paddingLeft: "10rem" }}>
            <h3 className="mt-5">About</h3>
            <ul class="list " style={{ paddingLeft: "0" }}>
              <li class="list-group-item fw-bold mt-3">College</li>
              <li class="list-group-item mt-1">{data.user.college}</li>
              <li class="list-group-item fw-bold mt-3">Batch</li>
              <li class="list-group-item mt-1">{data.user.batch}</li>
              <li class="list-group-item  fw-bold mt-3">Address</li>
              <li class="list-group-item mt-1">{data.user.address}</li>
              <li class="list-group-item fw-bold mt-3">Mobile</li>
              <li class="list-group-item mt-1">{data.user.phone}</li>
            </ul>
          </div>
          <div class="col-md-9 mt-4" style={{ paddingLeft: "10rem" }}>
            <div className="py-5" style={{ boxShadow: "0 0 10px grey" }}>
              <h3 className="mb-5 ms-4">Books Taken</h3>
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
              <img
                src={maths}
                alt=""
                style={{ width: "calc(4.5rem + 2vw)", marginLeft: "2rem" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;