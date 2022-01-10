import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { routes } from "../../navigation/routes";
import {
    selectUser,
    updateProfile,
    updateUser,
} from "../../redux/slices/user/user";
import { LayoutAnimation } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../../api/requests";

export let useSettingsHook = () => {
    let navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    let user = useSelector(selectUser);
    let dispatch = useDispatch();
    let effect = async (credentials) => {
        try {
            LayoutAnimation.configureNext(
                LayoutAnimation.create(
                    100,
                    LayoutAnimation.Types.easeInEaseOut,
                    LayoutAnimation.Properties.scaleXY
                )
            );
            setLoading(true);
            let res = await requests.user.updateUser(credentials);
            dispatch(updateProfile(res.data.data));
        } catch (err) {
        } finally {
            LayoutAnimation.configureNext(
                LayoutAnimation.create(
                    70,
                    LayoutAnimation.Types.easeInEaseOut,
                    LayoutAnimation.Properties.scaleXY
                )
            );
            setLoading(false);
        }
    };

    const saveSetting = (credentials) => {
        effect(credentials);
    };

    return {
        user,
        saveSetting,
        loading,
    };
};
