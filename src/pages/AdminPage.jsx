import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Memory from '../assets/graph.png';
import Line from '../assets/line.png';
import './css/AdminPage.css';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faUserGroup, faDatabase, faCircleCheck, faArrowsRotate, faEllipsis  } from '@fortawesome/free-solid-svg-icons';
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

const apiBaseUrl = import.meta.env.VITE_BASE_API;

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('users');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${apiBaseUrl}/api/auth/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.userType === 'admin') {
            setIsAdmin(true);
            fetchData();
          } else {
            navigate('/404');
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/404');
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/admin/${view}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (view === 'users') {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    }
  };

  const handlePromote = async (userId) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/admin/promote/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Response Data:', response.data);
      const message = response.data.message || 'User promoted to admin successfully';
      alert(message);
      fetchData();
    } catch (error) {
      console.error('Error promoting user:', error);
      alert('Error promoting user: ' + (error.response?.data?.msg || error.message));
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
 
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        {/* <button onClick={() => setView('users')}>User List</button> */}
      </div>
      <div className="admin-content">
        <h1>Welcome, {user?.firstName} {user?.lastName}!</h1>
        {/* {view === 'users' ? ( */}
        <div className="overview">
        <FontAwesomeIcon icon={faChartSimple} size='lg' style={{color: "#Fe981e"}} /><p>Overview</p>
        </div>
        <div className="overview-cards">
          <div className="overview-card">
            <div className="card-header">
            <h3>89,395</h3>
            <FontAwesomeIcon icon={faUserGroup} size='lg' style={{color:'#303682'}}/>
            </div>
            <p>Total Users</p>
            <div className="card-footer">
              <BsGraphUpArrow style={{color:'#34c759'}}/>
              <p>10.2</p>
              <p>+1.01% this week</p>
            </div>
             </div>
          <div className="divider"></div>
          <div className="overview-card">
            <div className="card-header">
            <h3>23TB/50TB</h3>
            <FontAwesomeIcon icon={faDatabase} size='lg' style={{color:'#fd8584'}}/>
            </div>
            <p>Memory Used</p>
            <div className="card-footer">
              <BsGraphUpArrow style={{color:'#34c759'}}/>
              <p>3.1</p>
              <p>+0.49% this week</p>
            </div>
             </div>
          <div className="divider"></div>
          <div className="overview-card">
            <div className="card-header">
            <h3>46,827</h3>
            <FontAwesomeIcon icon={faCircleCheck} size='lg' style={{color:'#967ff2'}}/>
            </div>
            <p>Paid Users</p>
            <div className="card-footer">
            <BsGraphDownArrow style={{color:'#ff3b30'}}/>
              <p>2.56</p>
              <p>-0.91% this week</p>
            </div>
             </div>
          <div className="divider"></div>
          <div className="overview-card">
            <div className="card-header">
            <h3>124,854</h3>
            <FontAwesomeIcon icon={faArrowsRotate} size='lg' style={{color:'#fd981f'}}/>
            </div>
            <p>Average Weekly Uploads/Downloads</p>
            <div className="card-footer">
              <BsGraphUpArrow style={{color:'#34c759'}}/>
              <p>7.2</p>
              <p>+1.51% this week</p>
            </div>
             </div>
        </div>
        <div className="analytics">
          <div className="user-analytics">
            <div className="analytics-header">
              <h3>User Analytics</h3>
              <div className="paying">
              <p><GoDotFill style={{color:'#454987'}}/> Paying Users</p>
              <p><GoDotFill style={{color:'#f29414'}}/> Non Paying Users</p>
              <select className='option-select'>
                <option value='weekly'>Weekly</option>
                <option value='monthly'>Monthly</option>
                <option value='annualy'>Annualy</option>
              </select>
              </div>
            </div>
            <img src={Line}/>
          </div>
          <div className="memory">
            <div className="memory-header">
            <h3>Memory</h3>
            <FontAwesomeIcon icon={faEllipsis} size='lg' />
            </div>
            <img src={Memory}/>
            <div className="memory-footer">
              <p><GoDotFill style={{color:'#454987'}}/> Paid</p>
              <p><GoDotFill style={{color:'#f29414'}}/> Unpaid</p>
              <p><GoDotFill style={{color:'#ff6c6b'}}/> Unused Memory</p>
            </div>
          </div>
        </div>
        <div className="user-list">
            <div className="table-user">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>ID <HiMiniArrowsUpDown /></th>
                      <th>Name</th>
                      <th>Email <HiMiniArrowsUpDown /></th>
                      <th>User Type</th>
                      <th>Verification Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(users) && users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>#{user._id.slice(0, 5)}</td>
                        <td>{capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)}</td>
                        <td>{user.email}</td>
                        <td>{capitalizeFirstLetter(user.userType)}</td>
                        <td>{user.isVerified ? 'Verified' : 'Not Verified'}</td>
                        <td>
                          {user.userType === 'admin' ? (
                            'User Already Admin'
                          ) : (
                            <button onClick={() => handlePromote(user._id)}>
                              Promote to Admin
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
              </div>

        {/* // ) : null} */}
      </div>
      <aside className='sidebar1'></aside>
    </div>
  );
};

export default AdminPage;
