// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const VirtusModule = buildModule("LockModule", (m) => {
  const owner = m.getParameter("initialOwner", "0x3B2f0FE7c14604A07fd1f11907A176Be97F5B149");

  const usdt = m.contract("Theater");

  const virtush = m.contract("Virtush", [owner, usdt]);

  return { virtush, usdt };
});

export default VirtusModule;
