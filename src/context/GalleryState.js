import React, { useState } from "react";
import { Connection, programs } from "@metaplex/js";
import GalleryContext from "./GalleryContext";
import { PublicKey } from "@solana/web3.js";
const {
  metadata: { Metadata },
} = programs;
const connection = new Connection("mainnet-beta");
const GalleryState = (props) => {
  const [collections, setCollections] = useState({});
  const [loading, setLoading] = useState(true);
  const [countLoading, setCountLoading] = useState(true);
  const [txn, setTxn] = useState([]);
  const [total, setTotal] = useState(0);

  const getTxn = async (mint) => {
    const pubkey = new PublicKey(mint);
    let txns = await connection.getConfirmedSignaturesForAddress2(pubkey);
    setTxn(txns);
  };

  const getTokenData = async (ownerPublicKey) => {
    const ownedMetadata = await Metadata.findDataByOwner(
      connection,
      ownerPublicKey
    );

    return ownedMetadata;
  };

  async function collectionName(ownerPublicKey) {
    setCountLoading(true);
    if (ownerPublicKey.length === 43 || ownerPublicKey.length === 44) {
      let tokenData = await getTokenData(ownerPublicKey);
      let unique = {};
      let total = 0;
      let render = 0;
      await Promise.all(
      tokenData?.map(async (e, i) => {
        try {
          const data = await fetch(e.data.uri);
          const res = await data.json();

          if (e.updateAuthority in unique) {
            unique[e.updateAuthority] = [
              ...unique[e.updateAuthority],
              { ...res, mint: e.mint, collection_id: e.updateAuthority },
            ];
            total = total + 1;
          } else {
            unique[e.updateAuthority] = [
              { ...res, mint: e.mint, collection_id: e.updateAuthority },
            ];
            total = total + 1;
            render = render + 1;
            if (render % 8 === 0) {
            setLoading(false);
            setCollections({ ...unique });
            }
          } 
         } catch (error) {
          console.log(error);
        }
      })
      );
      setTotal(total);
      setCollections(unique);
      setLoading(false);
      setCountLoading(false);
    } else {
      setLoading(false);
      alert("Invalid address");
      setCountLoading(false);
    }
  }

  return (
    <GalleryContext.Provider
      value={{
        collections,
        collectionName,
        loading,
        txn,
        getTxn,
        setLoading,
        total,
        countLoading,
        setCollections,
      }}
    >
      {props.children}
    </GalleryContext.Provider>
  );
};

export default GalleryState;
