import { useContext } from 'react';

import TaxContext from '../store/tax-context';

function TaxTotal() {
  const taxCtx = useContext(TaxContext);

  const taxPerProfit = taxCtx.profitData.map(entry => (
    entry.profit * taxCtx.taxRate * 0.01
  ));
  const totalTax = taxPerProfit.reduce((partialSum, p) => partialSum + p, 0);

  return (
    <div className='d-flex justify-content-center'>
      <h4 className='p-0 m-0'>Tax Estimate: {Math.round(totalTax * 10000) / 10000} USDT</h4>
    </div>
  )
}

export default TaxTotal;
