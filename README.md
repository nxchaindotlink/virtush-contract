# Virtush NFT Contract

This repository contains the Solidity smart contract for **Virtush NFT**, an ERC-1155 NFT collection with a max supply of 21 million NFTs. The contract includes functionalities for purchasing NFTs with USDT and minting by the owner.

---

## 📄 Contract Summary

- **Contract Name**: Virtush
- **Symbol**: Virtush NFT
- **Standard**: ERC-1155
- **Max Supply**: 21,000,000 NFTs
- **Price**: 50 USDT (for the `buy` function)
- **Accepted Currency**: USDT (ERC-20 token)
- **License**: MIT

---

## 🚀 Features

1. **Minting and Buying NFTs**:
   - Users can purchase NFTs with USDT, respecting the max supply cap.
   - The contract owner can mint NFTs directly to any address.

2. **Supply Limitation**:
   - The `maxMintableNft` variable limits the total NFTs minted to 21 million.

3. **Custom URI**:
   - The contract owner can set a new URI for metadata using the `setURI` function.

4. **Ownership**:
   - Only the contract owner can mint NFTs beyond public purchases.
   - The owner receives all proceeds from public purchases.

---

## 📘 Functions

### Constructor

```solidity
constructor(address initialOwner, address _token)
//Initializes the contract with the owner’s address (initialOwner) and the USDT token contract address (_token).

function setURI(string memory newuri) public onlyOwner
//Sets a new URI for the NFT collection metadata.
//Access: Only the owner can call this function.

function buy(address account, uint256 value) public monitorMintable(1) returns (uint256)
/*Allows users to purchase one NFT.
Parameters:
account: The address to receive the NFT.
value: The amount of USDT (must be exactly 50 USDT).
Requirements:
value must equal price.
The user must have enough allowance for this contract to spend their USDT.
account cannot be the zero address.
Returns: The updated totalSupply.*/

function mint(address account, uint256 amount) public onlyOwner monitorMintable(amount)
/*Allows the owner to mint a specified number of NFTs to a given address.
Parameters:
account: The address to receive the NFTs.
amount: The number of NFTs to mint.*/

modifier monitorMintable(uint256 amount)
/*
Ensures that the totalSupply of NFTs does not exceed maxMintableNft.
Parameters:
amount: The number of NFTs to be minted.
*/
````
# 💰 Deployment Parameters
### initialOwner: The address that will have ownership of the contract upon deployment.
### _token: The USDT (ERC-20) contract address.

# ⚠️ Errors and Messages
#### "PRICE_50_USDT": Thrown if the provided value is not equal to price.
#### "INVALID_ALLOWANCE": Thrown if the allowance for the contract to spend the user’s USDT is insufficient.
#### "INVALID_ADDRESS_TO": Thrown if the recipient address (account) is the zero address.
#### "MAX_MINTABLE_TARGET": Thrown if totalSupply would exceed maxMintableNft after the minting transaction.

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for more information.

## 📧 Contact
For inquiries, please reach out to us at nextchain@nxchain.link.

