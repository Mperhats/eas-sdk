import {
    NodeRegistry__factory,
    NodeRegistry as NodeRegistryContract,
} from '../pl-registry/typechain-types';
import { Overrides, TransactionReceipt } from 'ethers';
import { Base, SignerOrProvider, Transaction } from './transaction';
import { NodeEntryStruct, ZERO_BYTES32, getNodeUID } from './utils';

// TypeScript representation of the NodeEntry struct from Solidity
export type NodeEntry = {
    uid: string;
    name: string;
    callbackUrl: string;
    location: string[];
    industryCode: string;
    nodeType: NodeType;
    status: NodeStatus;
};

// TODO: determine a way to autogenerate the enums so that these types can be automatically generated  
export enum NodeType {
    PSN = 0, // Provider Supporting Node, 0 translates to type BigNumberIsh which equals PSN enum in solidity
    BSN = 1  // Buyer Supporting Node, 1 translates to type BigNumberIsh which equals PSN enum in solidity
}

export enum NodeStatus {
    VERIFIED = 0, // 0 translates to type BigNumberIsh which equals VERIFIED enum in solidity
    UNVERIFIED = 1 // 0 translates to type BigNumberIsh which equals UNVERIFIED enum in solidity
}

export interface RegisterNodeParams {
    uid: string;
    name: string;
    callbackUrl: string;
    location: string[];
    industryCode: string;
    nodeType: NodeType;
    status: NodeStatus;
}

export interface GetNodeParams {
    uid: string;
}

export interface NodeRegistryOptions {
    signerOrProvider?: SignerOrProvider;
}

export class NodeRegistry extends Base<NodeRegistryContract> {
    constructor(address: string, options?: NodeRegistryOptions) {
        const { signerOrProvider } = options || {};
        super(new NodeRegistry__factory(), address, signerOrProvider);
    }

    // Returns the version of the contract
    public getVersion(): Promise<string> {
        return this.contract.version();
    }

    // Registers a new node and returns its UID
    public async registerNode(
        { name, callbackUrl, location, industryCode, nodeType, status }: RegisterNodeParams,
        overrides?: Overrides
    ): Promise<Transaction<string>> {

        const nodeEntry: NodeEntryStruct = {
            uid: ZERO_BYTES32, // the contract overwrites this and assigns a new id based. //TODO: improve this in the smart contract registration.
            name,
            callbackUrl,
            location,
            industryCode,
            nodeType,
            status
        };

        const tx = await this.contract.registerNode(nodeEntry, overrides ?? {});

        // eslint-disable-next-line require-await
        return new Transaction(tx, async (_receipt: TransactionReceipt) =>
            getNodeUID(nodeEntry)
        );
    }

    // Returns an existing node by UID
    public async getNode({ uid }: GetNodeParams): Promise<NodeEntryStruct> {
        const node = await this.contract.getNode(uid);
        if (node.uid === ZERO_BYTES32) {
            throw new Error('Node not found');
        }

        return node;
    }
}
