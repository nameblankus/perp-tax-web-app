const MAINNET = false;
export const traderId = "0x0000000000000000000000000000000000000000";

// if it is not the mainnet then it will be Kovan testnet
export const optimismChainId = 0xa;
export const optimismKovanChainId = 0x45;

const perp_graph_endpoint_mainnet = 'https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism';
const perp_graph_endpoint_kovan = 'https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan';

export const perp_graph_endpoint = MAINNET ?
  perp_graph_endpoint_mainnet :
  perp_graph_endpoint_kovan

const contractToTokenMainnet = {
  "0x151bb01c79f4516c233948d69dae39869bccb737": "SOL",
  "0x5faa136fc58b6136ffdaeaac320076c4865c070f": "AVAX",
  "0x7161c3416e08abaa5cd38e68d9a28e43a694e037": "CRV",
  "0x86f1e0420c26a858fc203a3645dd1a36868f18e5": "BTC",
  "0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb": "ETH",
  "0xb24f50dd9918934ab2228be7a097411ca28f6c14": "LUNA",
}

const contractToTokenKovan = {
  "0xb9c4be24a7017990df526a7f179de7f30e1c0c87": "SOL",
  "0x1dbc57cf0e38f3ab2e31dae6c32829eacde6fd3a": "AVAX",
  "0xaa3168c0aa6e69f415eb1c0c99fbb2d8654f4d3b": "CRV",
  "0x1f91666a0706ef6e8e1506e3889171940c94b51a": "BTC",
  "0x5802918dc503c465f969da0847b71e3fbe9b141c": "ETH",
  "0x798310f8dd81e9f0117a66a8615ad769b3f801ae": "LUNA",
}

export function contractToToken(chainId) {
  return (chainId == optimismChainId) ?
    contractToTokenMainnet :
    contractToTokenKovan
}

const tokenToContractMainnet = {
  "SOL": "0x151bb01c79f4516c233948d69dae39869bccb737",
  "AVAX": "0x5faa136fc58b6136ffdaeaac320076c4865c070f",
  "CRV": "0x7161c3416e08abaa5cd38e68d9a28e43a694e037",
  "BTC": "0x86f1e0420c26a858fc203a3645dd1a36868f18e5",
  "ETH": "0x8c835dfaa34e2ae61775e80ee29e2c724c6ae2bb",
  "LUNA": "0xb24f50dd9918934ab2228be7a097411ca28f6c14",
}

const tokenToContractKovan = {
  "SOL": "0xb9c4be24a7017990df526a7f179de7f30e1c0c87",
  "AVAX": "0x1dbc57cf0e38f3ab2e31dae6c32829eacde6fd3a",
  "CRV": "0xaa3168c0aa6e69f415eb1c0c99fbb2d8654f4d3b",
  "BTC": "0x1f91666a0706ef6e8e1506e3889171940c94b51a",
  "ETH": "0x5802918dc503c465f969da0847b71e3fbe9b141c",
  "LUNA": "0x798310f8dd81e9f0117a66a8615ad769b3f801ae",
}

export function tokenToContract(chainId) {
  return (chainId == optimismChainId) ?
    tokenToContractMainnet :
    tokenToContractKovan
}
