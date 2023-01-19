import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { carsReducer } from './reducers/carsReducer';
import { alertsReducer } from './reducers/alertsReducers';
import { bookingsReducer } from './reducers/bookingsReducer';
import { notificationsReducer } from './reducers/notificationsReducer';
import { dashboardReducer } from './reducers/dashboardReducer';

const composeEnhancers = composeWithDevTools({
});
const rootReducer = combineReducers({ //Created 'rootreducer' and combined reducers. 
  carsReducer , 
  alertsReducer , 
  bookingsReducer,
  notificationsReducer,
  dashboardReducer
})
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk) //applied thunk midlwr to make dispatches asyncronouse and coperate logics
 
  )   
);
export default store;