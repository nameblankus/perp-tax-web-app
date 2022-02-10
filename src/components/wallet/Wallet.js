import { useContext } from 'react';

import NoWalletDetected from "./NoWalletDetected";
import ConnectWallet from "./ConenctWallet";

import TaxContext from '../../store/tax-context';

function Wallet() {

  const taxCtx = useContext(TaxContext);

  async function connectWalletHandler() {
    // Promise that resolves to the user's address
    let [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    taxCtx.setSelectedWallet(selectedAddress);

    let chainId = await window.ethereum.chainId;
    taxCtx.setSelectedChainId(chainId);

    // Update the wallet address when Metamask address changes
    window.ethereum.on('accountsChanged', function (accounts) {
      console.log(accounts);
      taxCtx.setSelectedWallet(accounts[0]);
    })

    // Update the wallet address when Metamask chain changes
    window.ethereum.on('chainChanged', function (chainId) {
      console.log(chainId);
      taxCtx.setSelectedChainId(chainId);
    })
  }

  // Display a message if Metamask is not installed
  if (window.ethereum === undefined) {
    return <NoWalletDetected />
  }

  // Prompt the user to connect their wallet. When the wallet gets connected
  // store the address in the component state.
  if (!taxCtx.selectedWallet) {
    return (
      <ConnectWallet
        connectWallet={() => connectWalletHandler()}
      />
    )
  }

  return (null);
}

export default Wallet;
