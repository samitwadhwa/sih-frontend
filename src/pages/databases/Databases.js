import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../Context/AuthProvider';
import MainSideBar from '../components/MainSideBar';
import Header from '../components/header';
import LoadingSpinner from '../components/LoadingSpinner';
import Popup from '../components/Popup';
import { Alert, Divider, IconButton, Snackbar } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import styles from './styles/Databases.module.css';
import CloseIcon from '@mui/icons-material/Close';
const tabHeadContainer = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  padding: '0',
};
const tabs = {
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '2rem',
  flexGrow: 1,
  margin: '1.5rem 1rem 0 1rem',
  maxHeight: '4rem',
  marginBottom: '0.5rem',
};
const TabHeading = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '1.2rem',
};

export default function Databases() {
  const { auth, setAuth } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState('1');
  const [categories, setCategories] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState('error');

  const allowed = ['Admin', 'Manager'];
  console.log(auth, '$$$$$$$');

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

  const handleTabs = (e) => {
    console.log(e.target.id);
    console.log(e.target);
    setTab(e.target.id);
  };

  const handleAddCategoryPopup = () => {
    setPopupOpen(true);
    setPopupData({
      title: 'Add new category',

      text: 'Category name',
      input: 'Enter category name',
      handleConfirm: (value) => {
        setIsLoading(true);
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/categories`,
            { title: value },
            { headers: { authorization: `Bearer: ${token}` } }
          )
          .then((result) => {
            console.log(result.data.data);
            setCategories((prevState) => {
              return [...prevState, result.data.data];
            });
            setToastMessage('Category Added Successfully');
            setToastSeverity('success');
            setToastOpen(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response.status === 400)
              setToastMessage('Category with the same name already exists');
            else setToastMessage('Something went wrong');
            setToastSeverity('error');
            setToastOpen(true);
            setIsLoading(false);
          });
      },
    });
  };

  const EditCategory = ({ id, categoryTitle }) => {
    // console.log('This->', categoryTitle);
    return (
      <ModeEditOutlineIcon
        disabled={!allowed.includes(auth.role)}
        style={{
          cursor: 'pointer',
          opacity: allowed.includes(auth.role) ? 1 : 0.5,
        }}
        onClick={() => {
          setPopupOpen(true);
          setPopupData({
            title: 'Edit category',
            text: '',
            input: 'Enter category name',
            inputValue: categoryTitle,
            handleConfirm: (value) => {
              setIsLoading(true);
              axios
                .put(
                  `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/categories/${id}`,
                  { title: value },
                  { headers: { authorization: `Bearer: ${token}` } }
                )
                .then((result) => {
                  console.log(result.data.data);
                  setCategories((prevState) => {
                    return prevState.map((item) => {
                      if (item._id === id) {
                        return result.data.data;
                      }
                      return item;
                    });
                  });
                  setToastMessage('Category Updated Successfully');
                  setToastSeverity('success');
                  setToastOpen(true);
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log(err.response);
                  if (err.response.status === 500)
                    setToastMessage(
                      'Category with the same name already exists'
                    );
                  else setToastMessage('Something went wrong');
                  setToastSeverity('error');
                  setToastOpen(true);
                  setIsLoading(false);
                });
            },
          });
        }}
      />
    );
  };

  const DeleteCategory = ({ id }) => {
    return (
      <DeleteOutlineIcon
        disabled={!allowed.includes(auth.role)}
        sx={{
          color: '#f44336',
          cursor: 'pointer',
          opacity: allowed.includes(auth.role) ? 1 : 0.5,
        }}
        onClick={() => {
          setPopupOpen(true);
          setPopupData({
            title: 'Delete category',
            text: 'Are you sure?',
            handleConfirm: () => {
              setIsLoading(true);
              axios
                .delete(
                  `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/categories/${id}`,
                  { headers: { authorization: `Bearer: ${token}` } }
                )
                .then((result) => {
                  console.log(result);
                  setCategories((prevState) => {
                    return prevState.filter((category) => category._id !== id);
                  });
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log(err.response);
                  setIsLoading(false);
                });
            },
          });
        }}
      />
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/categories`,
        { headers: { authorization: `Bearer: ${token}` } }
      );
      console.log(res.data.data);
      setCategories(res.data.data);
      setIsLoading(false);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  return (
    <div>
      <Header />
      <div className='Updates'>
        <MainSideBar sideState={6} />
        {isLoading ? (
          <div
            style={{
              display: 'grid',
              height: '90vh',
              width: '100vw',
              placeItems: 'center',
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <div className={styles.bgContainer}>
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
                severity={toastSeverity}
                sx={{ fontSize: '1rem' }}
              >
                {toastMessage}
              </Alert>
            </Snackbar>
            <Popup
              open={popupOpen}
              data={popupData}
              handleClose={() => setPopupOpen(false)}
            />
            <div className={styles.container}>
              {/* Top Menu Tab Container Start */}
              <div style={{ width: '80%' }}>
                <div style={tabHeadContainer}>
                  <div style={tabs}>
                    <h2
                      className={`${styles.tab} ${
                        tab === '1' ? styles.activeTab : ''
                      }`}
                    >
                      <span id='1' style={TabHeading} onClick={handleTabs}>
                        Quality Checklists
                      </span>
                    </h2>
                  </div>
                  <Divider light />
                </div>
              </div>
              {/* Top Menu Tab Container End */}
              {/* Main Content Header Starts */}
              <div style={{ marginTop: '3rem' }}>
                <div className={`${styles.flex} ${styles.contentHead}`}>
                  <p
                    style={{
                      margin: '0',
                      fontWeight: '700',
                      fontSize: '1.25rem',
                    }}
                  >
                    Categories
                  </p>
                  {auth && (
                    <button
                      className={styles.button}
                      onClick={handleAddCategoryPopup}
                    >
                      Add New Category
                    </button>
                  )}
                </div>
              </div>
              {/* Main Content Header Ends */}
              {/* List of Categories Start */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  marginTop: '1.5rem',
                  fontWeight: '500',
                  height: '70vh',
                  overflow: 'scroll',
                  overflowX: 'hidden',
                }}
              >
                {categories.map((category) => (
                  <div className={styles.category} key={category._id}>
                    <Link
                      to={`/databases/quality-checklist/${category._id}?category=${category.title}`}
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        flex: '1',
                        marginRight: '2rem',
                        paddingInline: '2rem',
                        paddingBlock: '1.5rem',
                      }}
                    >
                      <div className={styles.categoryText}>
                        <p style={{ margin: '0' }}>{category.title}</p>
                      </div>
                    </Link>
                    <div className={styles.categoryButtons}>
                      <EditCategory
                        id={category._id}
                        categoryTitle={category.title}
                      />
                      <DeleteCategory id={category._id} />
                    </div>
                  </div>
                ))}
              </div>
              {/* List of Categories End */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
