import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Lock", function () {
  const AMOUNT = 50n *10n **18n;
  const AMOUNTMAX = 10_000_000_000n *10n **18n;

  async function deployOneYearLockFixture() {

    const [owner, otherAccount, virtushOwn] = await hre.ethers.getSigners();

    const Theater = await hre.ethers.getContractFactory("Theater");
    const theater = await Theater.deploy();

    const Virtush = await hre.ethers.getContractFactory("VirtushPass");
    const virtush = await Virtush.deploy(virtushOwn,  theater);

    return { virtush, theater, owner, otherAccount, virtushOwn };
  }

  describe("Deployment", function () {
    it("Should buy 1 NFT", async function () {
      const {virtush, theater, otherAccount, virtushOwn} = await loadFixture(deployOneYearLockFixture);

      await theater.transfer(otherAccount, AMOUNTMAX);

      const  IOther = await theater.connect(otherAccount);
      await IOther.approve(virtush, AMOUNTMAX);

      const IVirtush = await virtush.connect(otherAccount);

      await IVirtush.buy(
        otherAccount,
        AMOUNT
      );

      expect(await virtush.balanceOf(otherAccount)).to.equal(1);
      expect(await theater.balanceOf(virtushOwn)).to.equal(AMOUNT);

    });

    it("Should buy 1 NFT ERROR (Invalid allowance)", async function () {
      const {virtush, theater, otherAccount, virtushOwn} = await loadFixture(deployOneYearLockFixture);

      const IVirtush = await virtush.connect(otherAccount);

      await expect(IVirtush.buy(
        otherAccount,
        AMOUNT
      ))
      .to
      .be
      .revertedWith("INVALID_ALLOWANCE");

    });

    it("Should buy 1 NFT ERROR (Invalid to)", async function () {
      const {virtush, theater, otherAccount, virtushOwn} = await loadFixture(deployOneYearLockFixture);

      await theater.transfer(otherAccount, AMOUNTMAX);

      const  IOther = await theater.connect(otherAccount);
      await IOther.approve(virtush, AMOUNTMAX);

      const IVirtush = await virtush.connect(otherAccount);

      await expect(IVirtush.buy(
        ethers.ZeroAddress,
        AMOUNT
      ))
      .to
      .be
      .revertedWith("INVALID_ADDRESS_TO");


    });

  });
});
