import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
//local storage
import storage from 'redux-persist/lib/storage';
import {persistStore,persistReducer} from 'redux-persist';
//two methods to setup our persistance
// import {thunk} from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

const persistConfig={
  key:'root',  //to persist whole thing
  storage,
  whitelist:['cart']
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig,rootReducer);

const middleWares = [
  process.env.NODE_ENV === 'development' && logger,sagaMiddleware].filter(
  Boolean
); //replace the developement with production the logger dissapears
//here we are using the filter to remove the false values and 
//only run the logger when the environment is development

//use redux dev tools


const composeEnhancer =(process.env.NODE_ENV !== 'production'
  && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

//after store instantiated with saga middlewares we run the sagaMiddleware 
//with rootSaga....unique setup for redux saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);