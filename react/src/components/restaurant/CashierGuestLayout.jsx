import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";


export default function CashierGuestLayout() {
  const {token} = useStateContext();
    if(token){
        return <Navigate to ="/CashierDashboard" />
    }

  return (
    <div>
      <Outlet />
    </div>
  )
}
