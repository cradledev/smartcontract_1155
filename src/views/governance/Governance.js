import React, { useEffect, useState, useRef } from "react";
import { useNavigate} from "react-router";
import { ethers } from 'ethers';
import { Container, Row, Col, Card, Button, Image, ListGroup, InputGroup,Form, FormControl,ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faThumbsUp,faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import Icon from "react-crypto-icons";
import { LoadBlockchainData  } from "../../components/utils/LoadBlockchainData";
import './Governance.css';

    
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

const Governance = () => {
  const [wallet, setWallet] = useState('undefined');
  const [status, setStatus] = useState('');
  const [cimpleDaoContract, setCimpleDaoContract] = useState('');
  const [cimpleNFTContract, setCimpleNFTContract] = useState('');
  const [cimpleDaoAddress, setCimpleDaoAddress] = useState('');
  const [cimipleNFTAddress, setCimpleNFTAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [web3, setWeb3] = useState('');
  const [processing, setProcessing] = useState(false);
  const [payTypeForFee, setPayTypeForFee] = useState('ETH');
  const [payFeeAmount, setPayFeeAmount] = useState(0);
  const [cimpleIR, setCimpleIR] = useState(0);
  const [cimpleIRAfterOneYear, setCimpleIRAfterOneYear] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);
  const [cmpgBalanceCalculated, setCmpgBalanceCalculated] = useState(0);
  // tokens balance
  const [balanceOfCimpleToken, setBalanceOfCimpleToken] = useState(0);
  const [balanceOfstCimpleToken, setBalanceOfstCimpleToken] = useState(0);
  const [balanceOfCMPG, setBalanceOfCMPG] = useState(0);

  const[stakeAmount, setStakeAmount] = useState(0);

  // nft user list
  const[nftFirstUserList, setNftFirstUserList] = useState([]);
  const navigate = useNavigate();
  // const location = useLocation();
  // Fictive call to Google Analytics
  // ga.send(["pageview", location.pathname])
  const cmpgData = [
    {tokenName:"eth", quantity:100, usdValue:40000},
    {tokenName:"dai", quantity:100, usdValue:40000},
    {tokenName:"matic", quantity:100, usdValue:40000},
    {tokenName:"usdt", quantity:100, usdValue:40000}
  ];

  const voteSectionData = [
    {description:"Return unclaimed distributed CMPG to Gov Treasury", status:2, progress:50},
    {description:"Update Cimple Staking allocation", status:0, progress:50},
    {description:"Pass integrate Pooltogether", status:1, progress:50},
    {description:"Return unclaimed distributed CMPG to Gov Treasury", status:2, progress:50},
    {description:"Update Cimple Staking allocation", status:0, progress:50},
    {description:"Pass integrate Pooltogether", status:1, progress:50},
    {description:"Return unclaimed distributed CMPG to Gov Treasury", status:2, progress:50},
    {description:"Update Cimple Staking allocation", status:0, progress:50},
    {description:"Update Cimple Staking allocation", status:1, progress:50}
  ];

  useInterval(async () => {
    try {
      let sTimeStamp = Date.now();
      sTimeStamp = Math.floor(sTimeStamp / 1000);
      const balanceOfCMPG = await cimpleDaoContract.balanceOf(wallet, 2);
      setBalanceOfCMPG(ethers.utils.formatUnits(balanceOfCMPG, 28));
      const [ss, ss1, ss2] = await cimpleDaoContract.testCalculateReward(wallet, sTimeStamp);
      setCmpgBalanceCalculated(ethers.utils.formatUnits(ss, 28))
      // const userInfo = await cimpleDaoContract.getUserInfo(wallet);
      // console.log(userInfo.cimpleValue);
      // console.log(ethers.utils.formatUnits(ss, 0), ethers.utils.formatUnits(ss1, 0), ethers.utils.formatUnits(ss2, 0));
    } catch (error) {
      console.log("error is ", error);
    }
  }, 10000)
  // function addWalletListener() {
  //   if (window.ethereum) {
  //     window.ethereum.on("accountsChanged", (accounts) => {
  //       if (accounts.length > 0) {
  //         setWallet(accounts[0]);
  //         setStatus("👆🏽 Write a message in the text-field above.");
  //       } else {
  //         setWallet("");
  //         setStatus("🦊 Connect to Metamask using the top right button.");
  //       }
  //     });
  //   } else {
  //     setStatus(
  //       <p>
  //         {" "}
  //         🦊{" "}
  //         <a target="_blank" href={`https://metamask.io/download.html`}>
  //           You must install Metamask, a virtual Ethereum wallet, in your
  //           browser.
  //         </a>
  //       </p>
  //     );
  //   }
  // }
  async function getBalanceForSeveralTokens() {
    if(web3 !== "undefined" || cimpleDaoContract !== "undefined") {
      try {
        const balanceOfCimpleToken = await cimpleDaoContract.balanceOf(wallet, 0);
        setBalanceOfCimpleToken(ethers.utils.formatUnits(balanceOfCimpleToken, 0));
        const balanceOfstCimpleToken = await cimpleDaoContract.balanceOf(wallet,1);
        setBalanceOfstCimpleToken(ethers.utils.formatUnits(balanceOfstCimpleToken, 0));
        const sTimeStamp = new Date()
        sTimeStamp = Math.floor(sTimeStamp / 1000);
        const sTimeStampAfterOneYear = sTimeStamp + 3154 * 1e4 + 864 * 1e2;
        const[cimpleIRAfterOneYear, ss1, ss2] = await cimpleDaoContract.calculateCimpleIR(sTimeStampAfterOneYear);
        setCimpleIRAfterOneYear(ethers.utils.formatUnits(cimpleIRAfterOneYear, 18));
      } catch (error) {
        console.log("error is ", error);
      }
    }
    setProcessing(false);
    setPayFeeAmount(0);
    setStakeAmount(0);
  }
  async function submitStaking() {
    if(stakeAmount === 0) {
      alert("Enter the amount more than 0");
    }else{
      if(stakeAmount <= balanceOfCimpleToken) {
        try {
          // User inputs amount in terms of Ether, convert to Wei before sending to the contract.
          // const wei = ethers.utils.parseUnits(stakeAmount, 18);
          // console.log(wei);
          await cimpleDaoContract.createStake(wallet, stakeAmount);
          // Wait for the smart contract to emit the LogBid event then update component state
          cimpleDaoContract.on('StakingCimpleToken', (_, __) => {
            getBalanceForSeveralTokens();
          });
          
        } catch (e) {
          console.log('error paying fee: ', e);
        }
      }else {
        alert("Not enough Cimple token to stake!");
      }
      
    }
  }
  async function submitUnstaking() {
    if(unstakeAmount === 0 || unstakeAmount === "") {
      alert("Enter the amount more than 0");
    }else{
      if(unstakeAmount*1 <= balanceOfstCimpleToken*1) {
        try {
          // User inputs amount in terms of Ether, convert to Wei before sending to the contract.
          // const wei = ethers.utils.parseUnits(stakeAmount, 18);
          // console.log(wei);
          await cimpleDaoContract.removeStake(wallet, unstakeAmount);
          // Wait for the smart contract to emit the LogBid event then update component state
          cimpleDaoContract.on('UnstakingCimpleToken', (_, __) => {
            getBalanceForSeveralTokens();
            setUnstakeAmount(0);
          });
          
        } catch (e) {
          console.log('error paying fee: ', e);
        }
      }else {
        alert("Not enough stCimple token to stake!");
      }
      
    }
  }
  async function submitPayFee(event) {
    event.preventDefault();
    setProcessing(true);
    if(cimpleDaoContract !== 'undefined'){
      if(payTypeForFee === "ETH"){
        if(payFeeAmount > 0){
          try {
            const wei = ethers.utils.parseUnits(payFeeAmount, 18);
            await cimpleDaoContract.payFee({value: wei.toString(), from:wallet});
            // Wait for the smart contract to emit the LogBid event then update component state
            cimpleDaoContract.on('PayFee', (_, __) => {
              getBalanceForSeveralTokens();
            });
            
          } catch (e) {
            console.log('error paying fee: ', e);
            setProcessing(false);
          }
        }else {
          alert("Please enter the amount......");
          setProcessing(false);
        }
      }
      if(payTypeForFee === "Cimple"){
        if(payFeeAmount > 0) {
          try {
            const wei = payFeeAmount;
            // console.log(wei);
            await cimpleDaoContract.payFeeByToken(wallet, wei);
            setProcessing(true);
            cimpleDaoContract.on('PayFee', (_, __) => {
              getBalanceForSeveralTokens();
              setProcessing(false);
            });
          } catch (error) {
            console.log('PayFee: ', error);
            setProcessing(false);
          }
        }else {
          alert("Please enter the Cimple token amount......");
          setProcessing(false);
          return;
        }
        
      }
    }
  }
  async function getTokenPriceByDate(selectedDate) {
    let sTimeStamp = new Date(selectedDate)
    sTimeStamp = sTimeStamp / 1000;
    const sTimeStampAfterOneYear = sTimeStamp + 3154 * 1e4 + 864 * 1e2;
    if(web3 !== "undefined" || cimpleDaoContract !== "undefined") {
      try {
        // const amount = parseEther(sTimeStamp.toString());
        // console.log(amount);
        const [cimpleIR, s1, s2] = await cimpleDaoContract.calculateCimpleIR(sTimeStamp);
        console.log(ethers.utils.formatUnits(cimpleIR, 18), ethers.utils.formatUnits(s1, 9), ethers.utils.formatUnits(s2, 0))
        setCimpleIR(ethers.utils.formatUnits(cimpleIR, 18));
        const[cimpleIRAfterOneYear, ss1, ss2] = await cimpleDaoContract.calculateCimpleIR(sTimeStampAfterOneYear);
        setCimpleIRAfterOneYear(ethers.utils.formatUnits(cimpleIRAfterOneYear, 18));
      } catch (error) {
        console.log("error token price of Cimple token", error);
      }
    }
  }
  useEffect(async() => {
    try {
      const {cimpleDaoContract, cimpleNFTContract, cimpleDaoAddress,ciimpleNFTAddress, balance, web3, address} = await LoadBlockchainData();
      setCimpleDaoContract(cimpleDaoContract);
      setCimpleNFTContract(cimpleNFTContract);
      setCimpleDaoAddress(cimpleDaoAddress);
      setCimpleNFTAddress(ciimpleNFTAddress);
      setBalance(balance);
      setWeb3(web3);
      setWallet(address);
      // await addWalletListener();
      const ss = await cimpleDaoContract.balanceOf(address, 0);
      setBalanceOfCimpleToken(ethers.utils.formatUnits(ss, 0));
      const balanceOfstCimpleToken = await cimpleDaoContract.balanceOf(address,1);
      setBalanceOfstCimpleToken(ethers.utils.formatUnits(balanceOfstCimpleToken, 0));
      let sTimeStamp = Date.now();
      sTimeStamp = Math.floor(sTimeStamp / 1000);
      const sTimeStampAfterOneYear = sTimeStamp + 3154 * 1e4 + 864 * 1e2;
      // console.log(sTimeStamp)
      const [cimpleIR, s1, s2] = await cimpleDaoContract.calculateCimpleIR(sTimeStamp);
      console.log(ethers.utils.formatUnits(cimpleIR, 18), ethers.utils.formatUnits(s1, 9), ethers.utils.formatUnits(s2, 0))
      setCimpleIR(ethers.utils.formatUnits(cimpleIR, 18));

      const[cimpleIRAfterOneYear, ss1, ss2] = await cimpleDaoContract.calculateCimpleIR(sTimeStampAfterOneYear);
      setCimpleIRAfterOneYear(ethers.utils.formatUnits(cimpleIRAfterOneYear, 18));
      // const [ff, sd] = await cimpleDaoContract.getStakeHolders();
      // console.log(ff, sd);

      // NFT First users list
      const nftUserList = await cimpleDaoContract.getNFTUserListAtFirst();
      console.log(nftUserList);
      setNftFirstUserList(nftUserList);
    } catch (error) {
      console.log(error);
      // alert("Contract is not loaded yet.");
    }
  }, []);
  return (
    <Container fluid style={{ paddingTop: '1rem', backgroundColor:'#edf2f9' }}>
      <Row>
        <Col xs={12} md={7} lg={7}>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <Card style={{ minHeight: '35rem' }}>
                <Card.Body>
                  <Card.Title><label className="card-title-small">unstaked balance</label></Card.Title>
                  <Card.Text>
                    <Image src="/img/governance/Cimple_token_unstaked.png"></Image> <label className="text-bolder paddingLeft15">{balanceOfCimpleToken} Cimple</label>
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <small>Current Rate</small>
                      </div>
                      <div className="ms-2 me-auto">
                        <small>{(cimpleIR * 1e9).toFixed(5)} GWEI</small>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <small>Tx Fee Discount value</small>
                      </div>
                      <div className="ms-2 me-auto">
                        <small>Item 2</small>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <small>Rate in 1 Year</small>
                      </div>
                      <div className="ms-2 me-auto">
                        <small> {(cimpleIRAfterOneYear * 1e9).toFixed(5)} GWEI</small>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <small>Discount in 1 Year</small>
                      </div>
                      <div className="ms-2 me-auto">
                        <small> {(cimpleIRAfterOneYear * 1e9).toFixed(5)} GWEI</small>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <small>1 Year increase</small>
                      </div>
                      <div className="ms-2 me-auto">
                        <small> {((cimpleIRAfterOneYear - cimpleIR) / cimpleIR * 100).toFixed(2)} %</small>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer>
                  <InputGroup className="">
                    <InputGroup.Text id="basic-addon1">Ci</InputGroup.Text>
                    <FormControl
                      placeholder="Enter eth amount to stake"
                      value={stakeAmount}
                      onChange={e => {
                        setStakeAmount(e.target.value);
                      }}
                      type='number'
                      aria-label="Enter eth amount to stake"
                      aria-describedby="basic-addon2"
                    />
                  </InputGroup>
                  <Button variant="primary" size="md" onClick={submitStaking} style={{marginTop:'10px', marginBottom:'10px'}}>Stake More</Button>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={6}>
            <Card style={{ minHeight: '35rem' }}>
                <Card.Body>
                  <Card.Title><label className="card-title-small">staked balance</label></Card.Title>
                  <Card.Text>
                    <Image src="/img/governance/Cimple_token_staked.png"></Image> <label className="text-bolder paddingLeft15">{balanceOfstCimpleToken} stCimple</label>
                  </Card.Text>
                  <Card.Title><label className="card-title-small">your cmpg balance</label></Card.Title>
                  <Card.Text>
                    <Image src="/img/governance/CMPG_token.png" className="img-responsive" style={{width:'45px', height:'45px'}}></Image> <label className="text-bolder paddingLeft15">{cmpgBalanceCalculated*1 + balanceOfCMPG*1} CMPG</label>
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <small>Total Supply</small>
                      </div>
                      <div className="ms-2 me-auto">
                        <small>Item 2</small>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <small>CMPG/day Reward</small>
                      </div>
                      <div className="ms-2 me-auto">
                        <small>Item 2</small>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <small>Treasure Asset Value</small>
                      </div>
                      <div className="ms-2 me-auto">
                        <small>Item 2</small>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <small>Daily Tx Fee Revenue</small>
                      </div>
                      <div className="ms-2 me-auto">
                        <small>Item 2</small>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer>
                  <InputGroup className="">
                    <InputGroup.Text id="basic-addon1">Ci</InputGroup.Text>
                    <FormControl
                      placeholder="Enter amount to withdraw"
                      aria-label="Enter amount to withdraw"
                      aria-describedby="basic-addon2"
                      type='number'
                      value={unstakeAmount}
                      onChange={e => {
                        setUnstakeAmount(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <Button variant="outline-primary" onClick={submitUnstaking} size="md" style={{marginTop:'10px', marginBottom:'10px'}}>Unstaking</Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row style={{ paddingTop: '1rem' }}>
            <Col xs={12} md={12} lg={12}>
              <Card>
                <Card.Body>
                  <div className="CMPG-table">
                    <table className="table">
                      <thead className="CMPG-thead">
                        <tr>
                          <th>CMPG TOKEN</th>
                          <th>Token Quantity</th>
                          <th>USD Value</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cmpgData.map((item, key) => {
                          return (
                            <tr key={key}>
                              <td><Icon name={item.tokenName} size={25} /><label style={{marginLeft:'10px', textTransform:'uppercase'}}>{item.tokenName}</label></td>
                              <td>{item.quantity}</td>
                              <td>{`$${item.usdValue}`}</td>
                              <td><Button variant="primary">Claim</Button></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col  xs={12} md={5} lg={5}>
          <Card>
            <Card.Body>
              <Card.Title><label className="card-title-small">vote selection</label></Card.Title>
              <div className="vote-selection">
                <table className="table">
                  <tbody>
                    {
                      voteSectionData.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td>{item.description}</td>
                            <td className="text-muted"><FontAwesomeIcon icon={faThumbsUp} color={item.status===1?"#20c997":""} size="lg" /></td>
                            <td className="text-muted"><FontAwesomeIcon icon={faThumbsDown} color={item.status===0?"#eb5757":""} size="lg"/></td>
                            <td className="vote-progress"><ProgressBar now={item.progress} label={`${item.progress}%`} /></td>
                            <td><a href="#" >Details</a></td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
          <form onSubmit={submitPayFee}>
            <Form.Group controlId="formBasicSelect">
              <Form.Label>Select Pay Type</Form.Label>
              <Form.Control
                as="select"
                value={payTypeForFee}
                onChange={e => {
                  setPayTypeForFee(e.target.value);
                }}
              >
                <option value="ETH">ETH</option>
                <option value="Cimple">Cimple</option>
              </Form.Control>
            </Form.Group>
            <div className='form-group mr-sm-2'>
            <br></br>
              <input
                id='payFeeAmount'
                step="0.01"
                type='number'
                value={payFeeAmount}
                onChange={(event) => setPayFeeAmount(event.target.value)}
                className="form-control form-control-md"
                placeholder='amount...'
                required />
            </div>
            <button type='submit' disabled={processing} className='btn btn-primary'>Pay Fee</button>
              <Form.Group controlId="duedate">
                <Form.Control
                  type="date"
                  name="duedate"
                  placeholder="Due date"
                  onChange={(e) => getTokenPriceByDate(e.target.value)}
                />
              </Form.Group>
          </form>          
        </Col>
      </Row>
    </Container>
  );
};

export default Governance;