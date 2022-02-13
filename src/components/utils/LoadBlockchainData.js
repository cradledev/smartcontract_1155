import { ethers } from 'ethers';
import Web3 from 'web3';
import CimpleDAO from '../../abis/CimpleDAO.json'
import CimpleNFT from '../../abis/NFT.json'
import { ConnectWallet } from "../../components/utils/ConnectWallet";

const CIMPLEDAODEPLOYEDADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const CIMPLENFTDEPLOYEDADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const LoadBlockchainData = async () => {
    if(typeof window.ethereum !== 'undefined'){
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        const signer = provider.getSigner();
  
        const web3 = new Web3(window.ethereum)
        // const netId = await web3.eth.net.getId()
        const { address } = await ConnectWallet();
        let balance = 0;
        //load balance
        if(typeof address !=='undefined'){
            balance = await web3.eth.getBalance(address)
        } else {
            window.alert('Please login with MetaMask')
        }
  
        //load contracts
        try {
            
            const _cimpleDao = new ethers.Contract(CIMPLEDAODEPLOYEDADDRESS, CimpleDAO.abi, signer)
            const _cimpleNFT = new ethers.Contract(CIMPLENFTDEPLOYEDADDRESS, CimpleNFT.abi, signer)
            // const _daoLobbyAddress = DaoLobby.networks[netId].address
            // const _cimpleDaoAddress = CIMPLEDAODEPLOYEDADDRESS;
            return {
                cimpleDaoContract:_cimpleDao,
                cimpleNFTContract:_cimpleNFT,
                cimpleDaoAddress:CIMPLEDAODEPLOYEDADDRESS,
                ciimpleNFTAddress:CIMPLENFTDEPLOYEDADDRESS,
                balance:balance,
                web3:web3,
                address:address
            }
        } catch (e) {
            console.log('Error', e)
            return {
                message:"Contracts not deployed to the current network"
            }
        }
    } else {
        return {
            message:'Please install MetaMask'
        }
    }
}