## Project setup
 The option to complete this project either on your local machine or in the cloud using the pre-configured environment provided by VS Code. VS Code is a convenient choice, especially if you're using a mobile phone or simply prefer a hassle-free start without the need for additional installations. In this case, we utilize Remix.
## ## Description
For this project, create a simple contract with 2-3 functions. Then show the values of those functions in frontend of the application.
### Executing program

     // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MToken is ERC20 {
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

The project will be running on our localhost. 
Typically at http://localhost:3000
## Author
Kritika Uniyal
Student-Chandigarh University
