import React, { useContext, useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import ThemeContext from "../context/ThemeContext";
import AuthContext from "../context/AuthContext";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
const Profile = () => {
  const { checkUser, profile } = useContext(AuthContext)
  useEffect(()=>{checkUser()},[])
  
  const [data,setData]=useState()
  useEffect(()=>{
    setData(profile())
  },[])

  const { theme, inputStyle } = useContext(ThemeContext)
  const [myStyle, setMyStyle] = useState({})
  const [inputMyStyle, setInputMyStyle] = useState({})
  useEffect(() => {
    if (theme === 'dark') {
      setMyStyle({ background: '#121212', color: 'rgb(245 245 245)' });
      setInputMyStyle({ background: '#202020', color: "white" })
    }
    else {
      setMyStyle({ background: 'rgb(245 245 245)', color: "black" });
      setInputMyStyle({ background: 'white', color: "black" })
    }
  }, [theme])


  //Modals function
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} style={{ backdropFilter: 'blur(2px)', overflow: 'visible' }}>
        <ModalHeader closeButton style={{ ...inputStyle }}></ModalHeader>
        <Modal.Body style={{ padding: '1.5rem', ...inputStyle }}>
          {data.request_to_me.length === 0 && <p className="fs-5 fst-italic">No request now</p>}
          {data.request_to_me.length > 0 &&
            <div className="d-flex justify-content-end">
              <button className='btn btn-success shadow-sm me-2' onClick={handleClose}>Accept</button>
              <button className='btn btn-danger shadow-sm' onClick={handleClose}>Decline</button>
            </div>
          }
        </Modal.Body>
      </Modal>

      <div style={{ ...myStyle, padding: '2rem 2rem', marginTop: '-1rem' }}>
        <div className="row w-100">
          <div className={`col-md-5 ${window.screen.width > 992 ? 'd-flex justify-content-center' : ''}`}>
            <div style={{ minWidth: "calc(10rem + 10vw)" }}>
              <img src={data.user.profile_pic} alt="" width={110} height={100} />
              <h4 className="mt-4">
                {data.user.first_name}  {data.user.last_name}
              </h4>
              <h6 className="mt-3">{data.user.username}</h6>
              <h6 className="mt-3 mb-4">{data.user.email}</h6>
              <hr />
              <h4 className="mt-4">About</h4>
              <ul className="list p-0">
                <li style={{ ...inputMyStyle }} className="list-group-item fw-bold mt-3">College</li>
                <li style={{ ...inputMyStyle }} className="list-group-item mt-1">{data.user.college}</li>
                <li style={{ ...inputMyStyle }} className="list-group-item fw-bold mt-3">Batch</li>
                <li style={{ ...inputMyStyle }} className="list-group-item mt-1">{data.user.batch}</li>
                <li style={{ ...inputMyStyle }} className="list-group-item  fw-bold mt-3">Address</li>
                <li style={{ ...inputMyStyle }} className="list-group-item mt-1">{data.user.address}</li>
                <li style={{ ...inputMyStyle }} className="list-group-item fw-bold mt-3">Mobile</li>
                <li style={{ ...inputMyStyle }} className="list-group-item mt-1">{data.user.phone}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-7">
            <div className="d-flex justify-content-end">
              <button className="btn position-relative shadow-none" onClick={handleShow} style={{ backgroundColor: "orange", fontWeight: '500', color: '#404040' }} >New Requests {data.request_to_me.length > 0 && <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
              </span>}</button>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        style={{
          paddingTop: "2rem",
          backgroundColor: "black",
          color: "white",
        }}
      >
         <h3 className="pb-4 text-center">User Profile</h3>
      </div> */}
      {/* <div className="bg-light container-fluid py-5" style={{marginTop:'-1rem'}}>
        <div className="row">
          <div className="col-md-3" style={{ paddingLeft: "10rem" }}>
            <img src="https://picsum.photos/100/100" alt="" srcset="" />
            <h4 className="mt-4">
              {data.user.first_name}  {data.user.last_name}
            </h4>
            <h5 className="mt-3">{data.user.username}</h5>
            <h5 className="mt-3">{data.user.email}</h5>
            <hr />
          </div>
          <div className="col-md-9 " style={{ paddingLeft: "10rem" }}>
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
        <div className="row">
          <div className="col-md-3" style={{ paddingLeft: "10rem" }}>
            <h3 className="mt-5">About</h3>
            <ul className="list " style={{ paddingLeft: "0" }}>
              <li style={{...inputMyStyle}} className="list-group-item fw-bold mt-3">College</li>
              <li style={{...inputMyStyle}} className="list-group-item mt-1">{data.user.college}</li>
              <li style={{...inputMyStyle}} className="list-group-item fw-bold mt-3">Batch</li>
              <li style={{...inputMyStyle}} className="list-group-item mt-1">{data.user.batch}</li>
              <li style={{...inputMyStyle}} className="list-group-item  fw-bold mt-3">Address</li>
              <li style={{...inputMyStyle}} className="list-group-item mt-1">{data.user.address}</li>
              <li style={{...inputMyStyle}} className="list-group-item fw-bold mt-3">Mobile</li>
              <li style={{...inputMyStyle}} className="list-group-item mt-1">{data.user.phone}</li>
            </ul>
          </div>
          <div className="col-md-9 mt-4" style={{ paddingLeft: "10rem" }}>
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
      </div> */}
    </>
  );
};

export default Profile;