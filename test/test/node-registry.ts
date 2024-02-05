import { NodeRegistry as NodeRegistryContract } from '../../pl-registry/typechain-types';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { NodeRegistry, NodeType, NodeStatus } from '../../src/node-registry';
import { ZERO_BYTES32, getNodeUID } from '../../src/utils';
import Contracts from '../components/Contracts';
import chai from './helpers/chai';
import { NodeEntryStruct } from '../../pl-registry/typechain-types/INodeRegistry';

const { expect } = chai;

describe('NodeRegistry API', () => {
  let accounts: Signer[];
  let sender: Signer;

  let nodeRegistryContract: NodeRegistryContract;
  let nodeRegistry: NodeRegistry;

  before(async () => {
    accounts = await ethers.getSigners();
    [sender] = accounts;
  });

  beforeEach(async () => {
    nodeRegistryContract = await Contracts.NodeRegistry.deploy();
    nodeRegistry = new NodeRegistry(await nodeRegistryContract.getAddress());
    nodeRegistry.connect(sender);
  });

  describe('construction', () => {
    it('should properly create a NodeRegistry API', async () => {
      expect(await nodeRegistry.getVersion()).to.equal(await nodeRegistryContract.version());
    });
  });

  describe('node registration', () => {
    const testRegisterNode = async (node: NodeEntryStruct) => {
        const uid = getNodeUID(node);
        await expect(nodeRegistry.getNode({ uid })).to.be.rejectedWith('Node not found');

      const tx = await nodeRegistry.registerNode(node);
      const uid2 = await tx.wait();

      const nodeEntry = await nodeRegistry.getNode({ uid });
      expect(nodeEntry.uid).to.equal(uid);
      expect(nodeEntry.uid).to.equal(uid2);
      expect(nodeEntry.name).to.equal(node.name);
      expect(nodeEntry.callbackUrl).to.equal(node.callbackUrl);
      expect(nodeEntry.industryCode).to.equal(node.industryCode);
      expect(nodeEntry.location).to.deep.equal(node.location);
      expect(nodeEntry.nodeType).to.equal(node.nodeType);
      expect(nodeEntry.status).to.equal(node.status);
    };

    it('should not allow registering a node with existing uid', async () => {
        const node = {
          uid: ZERO_BYTES32,
          name: 'Test Node',
          callbackUrl: 'http://testnode.com',
          location: ['882681a339fffff'], // h3 cell index at resolution 8 in Boulder, CO.
          industryCode: 'TEST',
          nodeType: NodeType.PSN, 
          status: NodeStatus.VERIFIED 
        } as NodeEntryStruct;
    
        await testRegisterNode(node);
      });
  });
});


describe('node registration', function () {
    const testRegister = async (node: NodeEntry) => {
      const uid = getNodeUID(node);

      const retUID = await registry.registerNode.staticCall(node);
      // const res = await registry.registerNode(node);
      await registry.registerNode(node);

      expect(retUID).to.equal(uid);
        
      const nodeEntry = await registry.getNode(uid);
      // const sender = accounts[0];
      accounts[0];
      
      // known issue - withArgs doesn't deep compare arrays within structs, so the location assertion will fail the emit test
      // issue https://github.com/NomicFoundation/hardhat/issues/4207
      // issue https://github.com/NomicFoundation/hardhat/issues/3833 
      // await expect(res).to.emit(registry, 'Registered').withArgs(uid, await sender.getAddress(), nodeEntry);  

      expect(nodeEntry.uid).to.equal(uid);
      expect(nodeEntry.name).to.equal(node.name);
      expect(nodeEntry.callbackUrl).to.equal(node.callbackUrl);
      expect(nodeEntry.industryCode).to.equal(node.industryCode);
      expect(nodeEntry.location).to.deep.equal(node.location);
      expect(nodeEntry.nodeType).to.equal(node.nodeType);
      expect(nodeEntry.status).to.equal(node.status);
    };

    it('should allow registering a node', async () => {
      const node = {
        uid: encodeBytes32String('testUID'),
        name: 'Test Node',
        callbackUrl: 'http://testnode.com',
        location: ['882681a339fffff'], // h3 cell index at resolution 8 in Boulder, CO.
        industryCode: 'TEST',
        nodeType: 0, 
        status: 0 
      };

      await testRegister(node);
    });

    it('should not allow registering a node with existing uid', async () => {
      const node = {
        uid: ZERO_BYTES32,
        name: 'Test Node',
        callbackUrl: 'http://testnode.com',
        location: ['882681a339fffff'], // h3 cell index at resolution 8 in Boulder, CO.
        industryCode: 'TEST',
        nodeType: 0, 
        status: 0 
      };
  
      await testRegister(node);
      await expect(registry.registerNode(node)).to.be.revertedWithCustomError(registry, 'AlreadyExists');
    });
  });