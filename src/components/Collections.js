import React, { useContext, useEffect } from "react";
import GalleryContext from "../context/GalleryContext";
import "../styles/Collections.css";
import Spinner from "./Spinner";
import { truncateString } from "../utils";
import { Link, useParams } from "react-router-dom";
const Collections = () => {
  const context = useContext(GalleryContext);
  const {
    collections,
    collectionName,
    loading,
    setLoading,
    total,
    countLoading,
  } = context;
  const { acc } = useParams();
  useEffect(() => {
    if (Object.keys(collections)?.length === 0) {
      collectionName(acc);
      setLoading(true);
    }
  }, []);
  console.log(collections);
  return (
    <>
      <div className="collection_main">
        <div className="heading">
          <h1>Collections</h1>
        </div>
        <div className="collections">
          <h1>
            {!countLoading
              ? `${Object.keys(collections)?.length} collection${
                  Object.keys(collections)?.length === 1 ? "" : "s"
                } (${total} NFT${total === 1 ? "" : "s"})`
              : "loading..."}
          </h1>
          <div className="collection">
            {!loading ? (
              Object.keys(collections)?.map((e) =>
                collections[e]?.map(
                  (e, i) =>
                    i === 0 && (
                      <div
                        className="collection_cards_main"
                        key={e.collection_id}
                      >
                        <Link
                          to={`/account/${acc}/collection/${e.collection_id}`}
                        >
                          <div
                            className="collection_cards shadow"
                            onCanPlay={(event) => {
                              event.target.parentElement.classList.remove(
                                "shadow"
                              );
                            }}
                            onError={(event) => {
                              const newItem = document.createElement('img');
                              newItem.src=e?.image;
                              event.target.parentNode.replaceWith(newItem)
                            }}
                            onLoad={(event) => {
                              event.target.parentElement.classList.remove(
                                "shadow"
                              );
                            }}
                          >
                            {e.animation_url ? (
                              <video loop={true} autoPlay="autoplay" muted>
                                <source src={`${e?.animation_url}`} />
                              </video>
                            ) : (
                              <img src={`${e?.image}`} alt="" />
                            )}
                          </div>
                        </Link>
                        <h4>
                          {truncateString(
                            (Array.isArray(e?.collection) &&
                              e?.collection[0].name) ||
                              e?.collection?.name ||
                              e?.symbol ||
                              e?.name,
                            14
                          )}{" "}
                          ({collections[e.collection_id].length} NFT
                          {collections[e.collection_id].length === 1 ? "" : "s"}
                          )
                        </h4>

                        {/* <h4>{ Array.isArray(e?.collection) && e?.collection[0].name || e?.collection?.name || e?.collection || e?.symbol || e?.name}</h4> */}
                      </div>
                    )
                )
              )
            ) : (
              <div className="collection_cards_main_shadow">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
                  <div className="collection_cards_shadow"></div>
                ))}
              </div>
            )}
          </div>
          {countLoading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Collections;
