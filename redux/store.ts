import { combineReducers, configureStore } from '@reduxjs/toolkit';
import orderReducer from './features/orderSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from '@/redux/storage';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';

const orderPersistConfig = {
  key: 'order',
  storage,
};

const rootReducer = combineReducers({
  order: persistReducer(orderPersistConfig, orderReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
