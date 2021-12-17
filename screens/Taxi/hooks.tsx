import { useDispatch, useSelector } from "react-redux";
import { setTaxi, selectTaxi, update } from "../../redux/slices/taxi/taxi";
import React, { useEffect, useState } from "react";
import { requests } from "../../api/requests";
import { showMessage, hideMessage } from "react-native-flash-message";
import reactotron from "reactotron-react-native";
import { useNavigation } from "@react-navigation/core";
import { routes } from "../../navigation/routes";
import { selectUser } from "../../redux/slices/user/user";

export let useTaxiHook = () => {
  let navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  let taxi = useSelector(selectTaxi);
  let user = useSelector(selectUser);
  let myOrder = Object.values(taxi).filter(
    (item) => item.creator_id == user.id
  );

  let dispatch = useDispatch();
  let effect = async () => {
    try {
      let res = await requests.taxi.getTaxi();
      dispatch(setTaxi(res.data.data.reverse()));
      console.log({ data: res.data });
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    effect();
  }, []);

  const refreshTaxi = () => {
    effect();
  };

  const createPassanger = async (credentials) => {
    setLoading(true);
    try {
      let res = await requests.taxi.createPassanger(credentials);
      console.log(res, "new passanger created");
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

  const editPassanger = async (credentials, id) => {
    setLoading(true);
    try {
      let res = await requests.taxi.createPassanger(credentials, id);
      console.log(res, "new passanger created");
      showMessage({
        message: "Zakaz qabul qilindi",
        type: "success",
        icon: "success",
        floating: true,
      });
      navigation.navigate(routes.PASSENGER);
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
    taxi,
    refreshTaxi,
    createPassanger,
    loading,
    editPassanger,
    myOrder,
  };
};
