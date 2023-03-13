import AuthUser from './components/AuthUser';
import {Route, Routes } from "react-router-dom";
import Guest from './navbar/guest';
import Auth from './navbar/auth';
import Home from "./components/home.jsx";

function App() {
    const {getToken} = AuthUser();
    
    
    if(!getToken()){
        return <Guest />
    }
    return (
        <div className="bg-slate-100">
            {/*<Header/>*/}
            <Routes>
                <Route  element={<Auth />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
