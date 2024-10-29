// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "hardhat/console.sol";

/// @custom:security-contact nextchain@nxchain.link

contract VirtushPass is ERC721, Ownable {
    uint256 public _nextTokenId;
    IERC20 usdt;
    uint256 price = 50_000_000_000_000_000_000; //50 USDT

    constructor(address initialOwner, address _usdt)
        ERC721("Virtush Pass", "VRT")
        Ownable(initialOwner)
    {
        usdt = IERC20(_usdt);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "htpps://virtush.com";
    }

    function buy(address to, uint256 amount) external returns(uint256) {
        require(amount == price, "PRICE_50_USDT");
        require(
            usdt.allowance(_msgSender(), address(this)) >= amount, 
            "INVALID_ALLOWANCE"
        );
        require(to != address(0), "INVALID_ADDRESS_TO");

        console.log(usdt.allowance(_msgSender(), address(this)));

        usdt.transferFrom(
            _msgSender(),
            owner(),
            price
        );

        safeMint(to);

        return _nextTokenId;
    }

    function safeMint(address to) internal {
        require(_nextTokenId < 21_000_000, "INVALID_MINT"); 
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(to, tokenId);
    }


}
