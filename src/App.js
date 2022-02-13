
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';

import Home from './views/home/Home';
import Governance from './views/governance/Governance';
import NftMarket from './views/nftMarket/NftMarket';
import {Navbar, NavDropdown, Nav, Container, Button} from "react-bootstrap";

import Referral_Code_generator from 'voucher-code-generator';
import {ConnectWallet} from './components/utils/ConnectWallet';
import {LoadBlockchainData} from './components/utils/LoadBlockchainData';


function App () {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [cimpleDaoContract, setCimpleDaoContract] = useState('');
  const [cimpleNFTContract, setCimpleNFTContract] = useState('');
  const [cimpleDaoAddress, setCimpleDaoAddress] = useState('');
  const [cimipleNFTAddress, setCimpleNFTAddress] = useState('');

  const generateReferralCode = () => {
    const referralCode = Referral_Code_generator.generate({
      count: 1,
      length: 8,
      charset: "0123456789"
    });
    return referralCode[0];
  }

  const checkUniqueForReferralCode = async () => {
    
    try {
      let userAddresses;
      let referralIDs
      [userAddresses, referralIDs] = await cimpleDaoContract.getUsersInfo();
      console.log(userAddresses);
      console.log(referralIDs);
      let found = true;
      let referralCode;
      while (found) {
        console.log("infinite");
        referralCode = generateReferralCode();
        found = referralIDs.some(el => el === referralCode.toString());
      }
      return referralCode;
    } catch (error) {
      console.log(error);
    }
    
  }
  const pressWalletConnect = async () => {
    try {
      const walletResponse = await ConnectWallet();
      setStatus(walletResponse.status);
      setWallet(walletResponse.address);
      let isRegisterUser;
      [isRegisterUser, ] = await cimpleDaoContract.isUser(walletResponse.address);
      if(!isRegisterUser) {
        const _generatedReferralCode = await checkUniqueForReferralCode();
        console.log(_generatedReferralCode);
        alert("Your ReferralCode is" + _generatedReferralCode);
        await cimpleDaoContract.createAccount(walletResponse.address, _generatedReferralCode.toString());
        cimpleDaoContract.on('CreatedNewUser', (_, __) => {
          alert("successfully created.");
        });
      }
      let userAddresses;
      let referralIDs
      [userAddresses, referralIDs] = await cimpleDaoContract.getUsersInfo();
        console.log(userAddresses, referralIDs);
      } catch (error) {
        console.log(error);
      }
    

    
  }

  useEffect(async() => {
    try {
      const {cimpleDaoContract, cimpleNFTContract, cimpleDaoAddress,ciimpleNFTAddress, balance, web3, address} = await LoadBlockchainData();
      setCimpleDaoContract(cimpleDaoContract);
      setCimpleNFTContract(cimpleNFTContract);
      setCimpleDaoAddress(cimpleDaoAddress);
      setCimpleNFTAddress(ciimpleNFTAddress);
      
    } catch (error) {
      console.log(error);
      // alert("Contract is not loaded yet.");
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="/governance">Cimple</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
                <Nav.Link as={Link} to="/governance">Governance</Nav.Link>
                <Nav.Link as={Link}  to="/nftMarket">NFT Market</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse id="responsive-navbar-nav1" className="justify-content-end">
              <Navbar.Text style={{color:"#0d6efd"}}>
                <Button variant='primary'onClick={() => pressWalletConnect()} className="px-4 py-1">
                {walletAddress.length > 0 ? (
                  "Connected: " +
                  String(walletAddress).substring(0, 6) +
                  "..." +
                  String(walletAddress).substring(38)
                ) : (
                  <span>Create Account</span>
                )}
                </Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/governance" element={<Governance />} />
          <Route path="/nftMarket" element={<NftMarket />} />
          <Route path="/" exact element={<Governance />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
