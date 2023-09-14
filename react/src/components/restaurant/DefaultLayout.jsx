import { useEffect } from 'react';
import {useStateContext} from '../../context/ContextProvider.jsx';
import {Link,Outlet,Navigate} from 'react-router-dom';
import axiosClient from '../../axios-client.js';

export default function DefaultLayout() {
    const {user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to ='/landing' />
    }

    const onLogout = ev => {
        ev.preventDefault()

        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
    })
}, [])

    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href='#' onClick={onLogout} className='btn-logout'>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}