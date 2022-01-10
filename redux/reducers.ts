import { combineReducers } from "redux";
import user from "./slices/user/user";
import mail from "./slices/mail/mail";
import taxi from "./slices/taxi/taxi";
import transport from "./slices/transport/transport";
import load from "./slices/load/load";
import order from "./slices/order/order";
import filter from "./slices/filter/filter";

export default combineReducers({
    user,
    mail,
    taxi,
    order,
    load,
    transport,
    filter,
});
