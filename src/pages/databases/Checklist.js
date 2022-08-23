import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../Context/AuthProvider';
import MainSideBar from '../components/MainSideBar';
import Header from '../components/header';
import LoadingSpinner from '../components/LoadingSpinner';
import Popup from '../components/Popup';
import { Alert, Divider, IconButton, Snackbar } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
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

export default function Checklist() {
  const categoryId = useParams().id;
  const [categoryName, setCategoryName] = useSearchParams();
  categoryName.get('category');
  const [isLoading, setIsLoading] = useState(true);
  const [checklist, setChecklist] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const [tab, setTab] = useState('1');
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState('error');

  const allowed = ['Admin', 'Manager'];

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

  const handleAddChecklistPopup = () => {
    setPopupOpen(true);
    setPopupData({
      title: 'Add new checklist',

      text: '',
      input: 'Enter checklist',
      handleConfirm: (value) => {
        setIsLoading(true);
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/templates`,
            {
              title: value,
              is_completed: false,
              categoryId,
              items: [],
            },
            { headers: { authorization: `Bearer: ${token}` } }
          )
          .then((result) => {
            console.log(result.data.data);
            setChecklist([...checklist, result.data.data]);
            setToastMessage('Checklist Added Successfully');
            setToastSeverity('success');
            setToastOpen(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err.response);
            setIsLoading(false);
            if (err.response.status === 400)
              setToastMessage('Checklist with the same name already exists');
            else setToastMessage('Something went wrong');
            setToastSeverity('error');
            setToastOpen(true);
            setIsLoading(false);
          });
      },
    });
  };

  const EditChecklist = ({ id, itemTitle }) => {
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
            title: 'Edit checklist',
            text: '',
            input: 'Enter checklist title',
            inputValue: itemTitle,
            handleConfirm: (value) => {
              setIsLoading(true);
              axios
                .put(
                  `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/templates/${id}`,
                  { title: value },
                  { headers: { authorization: `Bearer: ${token}` } }
                )
                .then((result) => {
                  console.log(result.data.data);
                  setChecklist(
                    checklist.map((item) => {
                      if (item._id === id) {
                        return result.data.data;
                      }
                      return item;
                    })
                  );
                  setToastMessage('Checklist Updated Successfully');
                  setToastSeverity('success');
                  setToastOpen(true);
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log(err.response);
                  if (err.response.status === 400)
                    setToastMessage(
                      'Checklist with the same name already exists'
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

  const DeleteChecklist = ({ id }) => {
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
                  setChecklist(checklist.filter((item) => item._id !== id));
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
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/databases/quality-checklists/templates`,
        {
          headers: {
            authorization: `Bearer: ${localStorage.getItem('token')}`,
          },
          params: {
            categoryId,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setChecklist(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [categoryId]);

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
                  <Divider />
                </div>
              </div>
              {/* Top Menu Tab Container End */}

              {/* Back Button Stars */}
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  paddingTop: '2rem',
                }}
                to='/databases/quality-checklists'
              >
                <div className={styles.backButton}>
                  <West />
                  <span>Back to categories</span>
                </div>
              </Link>
              {/* Back Button Ends */}

              {/* Main Content Header Starts */}
              <div style={{ marginTop: '2rem' }}>
                <div className={`${styles.flex} ${styles.contentHead}`}>
                  <p
                    style={{
                      margin: '0',
                      fontWeight: '700',
                      fontSize: '1.25rem',
                    }}
                  >
                    {console.log(categoryName)}
                    {categoryName.get('category')}
                  </p>
                  {auth && (
                    <button
                      className={styles.button}
                      onClick={handleAddChecklistPopup}
                    >
                      Add New checklist
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
                  height: '63vh',
                  overflow: 'scroll',
                  overflowX: 'hidden',
                }}
              >
                {checklist.map((item) => (
                  <div className={styles.category} key={item._id}>
                    <Link
                      to={`/databases/quality-checklist/checklist/${item._id}`}
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
                        <p style={{ margin: '0' }}>{item.title}</p>
                        {item.is_completed && (
                          <Badge
                            text='Published'
                            color='#768C15dd'
                            size='small'
                          />
                        )}
                      </div>
                    </Link>
                    <div className={styles.categoryButtons}>
                      <EditChecklist id={item._id} itemTitle={item.title} />
                      <DeleteChecklist id={item._id} />
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
