import {Outlet,Navigate} from 'react-router-dom';
import {useStateContext} from '../../context/ContextProvider.jsx';

export default function GuestLayout() {
    const {token} = useStateContext();
    if(token){
        // debugger;
        return <Navigate to ="/" />
    }

    return(
        <div>
            <Outlet />
        </div>
    )
}