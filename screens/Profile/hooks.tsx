import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser, setUser } from "../../redux/slices/user/user";
import { useEffect } from "react";
import { requests } from "../../api/requests";
import reactotron from "reactotron-react-native";

export let useProfileHook = () => {
  let user = useSelector(selectUser);
  let dispatch = useDispatch();
  let effect = async () => {
    try {
      let res = await requests.user.getMe();
      dispatch(setUser({ profile: res.data.data }));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    effect();
  }, []);
  let onLogout = () => {
    dispatch(logoutUser());
  };
  return { onLogout, user };
};
