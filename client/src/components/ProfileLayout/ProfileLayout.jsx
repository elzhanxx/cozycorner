import React from "react";
import './ProfileLayout.scss'
import AccountNav from "@/components/AdditionalComponnets/AccountNav.jsx";
import {Loader2, Upload} from "lucide-react";
import exitImg from "@/assets/images/exit-svgrepo-com.svg";
import deleteImg from "@/assets/images/delete-1-svgrepo-com.svg";
import {Outlet} from "react-router-dom";

const ProfileLayout = () => {

    return (
        <div className={`profile-container`} style={{padding: '100px 0'}}>
            <AccountNav />
           <Outlet/>
        </div>
    );
};


export default ProfileLayout;
