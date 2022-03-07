pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract xLLTH is ERC20 {
    constructor() ERC20("xLLTH", "xL") {}

    function mint(address user, uint256 amount) public {
        _mint(user, amount);
    }
}