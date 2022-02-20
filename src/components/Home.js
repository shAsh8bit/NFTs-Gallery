import React, { useState, useEffect, useContext} from "react";
import GalleryContext from "../context/GalleryContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { BiLockAlt, BiSearchAlt } from "react-icons/bi";
import "../styles/Home.css";
import { accounts, getRandomInt } from "../utils/index";
import { useNavigate } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
const Home = () => {
  const navigate = useNavigate();
  const context = useContext(GalleryContext);
  const [searchterm, setSearchTerm] = useState("");
  const initialPlaceHolder = "(Or) Enter Wallet Address";
  const { setCollections } = context;
  const [placeholder, setPlaceholder] = useState(initialPlaceHolder);
  const { publicKey, connected } = useWallet();
  //phantomshashank27
  const base58 = publicKey?.toBase58();
  useEffect(() => {
    if (connected) {
      setSearchTerm("");
      setSearchTerm(base58);
    }
  }, [connected]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleRandomAddress = () => {
    setSearchTerm("");
    setPlaceholder("fetching.....");
    // const data = await fetch("https://nfteyez.global/api/accounts/top");
    // const res = await data.json()
    // setSearchTerm(res["account"]);
    setSearchTerm(accounts[getRandomInt(accounts.length - 1)]);
    setPlaceholder(initialPlaceHolder);
  };

  return (
    <>
      <div className="main_">
        <div className="navbar">
          <div className="navbar_component">
            <span
              style={{
                fontSize: "40px",
                margin: "10px 10px 0 10px",
                color: "white",
              }}
            >
              <BiLockAlt />
            </span>

            <WalletMultiButton />
          </div>
        </div>
        <div className="content">
          <div className="text">
            <div className="address">
              <input
                type="text"
                placeholder={placeholder}
                value={searchterm}
                onChange={handleSearchChange}
              />
              <button
                disabled={searchterm.length < 43 || searchterm.length > 44}
                
                onClick={() => {
                  setCollections({});
                  navigate(`/account/${searchterm}`);
                }}
              >
                <BiSearchAlt />
              </button>
            </div>
            <h3 onClick={handleRandomAddress}>Get Random Address</h3>
          </div>

          <div className="bg-image"></div>

          <div className="bg-text">
            <h1>Connect To Solana Wallet To View Your NFTs</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
