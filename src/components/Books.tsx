import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketState } from '../redux/realtimeData/types';
import styles from './styles.module.scss';
import CollapsibleHeader from './CollapsibleHeader';
import {
  startWebSocketConnection,
  stopWebSocketConnection,
} from '../redux/realtimeData/realtimeDataActions';
import { selectWebSocketActive, selectWebSocketData } from '../redux/selectors';

const OrderBookTable: React.FC = () => {
  const dispatch = useDispatch();

  const websocketData = useSelector(selectWebSocketData);
  const active = useSelector(selectWebSocketActive);

  const handleDisconnect = useCallback(() => {
    const method = active ? stopWebSocketConnection : startWebSocketConnection;
    dispatch(method());
  }, [active]);

  if (!websocketData.length || !websocketData) {
    return null;
  }

  const limitedData = websocketData.slice(0, 1000);

  const bids = limitedData.filter((item) => item[2] > 0);
  const asks = limitedData.filter((item) => item[2] < 0);

  return (
    <div className={styles.orderBookTable}>
      <div className={styles.bookPanel}>
        <CollapsibleHeader isActive={active} disconnect={handleDisconnect} />
        <div className={styles.uiCollapsibleBodyWrapper}>
          <div className={styles.uiCollapsibleBody}>
            <div className={styles.bookMain}>
              <BookSide
                title="BIDS"
                data={bids}
                header={['COUNT', 'AMOUNT', 'TOTAL', 'PRICE']}
              />
              <BookSide
                title="ASKS"
                data={asks}
                header={['PRICE', 'TOTAL', 'AMOUNT', 'COUNT']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BookSideProps {
  title: string;
  data: any[];
  header: string[];
}

interface BookSideProps {
  title: string;
  data: any[];
  header: string[];
}

const BookSide: React.FC<BookSideProps> = ({ title, data, header }) => {
  return (
    <div className={`${styles.bookSide} ${styles.bookPanel}`}>
      <div className={styles.bookHeader}>
        {header.map((item, index) => (
          <div key={index} className={styles.headerItem}>
            {item}
          </div>
        ))}
      </div>
      {data.map((item, index) => (
        <div key={index} className={styles.bookRow}>
          {item.map((value: string | number, i: number) => (
            <div key={i} className={styles.rowItem}>
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderBookTable;
