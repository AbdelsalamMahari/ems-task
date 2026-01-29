import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import './HeaderNavigator.css'

const HeaderNavigator = ({ title, description }: any) => {
  const navigate = useNavigate();
  return (
    <div className="header-nav-cont">
      <div className="arrow-title" onClick={() => navigate(-1)}>
        <IoIosArrowBack fontSize={32} />
        <h1 style={{ fontSize: "32px" }}>{title}</h1>
      </div>
      <p style={{ fontSize: "14px" }}>{description}</p>
    </div>
  );
};

export default HeaderNavigator;
