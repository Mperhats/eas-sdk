import {
  solidityPackedKeccak256,
  ZeroAddress
} from 'ethers';

export const ZERO_ADDRESS = ZeroAddress;
export const ZERO_BYTES = '0x';
export const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

// TODO: resolve to use import { NodeEntryStruct } from '../typechain-types/INodeRegistry';
import { NodeEntryStruct } from '../pl-registry/typechain-types/INodeRegistry';

export const getNodeUID = ({ name, callbackUrl, industryCode }: NodeEntryStruct) =>
  solidityPackedKeccak256(['string', 'string', 'string'], [name, callbackUrl, industryCode]);

