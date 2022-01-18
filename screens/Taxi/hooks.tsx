import { useDispatch, useSelector } from "react-redux";
import {
    setTaxi,
    selectTaxi,
    update,
    selectCommonTaxi,
    setCommonTaxi,
} from "../../redux/slices/taxi/taxi";
import React, { useEffect, useState } from "react";
import { requests } from "../../api/requests";
import { showMessage, hideMessage } from "react-native-flash-message";
import reactotron from "reactotron-react-native";
import { useNavigation } from "@react-navigation/core";
import { routes } from "../../navigation/routes";
import { selectUser } from "../../redux/slices/user/user";

export let useTaxiHook = () => {
    let taxi = useSelector(selectTaxi);
    let commonTaxi = useSelector(selectCommonTaxi);
    let navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    let dispatch = useDispatch();
    let user = useSelector(selectUser);
    let effect = async () => {
        try {
            let res = await requests.taxi.getTaxi();
            dispatch(setTaxi(res.data.data));
            let resCommon = await requests.taxi.getCommonTaxi();
            dispatch(setCommonTaxi(resCommon.data.data));
        } catch (err: any) {
            console.log(err.response.data, "error in mail");
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
        commonTaxi,
        refreshTaxi,
        createPassanger,
        loading,
        editPassanger,
    };
};
