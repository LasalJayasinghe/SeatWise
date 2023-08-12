import {createBrowserRouter,Navigate} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Landing from './views/landing.jsx';
import Login from './views/login.jsx';
import Signup from './views/signup.jsx';
import Users from './views/users.jsx';
import NotFound from './views/notFound.jsx';
import Dashboard from './views/dashboard.jsx';
import RestaurantInfo from './views/RestaurantInfo';
import Tablefortwo from './views/tablefortwo/tablefortwo.jsx';
import Suggestions from './views/tablefortwo/suggestions.jsx';
import Recieved from './views/tablefortwo/recieved.jsx';
import Sent from './views/tablefortwo/sent.jsx';



const router = createBrowserRouter([
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
            {
                path: '/tablefortwo',
                element : <Tablefortwo />
            },
            {
                path: '/tablefortwo/suggestions',
                element : <Suggestions />
            },
            {
                path: '/tablefortwo/requests',
                element : <Recieved />
            },
            {
                path: '/tablefortwo/sent',
                element : <Sent />
            },
            {
                path: '/restaurants/:id', // Define the route for restaurant information
                element: <RestaurantInfo />,
            },
        ]
    },
    {
        path: '*',
        element : <NotFound />
    }

])

export default router;