import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import ThemeContext from '../context/ThemeContext'
import ProductContext from '../context/ProductContext'
import '../App.css'
export default function Transaction() {
  const { checkUser } = useContext(AuthContext)
  //eslint-disable-next-line
  useEffect(() => { checkUser() })
  const { myStyle, inputStyle ,theme} = useContext(ThemeContext)
  const { profileData } = useContext(ProductContext)
  const [filterQuery, setFilterQuery] = useState('')

  return (
    <>
      <div className="container position-relative">
        <div className='d-flex bg-light justify-content-center py-2' style={{ borderRadius: "10px" }}>
          <button className='transactionNavbarBtn px-4' onClick={()=>{setFilterQuery('')}} style={{borderBottom:`${filterQuery===''?'3px solid rgb(11 56 182)':'3px solid transparent'}`}}>All</button>
          <button className='transactionNavbarBtn' onClick={()=>{setFilterQuery('accepted')}} style={{borderBottom:`${filterQuery==='accepted'?'3px solid rgb(11 56 182)':'3px solid transparent'}`}}>Accepted</button>
          <button className='transactionNavbarBtn' onClick={()=>{setFilterQuery('rejected')}} style={{borderBottom:`${filterQuery==='rejected'?'3px solid rgb(11 56 182)':'3px solid transparent'}`}}>Rejected</button>
        </div>
        <div className="position-absolute" style={{right:"1rem"}}>
          
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div style={{ width: 'calc(10rem + 35vw)' }}>
          {((profileData.request_to_me) ? profileData.request_to_me : []).map((ele, index) => {
            if ((ele.status === filterQuery || filterQuery === '') && ele.status!=='pending') {
              return <div key={index} className={`row my-2 p-2 text-${theme==='light'?'dark':'light'}`} style={{ ...inputStyle, borderRadius: "10px" }}>
                <div className={`col-${window.screen.width>990?3:6}`}>
                  <img src={ele.product.photo1} alt="" width={130} height={125} style={{marginBottom:'1rem'}}/>
                </div>
                <div className={`col-${window.screen.width>990?4:6}`}>
                  <h5>{ele.product.name}</h5>
                  <h6 className='mb-3'>Status : <span className={`text-${ele.status==='rejected'?'danger':'success'}`}>{ele.status}</span></h6>
                </div>
                <div className='col-lg-5'>
                  <h6>Requesting User Details</h6>
                  <p className="p-0 m-0">Name : {ele.fromOwner.first_name} {ele.fromOwner.last_name}</p>
                  <p className="p-0 m-0">Username: {ele.fromOwner.username}</p>
                  <p className="p-0 m-0">Batch : {ele.fromOwner.batch}</p>
                  <p className="p-0 m-0">Email : {ele.fromOwner.email}</p>
                  <p className="p-0 m-0">Address : {ele.fromOwner.address}</p>
                </div>
              </div>
            }
          })}
        </div>
      </div>
    </>
  )
}
