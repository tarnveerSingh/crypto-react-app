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
  const [limit] = useState(100);

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
    setPaginate(selectedPage);
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
        <h1 className="coin-text">CRYPTO - Currency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={onclick}
            placeholder="Enter to Search...."
          />
        </form>
      </div>

      <div className="commentBox">
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={20}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
        />
      </div>

      <div>
        <div className="coin-row">
          <div className="">Curency name</div>
          <div>Curency name</div>
          <div>Curency name</div>
          <div>Curency name</div>
          <div>Curency name</div>
          <div>Curency name</div>
          <div>Curency name</div>
        </div>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            mkp={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
            priceChange24={coin.price_change_24h}
          />
        );
      })}

      {loading && <ClipLoader color={color} loading={loading} size={110} />}
      {error && <div>{error}</div>}
    </div>
  );
};

export default TrendingPage;
