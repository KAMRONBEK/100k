import { useDispatch, useSelector } from "react-redux";
import { selectMail, setMail, update } from "../../redux/slices/mail";
import { useEffect } from "react";
import { requests } from "../../api/requests";

export let useMailHook = () => {
    let mail = useSelector(selectMail);
    let dispatch = useDispatch();
    let effect = async () => {
        try {
            console.log("loading mails");
            let res = await requests.mail.getMail();
            console.log({ res });
            console.log("loading mails");

            dispatch(setMail({ payload: res.data.data }));
            console.log({ data: res.data });
        } catch (err: any) {
            console.log(err.response.data, "error in mail");
        }
    };
    useEffect(() => {
        effect();
    }, []);

    return { mail };
};
