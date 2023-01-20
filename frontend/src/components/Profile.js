import React, { useContext, useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import ThemeContext from "../context/ThemeContext";
import AuthContext from "../context/AuthContext";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import ProductContext from "../context/ProductContext";
import useAxios from "../utils/useAxios";
import { baseurl } from "../baseurl";
import Loading from "./Loading";
const Profile = () => {
  const { checkUser, loading, setLoading } = useContext(AuthContext)
  // eslint-disable-next-line
  useEffect(() => { checkUser() }, [])
  const api = useAxios()
  const { profileData, profile } = useContext(ProductContext)
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

  const formData = new FormData()
  const handleAcceptReject = async (id, status) => {
    setPendingRequestsToMe(pendingRequestsToMe - 1)
    let url = baseurl + 'api/accept-or-reject-request/'
    formData.append('transaction', id)
    formData.append('status', status)
    setLoading(true)
    await api.put(url, formData)
    profile()
  }

  const [pendingRequestsToMe, setPendingRequestsToMe] = useState(0)
  useEffect(() => {
    ((profileData.request_to_me) ? profileData.request_to_me : []).map((ele, index) => {
      if (ele.status === 'pending') { setPendingRequestsToMe(pendingRequestsToMe + 1) }
    })
  }, [profileData])

  //Modals function
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} style={{ backdropFilter: 'blur(2px)', overflow: 'visible' }}>
        <ModalHeader closeButton style={{ ...myStyle }}><h3>All requests for your books</h3></ModalHeader>
        <Modal.Body style={{ padding: '1.5rem', ...myStyle }}>
          {pendingRequestsToMe === 0 && <p className="fs-5 fst-italic">No request now</p>}
          {
            ((profileData.request_to_me) ? profileData.request_to_me : []).map((ele, index) => {
              if (ele.status === 'pending') {
                return <div key={index} className="border border-light py-2 px-3 rounded mb-4" style={{ background: 'lightgrey' }}>
                  <h5>A new request for your "{ele.product.name}" book</h5>
                  <h6>Requesting User Details</h6>
                  <p className="p-0 m-0">Name : {ele.fromOwner.first_name} {ele.fromOwner.last_name}</p>
                  <p className="p-0 m-0">Username: {ele.fromOwner.username}</p>
                  <p className="p-0 m-0">Batch : {ele.fromOwner.batch}</p>
                  <p className="p-0 m-0">Email : {ele.fromOwner.email}</p>
                  <p className="p-0 m-0">Address : {ele.fromOwner.address}</p>
                  <div className="d-flex justify-content-end">
                    <button className='btn btn-success shadow-sm me-2' onClick={() => { handleClose(); handleAcceptReject(ele.id, 'accepted'); }}>Accept</button>
                    <button className='btn btn-danger shadow-sm' onClick={() => { handleClose(); handleAcceptReject(ele.id, 'rejected'); }}>Decline</button>
                  </div>
                </div>
              }
            })
          }
        </Modal.Body>
      </Modal>

      {(loading || Object.keys(profileData).length === 0) && <Loading />}
      {(!loading && Object.keys(profileData).length !== 0) &&
        <div style={{ ...myStyle, padding: '2rem 2rem', marginTop: '-1rem' }}>
          <div className="row w-100">
            <div className={`col-md-4 ${window.screen.width > 992 ? 'd-flex justify-content-center' : ''}`}>
              <div style={{ minWidth: "calc(10rem + 10vw)" }}>
                <img src={profileData.user ? profileData.user.profile_pic : ''} alt="" width={120} height={110} />
                <h4 className="mt-4">
                  {profileData.user ? profileData.user.first_name : ''}  {profileData.user ? profileData.user.last_name : ''}
                </h4>
                <h6 className="mt-3">{profileData.user ? profileData.user.username : ''}</h6>
                <h6 className="mt-3 mb-4">{profileData.user ? profileData.user.email : ''}</h6>
                <hr />
                <h4 className="mt-4">About</h4>
                <ul className="list p-0">
                  <li style={{ ...inputMyStyle }} className="list-group-item fw-bold mt-3">College</li>
                  <li style={{ ...inputMyStyle }} className="list-group-item mt-1">{profileData.user ? profileData.user.college : ''}</li>
                  <li style={{ ...inputMyStyle }} className="list-group-item fw-bold mt-3">Batch</li>
                  <li style={{ ...inputMyStyle }} className="list-group-item mt-1">{profileData.user ? profileData.user.batch : ''}</li>
                  <li style={{ ...inputMyStyle }} className="list-group-item  fw-bold mt-3">Address</li>
                  <li style={{ ...inputMyStyle }} className="list-group-item mt-1">{profileData.user ? profileData.user.address : ''}</li>
                  <li style={{ ...inputMyStyle }} className="list-group-item fw-bold mt-3">Mobile</li>
                  <li style={{ ...inputMyStyle }} className="list-group-item mt-1">{profileData.user ? profileData.user.phone : ''}</li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div>
                <button className="btn shadow-none" onClick={handleShow} style={{ position: "fixed", bottom: 'calc(3rem + 1vw)', right: 'calc(1rem + 1vw)', backgroundColor: "orange", fontWeight: '500', color: '#404040' }} >New Requests {<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {pendingRequestsToMe}
                  <span className="visually-hidden">unread messages</span>
                </span>}</button>

                <div className="mt-3">
                  <h2>Your Books</h2>
                  <div className="row p-3 mx-1" style={{ ...inputMyStyle }}>
                    {console.log(profileData)}
                    {profileData.product.map((ele, index) => {
                      return <div className="col-md-3 my-3 d-flex justify-content-center" key={index}>
                        <div style={{ borderRadius: "5px",boxShadow:"0 0 8px grey",...myStyle }}>
                          <img src={ele.photo1} alt="" style={{width:'calc(15rem - 3vw)',height:'calc(14rem - 3vw)'}}/>
                          <h5 className="text-center py-1">{ele.name}</h5>
                        </div>
                      </div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

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
              {profileData.user?profileData.user.first_name}  {profileData.user?profileData.user.last_name}
            </h4>
            <h5 className="mt-3">{profileData.user?profileData.user.username}</h5>
            <h5 className="mt-3">{profileData.user?profileData.user.email}</h5>
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
              <li style={{...inputMyStyle}} className="list-group-item mt-1">{profileData.user?profileData.user.college}</li>
              <li style={{...inputMyStyle}} className="list-group-item fw-bold mt-3">Batch</li>
              <li style={{...inputMyStyle}} className="list-group-item mt-1">{profileData.user?profileData.user.batch}</li>
              <li style={{...inputMyStyle}} className="list-group-item  fw-bold mt-3">Address</li>
              <li style={{...inputMyStyle}} className="list-group-item mt-1">{profileData.user?profileData.user.address}</li>
              <li style={{...inputMyStyle}} className="list-group-item fw-bold mt-3">Mobile</li>
              <li style={{...inputMyStyle}} className="list-group-item mt-1">{profileData.user?profileData.user.phone}</li>
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