import NavBar from './components/NavBar';
import Trader from './components/Trader';
import TaxRate from './components/TaxRate';
import TaxTotal from './components/TaxTotal';
import PositionHistoryList from './components/PositionHistoryList';
import TaxDataDownloader from './components/TaxDataDownloader';
import TokenSelector from './components/TokenSelector';
import Disclaimer from './components/Disclaimer';

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-4 me-3'>
              <div className='row border border-2 rounded p-3 mb-3'>
                <TaxTotal />
              </div>
              <div className='row border border-2 rounded p-3'>
                <TokenSelector />
                <TaxRate />
                <TaxDataDownloader />
              </div>
              <div className='row mt-5 border border-2 rounded p-3'>
                <Trader />
              </div>
            </div>
            <div className='col-7 ms-5'>
              <PositionHistoryList />
            </div>
          </div>
        </div>
      </main>
      <footer className="footer fixed-bottom mt-auto py-2 bg-light">
        <Disclaimer />
      </footer>
    </div >
  )
}

export default App;
