import React, { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";
import "./App.css";
import Animation from "./components/Animation";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  
  let accounts;
  let winner_address;
  useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      web3.eth.getAccounts().then(console.log);

      setManager(manager);
      setPlayers(players);
      setBalance(balance);
      
    }

    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      setMessage("please install metamask");
    }

    setMessage("Waiting on transaction success...");

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });

    setMessage("You have been entered!");
  }

  async function handleClick() {
    ;
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      setMessage("please install metamask");
    }

    setMessage("Waiting on transaction success...");

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    winner_address = await lottery.methods.getWinner().call();
    setMessage(
      "The winner has been picked and the winner is " + " " + winner_address
    );
  }
 
  return (
    <div className="container">
      <div className="second">
        <h1>LUCKY LUCKY LUCKY!</h1>
        <h2>GET LUCKY ENOUGH TO GRAB ALL THE ETHERS</h2>
        <span>&#129297; &#129297; &#129297;</span>
      </div>
      <Animation
        address={manager}
        players={players}
        balance={web3.utils.fromWei(balance, "ether")}
      />
      <div className="message">
        <p>{message}</p>
      </div>

      <div className="entry">
        <form onSubmit={handleSubmit}>
          <h3>Want to try your luck?</h3>
          <div>
            <label>
              Amount of ether to enter <span>&#128178;</span>
            </label>
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <button>CLICK HERE TO ENTER THE LOTTERY</button>
        </form>
      </div>
      <p className="note">
        <i>
          (Note:Make sure that you have a metamask account and a sufficient
          amount of ether and the minimum ether to get into the lottery is 0.001
          ether.The winner will be picked once in 2 days by the manager)
        </i>
      </p>

      <div className="pickwinner">
        <h4>Ready to pick a winner?</h4>
        <button onClick={handleClick}>Pick a winner!</button>
        <p className="note2">
          (Note:This is only for manager if anyone else tries to pick the winner
          the request will be rejected)
        </p>
      </div>
    </div>
  );
}

export default App;
