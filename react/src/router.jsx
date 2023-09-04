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
import Structure from './views/Structure.jsx';
import TableStructure from './views/TableStructure.jsx';
import Reservations from './views/Reservations.jsx';
//import AddCashier from './views/cddCashier.jsx';
import AddCashier from './views/addCashier.jsx';
import Employees from './views/Employees.jsx';
import Setup from './views/setup.jsx';
import CashierLogin from './views/cashierLogin.jsx';
import ViewStructure from './views/ViewStructure.jsx';
import CashierGuestLayout from './components/CashierGuestLayout.jsx';  
import CashierDefaultLayout from './components/CashierDefaultLayout.jsx';
import RestaurantLanding from './views/RestaurantLanding.jsx';
import CashierDashboard from './views/CashierDashboard.jsx';
import ViewReservations from './views/ViewReservations.jsx';
import Menu from './views/Menu.jsx';
import AddMenu from './views/AddMenu.jsx';
import Orders from './views/Orders.jsx';

import HallDetail from './views/HallDetail.jsx';
import WaitlistPage from './views/WaitlistPage .jsx';
import OrderHistory from './views/OrderHistory.jsx';
import People from './views/People.jsx';
import UpdateEmployee from './views/updateEmployee.jsx';
import Settings from './views/Settings.jsx';
import CashierUpdate from './views/CashierUpdate.jsx';

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
            
            {
                path: "/restaurantlanding",
                element: <RestaurantLanding />, 
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
                element: <CashierUpdate />, 
            },
            {
                path: "/tablestructure",
                element: <TableStructure />, 
            },
            {
                path: "/setup",
                element: <Setup />, 
            },
            {
                path: "/addCashier",
                element: <AddCashier />, 
            },
            {
                path: "/menu",
                element: <Menu />, 
            },
            
            {
                path: '/updateEmployee/:cashierId', 
                element: <UpdateEmployee />
            },
            {
                path: "/addmenu",
                element: <AddMenu />, 
            },
            {
                path: "/orders",
                element: <Orders />, 
            },
            {
                path: "/orderhistory",
                element: <OrderHistory />, 
            },
            {
                path: "/people",
                element: <People />, 
            },
            {
                path: "/settings",
                element: <Settings />, 
            },
        ]
    },

    {
        path: '/',
        element: <CashierGuestLayout />,
        children: [
            {
                path: "/cashiers",
                element: <CashierLogin />, 
            },
          
            {
                path: "/cashierLogin",
                element: <CashierLogin />, 
            },
            
        ]
    },
    {
        path: '/',
        element: <CashierDefaultLayout />,
        children: [
            
            {
                path: '/',
                element : <Navigate to ="/CashierDashboard" />
            },

            {
               

                path: "/CashierDashboard",
                element: <CashierDashboard />, 
            },
            

            {
                path: "/viewstructure",
                element: <ViewStructure />, 
            },
            
       
            {
                path: "/viewReservations",
                element: <ViewReservations />, 
            },
            
            {
                path: '/halls/:hallId', 
                element: <HallDetail />
            },




            {
                path: '/waitlist',
                element: <WaitlistPage />,
            },

        ]
    },

    
    {
        path: '*',
        element : <NotFound />
    }

])

export default router;