import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from "../redux/user";

//redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({user});
const persistConfig = { key: "carboneGen", storage }

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false}),
});

const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

      < Component {...pageProps} />;
      </PersistGate>
    </Provider>
  )
}
