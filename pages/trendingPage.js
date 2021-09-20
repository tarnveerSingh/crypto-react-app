import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';
import Coin from '../Coin';
import axios from 'axios';

const TrendingPage = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [color] = useState('orange');
  const [error, setError] = useState('');
  const [paginate, setPaginate] = useState(1);
  const [limit] = useState(50);

  const onclick = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      // coin.name.toLowerCase() === search.toLowerCase() ||
      coin.symbol.toLowerCase() === search.toLowerCase() ||
      coin.name.toLowerCase().includes(search.toLowerCase())
  );

  function handlePageClick({ selected: selectedPage }) {
    setPaginate(selectedPage + 1);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=volume_desc&per_page=${limit}&page=${paginate}&sparkline=false`
      )
      .then((res) => {
        if (res.data) {
          setCoins(res.data);
        }
        // setCoins(res.data); // sets the data to appear
        console.log(res, 'response is this');
        console.log(res.data);

        setLoading(false); //stops loading when data is fetched
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }, [paginate]);

  return (
    <div>
      <div className="coin-search">
        <h1 className="coin-text">Trending - Based On Volume</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={onclick}
            placeholder="Enter..( NAME / SYMBOL )"
          />
        </form>
      </div>

      <div className="commentBox">
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={10}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
        />
      </div>

      <div className="table-container">
        <table>
          <div
            style={{
              background: '#007FFF',
              height: '60px',
              display: 'grid',
              alignItems: 'center',
              margin: 'auto',
              maxWidth: '970px',
              position: 'sticky',
              top: 0,

              justifyItems: 'center',

              gridTemplateColumns: '126px 113px 154px 160px 160px 280px',
            }}
          >
            <div style={{ background: 'transparent' }}>Coin</div>
            <div style={{ background: 'transparent' }}>Symbol</div>
            <div style={{ background: 'transparent' }}>Current Price</div>
            <div style={{ background: 'transparent' }}>Price Change(24 hr)</div>
            <div style={{ background: 'transparent' }}>TOTAL VOLUME</div>
            <div style={{ background: 'transparent' }}>Market Cap</div>
          </div>
          {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.current_price}
                mkp={coin.market_cap}
                volume={coin.total_volume}
                image={coin.image}
                priceChange24={coin.price_change_24h}
              />
            );
          })}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '3rem',
            }}
          >
            {loading && (
              <ClipLoader color={color} loading={loading} size={110} />
            )}
            {error && <div>{error}</div>}
          </div>
        </table>
      </div>
    </div>
  );
};

export default TrendingPage;
