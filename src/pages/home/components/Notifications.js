import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Notifications.module.css';
import dayjs from 'dayjs';
import { Divider } from '@mui/material';
import axios from 'axios';
import { resolvePath, useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
// import { foreMsg } from "../../../firebase";
import { getMessaging, onMessage } from 'firebase/messaging';
import LoadingSpinner from '../../components/LoadingSpinner';

export function Notifications({}) {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    let data = JSON.parse(payload.data.payload);
    setMostRecent(data._id);
    data.new = true;
    setNotifs((prevNotifs) => [data, ...prevNotifs]);
    // ...
  });
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState([]);
  const notifsRef = useRef([]);
  notifsRef.current = notifs;
  const [page, setPage] = useState(1);
  const [mostRecent, setMostRecent] = useState(null);
  const mostRecentRef = useRef(0);
  mostRecentRef.current = mostRecent;
  const [more, setMore] = useState(true);
  const [fetching, setFetching] = useState(false);
  // useEffect(() => {
  //     const payload = foreMsg();
  //     if (payload !== undefined) {
  //         console.log('hey i got it', payload)
  //     }
  // }, [])

  const fetchNotifs = (p) => {
    if (fetching) {
      return;
    }
    setFetching(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/web-notify/get-web-notify?page=${page}&page_size=10`,
        {
          headers: {
            authorization: `Bearer: ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.data.length === 0) {
          setMore(0);
          return;
        }
        setNotifs([...notifs, ...res.data.data]);
        if (page === 1) {
          // get id of most recent notif during 1st render
          setMostRecent(res.data.data[0]._id);
          console.log('setting first', res.data.data[0]._id);
        }
        setPage(page + 1);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const pollApi = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/web-notify/get-web-notify?page=1&page_size=5`,
        {
          headers: {
            authorization: `Bearer: ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        console.log('polling');
        const index = res.data.data.findIndex(
          (notif) => notif._id === mostRecentRef.current
        );
        if (index === 0) {
          console.log('it is first');
          return;
        }
        setMostRecent(res.data.data[0]._id);
        let newNotifs = res.data.data.slice(0, index);
        newNotifs.forEach((n) => {
          n.new = true;
        }); // TODO: MAKE IT SO THAT NEW NOTIF IS ADDED THERE ONLY
        setNotifs([...newNotifs, ...notifsRef.current]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timer = setInterval(pollApi, 60000);
    return () => clearInterval(timer);
  }, []);
  const types = {
    'site update': 'site-updates',
    'purchase request': 'purchase-req',
    'change request': 'change-req',
    'reimbursement request': 'reimbursement-req',
    feedback: 'client-feedback',
    'quality check list': 'quality-checklist',
  };

  const getTime = (val) => {
    let hrs =
      (new Date().getTime() - new Date(val).getTime()) / (60 * 60 * 1000);
    let mins = (new Date().getTime() - new Date(val).getTime()) / (60 * 1000);
    if (Math.floor(hrs) > 0) {
      if (Math.floor(hrs) >= 24) {
        return `${Math.floor(hrs / 24)} day${
          Math.floor(hrs / 24) > 1 ? 's' : ''
        } ago`;
      } else {
        return `${Math.floor(hrs)} hour${Math.floor(hrs) > 1 ? 's' : ''} ago`;
      }
    }

    return `${Math.floor(mins) < 0 ? 0 : Math.floor(mins)} minutes ago`;
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Activity</h3>
      <div className={styles.notifContainer}>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchNotifs}
          hasMore={more}
          loader={<LoadingSpinner />}
          useWindow={false}
        >
          {notifs.map((notif, index) => {
            console.log(notif);
            let containerStyle =
              notif.new === true
                ? { backgroundColor: '#d9f36b' }
                : { backgroundColor: 'inherit' };
            containerStyle.borderRadius = index === 0 ? '10px 10px 0 0' : '0';
            return (
              <div key={notif._id} style={{ ...containerStyle }}>
                <a
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    paddingBottom: '1rem',
                    paddingTop: '1rem',
                  }}
                  href={`/projects/${notif.projectId}/${types[notif.type]}`}
                >
                  <div className={styles.notif}>
                    <div className={styles.notifContent}>
                      <b style={{ fontWeight: 600 }}>{notif.userName} </b>
                      {notif.status}
                      <b style={{ fontWeight: 600 }}> {notif.site_name}</b>
                    </div>
                    <div className={styles.time}>
                      {getTime(notif.createdAt ? notif.createdAt : notif.date)}
                    </div>
                  </div>
                </a>

                {index + 1 !== notifs.length && (
                  <Divider
                    style={{ width: '100%', height: '0px', marginBottom: '0' }}
                  />
                )}
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
