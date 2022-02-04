import { useState } from "react";
import { requests } from "../../api/requests";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user/user";
import reactotron from "reactotron-react-native";
import { routes } from "../../navigation/routes";

export let useRequestPasswordHook = () => {
  const [username, changeUsername] = useState("+998");
  const [loading, setLoading] = useState(false);
  let navigation = useNavigation();
  let onSubmit = async () => {
    //TODO validate username
    setLoading(true);
    try {
      let res = await requests.auth.requestPassword(username);
      navigation.navigate(routes.CODE, {
        username: username,
      });
    } catch (err) {
      console.log(err.response);

      //TODO Handle error
    } finally {
      setLoading(false);
    }
  };

  return [username, changeUsername, loading, onSubmit];
};

export let useLoginHook = () => {
  //TODO add redux redux-persist

  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigation = useNavigation();
  let dispatch = useDispatch();

  const onSubmitPassword = async (username: any) => {
    setLoading(true);
    try {
      let res = await requests.auth.login({
        username: username,
        password: password,
      });
      dispatch(setUser(res.data));
      navigation.navigate(
        routes.TAB_STACK as never,
        {
          screen: routes.MY as never,
        } as never
      );
    } catch (e) {}
  };
  return { loading, password, setPassword, onSubmitPassword };
};
