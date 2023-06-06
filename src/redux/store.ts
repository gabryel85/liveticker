import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger());
}

middleware.push(sagaMiddleware);

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
