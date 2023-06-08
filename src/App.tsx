import React, { useEffect } from 'react';
import './styles/main.scss';
import { startWebSocketConnection } from './redux/realtimeData/realtimeDataActions';
import { useDispatch } from 'react-redux';
import Books from './components/OrderBookTable';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startWebSocketConnection());
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch('https://api-pub.bitfinex.com/v2/book/tBTCUSD/P0?len=25', options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, [dispatch]);
  return (
    <div>
      <Books />
    </div>
  );
}

export default App;
