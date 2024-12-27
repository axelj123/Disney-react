import React, { useState } from 'react';
import logo from './../assets/img/disneylogo.png';

import {
    HiHome, HiMagnifyingGlass, HiStar, HiPlayCircle, HiTv
} from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import HeaderItem from './HeaderItem';
import SearchModal from './SearchModal';
import { Link } from 'react-router-dom';

function Header() {
    const [toggle, setToggle] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const menu = [
        {
            name: 'HOME',
            icon: HiHome,
            path: '/'
        },
        {
            name: 'SEARCH',
            icon: HiMagnifyingGlass,
            onClick: () => setIsSearchOpen(true),
        },
        {
            name: 'WATCH LIST',
            icon: HiPlus,
            path: '/watchlist'
        },
        {
            name: 'ORIGINALS',
            icon: HiStar,
            path: '/originals'
        },
        {
            name: 'MOVIES',
            icon: HiPlayCircle,
            path: '/movies'
        },
        {
            name: 'SERIES',
            icon: HiTv,
            path: '/series'
        }
    ];




    return (
        <>
            <div className='flex items-center justify-between p-5 text-white'>
                <div className='flex items-center gap-10'>
                    <img src={logo} className='w-[70px] md:w-[115px] object-cover' alt="Logo" />

                    <div className='hidden md:flex gap-12'>
                        {menu.map((item) => (
                            <Link to={item.path} key={item.name} onClick={item.onClick} className='cursor-pointer'>
                                <HeaderItem name={item.name} Icon={item.icon} />

                            </Link>


                        ))}
                    </div>

                    <div className='flex md:hidden relative gap-6'>
                        {menu.slice(0, 3).map((item) => (
                            <Link to={item.path} key={item.name} onClick={item.onClick}>

                                <HeaderItem  name={''} Icon={item.icon} />

                            </Link>
                        ))}

                        <div onClick={() => setToggle(!toggle)}>
                            <HeaderItem name={''} Icon={HiDotsVertical} />
                        </div>

                        {toggle && (
                             <div className='absolute bg-[#121212] border border-gray-700 right-0 px-2 py-2 mt-7 rounded-md transform translate-x-4'>
                             {menu.slice(3).map((item) => (
                                 <Link to={item.path} key={item.name} onClick={item.onClick} className='cursor-pointer'>
                                     <HeaderItem name={item.name} Icon={item.icon} />
                                 </Link>
                             ))}
                         </div>
                        )}
                    </div>

                </div>

                <img
                    src="https://avatars.githubusercontent.com/u/107971912?v=4"
                    className='w-[40px] rounded-full'
                    alt="User Avatar"
                />
            </div>
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />

        </>
    );
}

export default Header;
