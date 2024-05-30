import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from '../rootSaga';
import rootReducer from '../rootReducer';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export default store;
