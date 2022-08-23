
import React from 'react'

import '../../styles/style.css'



export default function AddTask({ title, description }) {
  const myCards = {
    height: '100%',
    width: "100%",
    borderRadius: "14px",
    display: 'flex',
  }
  const myTitle = {
    fontFamily: "'Montserrat', sans-serif",
    width: '80%',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 1)',
    fontSize: '16px'
  }
  const myText = {
    fontFamily: "'Montserrat', sans-serif",
    position: "relative",
    justifySelf: 'end',
    fontWeight: "600",
    fontSize: "45px",
    height: 'fit-content',
    marginLeft: '8px',
    color: 'rgba(0, 0, 0, 1)'
  }

  const myBody = {
    boxShadow: "0px 4px 12px rgb(0 0 0 / 10%)",
    borderRadius: "10px",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontColor: 'rgba(0, 0, 0, 1)',
    lineHeight: '29px'
  }
  return (
    <div>

      <div className="card my-3" style={myCards}>

        <div style={myBody} className="card-body">
          <h4 style={myTitle} className="card-title">{title}</h4>
          <div style={myText} className="card-text">{description}</div>
        </div>
      </div>

    </div>
  )
}



