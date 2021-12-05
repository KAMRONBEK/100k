import { useDispatch, useSelector } from "react-redux";
import { setTaxi, selectTaxi, update } from "../../redux/slices/taxi";
import { useEffect } from "react";
import { requests } from "../../api/requests";

export let useTaxiHook = () => {
    let taxi = useSelector(selectTaxi);
    let dispatch = useDispatch();
    let effect = async () => {
        try {
            let res = await requests.taxi.getTaxi;
            dispatch(setTaxi({ payload: res.data.data }));
            console.log({ data: res.data });
        } catch (err) {
            console.log(err.response.data);
        }
    };
    useEffect(() => {
        effect();
    }, []);

    return { taxi };
};
