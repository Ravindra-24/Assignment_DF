import React from 'react';
import homeIcon from '../../assets/sidebar_icons/home.png';
import categoryIcon from '../../assets/sidebar_icons/category.png';
import productIcon from '../../assets/sidebar_icons/product.png';
import { NavLink } from 'react-router-dom';
import Category from '../../layout/Category/Category';

const Sidebar = () => {
    return (
        <div className=" bg-[#F4F4F4] fixed h-screen w-[15rem] font-sans mt-[4rem]">
            <div className="">
                <NavLink to={"/"} className="flex w-full p-4 mt-5"><span className='flex'><img src={homeIcon} alt="home" width={20} height={20} className='mr-2'/>Home</span></NavLink>
                <NavLink to={"/category"} className="flex py-2 p-4 mt-5"><span><img src={categoryIcon} alt="home" width={20} height={20} className='mr-2'/></span>Category</NavLink>
                <NavLink to={"/product"} className="flex py-2 p-4 mt-5"><span><img src={productIcon} alt="home" width={20} height={20} className='mr-2'/></span>Product</NavLink>
            </div>
        </div>
    );
};


export default Sidebar;
