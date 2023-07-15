import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";


export default function RestaurantDefaultLayout() {
    const {user, token, setUser, setToken} = useStateContext();

    if(!token){
        return <Navigate to ="/restaurantlogin" />
    }

    const onLogout = ev => {
        ev.preventDefault()

        axiosClient.post('/reslogout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


return (
    <div id="defaultLayout">
        <aside>
            <Link to="/restaurantDashboard">Dashboard </Link>
            <Link to="/restaurants">Restaurants</Link>
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


