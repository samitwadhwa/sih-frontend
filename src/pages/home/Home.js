import { Notifications } from './components/Notifications';
import React, { useState, useEffect, useContext } from 'react';
import '../../firebase';
import Header from '../components/header';
import MainSideBar from '../components/MainSideBar';
import '../styles/style.css';
import AuthContext from '../../Context/AuthProvider';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import CardsAna from './components/CardsAna';
import CardsAna2 from './components/CardsAna2';
import CardsAna3 from './components/CardsAna3';
import CardsAna4 from './components/CardsAna4';
import { registerSW } from '../../firebase';

async function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const pushToken = await registerSW();
      if (pushToken) {
        console.log(pushToken);
        const push_res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/add-fcm-token`,
          { fcmToken: pushToken },
          {
            headers: {
              authorization: `Bearer: ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log(push_res);
      } else console.log('pushtoken is something else', pushToken);
      console.log('push token', pushToken);
    } else {
      console.log('permission not granted');
    }
  });
}

const myDelete = {
  position: 'absolute',
  marginTop: '-2rem',
  color: ' #e02626',
  marginLeft: ' -2rem',
};
const cardStyle = {
  width: '20rem',
  margin: '1rem',
};

const myContent2 = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
};
const myContent3 = {
  // marginBottom : "-18rem",

  marginTop: '1rem',
  height: '45.7rem',
};
const myContent4 = {
  // marginBottom : "-18rem",
  marginTop: '1rem',
  height: '45.7rem',
};
const myForm = {
  marginLeft: '1rem',
  marginRight: '9rem',
};
const myAdd = {
  fontSize: 'small',
  marginLeft: '-1rem',
  marginTop: '-0.3rem',
  marginRight: '0.3rem',
};

let count = 0;
export default function AddTask() {
  const [first, setFirst] = useState(false);

  console.log(count++);
  useEffect(async () => {
    if (!first) {
      setFirst(false);
      requestPermission();
    }
  }, []);

  const { auth, setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState(null);
  const showAlerts = (message, type) => {
    setAlerts({ msg: message, type: type });
  };
  const myProjectBtn = {
    clear: 'both',
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '-3rem',
    position: 'absolute',
    /* display: flex; */
    borderRadius: '10.2943px',
    padding: '0.4rem 1.5rem',
    marginLeft: '67rem',
    backgroundColor: '#7B931B',
    color: 'white',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '700',
    opacity: auth.role === 'Admin' ? '1' : '0.5',
  };
  const [show, setshow] = useState(false);
  const [toggleUpdateState, setToggleUpdateState] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [AddModalOpen, setAddModalOpen] = useState(false);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [Analytics, setAnalytics] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/over-view`, {
        headers: { authorization: `Bearer: ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        setIsLoading(false);
        console.log('fetching api');
        console.log(res.data);
        setAnalytics(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log('fetching api');
      });
  }, []);

  return (
    <div>
      <Header />
      <div className='Updates'>
        <MainSideBar sideState={1} />
        <div className='data-analytics'>
          {isLoading ? (
            <LoadingSpinner style={{ width: '80%', margin: 'auto' }} />
          ) : (
            <div
              className='content-tabs'
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div
                className={
                  toggleUpdateState === 1
                    ? 'content  active-content-home'
                    : 'content'
                }
                style={myContent2}
              >
                <div className='analytics-grid'>
                  <CardsAna
                    title='Number of sites'
                    description={Analytics ? Analytics.project_count : ''}
                    description1={Analytics ? Analytics.active_sites : ''}
                    description2='Total'
                    description3='Active'
                  />
                  <CardsAna2
                    title='Total purchase requests today '
                    description={
                      Analytics ? Analytics.purchase_requests_today : ''
                    }
                  />
                  <CardsAna3
                    title='Total number of labourers working today'
                    description={Analytics ? Analytics.labour_count : ''}
                  />
                  <CardsAna4
                    title='Least active site'
                    title1='Most active site'
                    description={
                      Analytics ? Analytics.least_active_project : ''
                    }
                    description1={
                      Analytics ? Analytics.most_active_project : ''
                    }
                  />
                </div>

                <Notifications />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
