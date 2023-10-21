import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeIcon, Menu, TextIcon, TimerIcon } from 'lucide-react';

import logo from "@/assets/imgs/SD_logo_baseline_RGB.png"
const variants = {
    open: { width: '250px' },
    closed: { width: '60px' },
};

type SidebarPropsType = {
    defaultOpen?: boolean;
    title?: string;
    logoImagePath?: string;
}

const Sidebar: React.FC<SidebarPropsType> = ({ defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(defaultOpen)
    }, [defaultOpen])


    return (
        <motion.div
            className="h-full shadow-md flex fixed left-0 flex-col items-center transition-all duration-100 bg-white z-30"
            variants={variants}
            initial={`${defaultOpen} ? 'open': 'close'`}
            animate={isOpen ? 'open' : 'closed'}
        >
            <div
                className="p-4 cursor-pointer w-full"

            >
                <AnimatePresence>
                    {isOpen ? (
                        <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }} transition={{ delay: 0.2 }} className="flex w-full justify-between items-center">
                            <div className=''>
                                <img src={logo} className='w-40' />
                            </div>
                            <Menu onClick={() => setIsOpen(!isOpen)} />
                        </motion.div>
                    ) : (
                        <Menu onClick={() => setIsOpen(!isOpen)} />
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col items-center space-y-4 w-full mt-4">
                <a className={` ${isOpen ? 'w-44' : 'w-auto'}`} href={"/"}><NavItem isOpen={isOpen} icon={<HomeIcon name='home' className='w-4 h-4' />} text={"Home"} /></a>
                <a className={` ${isOpen ? 'w-44' : 'w-auto'}`} href={"/summary"}><NavItem isOpen={isOpen} icon={<TextIcon name='summary' className='w-4 h-4' />} text={"Summary"} /></a>
                <a className={` ${isOpen ? 'w-44' : 'w-auto'}`} href={"/meetingstatus"}><NavItem isOpen={isOpen} icon={<TimerIcon name='meetingstatus' className='w-4 h-4' />} text={"Meeting Status"} /></a>

            </div>
        </motion.div>
    );
};

const NavItem: React.FC<{ isOpen: boolean, icon: JSX.Element | string, text: string }> = ({ isOpen, icon, text }) => {
    return (
        <div className="flex w-full items-center justify-center gap-2 flex-1 hover:bg-sdorange hover:text-white cursor-pointer py-2 px-1 rounded-md">
            <span className="">{icon}</span>
            <AnimatePresence mode='sync'>
                {isOpen && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {text}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Sidebar;
