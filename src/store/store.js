import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
//local storage
import storage from 'redux-persist/lib/storage';
import {persistStore,persistReducer} from 'redux-persist';
//two methods to setup our persistance
import {thunk} from 'redux-thunk';


const persistConfig={
  key:'root',  //to persist whole thing
  storage,
  whitelist:['cart']
}
const persistedReducer = persistReducer(persistConfig,rootReducer);

const middleWares = [
  process.env.NODE_ENV === 'development' && logger,thunk].filter(
  Boolean
); //replace the developement with production the logger dissapears
//here we are using the filter to remove the false values and 
//only run the logger when the environment is development

//use redux dev tools




const composeEnhancer =(process.env.NODE_ENV !== 'production'
  && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);