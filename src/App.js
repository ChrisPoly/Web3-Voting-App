import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from './Constant/constant';
import Login from './Components/Login';
import Connected from './Components/Connected';
import './App.css';

function App() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [Contestants, setContestants] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);


  useEffect( () => {
    getContestants();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });


  async function vote() {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (contractAddress, contractAbi, signer);

      const tx = await contractInstance.vote(number);
      await tx.wait();
      canVote();
  }


  async function canVote() {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (contractAddress, contractAbi, signer);
      const voteStatus = await contractInstance.voters(await signer.getAddress());
      setCanVote(voteStatus);
  }

  async function getContestants() {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (contractAddress, contractAbi, signer);
      const ContestantsList = await contractInstance.getAllVotesOfContestantNames();
      const formattedContestants = ContestantsList.map((Contestant, Id) => {
        return {
          Id: Id,
          name: Contestant.name,
          voteCount: Contestant.voteCount.toNumber()
        }
      });
      setContestants(formattedContestants);
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (typeof window.ethereum !== "undefined") {
      try {
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const currentUser = provider.getSigner();
        const address = await currentUser.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        canVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  return (
    <div className="App">
      { isConnected ? ( <Connected account = {account} 
                                   Contestants = {Contestants} 
                                   number= {number} 
                                   handleNumberChange = {handleNumberChange} 
                                   voteFunction = {vote} 
                                   showButton = {CanVote}/>) 
                    : (<Login connectWallet = {connectToMetamask}/>)
      }
    </div>
  );



}





export default App;
