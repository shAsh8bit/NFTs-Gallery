import React, { useContext, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { BsDownload } from "react-icons/bs";
import { useParams } from "react-router-dom";
import GalleryContext from "../context/GalleryContext";
import "../styles/NftDetails.css";
import { epochToHumanReadableForm, truncateString } from "../utils";

const NftDetails = () => {
  const [count, setCount] = useState(10);
  const { collections, collectionName, countLoading, txn, getTxn } =
    useContext(GalleryContext);
  const { acc, collection_id, mint } = useParams();
  let a = collection_id;
  useEffect(() => {
    if (collections[a]?.length === 0) {
      collectionName(acc);
    }
    getTxn(mint);
  }, [count]);

  let nft = !countLoading && collections[a]?.filter((e) => e.mint === mint);
  const onDownload = async () => {
    try {
      console.log("download start");

      const downloadResult = await fetch(
        nft[0]?.animation_url ? nft[0]?.animation_url : nft[0]?.image
      );
      const blob = await downloadResult.blob();
      saveAs(
        blob,
        `${nft[0]?.name || nft[0]?.symbol}.${
          nft[0]?.animation_url ? "mp4" : "png"
        }`
      );
      console.log("downloaded");
    } catch (err) {
      console.log(err);
      alert("Some Error Occurred . ,Can't Downlaod at the moment");
    }
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <div
            className="nft"
            onError={(event) => {
              const newItem = document.createElement("img");
              newItem.src = nft[0]?.image;
              event.target.parentNode.replaceWith(newItem);
            }}
          >
            <button onClick={onDownload}>
              <BsDownload />
            </button>

            {nft[0]?.animation_url ? (
              <video loop={true} autoPlay="autoplay" controls muted>
                <source src={`${nft[0]?.animation_url}`} type="video/mp4" />
              </video>
            ) : (
              <img src={`${nft[0]?.image}`} alt="" />
            )}
          </div>
          <div className="nft_details">
            <div className="nft_details_1">
              <h2>{nft[0]?.name || nft[0]?.symbol}</h2>
              <p>{nft[0]?.description}</p>
              <a href={`${nft[0]?.external_url}`}>{nft[0]?.external_url}</a>
              <div>
                <p style={{ fontSize: "0.95rem" }}>
                  {nft[0]?.mint && `Mint Address :${nft[0]?.mint}`}
                </p>
              </div>
            </div>
          </div>
        </div>
        {txn && (
          <div className="container_2">
            <div className="txn">
              <h2>Transaction History</h2>
              <table style={{ backgroundColor: "rgb(46, 46, 44)" }}>
                <tbody>
                  <tr style={{ backgroundColor: "black" }}>
                    <th>TRANSACTION (Total : {txn.length})</th>
                    <th>TIME</th>
                  </tr>
                </tbody>
                {txn?.map(
                  (e, i) =>
                    i < count && (
                      <tbody key={e.slot}>
                        <tr
                          style={{
                            backgroundColor: "#666cb6",
                            textAlign: "center",
                          }}
                        >
                          <td>
                            <a
                              href={`https://solscan.io/tx/${e.signature}`}
                              target="_blank"
                            >
                              {truncateString(e.signature, 30)}
                            </a>
                          </td>
                          <td>{epochToHumanReadableForm(e.blockTime)}</td>
                        </tr>
                      </tbody>
                    )
                )}
              </table>
              {txn.length >= 10 &&
                (count > 10 ? (
                  <button onClick={() => setCount(10)}>View less</button>
                ) : (
                  <button onClick={() => setCount(count + txn.length)}>
                    View All
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NftDetails;
