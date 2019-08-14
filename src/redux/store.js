import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import screamDialogReducer from "./reducers/screamDialogReducer";

const middleware = [thunk];
const initialStore = {};
const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  data: dataReducer,
  screamDialog: screamDialogReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);
// const store = createStore(reducer, enhancer);

const store = createStore(reducers, initialStore, enhancer);

export default store;
