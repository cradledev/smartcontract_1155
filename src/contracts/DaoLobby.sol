// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./CimpleDAO.sol";

contract DaoLobby is Ownable {
  using SafeMath for uint256;
  CimpleDAO private token;
  //token id 
  uint256 public constant Cimple = 0;
  uint256 public constant stCimple = 1;
  uint256 public constant CMPG = 2;

  event StakingCimpleToken (address indexed staker, uint256 ciIndex, uint256 ciTokenCount);
  event UnstakingCimpleToken (address indexed unstaker, uint256 stCiIndex, uint256 stCiTokenCount);
  event PayFee(address indexed staker, uint256 ciIndex, uint256 ciTokenCount);
  constructor(CimpleDAO _token) public {
    token = _token;
  }
  // staking cimmple token function
  function stakingCimpleToken(address staker, uint256 stakeAmount) public payable returns (bool) {
    require(stakeAmount <= token.balanceOf(staker, Cimple), 'Error, stake amount must be >= holding amount of Cimple Token');
    token.createStake(staker, stakeAmount);
    emit StakingCimpleToken(staker, stCimple, stakeAmount);
    return true;
  }

  function unstakingCimpleToken(address unstaker, uint256 unstakeAmount) public payable returns (bool) {
    require(unstakeAmount <= token.balanceOf(unstaker, stCimple), 'Error, unstake amount must be >= holding amount of stCimple Token.');
    token.removeStake(unstaker, unstakeAmount);
    emit UnstakingCimpleToken(unstaker, Cimple, unstakeAmount);
    return true;
  }

  function payFee() public payable returns ( bool ) {
    require(msg.value > 0, 'Error, deposit must be >= 0');
    uint256 value1 = msg.value;
    uint256 cimpleIR;
    uint256 s1;
    uint256 s2;
    (cimpleIR, s1, s2) = token.calculateCimpleIR(block.timestamp);
    // uint256 cimpleIR = token.getCimpleIR();
    uint256 cimpleCountForValue = value1.div(cimpleIR);
    token.mint(msg.sender, Cimple, cimpleCountForValue); //sending token to user
    emit PayFee(msg.sender, Cimple, cimpleCountForValue);
    return true;
  }

  function payFeeByToken(address spender, uint256 cimpleAmount) public returns(bool) {
    require(cimpleAmount > 0, "Error, amount of pay must be > 0");
    token.burn(spender,Cimple, cimpleAmount);
    emit PayFee(msg.sender, Cimple, cimpleAmount);
    return true;
  }
}
