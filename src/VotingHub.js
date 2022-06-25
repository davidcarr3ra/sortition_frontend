import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "./util/interact.js";

import "./VotingHub.css";

const VotingHub = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
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

  // const onRegisterPressed ...

  // const onSubmitPressed ...

  // const onVotePressed ...

  return (
    <div className="VotingHub">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">⚖️ Voting Hub </h1>
      <p>
        To get started, provide liquidity to balancer pool 0xc697051d1c6296c24ae3bcef39aca743861d9a81 and register as a voter below.
      </p>
      <form>
        <h2>✏️ Voter registration </h2>
        <h3>Name:</h3>
        <input
          type="text"
          placeholder="e.g. Jeff Bezos"
          onChange={(event) => setURL(event.target.value)}
        />
        <h3>Wallet address:</h3>
        <input
          type="text"
          placeholder="e.g. 0xa2F376f54CF579a9738B7cBdc299085C5Ec24393"
          onChange={(event) => setURL(event.target.value)}
        />
      </form>
      <button className="requestButton">
        Register
      </button>
      <form>
        <h2>📤 Submit a proposal </h2>
        <h3>Address of proposed owner:</h3>
        <input
          type="text"
          placeholder="e.g. Jeff Bezos"
          onChange={(event) => setURL(event.target.value)}
        />
        <h3>Proposed action:</h3>
        <div>
          <input type="radio" value="add"
          checked/>
          <label>Add owner</label>
        </div>
        <div>
          <input type="radio" value="remove"/>
          <label>Remove owner</label>
        </div>
      </form>
      <button className="requestButton">
        Submit
      </button>
      <form>
        <h2>🙋‍♂️ Vote on a proposal </h2>
        <h3>Proposal ID:</h3>
        <input
          type="text"
          placeholder="e.g. 123"
          onChange={(event) => setURL(event.target.value)}
        />
        <div>
          <input type="radio" value="add"
          checked/>
          <label>For</label>
        </div>
        <div>
          <input type="radio" value="remove"/>
          <label>Against</label>
        </div>
      </form>
      <button className="requestButton">
        Vote
      </button>
      
    </div>
  );
};

export default VotingHub;
