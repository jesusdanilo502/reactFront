// Estate Global
import useAuthContext from '../components/AuthUser';

//styles
import { COLOR } from '../utils/theme.js';
import { FaWindowClose } from 'react-icons/fa';

export  default function NavBar (props) {
    const storeContext = useAuthContext();
    console.log('recuperando el user'+ storeContext.user.name)
    /**
     * Controlar el estado del nav Izquierdo
     */
  //  const controlNavRight = () => storeContext.setStateNavR(!storeContext.stateNavR);
    const {token,logout} = useAuthContext();
    const logoutUser = () => {
        if(token !== undefined){
            logout();
        }
    }
    return(
        <nav className='bg-white w-full p-2' style={{ height: 70 }}>
            <div className="px-4">
                <div className="flex">
                    <div className="flex w-full justify-between">
                       
                        <div className="hidden md:flex items-center space-x-1">
                            <span type="button" className="py-4 px-2 font-bold cursor-pointer" style={{ color: COLOR }}>
                                <i className='fa fa-user mr-2'></i>
                                {storeContext.user.name}
                            </span>
                            <div onClick={logoutUser} className='px-4 py-1 rounded cursor-pointer text-white' style={{ backgroundColor: COLOR }}>
                                <span className='text-white font-bold ml-1'>Salir </span>
                                <FaWindowClose/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )}