import { useDispatch, useSelector } from "react-redux";
import { selectMail, setMail, update } from "../../redux/slices/mail/mail";
import { useEffect, useState } from "react";
import { requests } from "../../api/requests";

export let useMailHook = () => {
    let mail = useSelector(selectMail);
    let dispatch = useDispatch();
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

    return { mail, useRefresh };
};
