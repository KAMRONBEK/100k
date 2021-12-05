import { combineReducers } from "redux";
import user from "./slices/user";
import mail from "./slices/mail";
import taxi from "./slices/taxi";

export default combineReducers({ user, mail, taxi });
