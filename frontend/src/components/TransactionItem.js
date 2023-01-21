import React, { useEffect, useState } from 'react'

export default function TransactionItem(props) {
    const ele=props.ele
    const [myColor,setMyColor]=useState({color:"black"})
    useEffect(()=>{
        if(ele.status==='accepted'){
            setMyColor({color:"#009900"})
        }
        else if(ele.status==='pending'){
            setMyColor({color:'rgb(206 206 5);'})
        }
        else{
            setMyColor({color:'red'})
        }
    },[])
    return (
        <>
            <div className={`col-${window.screen.width > 990 ? 3 : 6}`}>
                <img src={ele.product.photo1} alt="" width={130} height={125} style={{ marginBottom: '1rem' }} />
            </div>
            <div className={`col-${window.screen.width > 990 ? 4 : 6}`}>
                <h5>{ele.product.name}</h5>
                <h6 className='mb-3'>Status : <span style={{...myColor}}>{ele.status}</span></h6>
            </div>
            <div className='col-lg-5'>
                <h6>Requesting User Details</h6>
                <p className="p-0 m-0">Name : {ele.fromOwner.first_name} {ele.fromOwner.last_name}</p>
                <p className="p-0 m-0">Username: {ele.fromOwner.username}</p>
                <p className="p-0 m-0">Batch : {ele.fromOwner.batch}</p>
                <p className="p-0 m-0">Email : {ele.fromOwner.email}</p>
                <p className="p-0 m-0">Address : {ele.fromOwner.address}</p>
            </div>
        </>
    )
}
