import {createBrowserRouter,Navigate} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Landing from './views/landing.jsx';
import Login from './views/customer/login.jsx';
import Signup from './views/customer/signup.jsx';
import NotFound from './views/notFound.jsx';
import Dashboard from './views/customer/dashboard.jsx';
import Tablefortwo from './views/customer/tablefortwo/tablefortwo.jsx';
import Suggestions from './views/customer/tablefortwo/suggestions.jsx';
import Recieved from './views/customer/tablefortwo/recieved.jsx';
import Sent from './views/customer/tablefortwo/sent.jsx';
import Users from './views/users.jsx';
import Restaurants from './views/customer/restaurants/Restaurants.jsx';
import RestaurantDetail from './views/customer/restaurants/RestaurantDetail.jsx';
import HallDetail from './views/customer/restaurants/HallDetail.jsx';
import WaitlistPage from './views/customer/restaurants/WaitlistPage.jsx';
import Meals from './views/customer/Meals.jsx';
// import Activities from './views/customer/Activities.jsx';
import Mealspage from './views/customer/restaurants/Mealspage.jsx';
import Complaints from './views/customer/activities/Complaints.jsx';
import Activities from './views/customer/activities/Activities.jsx';
import Completed from './views/customer/activities/Completed.jsx';
import Landing from './views/landing.jsx';
import Login from './views/login.jsx';
import Signup from './views/signup.jsx';
import Users from './views/users.jsx';
import NotFound from './views/notFound.jsx';
import Dashboard from './views/restaurant/dashboard.jsx';
import DefaultLayout from './components/restaurant/DefaultLayout.jsx';
import GuestLayout from './components/restaurant/GuestLayout.jsx';
import RestaurantGuestLayout from './components/restaurant/RestaurantGuestLayout.jsx';
import RestaurantSignup from './views/restaurant/RestaurantSignup.jsx';
import RestaurantDefaultLayout from './components/restaurant/RestaurantDefaultLayout.jsx';
import Restaurant from './views/restaurant/Restaurant.jsx';
import RestaurantDashboard from './views/restaurant/RestaurantDashboard.jsx';
import RestaurantLogin from './views/restaurant/RestaurantLogin.jsx';
import Structure from './views/restaurant/Structure.jsx';
import TableStructure from './views/restaurant/TableStructure.jsx';
import Reservations from './views/restaurant/Reservations.jsx';
//import AddCashier from './views/cddCashier.jsx';
import AddCashier from './views/restaurant/addCashier.jsx';
import Employees from './views/restaurant/Employees.jsx';
import Setup from './views/restaurant/setup.jsx';
import CashierLogin from './views/restaurant/cashierLogin.jsx';
import ViewStructure from './views/restaurant/ViewStructure.jsx';
import CashierGuestLayout from './components/restaurant/CashierGuestLayout.jsx';  
import CashierDefaultLayout from './components/restaurant/CashierDefaultLayout.jsx';
import RestaurantLanding from './views/restaurant/RestaurantLanding.jsx';
import CashierDashboard from './views/restaurant/CashierDashboard.jsx';
import ViewReservations from './views/restaurant/ViewReservations.jsx';
import Menu from './views/restaurant/Menu.jsx';
import AddMenu from './views/restaurant/AddMenu.jsx';
import Orders from './views/restaurant/Orders.jsx';

import HallDetail from './views/restaurant/HallDetail.jsx';
import WaitlistPage from './views/restaurant/WaitlistPage .jsx';
import OrderHistory from './views/restaurant/OrderHistory.jsx';
import People from './views/restaurant/People.jsx';
import UpdateEmployee from './views/restaurant/updateEmployee.jsx';
import Settings from './views/restaurant/Settings.jsx';
import CashierUpdate from './views/restaurant/CashierUpdate.jsx';
import TechnicalAssistance from './views/restaurant/TechnicalAssistance.jsx';

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
                path: "/TechnicalAssistance",
                element: <TechnicalAssistance/>, 
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