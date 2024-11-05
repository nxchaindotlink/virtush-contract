// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

/// @custom:security-contact nextchain@nxchain.link
contract Virtush is ERC1155, Ownable {
    string private _name = "Virtush NFT";
    uint256 immutable maxMintableNft = 21_000_000;
    uint256 public totalSupply;
    uint256 immutable price = 50_000_000_000_000_000_000;
    IERC20 public usdt;

    constructor(address initialOwner, address _token) 
    ERC1155("") 
    Ownable(initialOwner) 
    {
        usdt = IERC20(_token);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function buy(address account, uint256 value)
        public
        monitorMintable(1)
        returns(uint256)
    {
        require(value == price, "PRICE_50_USDT");
        require(
            usdt.allowance(_msgSender(), address(this)) >= value, 
            "INVALID_ALLOWANCE"
        );
        require(account != address(0), "INVALID_ADDRESS_TO");

        usdt.transferFrom(
            _msgSender(),
            owner(),
            price
        );

        _mint(account, 1, 1, "0x0");
        
        return totalSupply;
    }

    function mint(address account, uint256 amount)
        public
        onlyOwner
        monitorMintable(amount)
    {  
        _mint(account, 1, amount, "0x0");
       
    }

    modifier monitorMintable(uint256 amount) {
        totalSupply = totalSupply + amount;
        require(totalSupply <= maxMintableNft, "MAX_MINTABLE_TARGET");
        _;
    }

    function name() public view virtual returns (string memory) {
        return _name;
    }

}
