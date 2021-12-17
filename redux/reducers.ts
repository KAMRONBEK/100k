import { combineReducers } from "redux";
import user from "./slices/user/user";
import mail from "./slices/mail/mail";
import taxi from "./slices/taxi/taxi";
import order from "./slices/order/order";
import transport from "./slices/transport/transport";

export default combineReducers({ user, mail, taxi, order, transport });
