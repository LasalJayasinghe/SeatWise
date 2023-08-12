import {createBrowserRouter,Navigate} from 'react-router-dom';
import Landing from './views/landing.jsx';
import Login from './views/login.jsx';
import Signup from './views/signup.jsx';
import NotFound from './views/notFound.jsx';
import Dashboard from './views/dashboard.jsx';
import Users from './views/users.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Restaurants from './views/Restaurants.jsx';
import RestaurantDetail from './views/RestaurantDetail.jsx';
import HallDetail from './views/HallDetail.jsx';
import WaitlistPage from './views/WaitlistPage';
import Meals from './views/Meals.jsx';
import Activities from './views/Activities.jsx';
import Mealspage from './views/Mealspage.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element : <DefaultLayout />,
        children: [
            {
                path: '/',
                element : <Navigate to ="/dashboard" />
            },
            {
                path: '/dashboard',
                element : <Dashboard />
            },
            {
                path: '/restaurants',
                element: <Restaurants />
              },
              {
                path: '/meals',
                element: <Meals/>
              },

              {
                path: '/restaurants/:id/meals', 
                element: <Mealspage />
            },

              {
                path: '/activities',
                element: <Activities/>
              },
            {
                path: '/restaurants/:id', 
                element: <RestaurantDetail />
            },
            {
                path: '/halls/:hallId', 
                element: <HallDetail />
            },
            {
                path: '/waitlist',
                element: <WaitlistPage />,
            },

            {
                path: '/users',
                element : <Users />
            }
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
        path: '*',
        element : <NotFound />
    }

])

export default router;