import { createStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import persistStore from 'redux-persist/es/persistStore';
import Auth from '../features/Auth/reducers/Auth';
import ListMusic from '../features/Home/reducers/ListMusic';
import ListUser from '../Admin/reducers/ListUser';


const rootReducer = combineReducers({
    Auth: Auth,
    ListMusic:ListMusic,
    ListUser: ListUser,
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
    let persister = persistStore(store)
    return { store, persistor: persister }
}