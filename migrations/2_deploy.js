const CimpleDAO = artifacts.require("CimpleDAO");
const DaoLobby = artifacts.require("DaoLobby");

module.exports = async function(deployer) {
	//deploy Token
	await deployer.deploy(CimpleDAO)

	//assign token into variable to get it's address
	const cimpleDAO = await CimpleDAO.deployed()
	
	//pass token address for dBank contract(for future minting)
	await deployer.deploy(DaoLobby, cimpleDAO.address)

	//assign dBank contract into variable to get it's address
	const daoLobby = await DaoLobby.deployed()

	//change token's owner/minter from deployer to dBank
	await cimpleDAO.transferOwnership(daoLobby.address)
};