import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { requests } from "../../api/requests";
import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import reactotron from "reactotron-react-native";
import {
  selectCommonTransport,
  selectTransport,
  setCommonTransport,
  setTransport,
} from "../../redux/slices/transport/transport";
import { selectUser } from "../../redux/slices/user/user";
import { routes } from "../../navigation/routes";

export let useTransportHook = () => {
  let transport = useSelector(selectTransport);
  let commonTransport = useSelector(selectCommonTransport);
  let navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  let user = useSelector(selectUser);
  let dispatch = useDispatch();
  let effect = async () => {
    try {
      let res = await requests.transport.getTransport();
      dispatch(setTransport(res.data.data));
      let resCommon = await requests.transport.getCommonTransport();
      dispatch(setCommonTransport(resCommon.data.data));
    } catch (err: any) {
      console.log(err.response.data, "error in mail");
    }
  };

  let useRefresh = () => {
    effect();
  };

  useEffect(() => {
    effect();
  }, []);

  const createTransport = async (credentials) => {
    setLoading(true);
    try {
      let res = await requests.transport.createTransport(credentials);
      showMessage({
        message: "Zakaz qabul qilindi",
        type: "success",
        icon: "success",
        floating: true,
      });
      navigation.goBack();
    } catch (error) {
      reactotron.log!(error);
      showMessage({
        message: error.message,
        type: "danger",
        icon: "danger",
        floating: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const editTransport = async (credentials, id) => {
    setLoading(true);
    try {
      let res = await requests.transport.createTranport(credentials, id);
      showMessage({
        message: "Zakaz qabul qilindi",
        type: "success",
        icon: "success",
        floating: true,
      });
      navigation.navigate(routes.TRANSPORT);
    } catch (error) {
      reactotron.log!(error);
      showMessage({
        message: error.message,
        type: "danger",
        icon: "danger",
        floating: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    transport,
    commonTransport,
    useRefresh,
    createTransport,
    loading,
    editTransport,
  };
};
