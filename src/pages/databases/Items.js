import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../Context/AuthProvider';
import MainSideBar from '../components/MainSideBar';
import Header from '../components/header';
import LoadingSpinner from '../components/LoadingSpinner';
import Popup from '../components/Popup';
import { Divider, Grid } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import styles from './styles/Checklist.module.css';
import West from '@mui/icons-material/West';
import Badge from '../components/Badge';

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

export default function Items() {
  const checklistId = useParams().id;
  let navigate = useNavigate();
  const [checklist, setChecklist] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const [tab, setTab] = useState('1');
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [inputDisabled, setInputDisabled] = useState(true);

  const allowed = ['Admin', 'Manager'];

  const handleTabs = (e) => {
    console.log(e.target.id);
    console.log(e.target);
    setTab(e.target.id);
  };

  const handleAddItemPopup = () => {
    setPopupOpen(true);
    setPopupData({
      title: 'Add new item',
      text: '',
      input: 'Enter description',
      handleConfirm: (value) => {
        setIsLoading(true);
        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/templates/${checklistId}`,
            {
              items: [...items, value],
            },
            { headers: { authorization: `Bearer: ${token}` } }
          )
          .then((result) => {
            console.log(result.data.data);
            setItems(result.data.data.items);
            setPopupOpen(false);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err.response);
            setIsLoading(false);
          });
      },
    });
  };

  const EditItems = () => {
    return (
      <ModeEditOutlineIcon
        disabled={!allowed.includes(auth.role)}
        style={{
          cursor: 'pointer',
          opacity: allowed.includes(auth.role) ? 1 : 0.5,
        }}
        onClick={() => {
          setInputDisabled((prevState) => !prevState);
        }}
      />
    );
  };

  const DeleteItems = ({ id }) => {
    return (
      <DeleteOutlineIcon
        disabled={!allowed.includes(auth.role)}
        sx={{
          color: '#f44336',
          cursor: 'pointer',
          marginLeft: '1.5rem',
          opacity: allowed.includes(auth.role) ? 1 : 0.5,
        }}
        onClick={() => {
          setPopupOpen(true);
          setPopupData({
            title: 'Delete Checklist',
            text: 'Are you sure?',
            handleConfirm: () => {
              setIsLoading(true);
              axios
                .delete(
                  `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/templates/${id}`,
                  { headers: { authorization: `Bearer: ${token}` } }
                )
                .then((result) => {
                  console.log(result);
                  navigate(-1);
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

  const DeleteItemButton = ({ idx }) => {
    return (
      <DeleteOutlineIcon
        disabled={!allowed.includes(auth.role)}
        sx={{
          color: '#f44336',
          cursor: 'pointer',
          opacity: allowed.includes(auth.role) ? 1 : 0.5,
          marginLeft: 'auto',
        }}
        onClick={() => {
          setPopupOpen(true);
          setPopupData({
            title: 'Delete Checklist',
            text: 'Are you sure?',
            handleConfirm: () => {
              setIsLoading(true);
              console.log(idx);
              axios
                .put(
                  `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/templates/${checklistId}`,
                  {
                    items: items.filter((item, i) => i !== idx),
                  },
                  { headers: { authorization: `Bearer: ${token}` } }
                )
                .then((result) => {
                  console.log(result);
                  setItems(result.data.data.items);
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log(err.response);
                });
            },
          });
        }}
      />
    );
  };

  const handleMarkCompleted = () => {
    setIsLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/templates/${checklistId}`,
        {
          is_completed: true,
        },
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((result) => {
        setChecklist(result.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  };

  const handleMarkInCompleted = () => {
    setIsLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/templates/${checklistId}`,
        {
          is_completed: false,
        },
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((result) => {
        console.log(result.data.data);
        setChecklist(result.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Array.from(fd.values());
    console.log(data);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/templates/${checklistId}`,
        { items: data },
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((result) => {
        setItems(result.data.data.items);
        setInputDisabled(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/templates/${checklistId}`,
        {
          headers: {
            authorization: `Bearer: ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setChecklist(res.data.data);
        setItems(res.data.data.items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  }, [checklistId]);

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
                  <Divider />
                </div>
              </div>
              {/* Top Menu Tab Container End */}

              {/* Main Content Header Starts */}
              <div style={{ marginTop: '2rem' }}>
                <div className={`${styles.flex} ${styles.contentHead}`}>
                  {/* Back Button Stars */}
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <div className={styles.backButton}>
                      <West />
                      <span>Back</span>
                    </div>
                  </button>
                  {/* Back Button Ends */}
                  {auth && (
                    <button
                      className={styles.button}
                      onClick={handleAddItemPopup}
                    >
                      Add New Item
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
                  gap: '1.25rem',
                  marginTop: '0.25rem',
                  fontWeight: '500',
                  height: '64vh',
                  overflow: 'scroll',
                  overflowX: 'hidden',
                  backgroundColor: '#fff',
                  padding: '2rem',
                  borderRadius: '0.6rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    zIndex: '9',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <h4 style={{ margin: 0 }}>{checklist.title}</h4>
                    {checklist.is_completed && (
                      <span>
                        <Badge text='Published' color='#768C15dd' />{' '}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    {items.length !== 0 && <EditItems />}
                    <DeleteItems id={checklist._id} />
                  </div>
                </div>
                <Grid
                  container
                  columnSpacing={{ xs: 2, sm: 6, md: 10, lg: 15, xl: 20 }}
                >
                  <Grid item xs={2}>
                    <p style={{ margin: '0', textAlign: 'center' }}>Sl. No.</p>
                  </Grid>
                  <Grid item xs={10}>
                    <p style={{ margin: '0' }}>Item</p>
                  </Grid>
                </Grid>

                <form
                  action=''
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                  onSubmit={handleFormSubmit}
                >
                  {items.map((item, idx) => (
                    <div key={idx}>
                      <Grid
                        container
                        columnSpacing={{ xs: 2, sm: 6, md: 10, lg: 15, xl: 20 }}
                        key={item._id}
                        style={{
                          color: 'black',
                          marginRight: '2rem',
                        }}
                      >
                        <Grid item xs={2}>
                          <p
                            style={{
                              margin: '0',
                              textAlign: 'center',
                              fontWeight: '400',
                            }}
                          >
                            {idx + 1}
                          </p>
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <input
                            type='text'
                            name='defName'
                            disabled={inputDisabled}
                            className={styles.dynamicInput}
                            defaultValue={item}
                          />
                          {!inputDisabled && <DeleteItemButton idx={idx} />}
                        </Grid>
                      </Grid>
                      {idx !== items.length - 1 && (
                        <div
                          style={{
                            marginBottom: '0',
                            marginTop: '0.5rem',
                          }}
                        >
                          {inputDisabled && (
                            <hr
                              style={{
                                backgroundColor: '#e0e0e0',
                                margin: '0',
                                padding: '0',
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  <div
                    style={{
                      textAlign: 'right',
                      marginTop: '0.75rem',
                      height: '1.5rem',
                    }}
                  >
                    {inputDisabled ? (
                      !checklist.is_completed && items.length ? (
                        <span
                          className={styles.button}
                          onClick={handleMarkCompleted}
                        >
                          Publish
                        </span>
                      ) : (
                        <></>
                      )
                    ) : (
                      <button className={styles.button} type='submit'>
                        Save Changes
                      </button>
                    )}
                  </div>
                </form>
              </div>
              {/* List of Categories End */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
