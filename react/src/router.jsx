import {createBrowserRouter,Navigate} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Landing from './views/landing.jsx';
import Login from './views/login.jsx';
import Signup from './views/signup.jsx';
import NotFound from './views/notFound.jsx';
import Dashboard from './views/dashboard.jsx';
import Tablefortwo from './views/customer/tablefortwo/tablefortwo.jsx';
import Suggestions from './views/customer/tablefortwo/suggestions.jsx';
import Recieved from './views/customer/tablefortwo/recieved.jsx';
import Sent from './views/customer/tablefortwo/sent.jsx';
import Users from './views/users.jsx';
import Restaurants from './views/Restaurants.jsx';
import RestaurantDetail from './views/RestaurantDetail.jsx';
import HallDetail from './views/HallDetail.jsx';
import WaitlistPage from './views/WaitlistPage';
import Meals from './views/Meals.jsx';
// import Activities from './views/customer/Activities.jsx';
import Mealspage from './views/Mealspage.jsx';
import Complaints from './views/customer/activities/Complaints.jsx';
import Activities from './views/customer/activities/Activities.jsx';
import Completed from './views/customer/activities/Completed.jsx';

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
                path: '/activities',
                element : <Activities/>
                
            },
            {
                path: '/activities/complaints',
                element : <Complaints/>
                
            },
            {
                path: '/activities/completed',
                element : <Completed/>
                
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