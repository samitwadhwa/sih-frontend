import React from 'react'
// import alert from '@mui/material/alert';
// import Stack from '@mui/material/Stack';
export default function alert(props) {
    // const Capitalize = (word) => {
    //     let lower = word.toLowerCase();
    //     return lower.charAt(0).toUpperCase() + lower.slice(1);
    //   };
      const myalert = {
        marginRight: "7rem",
        marginLeft: "-3rem"
      }
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div style={myalert}
          className={`alert alert-${props.alert.type} alert-dismissible fade show `}
          role="alert"
        >
          <strong>{props.alert.type}</strong>: {props.alert.msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  )
}
