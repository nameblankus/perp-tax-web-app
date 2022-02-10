import { createContext, useState } from "react";

// Context for managing the tax rate
const TaxContext = createContext({
  taxRate: null,
  profitData: [],
  startDateTimestamp: null,
  endDateTimestamp: null,
  selectedAsset: null,
  selectedWallet: null,
  selectedChainId: null,
  updateTaxRate: (newTaxRate) => { },
  setProfits: (profits) => { },
  updateProfits: (newProfits) => { },
  setStartDate: (newStartDateTimestamp) => { },
  setEndDate: (newEndDateTimestamp) => { },
  setSelectedAsset: (asset) => { },
  setSelectedWallet: (walletAddress) => { },
  setSelectedChainId: (chainId) => { },
});

export function TaxContextProvider(props) {

  // set the initial tax rate to be the one stored in localStorage
  // or to be 10 % if the localStorage is empty
  const initialTaxRate = localStorage.getItem("taxRate") || 10;
  const [currentTaxRate, setCurrentTaxRate] = useState(initialTaxRate);
  const [currentProfitData, setCurrentProfitData] = useState([]);

  // set the initial start date and end date for the tax calculation
  let currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  let pastMonthDate = new Date(currentDate.getTime());
  pastMonthDate.setMonth(pastMonthDate.getMonth() - 1);

  const [currentStartTimestamp, setCurrentStartTimestamp] = useState(pastMonthDate.getTime());
  const [currentEndTimestamp, setCurrentEndTimestamp] = useState(currentDate.getTime());

  // set the initial selected asset to be the one stored in the local
  // storage or ETH
  const initialSelectedAsset = localStorage.getItem("selectedAsset") || 'ETH';
  const [currentSelectedAsset, setCurrentSelectedAsset] = useState(initialSelectedAsset);

  // set selected wallet
  const [currentSelectedWallet, setCurrentSelectedWallet] = useState();

  // set chainId
  const [currentSelectedChainId, setCurrentSelectedChainId] = useState();

  function updateTaxRate(newTaxRate) {
    setCurrentTaxRate(newTaxRate);
    localStorage.setItem("taxRate", newTaxRate);
  }

  function setProfitData(profitData) {
    setCurrentProfitData(profitData);
  }

  function updateProfitData(newProfitData) {
    setCurrentProfitData(currentProfitData.concat(newProfitData));
  }

  function setStartDate(newStartDateTimestamp) {
    setCurrentStartTimestamp(newStartDateTimestamp);
  }

  function setEndDate(newEndDateTimestamp) {
    setCurrentEndTimestamp(newEndDateTimestamp);
  }

  function setSelectedAsset(asset) {
    setCurrentSelectedAsset(asset);
    localStorage.setItem("selectedAsset", asset);
  }

  function setSelectedWallet(walletAddress) {
    setCurrentSelectedWallet(walletAddress);
  }

  function setSelectedChainId(chainId) {
    setCurrentSelectedChainId(chainId);
  }

  const context = {
    taxRate: currentTaxRate,
    profitData: currentProfitData,
    startDateTimestamp: currentStartTimestamp,
    endDateTimestamp: currentEndTimestamp,
    selectedAsset: currentSelectedAsset,
    selectedWallet: currentSelectedWallet,
    selectedChainId: currentSelectedChainId,
    updateTaxRate: updateTaxRate,
    setProfitData: setProfitData,
    updateProfitData: updateProfitData,
    setStartDate: setStartDate,
    setEndDate: setEndDate,
    setSelectedAsset: setSelectedAsset,
    setSelectedWallet: setSelectedWallet,
    setSelectedChainId: setSelectedChainId,
  }

  return (
    <TaxContext.Provider value={context}>
      {props.children}
    </TaxContext.Provider>
  )
}

export default TaxContext;
