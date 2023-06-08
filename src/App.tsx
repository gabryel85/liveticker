import React, { useEffect } from 'react';
import './styles/main.scss';
import { startWebSocketConnection } from './redux/realtimeData/realtimeDataActions';
import { useDispatch } from 'react-redux';
import Books from './components/OrderBookTable';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startWebSocketConnection());
  }, [dispatch]);
  return (
    <div>
      <Books />
    </div>
  );
}

export default App;
