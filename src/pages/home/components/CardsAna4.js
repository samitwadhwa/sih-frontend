
import React, { Component, useState } from 'react'

import '../../styles/style.css'
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';


export default function AddTask({ title, title1, description1 = "", description = "" }) {

  const myCards = {
    height: '100%',
    width: "100%",
    borderRadius: "14px",
    display: 'flex',
  }
  const label = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    fontSize: '1rem',
  }
  const Values = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '700',
    fontSize: "24px",
    lineHeight: '1',
  }

  const myBody = {
    boxShadow: "0px 4px 12px rgb(0 0 0 / 10%)",
    borderRadius: "10px",
    display: 'flex',
    height: '100%',
    textAlign: 'center',
    justifyContent: 'space-between',
    fontColor: 'rgba(0, 0, 0, 1)'

  }
  const cardContentContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '50%'
  }
  const divider = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%) rotate(90deg)'
  }
  return (
    <div>

      <div className="card my-3" style={myCards}>

        <div style={myBody} className="card-body">
          <div style={cardContentContainer}>
            <h4 style={{ ...label, color: 'green' }} className="card-title">{title1}</h4>
            <div style={{ ...Values }} className="card-text">{description1.length > 12 ? description1.slice(0, 12) + "..." : description1}</div>

          </div>
          <div style={divider}>
            <Divider style={{ backgroundColor: "black", width: '65px' }} flexItem />
          </div>
          <div style={cardContentContainer}>
            <h4 style={{ ...label, color: 'red' }} className="card-title">{title}</h4>
            <div style={{ ...Values }} className="card-text">{description.length > 12 ? description.slice(0, 12) + "..." : description}</div>
          </div>



          {/* {console.log(description.slice(0,12))} */}
        </div>
      </div>

    </div>
  )
}



