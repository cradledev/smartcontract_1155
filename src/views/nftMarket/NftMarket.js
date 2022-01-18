import React, {useState, useEffect} from "react";
import { ConnectWallet } from "../../components/utils/ConnectWallet";
import axios  from "axios";
import './NftMarket.css';

const NftMarket = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [file, setFile] = useState(null);


  let ipfsArray = [];
  let promises = [];

  useEffect(async () => {

  }, []);
  const connectWalletPressed = async () => { 
    const walletResponse = await ConnectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => { 

  };

  const fileOnChange = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      console.log("Buffer data: ", Buffer(reader.result));
      setFile(Buffer(reader.result));
      const index = 5;
      let paddedHex = ("0000000000000000000000000000000000000000000000000000000000000000" + index.toString(16)).substr("-64");
      console.log(paddedHex);
    }

    e.preventDefault();  
  }
  
  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <button id="walletButton" className="btn btn-primary float-right" onClick={connectWalletPressed}>
            {walletAddress.length > 0 ? (
              "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
        </div>
        <div className="col-2"></div>
      </div>
      <div className="clearfix"></div>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 mt-3">
          <form>
            <div className="form-group">
              <input type="file" name="file" onChange={fileOnChange}/>
              <br></br>
              <label className="info">THis is the image url hashed from IPFS;</label>
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="form-control" id="uname" placeholder="e.g. My first NFT!"
                onChange={(event) => setName(event.target.value)} placeholder="Enter NFT Name" name="uname" />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea className="form-control" rows="5" placeholder="e.g. Even cooler than cryptokitties ;)"
            onChange={(event) => setDescription(event.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default NftMarket;