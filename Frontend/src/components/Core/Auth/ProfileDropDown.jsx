import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { logout } from '../../../services/operation/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import useClickOutside from '../../../hooks/useClickOutside';

const ProfileDropDown = () => {
  const {user} = useSelector((select) => select.profile)
  const [show,setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useClickOutside(() => setShow(false));
  // console.log(user);
  return (
    <div>
        <div  ref={ref} className={'flex items-center text-richblack-50 relative'} onClick = {()=>setShow((prev) => !prev)}>
          
          <img src={user?.image} alt="user image" className='w-8 rounded-full '/>
          <IoMdArrowDropdown/>
          {
            show && (
              <div className={`absolute top-10 -right-5 bg-richblack-700  rounded-md z-50 `}>
                    <Link to="/dashboard/my-profile">
                    <div className='flex gap-1 items-center py-2 px-4 rounded-t-md hover:bg-richblack-500 hover:text-richblack-25'>
                    <VscDashboard className='text-lg'/>
                      <p>Dashboard</p>
                    </div>
                    </Link>
                    <div className='flex gap-1 items-center py-2 px-4 rounded-b-md hover:bg-richblack-500 hover:text-richblack-25'
                    onClick={()=>dispatch(logout(navigate))}>
                    <VscSignOut className='text-lg'/>
                    <p>Logout</p>
                  </div>
              </div>
            )
          }
          
        </div>
    </div>
  )
}
export default ProfileDropDown;