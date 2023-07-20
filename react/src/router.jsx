import {createBrowserRouter,Navigate} from 'react-router-dom';
import Landing from './views/landing.jsx';
import Login from './views/login.jsx';
import Signup from './views/signup.jsx';
import Users from './views/users.jsx';
import NotFound from './views/notFound.jsx';
import Dashboard from './views/dashboard.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import RestaurantGuestLayout from './components/RestaurantGuestLayout.jsx';
import RestaurantSignup from './views/RestaurantSignup.jsx';
import RestaurantDefaultLayout from './components/RestaurantDefaultLayout.jsx';
import Restaurant from './views/Restaurant.jsx';
import RestaurantDashboard from './views/RestaurantDashboard.jsx';
import RestaurantLogin from './views/RestaurantLogin.jsx';
import Profile from './views/Profile.jsx';
import Structure from './views/Structure.jsx';
import Reservations from './views/Reservations.jsx';
//import AddCashier from './views/cddCashier.jsx';
import AddCashier from './views/addCashier.jsx';


const router = createBrowserRouter([
    {
        path: '/',
        element : <DefaultLayout />,
        children: [
            {
                path: '/',
                element : <Navigate to ="/users" />
            },
            {
                path: '/dashboard',
                element : <Dashboard />
            },
            {
                path: '/users',
                element : <Users />
            },
        ]
    },
    {
        path: '/',
        element : <GuestLayout />,
        children : [
            {
                path: '/',
                element : <Navigate to ="/landing" />
            },
            {
                path: '/landing',
                element : <Landing />
            },
            {
                path: '/login',
                element : <Login />
            },
            {
                path: '/signup',
                element : <Signup />
            },

        ]
    },
    {
        path: '/',
        element: <RestaurantGuestLayout />,
        children: [
            {
                path: "/restaurantlogin",
                element: <RestaurantLogin />,
            },
            {
                path: "/restaurantsignup",
                element: <RestaurantSignup />, 
            },

           
            
        ]
    },
    {
        path: '/',
        element: <RestaurantDefaultLayout />,
        children: [
            {
                path: '/',
                element : <Navigate to ="/restaurant" />
            },
            {
                path: "/restaurant",
                element: <Restaurant />, 
            },
            {
                path: "/profile",
                element: <Profile />, 
            },
            {
                path: "/restaurantDashboard",
                element: <RestaurantDashboard />, 
            },
            {
                path: "/structure",
                element: <Structure />, 
            },
            {
                path: "/reservations",
                element: <Reservations />, 
            },
            
            {
                path: "/employees",
                element: <AddCashier />, 
            },

        ]
    },
    {
        path: '*',
        element : <NotFound />
    }

])

export default router;