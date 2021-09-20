import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';
import Coin from '../Coin';
import axios from 'axios';

const Index = () => {
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
      coin.name.toLowerCase() === search.toLowerCase() ||
      coin.symbol.toLowerCase() === search.toLowerCase() ||
      coin.name.toLowerCase().includes(search.toLowerCase())
  );

  function handlePageClick({ selected: selectedPage }) {
    setPaginate(selectedPage + 1);
    // console.log(selectedPage, 'this is the selected page');
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=${limit}&page=${paginate}&sparkline=false&price_change_percentage=7d`
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
        <h1 className="coin-text">CRYPTO - Currency</h1>
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
              position: 'sticky',
              // position: '-webkit-sticky',

              // position: '-webkit-sticky',
              top: '0',
              background: '#007FFF',
              height: '60px',
              display: 'grid',
              alignItems: 'center',
              margin: '',
              maxWidth: '970px',
              justifyItems: 'center',
              border: '2px',

              gridTemplateColumns: '125px 100px 132px 102px 123px 158px 245px',
            }}
          >
            <div style={{ background: 'transparent' }}>Coin</div>
            <div style={{ background: 'transparent' }}>Symbol</div>
            <div style={{ background: 'transparent' }}>Current Price</div>
            <div style={{ background: 'transparent' }}>
              Last 24 (In Percentage)
            </div>
            <div style={{ background: 'transparent' }}>
              Last 24 Hrs (In AUD$)
            </div>
            <div style={{ background: 'transparent' }}>Total Volume</div>
            <div style={{ background: 'transparent' }}>Market Cap</div>
          </div>

          {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                price={coin.current_price}
                symbol={coin.symbol}
                mkp={coin.market_cap}
                volume={coin.total_volume}
                image={coin.image}
                priceChange={coin.price_change_percentage_24h}
                priceChange24={coin.price_change_24h}
              />
            );
          })}

          {loading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '3rem',
              }}
            >
              <ClipLoader color={color} loading={true} size={110} />
            </div>
          )}
          {error && <div>{error}</div>}
        </table>
      </div>
    </div>
  );
};

export default Index;
