import { combineReducers } from "redux";
import user from "./slices/user/user";
import mail from "./slices/mail/mail";
import taxi from "./slices/taxi/taxi";
import order from './slices/order/order'

export default combineReducers({ user, mail, taxi, order  });
