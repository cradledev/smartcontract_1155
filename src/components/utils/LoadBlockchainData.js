import { ethers } from 'ethers';
import Web3 from 'web3';
import CimpleDAO from '../../abis/CimpleDAO.json'
import DaoLobby from '../../abis/DaoLobby.json'
import { ConnectWallet } from "../../components/utils/ConnectWallet";
export const LoadBlockchainData = async () => {
    if(typeof window.ethereum !== 'undefined'){
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        const signer = provider.getSigner();
  
        const web3 = new Web3(window.ethereum)
        const netId = await web3.eth.net.getId()
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
            const _cimpleDao = new ethers.Contract(CimpleDAO.networks[netId].address, CimpleDAO.abi, signer)
            const _daoLobby = new ethers.Contract(DaoLobby.networks[netId].address, DaoLobby.abi, signer)
            const _daoLobbyAddress = DaoLobby.networks[netId].address
            const _cimpleDaoAddress = CimpleDAO.networks[netId].address
            return {
                cimpleDaoContract:_cimpleDao,
                daoLobbyContract:_daoLobby,
                cimpleDaoAddress:_cimpleDaoAddress,
                daoLobbyAddress:_daoLobbyAddress,
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