import React from 'react';
// import {history} from 'react'
import { useNavigate } from 'react-router-dom';
// import Axios from "axios";
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import './styles/style.css';
import Logo from './assets/icon-VCTech.png';
import Image from './assets/VC tech 1.png';
// import Tabs from '../Tabs/tabs';
import { useState } from 'react';
import AuthContext from '../../Context/AuthProvider';
// import {Data} from "../Tabs"
// import AuthContext from "../../Context/AuthProvider";
// import Spinner from '../Tabs/Spinner';
const LOGIN_URL = '/auth';

export default function Start() {
  const token = localStorage.getItem('token');
  const { auth, setAuth } = useContext(AuthContext);
  const mySection = {
    position: 'relative',
    height: '100vh',
    width: '100%',
    display: 'flex',
  };
  //using useState for Showing loading Animation when needed!
  const [isLoading, setIsLoading] = useState(false);
  //using useState for Showing Alerts when needed!

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
  };
  const initialValues = { username: '', password: '' };
  const [Formvalues, setFormvalues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastError, setToastError] = useState('Soemthing went wrong');
  const myLog = {
    textAlign: 'right',
  };

  const myInput = {
    padding: '1rem 3rem',
    borderRadius: '24.5197px',
    border: '1px solid #D7EB8B',
    backgroundColor: 'white',
    paddingLeft: '1rem',
    paddingBottom: '0.6rem',
  };
  const myImage = {
    position: 'absolute',
    top: '0',
    left: '0',
    objectFit: 'cover',
    width: '85%',
    height: '82%',
    marginTop: '2rem',
    marginLeft: '12rem',
  };
  const myClass = {
    position: 'relative',
    height: '72%',
    width: '50%',
    // position: relative;
    // height: 72%;
    marginTop: '8rem',
    marginLeft: '3rem',
    // width: 50%;
  };
  const myForm = {
    marginTop: '10rem',
    marginLeft: '12rem',
  };
  const myhead = {
    marginBottom: '1rem',
    fontSize: '1.8rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '800',
    // fontFamily: 'Baloo Bhai 2, cursive",
  };
  const myusername = {
    marginBottom: '1rem',
  };
  const myHr = {
    marginRight: '35rem',
    marginLeft: '1rem',
    borderBottomLeftRadius: '1rem',
    borderBottomRightRadius: '1rem',
    padding: '0.2rem 2rem',
    /* color: rgb(133 199 57); */
    backgroundColor: '#B3CB50',
  };
  const myCntnt = {
    width: '47%',
    backgroundColor: '#fffdfd',
  };
  const myPass = {
    marginBottom: '1.3rem',
  };
  const mylabel = {
    fontSize: '1.3rem',
  };
  const myBtn = {
    padding: '0rem 4.6rem',
    fontSize: '1.4rem',
    backgroundColor: '#B3CB50',
    color: 'white',
    borderRadius: '24.5197px',
    border: '2px solid #B3CB50',
    marginLeft: '-0.6rem',
  };
  const myLogo = {
    position: 'absolute',
    marginLeft: '1.4rem',
    marginTop: '1.4rem',
  };
  const myTech = {
    position: 'absolute',
    marginLeft: '7rem',
    marginTop: '2.4rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '800',
  };
  //Store the values whenever got change!
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...Formvalues, [name]: value });
  };
  //using useNavigate for navigating from login page to home page
  const navigate = useNavigate();
  const myValidation = {
    color: 'red',
  };
  const ClassBtn = {
    width: '17rem',
    marginLeft: '-1rem',
  };

  //Login form validation
  const Validate = (value) => {
    const errors = {};
    //regex for vailidating username
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value.username) {
      errors.username = 'username is required!';
    } else if (!regex.test(value.username)) {
      errors.username = 'Please Enter a Valid username!';
    }
    if (!value.password) {
      errors.password = 'Password is required!';
    } else if (value.password.length < 5) {
      errors.password = 'Password must be at least 5 characters';
    }
    return errors;
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(Formvalues);
    }
  }, [formErrors]);
  // Function is called when user click on submit button -> Stores the data -> check the credentials are valid or not -> navigate to home page
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = Validate(Formvalues);
    setFormErrors(errors);

    if (Object.keys(errors).length !== 0) {
      return;
    }

    setIsLoading(true);
    axios
      .post("http://localhost:80/login", {
        username: Formvalues.username,
        password: Formvalues.password,
        sent_from: 'web',
      })
      .then((res) => {
        // console.log("Navigation")
        setIsLoading(false);
        console.log('This is res.data', res.data.data);
        // TODO: Show error toast
        if (res.data.success) {
          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.data.user));
          setAuth(res.data.data.user);
          navigate('/home'); // On colsole log this navigate is undefined
          setIsSubmit(true);
        }
        // localStorage.setItem("refreshToken", res.data.refreshToken);
        else {
          showAlert(res.data.message, 'danger');
        }

        //  navigate("/Project")
      })
      .catch((err) => {
        setIsLoading(false);
        setToastOpen(true);
        setToastError(err.response.data.message);
      });
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleToastClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  return (
    <>
      {/* creating the login page */}
      <section style={mySection}>
        {/* Toast Begin */}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={toastOpen}
          autoHideDuration={3000}
          onClose={handleToastClose}
          action={action}
          key='topcenter'
        >
          <Alert
            onClose={handleToastClose}
            severity='warning'
            sx={{ fontSize: '1.1rem' }}
          >
            {toastError}
          </Alert>
        </Snackbar>
        {/* Toast End */}
        <div>
          {/* <img src={Logo} alt='Logo' style={myLogo} /> */}
          <h2 style={myTech}>The Incubator hub</h2>
        </div>
        {/* <div className='Img-Box' style={myClass}>
          <img src={Image} alt='image' style={myImage} />
        </div> */}
        <div className='Cntnt-Box' style={myCntnt}>
          <div className='form-box' style={myForm}>
            <h2 style={myhead}>Log in </h2>
            <hr style={myHr} />
            <form onSubmit={handleSubmit}>
              <div className='input-box' style={myusername}>
                <label htmlFor='username' style={mylabel}>
                  username
                </label>
                <div className='input'>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    value={Formvalues.username}
                    onChange={handleChange}
                    placeholder='Enter your username'
                    style={myInput}
                    required
                  />
                </div>
                <p style={myValidation}>{formErrors.username}</p>
              </div>
              <div className='input-box ' style={myPass}>
                <label htmlFor='password' style={mylabel}>
                  Password
                </label>
                <div className='input'>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={Formvalues.password}
                    onChange={handleChange}
                    placeholder='Enter your Password'
                    style={myInput}
                    required
                  />
                </div>
                <p style={myValidation}>{formErrors.password}</p>
              </div>
              <div className='btn' style={ClassBtn}>
                {/* {isLoading ? <LoadingSpinner/> : null} */}
                {/* {!value.password ? alert("fill") :  <a href='/tabs' style={myBtn} onClick={handleSubmit} >Log in</a> } */}
                <button style={myBtn} onClick={(e) => handleSubmit(e)}>
                  Log in
                </button>
                {isLoading ? <LoadingSpinner /> : null}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
