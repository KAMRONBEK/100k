import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { LayoutAnimation } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../../api/requests";
import { selectUser, updateProfile } from "../../redux/slices/user/user";

export let useKuriyerHook = () => {
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
            let res = await requests.courier.becomeCourier(credentials);

            dispatch(updateProfile(res.data.data));
        } catch (err) {
            console.log(err);
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

    const becomeCourier = (credentials) => {
        effect(credentials);
    };

    return {
        user,
        becomeCourier,
        loading,
    };
};
