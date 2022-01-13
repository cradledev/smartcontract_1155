import React from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import './NftMarket.css';

const NftMarket = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Fictive call to Google Analytics
    // ga.send(["pageview", location.pathname])
    return (
      <div>
        <h1>NftMarket</h1>
        <button onClick={() => navigate('/', { replace: true })}>Go Back</button>
      </div>
    );
};

export default NftMarket;