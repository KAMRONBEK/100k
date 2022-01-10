import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { requests } from "../../api/requests";
import { showMessage, hideMessage } from "react-native-flash-message";
import reactotron from "reactotron-react-native";
import { useNavigation } from "@react-navigation/core";
import { routes } from "../../navigation/routes";
import { selectUser } from "../../redux/slices/user/user";
import { selectLoad, setLoad } from "../../redux/slices/load/load";

export let useLoadHook = () => {
    let navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    let load = useSelector(selectLoad);
    let user = useSelector(selectUser);
    let myOrder = Object.values(load).filter(
        (item) => item.creator_id == user.id
    );

    let dispatch = useDispatch();
    let effect = async () => {
        try {
            let res = await requests.load.getLoad();
            dispatch(setLoad(res.data.data.reverse()));
        } catch (err) {
            console.log(err.response);
        }
    };
    useEffect(() => {
        effect();
    }, []);

    const refreshLoad = () => {
        effect();
    };

    const createLoad = async (credentials) => {
        setLoading(true);
        try {
            let res = await requests.load.createLoad(credentials);
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
            console.log!(error.response.data);
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

    const editLoad = async (credentials, id) => {
        setLoading(true);
        try {
            let res = await requests.load.createLoad(credentials, id);
            showMessage({
                message: "Zakaz qabul qilindi",
                type: "success",
                icon: "success",
                floating: true,
            });
            navigation.navigate(routes.LOAD);
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
        load,
        refreshLoad,
        createLoad,
        loading,
        editLoad,
        myOrder,
    };
};
