import React, { useState } from 'react'

//import image 
import { ReactComponent as PitoLogoSmall } from 'assets/images/pito-small.svg'
import { ReactComponent as DashboardIcon } from 'assets/images/dashboard-icon.svg'
import { ReactComponent as MerchantListIcon } from 'assets/images/merchantlist-icon.svg'
import { ReactComponent as UserlistIcon } from 'assets/images/userlist-icon.svg'
import { ReactComponent as AnalyticIcon } from 'assets/images/analytic-icon.svg'
import { ReactComponent as TicketIcon } from 'assets/images/ticketsup-icon.svg'
import { ReactComponent as CategoriesIcon } from 'assets/images/categories-icon.svg'
import { ReactComponent as LogoutIcon } from 'assets/images/logout-icon.svg'
import { ReactComponent as Hamburger } from 'assets/images/hamburger.svg'
import { ReactComponent as LivestreamIcon } from 'assets/images/livestream-icon.svg'
import Avatar from 'react-avatar';

//import components
import ListMenu from './listMenu/index'

//Import toastify notify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SideNavbar = () => {
    const classNameSVG = "icon mx-auto"
    const [isOpen, setIsOpen] = useState(true)
    const [token] = useState(localStorage.getItem('PITO:token'))
    const [img] = useState(localStorage.getItem('PITO:img'))
    const [name] = useState(localStorage.getItem('PITO:name'))

    function logout() {
        if (token) {
            toast.success('you have successfully logged out')
            localStorage.clear();
            window.location.href = "/"
        }
    }
    return (
        <>
            <ToastContainer position="top-right" />
            <div className="min-w-screen w-full flex justify-between xl:hidden bg-gray-800 items-center">
                <div className="px-4 py-3">
                    <PitoLogoSmall />
                </div>
                <div className="mb-navbar flex items-center px-4 py-3">
                <h5 className="text-white text-xs text-center px-2">Hello, <br /><span className="font-medium text-red-600 text-xs">{name}</span></h5>
                    {
                        img ? (<img style={{ width: 70, height: 70, borderRadius: 70 / 2 }} src={img} className="avatar mr-2 md:mr-0 mx-auto" alt={name}></img>) :
                            (<Avatar name={name} className="avatar mr-2 md:mr-0 mx-auto" round={true} size="75px" />)
                    }
                    <button onClick={() => setIsOpen(!isOpen)}><Hamburger /></button>
                </div>
            </div>

            <div className={[
                "h-full fixed overflow-auto z-40 top-0 left-0 bg-gray-800 overflow-x-hidden transition-all duration-150 pt-13", !isOpen ? "w-full" : "w-0"
            ].join(" ")}>
                <div className="w-full flex justify-between items-center px-4 py-4">
                    <PitoLogoSmall className="" />
                    <button className="py-4 xl:hidden focus:outline-none float-right" onClick={() => setIsOpen(!isOpen)}>
                        <svg fill="#FFFFFF" viewBox="0 0 20 20" className="w-6 h-6">
                            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                        </svg>
                    </button>
                </div>
                <div className="py-2 w-full">
                    <section>
                        <ListMenu dashboard={true} linkTo="/dashboard">
                            <DashboardIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/livestream">
                            <LivestreamIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/merchant">
                            <MerchantListIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/user">
                            <UserlistIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/analytic">
                            <AnalyticIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/ticket">
                            <TicketIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/categories">
                            <CategoriesIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu button={true} logout={logout}>
                            <LogoutIcon className={classNameSVG} />
                        </ListMenu>
                    </section>
                </div>
            </div>

            <div className="sidebar hidden xl:block">
                <div className="py-4 w-130px">
                    <button className="px-4 py-4 md:hidden focus:outline-none float-right">
                        <svg fill="#FFFFFF" viewBox="0 0 20 20" className="w-6 h-6">
                            <path x-show="open" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                        </svg>
                    </button>
                </div>
                <div className="py-4 w-130px">
                    <PitoLogoSmall className="mx-auto" />
                    <div className="profile pt-6 text-center">
                        {
                            img ? (<img style={{ width: 70, height: 70, borderRadius: 70 / 2 }} src={img} className="mx-auto" alt={name}></img>) :
                                (<Avatar name={name} className="mx-auto" round={true} size="75px" />)
                        }
                        <h5 className="text-white text-xs text-center px-2">Hello, <br /><span className="font-medium text-red-600 text-xs">{name}</span></h5>
                    </div>
                    <section className="mt-2">
                        <ListMenu linkTo="/dashboard">
                            <DashboardIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/livestream">
                            <LivestreamIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/merchant">
                            <MerchantListIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/user">
                            <UserlistIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/analytic">
                            <AnalyticIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/ticket">
                            <TicketIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu linkTo="/categories">
                            <CategoriesIcon className={classNameSVG} />
                        </ListMenu>
                        <ListMenu button="button" logout={logout}>
                            <LogoutIcon className={classNameSVG} />
                        </ListMenu>
                    </section>
                </div>
            </div>
        </>
    )
}

export default SideNavbar;
