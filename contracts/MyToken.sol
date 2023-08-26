// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    string private _ownerName;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        string memory ownerName
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        _ownerName = ownerName;
    }

    function getOwnerName() public view returns (string memory) {
        return _ownerName;
    }

    function mint(address account, uint256 amount) public  {
        _mint(account, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
