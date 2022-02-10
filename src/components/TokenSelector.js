import { useRef, useContext } from 'react';

import TaxContext from '../store/tax-context';

import { tokenToContract } from '../constants';

function TokenSelector() {

  const taxCtx = useContext(TaxContext);
  const assetRef = useRef();

  // crate an array of the available assets as components
  let tokenOptions = Object.keys(tokenToContract(taxCtx.chainId)).map((token) => (
    <option value={token} key={token}>{token}</option>
  ));

  function handleChange(event) {
    event.preventDefault();
    const selectedAsset = assetRef.current.value;
    taxCtx.setSelectedAsset(selectedAsset);
  }

  return (
    <div className='p-0'>
      <select
        id="asset-sector"
        onChange={handleChange}
        ref={assetRef}
        defaultValue={taxCtx.selectedAsset}
        className="form-select"
        aria-describedby="tokenHelp"
      >
        {tokenOptions}
      </select>
      <div id="tokenHelp" className="form-text">Tax computation supports one token at a time.</div>
    </div>
  )
}

export default TokenSelector;
