import { useEffect, useState } from "react";
import { requests } from "../../api/requests";

export const useRegions = () => {
    let [regions, setRegions] = useState([]);

    let effect = async () => {
        try {
            let res = await requests.help.getRegions();
            setRegions(res.data);
        } catch (error) {
            console.log(error, "in location");
        }
    };

    useEffect(() => {
        effect();
    }, []);

    return { regions };
};
