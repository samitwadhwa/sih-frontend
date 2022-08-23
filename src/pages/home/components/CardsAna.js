// import { positions } from '@mui/system';
// import { border } from '@mui/system';
import React, { Component, useState } from 'react'
// import PropTypes from 'prop-types'
import '../../styles/style.css'
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import cardstyles from '../styles/numsite.module.css';


export default function AddTask({ title, description, description1, description2, description3 }) {

  const myCards = {
    height: '100%',
    width: "100%",
    borderRadius: "14px",
    display: 'flex',
  }
  const myTitle = {
    fontFamily: "'Montserrat', sans-serif",
    width: '100%',
    height: 'fit-content',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '1rem',
    // fontSize:''
  }
  const Numbers = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '700',
    fontSize: "6vw",
    lineHeight: '1',
    position: 'relative'
  }

  const label = {
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center',
    fontSize: "16px",
    fontWeight: '600',
  }

  const myBody = {
    boxShadow: "0px 0px 5px rgb(0 0 0 / 13%)",
    borderRadius: "10px",
    paddingTop: '14px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 0',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center'
  }
  const divider = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%) rotate(90deg)'
  }


  return (
    <div>

      <div className="card my-3" style={myCards}>

        <div style={myBody} className=" ">
          <h4 style={myTitle} className="card-title">{title}</h4>
          <div className='card-content'>
            <div style={{ width: '50%' }}>
              <div style={{ ...Numbers, color: 'rgba(0, 0, 0, 1)', }} >{description} </div>
              <div style={{ ...label, color: 'rgba(0, 0, 0, 1)' }} className="card-text">{description2}</div>
            </div>
            <div style={divider}>
              <Divider style={{ backgroundColor: "black", width: '65px' }} flexItem />
            </div>
            <div style={{ width: '50%' }}>
              <div style={{ ...Numbers, color: "rgb(99, 144, 63)", }} >{description1}</div>
              <div style={{ ...label, color: "rgb(99, 144, 63)" }} className="card-text">{description3} </div>
            </div>



          </div>
        </div>
      </div>
    </div>

  )
}



