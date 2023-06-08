import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import CollapsibleHeader from '../CollapsibleHeader';
import {
  startWebSocketConnection,
  stopWebSocketConnection,
} from '../../redux/realtimeData/realtimeDataActions';
import {
  selectWebSocketActive,
  selectWebSocketData,
} from '../../redux/selectors';
import BookSide from '../BookSide';

const OrderBookTable: React.FC = () => {
  const dispatch = useDispatch();

  const websocketData = useSelector(selectWebSocketData);
  const active = useSelector(selectWebSocketActive);

  const handleDisconnect = useCallback(() => {
    const method = active ? stopWebSocketConnection : startWebSocketConnection;
    dispatch(method());
  }, [active, dispatch]);

  const bids = useMemo(
    () => websocketData.filter((item) => +item.amount > 0),
    [websocketData],
  );
  const asks = useMemo(
    () => websocketData.filter((item) => +item.amount < 0),
    [websocketData],
  );

  return (
    <div className={styles.orderBookTable} data-testid="order-book-table">
      <div className={styles.bookPanel}>
        <CollapsibleHeader isActive={active} disconnect={handleDisconnect} />
        <div className={styles.uiCollapsibleBodyWrapper}>
          <div className={styles.uiCollapsibleBody}>
            <div className={styles.bookMain}>
              <BookSide
                title="bids"
                data={bids}
                header={['COUNT', 'AMOUNT', 'TOTAL', 'PRICE']}
              />
              <BookSide
                title="asks"
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

export default OrderBookTable;
