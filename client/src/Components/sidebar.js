import React from "react";
import './sidebar.css';
import Internship from "../Pages/Internship";
import Image from '../radicalx.png';
import { TbLayoutDashboard } from 'react-icons/tb';
import { HiBadgeCheck, HiUserCircle } from 'react-icons/hi';
import { MdOutlineMenuBook, MdWorkOutline } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="space">
      <div className="image">
        <img src={Image} alt="Logo" />
      </div>
      <div className="rows"><TbLayoutDashboard /><span> Dashboard</span> </div>
      <div className="rows"> <HiBadgeCheck /><span> Apprenticeship</span></div>
      <div className="rows  "><MdOutlineMenuBook />
        <span>
          <BrowserRouter>
            <Routes>
              <Route path="/internship" element={<Internship />} />
            </Routes>
          </BrowserRouter>
        </span>
        Internship
      </div>
      <div className="rows"><MdWorkOutline /><span> Jobs</span></div>
      <div className="rows"> <FiSettings /><span>Settings</span></div>
      <div className="xsa"> <HiUserCircle /><span>User</span>s</div>
    </div>
  )
}
export default Sidebar;