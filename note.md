# O3 Swap Aggregator Contract Notes

## BSC

### pancake

#### init code hash

> source code: contracts/bsc/libraries/PancakeLibrary.sol

if deploy `pancake`, open `PancakeLibrary.sol`, set the right `init code hash`.

    mainnet: d0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66
    testnet: ffc6cc9c02c100b95ef7c359f4f3879a16b8e74ba45e3405ed6d0dc992f36db4

router:

    mainnet: 0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F
    testnet: 0x07d090e7FcBC6AFaA507A3441C7c5eE507C457e6

## Heco

### mdex

#### init code hash

> source code: contracts/heco/libraries/MdexLibrary.sol

if deploy `mdex`, open `MdexLibrary.sol`, set the right `init code hash`.

    mainnet: 2ad889f82040abccb2649ea6a874796c1601fb67f91a747a80e08860c73ddf24
    testnet: 7b92ccbc2ceb93d12272829027fa9dd031be006c272ff7407f6f55b41f575d70

## OEC

### sushi

> source code: https://github.com/sushiswap/sushiswap/blob/master/contracts/uniswapv2/libraries/UniswapV2Library.sol

invoke setSwapInitCodeHash function:  index => 1
    mainnet: initCodeHash => '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303'
             factory => 0xc35DADB65012eC5796536bD9864eD8773aBc74C4
    testnet: initCodeHash => ?
             factory => 0xc35DADB65012eC5796536bD9864eD8773aBc74C4  

### AIswap

> source code: https://github.com/aiswap/contracts/blob/master/AiSwap.sol

invode setSwapInitCodeHash function: index => 2
    mainnet: initCodeHash => '96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
             facotry => ?

https://github.com/aiswap/contracts No info about contract on OkexChain

### sakeswap

 > source code: https://github.com/Sakeswap/sakeswap-protocol/blob/master/contracts/sakeswap/libraries/SakeSwapLibrary.sol

 invoke setSwapInitCodeHash function: index => 3
    mainnet: initCodeHash =>  '1c6b37d5ff4429c6e6a1ecefdb1580c33035e38b07d7e43c95f9e1677ba2cbce'
             factory => ?

https://github.com/Sakeswap/sakeswap-protocol No info about contract on OKexChain
