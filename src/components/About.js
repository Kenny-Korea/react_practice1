import React from "react";
import { Outlet } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>우리 회사는 블라블라...</h4>
      {/* 하위 항목들이 보여질 곳 (Outlet) */}
      <Outlet></Outlet>
    </div>
  );
};

export default About;
