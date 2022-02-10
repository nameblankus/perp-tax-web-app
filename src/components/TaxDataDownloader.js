import { useContext } from 'react';
import { CSVLink } from 'react-csv';

import TaxContext from '../store/tax-context';

function TaxDataDownloader() {

  const taxCtx = useContext(TaxContext);

  const csvTaxData = taxCtx.profitData.map(entry => ({
    ...entry,
    tax: entry.profit * taxCtx.taxRate * 0.01
  }));

  return (
    <CSVLink
      data={csvTaxData}
      filename={taxCtx.selectedAsset + "_profit_and_tax"}
      className="btn btn-primary w-100 mb-3"
    >
      Download Tax Data
    </CSVLink>
  )

}

export default TaxDataDownloader;
