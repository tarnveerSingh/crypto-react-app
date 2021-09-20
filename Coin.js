/* eslint-disable react/prop-types */
import React from 'react';
import './main.css';

const Coin = ({
  name,
  price,
  symbol,
  mkp,
  volume,
  image,
  priceChange,
  priceChange24,
}) => {
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          {price ? <p className="coin-price">{price && `A$${price}`}</p> : ''}

          {/* {price && <p className="coin-price">{price && `A$${price}`}</p>} */}
          {/* <p className="coin-price">{price && `A$${price}`}</p> */}

          {priceChange < 0 ? (
            <p className="coin-percent-black">
              {priceChange && priceChange.toFixed(2)}%
            </p>
          ) : (
            <p className="coin-percent-white">
              {priceChange && priceChange.toFixed(2)}
            </p>
          )}
          {/* priceChange24  if not required */}
          {/* {priceChange24 < 0 ? (
            <p className="coin-percent-black">
              ${priceChange && priceChange24.toFixed(3)}
            </p>
          ) : (
            <p className="coin-percent-white">
              {priceChange24 && priceChange24}
            </p>
          )} */}
          {/* difference $ */}
          {/* {priceChange24 < 0 ? (
            <p className="coin-percent-black">
              ${priceChange && priceChange24.toFixed(2)}
            </p>
          ) : (
            <p className="coin-percent-white">
              ${priceChange24 && priceChange24}
              
            </p>
          )} */}

          {priceChange24 < 0 ? (
            <p className="coin-percent-black">
              ${priceChange24 && priceChange24.toFixed(2)}
            </p>
          ) : (
            <p className="coin-percent-white">
              ${priceChange24 && priceChange24.toFixed(2)}
            </p>
          )}
          <p className="coin-volume">${volume.toLocaleString()}</p>
          {/* <p className="coin-volume">${volume.toFixed(2)}</p> */}

          <p className="coin-mkp">Mkt Cap: ${mkp.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
