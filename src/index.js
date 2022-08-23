import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthProvider';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from 'react-router-dom';
// import Teams from './Components/Tabs/teams';
// import Tabs from './Components/Tabs/tabs';
// import Header from './pages/components/header';
// import Teams from './Components/Tabs/teams';

// import Start from './Components/Start/Start';
// import Projects from "../src/Components/Tabs/Project"
// import Project from "../src/Components/Tabs/projects/project"
import Start from './pages/Start/Start';
// import ReimbursementReq from './Components/Tabs/projects/ReimbursementReq';


// import SiteUpd from './Components/Tabs/siteUpd';
// import AddTask from './Components/Tabs/addTask';

ReactDOM.render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    {/* <Header/> */}
    <AuthProvider>
      <Router>
        {/* <App/> */}

        <Routes>
          <Route path='/' element={<App />} />
          {/* <Route path="/tabs" element={<Tabs/>} />  */}
         
        
        </Routes>
        <Routes>
          <Route path='/login' element={<Start />} />
          {/* <Route path="/tabs" element={<Tabs/>} />  */}
         
        
        </Routes>
      </Router>
    </AuthProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
