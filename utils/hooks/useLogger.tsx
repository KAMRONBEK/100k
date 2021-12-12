import React, { useEffect } from "react";

export const useLogger = (state: any) => {
    useEffect(() => {
        console.log(state);
    }, [state]);
};
