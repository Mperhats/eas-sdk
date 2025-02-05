import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { Semver, SemverInterface } from "../Semver";
type SemverConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Semver__factory extends ContractFactory {
    constructor(...args: SemverConstructorParams);
    getDeployTransaction(major: BigNumberish, minor: BigNumberish, patch: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(major: BigNumberish, minor: BigNumberish, patch: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Semver & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Semver__factory;
    static readonly bytecode = "0x60e060405234801561001057600080fd5b5060405161045338038061045383398101604081905261002f91610040565b60809290925260a05260c05261006e565b60008060006060848603121561005557600080fd5b8351925060208401519150604084015190509250925092565b60805160a05160c0516103b961009a600039600060a701526000607e01526000605501526103b96000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806354fd4d5014610030575b600080fd5b61003861004e565b60405161004591906102b6565b60405180910390f35b60606100797f00000000000000000000000000000000000000000000000000000000000000006100f1565b6100a27f00000000000000000000000000000000000000000000000000000000000000006100f1565b6100cb7f00000000000000000000000000000000000000000000000000000000000000006100f1565b6040516020016100dd93929190610307565b604051602081830303815290604052905090565b606060006100fe836101af565b600101905060008167ffffffffffffffff81111561011e5761011e61037d565b6040519080825280601f01601f191660200182016040528015610148576020820181803683370190505b5090508181016020015b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff017f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a850494508461015257509392505050565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106101f8577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef81000000008310610224576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061024257662386f26fc10000830492506010015b6305f5e100831061025a576305f5e100830492506008015b612710831061026e57612710830492506004015b60648310610280576064830492506002015b600a831061028c576001015b92915050565b60005b838110156102ad578181015183820152602001610295565b50506000910152565b60208152600082518060208401526102d5816040850160208701610292565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b60008451610319818460208901610292565b80830190507f2e000000000000000000000000000000000000000000000000000000000000008082528551610355816001850160208a01610292565b60019201918201528351610370816002840160208801610292565b0160020195945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fdfea164736f6c6343000813000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "major";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "minor";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "patch";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "version";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): SemverInterface;
    static connect(address: string, runner?: ContractRunner | null): Semver;
}
export {};
//# sourceMappingURL=Semver__factory.d.ts.map