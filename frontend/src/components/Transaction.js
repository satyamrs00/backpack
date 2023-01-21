import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import ThemeContext from '../context/ThemeContext'
import ProductContext from '../context/ProductContext'
import '../App.css'
import TransactionItem from './TransactionItem'

export default function Transaction() {
  const { checkUser } = useContext(AuthContext)
  //eslint-disable-next-line
  useEffect(() => { checkUser() })
  const { myStyle, inputStyle, theme } = useContext(ThemeContext)
  const { profileData } = useContext(ProductContext)
  const [filterQuery, setFilterQuery] = useState('')
  const [requestUser, setRequestUser] = useState('request_to_me')

  return (
    <>
      <div className='container' style={{ ...inputStyle, borderRadius: "10px" }}>
        <div className="row">
          <div className={`${window.screen.width > 990 ? 'col-lg-3 d-flex align-items-center' : 'd-none'} text-${theme==='light'?'dark':'light'}`}><span style={{ fontSize: '1.5rem', padding: '0 1rem', paddingBottom: '.1rem',fontFamily:"cursive",fontStyle:"italic" }}>{requestUser === 'request_to_me' ? 'Requests to me' : 'My requests'}</span></div>
          <div className='col-lg-6 d-flex justify-content-center py-2'>
            <button className='transactionNavbarBtn px-4' onClick={() => { setFilterQuery('') }} style={{ border: `${filterQuery === '' ? '3px inset' : '3px outset'}` }}>All</button>
            <button className='transactionNavbarBtn' onClick={() => { setFilterQuery('accepted') }} style={{ border: `${filterQuery === 'accepted' ? '3px inset' : '3px outset'}` }}>Accepted</button>
            <button className='transactionNavbarBtn' onClick={() => { setFilterQuery('rejected') }} style={{ border: `${filterQuery === 'rejected' ? '3px inset' : '3px outset'}` }}>Rejected</button>
            {requestUser==='my_request' && <button className='transactionNavbarBtn' onClick={() => { setFilterQuery('pending') }} style={{ border: `${filterQuery === 'pending' ? '3px inset' : '3px outset'}` }}>Pending</button>}
          </div>
          <div className='col-lg-3 d-flex justify-content-center my-3'>
            <select name="" id="college" style={{ padding: ".4rem .8rem", border: '1px solid black', borderRadius: "5px" }} onChange={(e) => { setRequestUser(e.target.value) }}>
              <option value="request_to_me">Requests to me</option>
              <option value="my_request">My requests</option>
            </select>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div style={{ width: 'calc(10rem + 35vw)' }}>
          {(requestUser === 'request_to_me') && ((profileData.request_to_me) ? profileData.request_to_me : []).map((ele, index) => {
            if ((ele.status === filterQuery || filterQuery === '') && ele.status !== 'pending') {
              return <div key={index} className={`row my-2 p-2 text-${theme === 'light' ? 'dark' : 'light'}`} style={{ ...inputStyle, borderRadius: "10px" }}>
                <TransactionItem ele={ele} />
              </div>
            }
          })}
          {(requestUser === 'my_request') && ((profileData.my_request) ? profileData.my_request : []).map((ele, index) => {
            if ((ele.status === filterQuery || filterQuery === '')) {
              return <div key={index} className={`row my-2 p-2 text-${theme === 'light' ? 'dark' : 'light'}`} style={{ ...inputStyle, borderRadius: "10px" }}>
                <TransactionItem ele={ele} />
              </div>
            }
          })}
        </div>
      </div>
    </>
  )
}
