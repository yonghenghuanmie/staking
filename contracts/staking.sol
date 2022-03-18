pragma solidity >=0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract Staking {
	using SafeMath for uint256;
	event stake(address indexed token,address indexed from,address indexed to,uint amount);
	event unstake(address indexed token,address indexed from,address indexed to,uint amount);

	mapping(address=>mapping(address=>uint256)) public xBalance;

	function staking(address token_,address to,uint amount) public returns(bool success) {
		require(Address.isContract(token_));
		IERC20Metadata erc20=IERC20Metadata(token_);
		address from=msg.sender;
		require(erc20.balanceOf(from)>=amount);
		if(erc20.transferFrom(from,address(this),amount)) {
			xBalance[token_][to]=xBalance[token_][to].add(amount);
			emit stake(token_,from,to,amount);
			return true;
		}
		return false;
	}

	function unstaking(address token_,address to,uint amount) public returns(bool success) {
		require(Address.isContract(token_));
		IERC20Metadata erc20=IERC20Metadata(token_);
		address from=msg.sender;
		require(xBalance[token_][from]>=amount);
		require(erc20.balanceOf(address(this))>=amount);
		if(erc20.transfer(to,amount)) {
			xBalance[token_][from]=xBalance[token_][from].sub(amount);
			emit unstake(token_,from,to,amount);
			return true;
		}
		return false;
	}

	function balanceOf(address token_,address user) external view returns(uint256 balance) {
		return xBalance[token_][user];
	}
}