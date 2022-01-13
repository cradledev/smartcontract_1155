import React from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { Container, Row, Col, Card, Button, Image, ListGroup, InputGroup, FormControl,ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faThumbsUp,faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import Icon from "react-crypto-icons";
import './Governance.css';

const Governance = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    // Fictive call to Google Analytics
    // ga.send(["pageview", location.pathname])
    const cmpgData = [
      {tokenName:"ETH", quantity:100, usdValue:40000},
      {tokenName:"DAI", quantity:100, usdValue:40000},
      {tokenName:"MATIC", quantity:100, usdValue:40000},
      {tokenName:"TETHER", quantity:100, usdValue:40000}
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
                      <Image src="/img/governance/Cimple_token_unstaked.png"></Image> <label className="text-bolder paddingLeft15">7499 Cimple</label>
                    </Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <small>Item 1</small>
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
                          <small>Item 1</small>
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
                          <small>Item 1</small>
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
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                    </InputGroup>
                    <Button variant="primary" size="md" style={{marginTop:'10px', marginBottom:'10px'}}>Stake More</Button>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} md={6} lg={6}>
              <Card style={{ minHeight: '35rem' }}>
                  <Card.Body>
                    <Card.Title><label className="card-title-small">staked balance</label></Card.Title>
                    <Card.Text>
                      <Image src="/img/governance/Cimple_token_staked.png"></Image> <label className="text-bolder paddingLeft15">7499 Cimple</label>
                    </Card.Text>
                    <Card.Title><label className="card-title-small">your cmpg balance</label></Card.Title>
                    <Card.Text>
                      <Image src="/img/governance/CMPG_token.png" className="img-responsive" style={{width:'45px', height:'45px'}}></Image> <label className="text-bolder paddingLeft15">7499 Cimple</label>
                    </Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <small>Item 1</small>
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
                          <small>Item 1</small>
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
                          <small>Item 1</small>
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
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                    </InputGroup>
                    <Button variant="outline-primary" size="md" style={{marginTop:'10px', marginBottom:'10px'}}>Withdraw</Button>
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
                              <tr>
                                <td><Icon name="btc" size={25} /><label style={{marginLeft:'10px'}}>{item.tokenName}</label></td>
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
                              <td className="text-muted"><FontAwesomeIcon icon={faThumbsUp} color={item.status==1?"#20c997":""} size="lg" /></td>
                              <td className="text-muted"><FontAwesomeIcon icon={faThumbsDown} color={item.status==0?"#eb5757":""} size="lg"/></td>
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
          </Col>
        </Row>
      </Container>
    );
};

export default Governance;