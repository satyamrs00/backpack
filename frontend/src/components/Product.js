import React from 'react'

export default function Product() {
    const myStyle = {
        backgroundColor: 'white'
    }

    return (
        <>
            {/* <div className="container-fluid row border-bottom px-3 py-2" style={{...myStyle}}>
                <div className={`col-${window.screen.width>720?2:3}`}>All Books</div>
                <div className={`col-${window.screen.width>720?2:6}`}>Available Books</div>
                <div className={`col-${window.screen.width>720?8:3} text-end`}>Sort By</div>
            </div> */}
            <div className="container" style={{...myStyle}}>
                
            </div>
        </>
    )
}
