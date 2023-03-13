import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){
    const navigate = useNavigate();
    
    
    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    
    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        console.log('el gerUserrr' + userString)
        return user_detail;
    }
    
    
    
    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());
    
    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));
        
        setToken(token);
        setUser(user);
        navigate('/dashboard');
    }
    
    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }
    const baseURL = "http://127.0.0.1:8000/api";
    
    const http = axios.create({
        baseURL:"http://127.0.0.1:8000/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    
    /*Logic for menu*/
    
    // Add new Module
    const [modules, setModules] = useState([]);
    
    const dataInitialModule = () => {
        return {
            name: 'Inicio',
            status: true,
            icon: 'home',
            scop: 'home'
        }
    }
    const [module, setModule] = useState(dataInitialModule());
    
    const pushModule = menu => {
        let exist = false;
        modules.map(x => {
            if (x.scop === menu.scop) {
                exist = true;
                activeModule(menu);
            }
        });
    
        if (!exist) {
            const payload = {
                name: menu.name,
                status: true,
                icon: menu.icon,
                scop: menu.scop
            };
            setModules([...modules, payload]);
            setModule(payload);
        }
    }
    
    // Controller Modules (Add Module, Active Module)
    
    const activeModule = (_module) => {
        const newModules = [];
        modules.map(x => {
            
            let newItem = x;
            
            if (x.scop !== _module.scop) newItem.status = false;
            if (x.scop === _module.scop) {
                newItem.status = true;
                setModule(newItem);
            }
            
            newModules.push(newItem);
        })
        setModules(newModules);
    }
    
    //Controller Module (delete Module)
    
    const delteModule = (_module) => {
        const _modules = []
        modules.filter(x => x.scop !== _module.scop ? _modules.push(x) : null);
        setModules(_modules);
        
        // dejar en el ultimo modulo
        let moduleLast = undefined
        _modules.map(x => moduleLast = x);
        
        if (moduleLast !== undefined) {
            setModule(moduleLast);
        } else setModule(dataInitialModule());
    }
    
    return {
        setToken:saveToken,
        token,
        user,
        http,
        getToken,
        baseURL,
        logout,
        modules,
        setModules,
        activeModule,
        delteModule,
        pushModule,
        module
    }
}