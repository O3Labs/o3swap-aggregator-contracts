#!/bin/bash

declare -a contracts=(
    "O3SwapETHUniswapBridge.sol"
    "O3SwapBSCPancakeBridge.sol"
    "O3SwapHecoMdexBridge.sol"
    "O3SwapPolygonQuickSwapBridge.sol"
    "O3SwapArbitrumSushiBridge.sol"
)

for contract in ${contracts[@]}; do
    solPath="./contracts/"
    solPath+=$contract
    printf "%-34s " "$contract"
    solc $solPath --bin --abi --evm-version istanbul --optimize --optimize-runs 200 -o ./build/contracts --allow-paths . --overwrite
done
