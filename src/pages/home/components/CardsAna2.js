// import { positions } from '@mui/system';
// import { border } from '@mui/system';
import React, { Component, useState } from 'react';
// import PropTypes from 'prop-types'
import '../../styles/style.css';
import { useNavigate } from 'react-router-dom';


export default function AddTask({ title, description, }) {

  const myCards = {
    height: '100%',
    width: "100%",
    borderRadius: "14px",
    display: 'flex',
  }
  const myTitle = {
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    fontSize: '1rem'
  }
  const totalNo = {
    lineHeight: '1',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "6vw",
    fontColor: 'rgba(0, 0, 0, 1)',
    fontWeight: '700'
  }

  const myBody = {
    boxShadow: "0px 4px 12px rgb(0 0 0 / 10%)",
    borderRadius: "10px",
    padding: '2rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
  return (
    <div>

      <div className="card my-3" style={myCards}>

        <div style={myBody} className=" ">
          <h4 style={myTitle} className="card-title">{title}</h4>
          <div style={totalNo} className="card-text">{description}</div>
        </div>
      </div>
    </div>
  )
}



