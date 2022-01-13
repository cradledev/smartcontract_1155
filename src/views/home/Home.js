import React from "react";
import { useNavigate, useLocation } from "react-router";
import './Home.css'; 
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 style={{textTransform:'uppercase'}}>welcome to Cimple Dai company!</h1>
      <button className="btn btn-primary" onClick={() => navigate('/governance', { replace: true })}>Go Back</button>
    </>
  );
};

export default Home;