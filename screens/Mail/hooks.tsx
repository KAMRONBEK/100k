import { useDispatch, useSelector } from "react-redux";
import {
    IMail,
    selectCommonMail,
    selectMail,
    setCommonMail,
    setMail,
    update,
} from "../../redux/slices/mail/mail";
import { useEffect, useState } from "react";
import { requests } from "../../api/requests";
import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import reactotron from "reactotron-react-native";
import { selectUser } from "../../redux/slices/user/user";
import { routes } from "../../navigation/routes";

export let useMailHook = () => {
    let mail = useSelector(selectMail);
    let commonMail = useSelector(selectCommonMail);
    let navigation = useNavigation();
    let [filteredMail, setFilteredMail] = useState<IMail[]>();
    const [loading, setLoading] = useState(false);
    let dispatch = useDispatch();
    let user = useSelector(selectUser);
    let effect = async () => {
        try {
            let res = await requests.mail.getMail();
            dispatch(setMail(res.data.data));
            let resCommon = await requests.mail.getCommonMail();
            dispatch(setCommonMail(resCommon.data.data));
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

    const filterMail = (status) => {
        setFilteredMail(
            mail.filter((item) => {
                console.log(item.id);

                if (item.status_label.toLowerCase() == status.toLowerCase()) {
                    return item;
                }
            })
        );
    };

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

    const editMail = async (credentials, id) => {
        setLoading(true);
        try {
            let res = await requests.mail.createMail(credentials, id);
            showMessage({
                message: "Zakaz qabul qilindi",
                type: "success",
                icon: "success",
                floating: true,
            });
            navigation.navigate(routes.MAIL);
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
        mail,
        filteredMail,
        filterMail,
        commonMail,
        useRefresh,
        createMail,
        loading,
        editMail,
    };
};
