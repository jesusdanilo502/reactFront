import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';



export default function Dashboard (){
    const [userdetail, setUserdetail]= useState('');
    const {token} = AuthUser();
    console.log('eltokennnnnnnn'+token)
    useEffect( ()=>{
        fetchUserDetail();
    },[]);
    
    const fetchUserDetail =  () => {
     fetch (`http://127.0.0.1:8000/api/me`,{
        method: 'POST',
        headers: {
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
    }).then((res)=>{
        setUserdetail(res.data);
        console.log(res.data)
    })
    }
    function renderElement(){
        if(userdetail){
            return <div>
                <h4>Name</h4>
                <p>{userdetail.name}</p>
                <h4>Email</h4>
                <p>{userdetail.email}</p>
            </div>
        }else{
            return <p>Loading.....</p>
        }
        
    }
    
    return(
        <div>
            <h1 className='mb-4 mt-4'>Dashboard page</h1>
            { renderElement() }
        </div>
    )
}