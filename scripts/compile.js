const hardhat = require("hardhat");

async function main() {
  await hardhat.run("starknet-compile", {
    paths: ["contracts/openzeppelin/token/erc20/ERC20.cairo"],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
