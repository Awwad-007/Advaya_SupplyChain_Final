import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("AdvayaModule", (m) => {
  const advaya = m.contract("Advaya");
  return { advaya };
});