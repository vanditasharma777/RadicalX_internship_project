import React from "react";
import './sidebar.css';
import Internship from "../Pages/Internship";
import Image from '../radicalx.png';
import {TbLayoutDashboard}from 'react-icons/tb';
import{HiBadgeCheck,HiUserCircle} from 'react-icons/hi';
import{MdOutlineMenuBook, MdWorkOutline} from 'react-icons/md';
import {FiSettings} from 'react-icons/fi';
import {BrowserRouter, Router} from 'react-router-dom';
function Sidebar(){
    return(
        <div class="space">
     <div class="image">
       <img src={Image} alt="Logo" />
     </div>
     <div class="rows"><TbLayoutDashboard/><span> Dashboard</span> </div>
     <div class="rows"> <HiBadgeCheck/><span> Apprenticeship</span></div>
     <div class="rows  "><MdOutlineMenuBook/>
     <span>
     <BrowserRouter>
        
       <a href={<Internship/>} target="_self">Internship</a>
       
       </BrowserRouter></span>
       </div>
     <div class="rows"><MdWorkOutline/><span> Jobs</span></div>
     <div class="rows"> <FiSettings/><span>Settings</span></div>
     <div className="xsa"> <HiUserCircle/><span>User</span>s</div>
     </div>
    )
}
export default Sidebar;