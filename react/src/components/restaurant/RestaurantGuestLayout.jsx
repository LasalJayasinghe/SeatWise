import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";


export default function RestaurantGuestLayout() {
  const {token} = useStateContext();
    if(token){
        return <Navigate to ="/restaurantDashboard" />
    }

  return (
    <div>
      <Outlet />
    </div>
  )
}
