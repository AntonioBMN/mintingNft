import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "../utils/erc721.js";
import App from "../App.js"

const LoginScreen = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function a() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
      addWalletListener();
    }
    a()
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using this button.👆🏽 🦊");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  if (walletAddress.length <= 0) {
    return (
      <div className="container d-flex flex-column">
        <div className="container d-flex flex-column col-md-4 col-sm-4 col-12 mt-5">
          <button onClick={connectWalletPressed} href='/'>
            <span>Connect Wallet</span>
          </button>
        </div>
        <div className="container d-flex flex-column col-md-4 col-sm-4 col-12 mt-5 text-center">
          {status}
        </div>
      </div>
    );
  }
  /* if (walletAddress.length > 0  && window.ethereum.chainId !== "0x13881") {
    return (
      <div className="container d-flex flex-column">
        <div className="container d-flex flex-column col-md-4 col-sm-4 col-12 mt-5">
          <button onClick={changeNetwork} href='/'>
            <span>Mudar Rede</span>
          </button>
        </div>
        <div className="container d-flex flex-column col-md-4 col-sm-4 col-12 mt-5 text-center">
        </div>
      </div>
    )
  } */

  else {
    return (<App />)
  }
}
export default LoginScreen;
