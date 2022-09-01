require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@tenderly/hardhat-tenderly");
require("@shardlabs/starknet-hardhat-plugin");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  starknet: {
    dockerizedVersion: "0.8.1", // alternatively choose one of the two venv options below
    // uses (my-venv) defined by `python -m venv path/to/my-venv`
    // venv: "path/to/my-venv",

    // uses the currently active Python environment (hopefully with available Starknet commands!)
    // venv: "active",
    network: "alpha",
    wallets: {
      OpenZeppelin: {
        accountName: "OpenZeppelin",
        modulePath:
          "starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount",
        accountPath: "~/.starknet_accounts",
      },
      AnotherWallet: {
        accountName: "AnotherOpenZeppelin",
        modulePath:
          "starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount",
        accountPath: "~/.starknet_accounts",
      },
    },
  },
  namedAccounts: {
    deployer: 0,
    dev: 1,
    buyer: 2,
    user: 3,

    zero: "0x0000000000000000000000000000000000000000",
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
