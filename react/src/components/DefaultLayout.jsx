import { useEffect } from 'react';
import {useStateContext} from '../context/ContextProvider.jsx';
import {Link,Outlet,Navigate} from 'react-router-dom';
import Header from "./Header.jsx";
import axiosClient from '../axios-client.js';

const DefaultLayout = () => {
  const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to ='/login' />
    }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      });
  };

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);

  return (
    <div id="defaultLayout" className='bg-white'>
      <div className="content">
        <Header user={user} onLogout={onLogout} />
        <main>
        <Outlet /> {/* This will render the content of the current route */}
      </main>
      </div>
    </div>
    
  );

};

export default DefaultLayout;
