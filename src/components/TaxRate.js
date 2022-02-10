import { useContext, useRef } from 'react';

import TaxContext from '../store/tax-context';

function TaxRate() {

  const taxCtx = useContext(TaxContext);
  const taxRef = useRef(taxCtx.taxRate);

  // Get the date in YYYY-MM-DD format to set the refs and the
  // default values of the date pickers
  const startDateTimestamp = new Date(taxCtx.startDateTimestamp);
  const endDateTimestamp = new Date(taxCtx.endDateTimestamp);

  const startDate = startDateTimestamp.toISOString().split('T')[0];
  const endDate = endDateTimestamp.toISOString().split('T')[0]

  const startDateRef = useRef(startDate);
  const endDateRef = useRef(endDate);

  // handle form submit by updating the tax rate and
  // the start and end date of the context
  function submitHandler(event) {
    event.preventDefault();

    const newTaxRate = taxRef.current.value;
    taxCtx.updateTaxRate(newTaxRate);

    const newStartDate = new Date(startDateRef.current.value);
    taxCtx.setStartDate(newStartDate.getTime());

    const newEndDate = new Date(endDateRef.current.value);
    taxCtx.setEndDate(newEndDate.getTime());

  }

  return (
    <form onSubmit={submitHandler} className='p-0'>
      <div className='my-3'>
        <label htmlFor="tax" className='form-label'>Tax %:</label>
        <input type="number" id="tax" ref={taxRef} defaultValue={taxCtx.taxRate} aria-describedby="taxHelp" className='form-control' />
        <div id="taxHelp" className="form-text">The percentage of the profits that you have to pay as tax. It differs from country to country. You should contact an accredited accountant. We are not providing accounting advice.</div>
      </div>
      <div className='my-3'>
        <label htmlFor="start-date" className='form-label'>Start Date:</label>
        <input type="date" id="start-date" ref={startDateRef} defaultValue={startDate} className='form-control' />
      </div>
      <div className='my-3'>
        <label htmlFor="end-date" className='form-label'>End Date:</label>
        <input type="date" id="end-date" ref={endDateRef} defaultValue={endDate} className='form-control' aria-describedby='dateHelp' />
      </div>
      <div id="dateHelp" className="form-text">Select the date range for which you want to retrieve your positions. Each country has its own dates for the anual tax period.</div>
      <button className='btn btn-primary w-100 my-3'>Recalculate Tax</button>
    </form>
  )
}

export default TaxRate;
