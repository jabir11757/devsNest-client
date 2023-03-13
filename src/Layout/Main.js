import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <div className='flex justify-center my-6'>
                <NavLink to='/task-4' className={({ isActive }) => isActive ? 'mx-4 text-xl text-green-300 font-semibold' : 'mx-4 text-xl font-semibold'}>Task-4</NavLink>
                <NavLink to='/task-5' className={({ isActive }) => isActive ? 'mx-4 text-xl text-green-300 font-semibold' : 'mx-4 text-xl font-semibold'}>Task-5</NavLink>
            </div>
            <Outlet />
        </div>
    );
};

export default Main;