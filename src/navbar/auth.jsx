import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home';
import Dashboard from '../components/dashboard';
import AuthUser from '../components/AuthUser';

import NavBar from '../navbar/NavBar'
import DrawerMenu from '../navbar/DrawerMenu'
function Auth() {
    const {token,logout} = AuthUser();
    const storeContext = AuthUser();
    const logoutUser = () => {
        if(token !== undefined){
            logout();
        }
    }
    return (
        <div className="flex">
            <DrawerMenu></DrawerMenu>
            {/*<NavBar storeContext={storeContext}></NavBar>*/}
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/*<Route path="/dashboard" element={<Dashboard />} />*/}
                </Routes>
            </div>
        </div>
    );
}

export default Auth;
