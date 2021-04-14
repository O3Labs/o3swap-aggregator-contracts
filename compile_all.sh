#!/bin/bash

declare -a contracts=(
    "./contracts/O3SwapETHUniswapBridge.sol"
    "./contracts/O3SwapBSCPancakeBridge.sol"
)

for contract in ${contracts[@]}; do
    echo Compiling: $contract
    solc $contract --bin --abi --optimize -o ./build/contracts --allow-paths . --overwrite
done
