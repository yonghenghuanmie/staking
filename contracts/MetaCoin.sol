pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MetaCoin is ERC20 {
	constructor() ERC20("metacoin","METACOIN") {}

	function mint(uint256 amount) public returns(bool success){
		_mint(msg.sender,amount);
		return true;
	}
}