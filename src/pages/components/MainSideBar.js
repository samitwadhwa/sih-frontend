import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/style.css';
//import of sidebar icons
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import StorageIcon from '@mui/icons-material/Storage';
import SsidChartIcon from '@mui/icons-material/SsidChart';

export default function MainSideBar({ sideState }) {
  const [toggleUpdateState, setToggleUpdateState] = useState(sideState);
  const navigate = useNavigate();
  const toggleTab = (index) => {
    // setshow(true)
    setToggleUpdateState(index);
    console.log(toggleUpdateState);
  };
  const Logout = () => {
    navigate('/');
  };
  //styles of the components
  const homeButton = {
    fontSize: '1rem',
    textAlign: 'start',
  };
  const sbHomeIcon = {
    margin: '5px',
  };
  const projectButton = {
    fontSize: '1rem',
    textAlign: 'start',
  };
  const sbProjectIcon = {
    margin: '5px',
  };

  const teamButton = {
    fontSize: '1rem',
    textAlign: 'start',
  };
  const myTeamIcon = {
    margin: '5px',
  };
  const taskButton = {
    fontSize: '1rem',
    textAlign: 'start',
  };
  const analyticsButton = {
    fontSize: '1rem',
    textAlign: 'start',
  };
  const databasesButton = {
    fontSize: '1rem',
    textAlign: 'start',
  };
  const mySettingIcon = {
    margin: '5px',
  };
  const myLogout = {
    fontSize: '1rem',
    textAlign: 'start',
    height: 'auto',
  };
  const myLogIcon = {
    margin: '5px',
  };

  const sideBarCSS = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '300',
    alignItems: 'flex-start',
  };
  return (
    <div style={sideBarCSS}>
      <Link to={'/home'}>
        <button
          style={homeButton}
          className={
            toggleUpdateState === 1
              ? 'tabs-update active-update-tabs'
              : 'tabs-update'
          }
          onClick={() => toggleTab(1)}
        >
          <DashboardIcon style={sbHomeIcon} />
          Home
        </button>
      </Link>

      <Link to={'/Project'}>
        <button
          style={projectButton}
          className={
            toggleUpdateState === 2
              ? 'tabs-update active-update-tabs'
              : 'tabs-update'
          }
          onClick={() => toggleTab(2)}
        >
          <SettingsIcon style={sbProjectIcon} />
          Projects
        </button>
      </Link>

      <Link to={'/Teams'}>
        <button
          style={teamButton}
          className={
            toggleUpdateState === 3
              ? 'tabs-update active-update-tabs'
              : 'tabs-update'
          }
          onClick={() => toggleTab(3)}
        >
          <GroupsIcon style={myTeamIcon} /> Team
        </button>
      </Link>
      <Link to={'/Add-Task'}>
        <button
          style={taskButton}
          className={
            toggleUpdateState === 4
              ? 'tabs-update active-update-tabs'
              : 'tabs-update'
          }
          onClick={() => toggleTab(4)}
        >
          <AssignmentIcon style={mySettingIcon} />
          Task manager
        </button>
      </Link>
      <Link to={'/analytics'}>
        <button
          style={analyticsButton}
          className={
            toggleUpdateState === 5
              ? 'tabs-update active-update-tabs'
              : 'tabs-update'
          }
          onClick={() => toggleTab(5)}
        >
          <SsidChartIcon style={mySettingIcon} />
          Analytics
        </button>
      </Link>
      <Link to={'/databases/quality-checklists'}>
        <button
          style={databasesButton}
          className={
            toggleUpdateState === 6
              ? 'tabs-update active-update-tabs'
              : 'tabs-update'
          }
          onClick={() => toggleTab(6)}
        >
          <StorageIcon style={mySettingIcon} />
          Databases
        </button>
      </Link>
      <a
        style={myLogout}
        onClick={() => {
          if (window.confirm('Do you Really want to logout?')) {
            Logout();
          }
        }}
        className={
          toggleUpdateState === 1000
            ? 'tabs-update active-update-tabs'
            : 'tabs-update'
        }
      >
        <LogoutIcon style={myLogIcon} /> Logout
      </a>
    </div>
  );
}
