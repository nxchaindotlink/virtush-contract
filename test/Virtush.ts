import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Virtus NFT", function () {
  const AMOUNT = 50n *10n **18n;
  const AMOUNTMAX = 10_000_000_000n *10n **18n;

  async function deployOneYearLockFixture() {

    const [owner, otherAccount, virtushOwn] = await hre.ethers.getSigners();

    const Theater = await hre.ethers.getContractFactory("Theater");
    const theater = await Theater.deploy();

    const Virtush = await hre.ethers.getContractFactory("Virtush");
    const virtush = await Virtush.deploy(virtushOwn,  theater);

    return { virtush, theater, owner, otherAccount, virtushOwn };
  }

  describe("Deployment Virtush NFT", function () {
    it("Should usdt address", async function () {
      const {virtush, theater} = await loadFixture(deployOneYearLockFixture);
      expect(await virtush.usdt()).to.equal(theater);
    });

    it("Should mint max mint", async function () {
      const {virtush, otherAccount, virtushOwn} = await loadFixture(deployOneYearLockFixture);
      const IOwner = await virtush.connect(virtushOwn);
      await expect(IOwner.mint(otherAccount, 21_000_001))
      .to
      .be
      .revertedWith("MAX_MINTABLE_TARGET");
    });

    it("Should mint onlyOwner", async function () {
      const {virtush, otherAccount} = await loadFixture(deployOneYearLockFixture);
      const IOther = await virtush.connect(otherAccount);
      await expect(IOther.mint(otherAccount, 21_000_001))
      .to
      .be
      .revertedWithCustomError(virtush, "OwnableUnauthorizedAccount");
     
    });

    it("Should mint max mint", async function () {
      const {virtush, otherAccount, virtushOwn} = await loadFixture(deployOneYearLockFixture);
      const IOwner = await virtush.connect(virtushOwn);
      expect(await IOwner.mint(otherAccount, 21_000_000))
      expect(await virtush.balanceOf(otherAccount, 1)).to.equal(21_000_000);
    });

    it("Should buy", async function () {
      const {virtush, otherAccount, virtushOwn, theater} = await loadFixture(deployOneYearLockFixture);
      await theater.transfer(otherAccount, 50n*10n**18n);
      const IOtherUsdt = await theater.connect(otherAccount);
      await IOtherUsdt.approve(virtush, 50n*10n**18n);

      const IOtherNft = await virtush.connect(otherAccount);
      await IOtherNft.buy(otherAccount, 50n*10n**18n);
      expect(await virtush.balanceOf(otherAccount, 1)).to.equal(1);
      expect(await theater.balanceOf(virtushOwn)).to.equal(50n*10n**18n);
    });

    it("Should buy require value == 50 USDT", async function () {
      const {virtush, otherAccount, theater} = await loadFixture(deployOneYearLockFixture);
      await theater.transfer(otherAccount, 50n*10n**18n);
      const IOtherUsdt = await theater.connect(otherAccount);
      await IOtherUsdt.approve(virtush, 50n*10n**18n);

      const IOtherNft = await virtush.connect(otherAccount);
      await expect(IOtherNft.buy(otherAccount, 10n*10n**18n))
      .to
      .be
      .revertedWith("PRICE_50_USDT");
    });

    it("Should buy require address == zeroAddress", async function () {
      const {virtush, otherAccount, theater} = await loadFixture(deployOneYearLockFixture);
      await theater.transfer(otherAccount, 50n*10n**18n);
      const IOtherUsdt = await theater.connect(otherAccount);
      await IOtherUsdt.approve(virtush, 50n*10n**18n);

      const IOtherNft = await virtush.connect(otherAccount);
      await expect(IOtherNft.buy(ethers.ZeroAddress, 50n*10n**18n))
      .to
      .be
      .revertedWith("INVALID_ADDRESS_TO");
    });

    it("Should buy require invalid Allowance", async function () {
      const {virtush, otherAccount} = await loadFixture(deployOneYearLockFixture);

      const IOtherNft = await virtush.connect(otherAccount);
      await expect(IOtherNft.buy(ethers.ZeroAddress, 50n*10n**18n))
      .to
      .be
      .revertedWith("INVALID_ALLOWANCE");
    });
    
    it("Should setUri", async function () {
      const {virtush, virtushOwn} = await loadFixture(deployOneYearLockFixture);
      const IOwner = await virtush.connect(virtushOwn);
      await IOwner.setURI("https://virtush.vercel.app/assets/nftasset-Bwxklj9w.webp/");
      expect(await virtush.uri(1)).to.equal("https://virtush.vercel.app/assets/nftasset-Bwxklj9w.webp/");
    });

  });
});
