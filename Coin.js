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
          <p className="coin-price">A${price}</p>
          {priceChange < 0 ? (
            <p className="coin-percent-black">
              {priceChange && priceChange.toFixed(2)}%
            </p>
          ) : (
            <p className="coin-percent-white">
              {priceChange && priceChange.toFixed(2)}%
            </p>
          )}
          {priceChange24 < 0 ? (
            <p className="coin-percent-black">
              ${priceChange && priceChange24.toFixed(2)}
            </p>
          ) : (
            <p className="coin-percent-white">
              ${priceChange && priceChange24.toFixed(2)}
            </p>
          )}

          <p className="coin-volume">${volume.toLocaleString()}</p>

          <p className="coin-mkp">Mkt Cap: ${mkp.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
