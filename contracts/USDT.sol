// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Theater is ERC20{

    constructor()ERC20("Theater Token", "USDT")
    {
        _mint(msg.sender, 10_000_000_000 *10 **18);
    }
    

}