function ConnectWallet({ connectWallet }) {
  return (
    <div className="text-center mt-5 pt-5">
      <p>Please connect your wallet to see your position and tax data</p>
      <button
        onClick={connectWallet}
        className='btn btn-warning btn-lg mt-3'
      >
        Connect
      </button>
    </div>
  )
}

export default ConnectWallet;
