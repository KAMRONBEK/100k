import { useDispatch, useSelector } from "react-redux";
import { selectMail, setMail, update } from "../../redux/slices/mail/mail";
import { useEffect, useState } from "react";
import { requests } from "../../api/requests";
import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import reactotron from "reactotron-react-native";
import { selectUser } from "../../redux/slices/user/user";

export let useMailHook = () => {
    let mail = useSelector(selectMail);
    let navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    let dispatch = useDispatch();
    let user = useSelector(selectUser);
    let myOrder = Object.values(mail).filter(
        (item) => item.creator_id == user.id
    );
    let effect = async () => {
        try {
            let res = await requests.mail.getMail();
            dispatch(setMail(res.data.data));
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

    const createMail = async (credentials) => {
        setLoading(true);
        try {
            let res = await requests.mail.createMail(credentials);
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
    return { mail, useRefresh, myOrder, createMail, loading };
};
