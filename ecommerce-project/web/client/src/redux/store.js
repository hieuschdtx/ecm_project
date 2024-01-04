import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import categorySliceReducer from './reducers/category-reducer';
import sliderReducer from './reducers/slider-reducer';
import productCategoryReducer from './reducers/product-category-reducer';
import productReducer from './reducers/product-reducer';
import cartReducer from './reducers/cart-reducer';
import userReducer from './reducers/user-reducer';
import cityReducer from './reducers/city-reducer';
import newsReducer from './reducers/news-reducer';
const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['carts', 'user'],
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart', 'count', 'totalAmount'],
  blacklist: ['loading', 'message', 'success', 'error'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
  blacklist: ['loading', 'message', 'success', 'error'],
};

const rootReducer = combineReducers({
  categories: categorySliceReducer,
  slides: sliderReducer,
  productCategories: productCategoryReducer,
  products: productReducer,
  user: persistReducer(userPersistConfig, userReducer),
  carts: persistReducer(cartPersistConfig, cartReducer),
  city: cityReducer,
  news: newsReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
