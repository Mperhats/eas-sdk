import '@nomicfoundation/hardhat-toolbox';
// import 'hardhat-dependency-compiler'; // 
/**
 dependencyCompiler: {
  paths: [
    '@ethereum-attestation-service/eas-contracts/contracts/EAS.sol',
    '@ethereum-attestation-service/eas-contracts/contracts/SchemaRegistry.sol'
  ]
},
*/

import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      accounts: {
        count: 20,
        accountsBalance: '10000000000000000000000000000000000000000000000'
      },
      allowUnlimitedContractSize: true
    }
  },

  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 100000,
        details: {
          yul: true
        }
      },
      metadata: {
        bytecodeHash: 'none'
      }
    }
  },

  typechain: {
    target: 'ethers-v6'
  },

  

  mocha: {
    timeout: 600000,
    color: true,
    bail: true
  }
};

export default config;
