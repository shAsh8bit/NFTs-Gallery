import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import GalleryContext from "../context/GalleryContext";
import "../styles/Collection.css";
const Collections = () => {
  const context = useContext(GalleryContext);
  const { collections, collectionName, countLoading } = context;
  const { acc, collection_id } = useParams();
  let a = collection_id;

  useEffect(() => {
    window.scroll(0, 0);
    if (Object.keys(collections)?.length === 0) {
      collectionName(acc);
    }
  }, []);
  return (
    <>
      <div className="collection_main">
        <div className="heading">
          <h1>
            {!countLoading &&
              (collections[a][0]?.collection?.name ||
                collections[a][0]?.symbol ||
                collections[a][0]?.name)}
          </h1>
        </div>
        <div className="collections">
          <h1>
            {!countLoading &&
              `${collections[a]?.length} NFT${
                collections[a]?.length === 1 ? "" : "s"
              }`}
          </h1>
          <div className="collection">
            {!countLoading
              ? collections[a]?.map((card) => (
                  <div className="collection_cards_main">
                    <Link
                      to={`/account/${acc}/${collection_id}/sol/${card?.mint}`}
                    >
                      <div
                        className="collection_card shadow"
                        key={card.mint}
                        onCanPlay={(event) => {
                          event.target.parentElement.classList.remove("shadow");
                        }}
                        onError={(event) => {
                          const newItem = document.createElement("img");
                          newItem.src = card?.image;
                          event.target.parentNode.replaceWith(newItem);
                        }}
                        onLoad={(event) => {
                          event.target.parentElement.classList.remove("shadow");
                        }}
                      >
                        {card?.animation_url ? (
                          <video loop={true} autoPlay="autoplay" muted>
                            <source
                              src={`${card?.animation_url}`}
                              type="video/mp4"
                            />
                          </video>
                        ) : (
                          <img src={`${card?.image}`} alt="" />
                        )}
                      </div>
                    </Link>

                    <h4>{card?.name}</h4>
                  </div>
                ))
              : "loading..."}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
