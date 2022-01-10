import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { requests } from "../../api/requests";
import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import reactotron from "reactotron-react-native";
import {
    selectTransport,
    setTransport,
} from "../../redux/slices/transport/transport";
import { selectUser } from "../../redux/slices/user/user";

export let useTransportHook = () => {
    let transport = useSelector(selectTransport);
    let navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    let user = useSelector(selectUser);
    let myOrder = Object.values(transport).filter(
        (item) => item.creator_id == user.id
    );
    let dispatch = useDispatch();
    let effect = async () => {
        try {
            let res = await requests.transport.getTransport();
            return dispatch(setTransport(res.data.data));
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
            let res = await requests.transport.createTranport(credentials);
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
    return { transport, useRefresh, createTransport, loading, myOrder };
};
