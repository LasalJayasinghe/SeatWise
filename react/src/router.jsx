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
                element: <Employees />, 
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


        ]
    },

    {
        path: '/',
        element: <CashierGuestLayout />,
        children: [

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
            

        ]
    },

    
    {
        path: '*',
        element : <NotFound />
    }

])

export default router;