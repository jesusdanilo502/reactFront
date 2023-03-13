import { useState } from "react"
import AuthUser from './AuthUser';


export default function Login() {
    const {http} = AuthUser();
    const {token,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const authContext = AuthUser();
    console.log('urlllllll'+ authContext.baseURL)
    const submitForm = () =>{
/*
        const response =  fetch('http://127.0.0.1:8000/api/login',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Authorization': `Bearer ${token}`,
            },
            body:{email:email,password:password}
        }).then((res) => {
            console.log(res.data);
            setToken(res.data.user,res.data.access_token);
        })
    */
        http.post('/login',{email:email,password:password}).then((res)=>{
            setToken(res.data.user,res.data.access_token);
            console.log(res.data)
        })
        
    }
    
    return(
        <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div
                            className="
                              relative
                              mx-auto
                              max-w-[525px]
                              overflow-hidden
                              rounded-lg
                              bg-white
                              py-16
                              px-10
                              text-center
                              sm:px-12
                              md:px-[60px]
                            "
                        >
                            <div className="mb-10 text-center md:mb-16">
                                <h1 className="mb-2 text-2xl">ERP</h1>
                                <span className="text-gray-300">Sistema De Información</span>
                             
                                    <img src="https://img.icons8.com/external-smashingstocks-filled-outline-smashing-stocks/256/external-ERP-human-resources-smashingstocks-filled-outline-smashing-stocks.png" width="150" alt=""  />
                              
                            </div>
                           
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        id="email"
                                        className="
                                        border-[#E9EDF4]
                                        w-full
                                        rounded-md
                                        border
                                        bg-[#FCFDFE]
                                        py-3
                                        px-5
                                        text-base text-body-color
                                        placeholder-[#ACB6BE]
                                        outline-none
                                        focus:border-primary
                                        focus-visible:shadow-none
                                      "
                                    />
                                    
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        id="pwd"
                                        className="
                                        bordder-[#E9EDF4]
                                        w-full
                                        rounded-md
                                        border
                                        bg-[#FCFDFE]
                                        py-3
                                        px-5
                                        text-base text-body-color
                                        placeholder-[#ACB6BE]
                                        outline-none
                                        focus:border-primary
                                        focus-visible:shadow-none
                                       "
                                    />
                                </div>
                                <div className="mb-10">
                                    <button
                                        type="submit"
                                        className="
                                        w-full
                                        px-4
                                        py-3
                                        bg-indigo-500
                                        hover:bg-indigo-700
                                        rounded-md
                                        text-white
                                      "
                                        onClick={submitForm}
                                    >
                                        Ingresar
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}