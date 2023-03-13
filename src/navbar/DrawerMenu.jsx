import { useEffect, useState } from 'react'
import { Navigate, Outlet, Link } from "react-router-dom";
import useAuthContext from "../components/AuthUser";
import {Route, Routes } from "react-router-dom";
// estilos
import styles from '../styles/drawer-menu.module.css'
import { COLOR } from '../utils/theme';
import{ FaChevronCircleRight } from 'react-icons/fa'



export default function DrawerMenu() {
    const COLOR = "black";
    // Context
    const storeContext = useAuthContext();
    const [menus, setMenu] = useState([]);
    
    useEffect(() => {
        setMenu([
            {
                id: 1,
                name: 'Inicio',
                icon: 'house-user',
                scop: 'home',
                level: 1,
                link: '/',
                links: []
            },
            {
                id: 2,
                name: 'Ajustes',
                icon: 'sliders',
                level: 2,
                links: [
                    {
                        id: 1,
                        name: 'Facturas',
                        icon: 'book',
                        link: '/invoice/Invoice',
                        scop: 'listado',
                    },
                    {
                        id: 2,
                        name: 'Clases Contables',
                        icon: 'clone',
                        link: '',
                        scop: 'accounting-classes',
                    },
                    {
                        id: 3,
                        name: 'Plan único de cuentas',
                        icon: 'folder',
                        link: '',
                        scop: 'single-chart-of-accounts',
                    }
                ]
            }
        ]);
        controlSectionMenuOpen();
    },[])
    /**
     * controllar para abrir el contenido de un menu
     */
    const controlSectionMenuOpen = () => {
        menus.map(_manu => {
            if (_manu.level === 2) {
                _manu.links.map(_link => {
                    if (Route.pathname === _link.link) {
                        console.log("aqui");
                        
                        // abrir contenido
                        const item = document.getElementById(`collapseItemMenu-${_manu.id}`)
                        if (item !== undefined) item.style.display = 'block'
                    }
                })
            }
        })
    }
    
    /**
     * Navegar a un link presionado
     */
    const goToLink = (menu, type) => {
        
        if (type === 1) {
            if (menu.level === 1) { // menu links unicos
               // storeContext.pushModule(menu);
            } else {
                
                // cerrar los demas menus (contenidos)
                menus.map(x => {
                    const item = document.getElementById(`collapseItemMenu-${x.id}`)
                    console.log(item)
                    if (item !== undefined) item.style.display = 'none'
                })
                
                // menus desplegables
                const itemContent = document.getElementById(`collapseItemMenu-${menu.id}`)
                
                if (itemContent !== undefined) {
                    if (itemContent.classList.toggle('openMenu')) {
                        itemContent.style.display = 'block'
                    } else itemContent.style.display = 'none'
                }
                
            }
        } else 0; //storeContext.pushModule(menu);
    }
    
    return (<nav
            className="h-screen relative border-r-2 border-orange-500 bg-orange-500"
            style={{ width: storeContext.menuDrawer ? '310px' : '90px' }}
        >
            
            <div className='absolute -right-6 top-6 z-10 w-fit h-fit bg-gray-200 rounded-full'>
                {/*migrar span para usar los iconos de react y no importar una libreria de iconos directamente*/}
                <span
                
                ><FaChevronCircleRight/></span>
            </div>
            
            { /* menu */}
            <div className={styles.menuItems} id="accordionMenu" >
                
                <h1 className='font-bold mt-5 p-4' style={{ fontSize: storeContext.menuDrawer ? '70px' : '14px' }}>Hospital</h1>
                
                {
                    menus.map((menu, key) => (
                        
                        <div key={key} >
                            <div className="my-1 px-4 py-3 text-xl cursor-pointer rounded-full hover:bg-orange-400" style={{ color: COLOR }}
                                 onClick={() => goToLink(menu, 1)} >
                            <span className="flex justify-between items-center"
                                  type="button" >
                                
                                <span className="text-gray-200 fa fa-chevron-circle-right" ></span>
                            </span>
                            </div>
                            
                            {
                                menu.level === 2 && (<div id={'collapseItemMenu-' + menu.id}
                                                          className={styles.sectionMenu} >
                                    <ul> {
                                        menu.links.map((link, keyLinks) => (<li key={keyLinks}
                                                                                className="py-2 pl-2 flex items-center rounded-full justify-between py-3 cursor-pointer hover:bg-orange-400"
                                                                                onClick={
                                                                                    () => goToLink(link, 2)} >
                                                <div className="flex items-center" style={{ color: COLOR, width: storeContext.menuDrawer ? '' : 30 }}>
                                                    <i className={'mr-2 text-center fa fa-' + link.icon} style={{ fontSize: storeContext.menuDrawer ? 20 : 22 }}> </i>
                                                     <span className='text-base'> {link.name} </span>
                                                </div>
                                                <span className="text-gray-200 fa fa-angle-right mr-2" > </span> </li>
                                        ))
                                    } </ul>
                                </div>)
                            } </div>
                    ))
                } </div>
        </nav>
    )
}