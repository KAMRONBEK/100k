import React from "react";
import { View, Text } from "react-native";
import Svg, { G, Path } from "react-native-svg";

const CheckedIcon = () => {
    return (
        <Svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <G
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="green"
                stroke="green"
            >
                <Path
                    d="M4187 3956 c-22 -8 -50 -25 -64 -38 -14 -12 -459 -504 -990 -1093
-715 -793 -977 -1078 -1016 -1102 -61 -39 -128 -44 -192 -14 -23 10 -261 217
-560 486 -345 310 -535 475 -564 488 -137 61 -294 -41 -294 -192 -1 -31 6 -72
15 -92 11 -26 214 -223 683 -665 367 -346 685 -640 708 -654 63 -37 148 -35
210 5 52 34 2290 2513 2321 2572 70 130 -20 294 -170 308 -30 3 -64 0 -87 -9z"
                />
            </G>
        </Svg>
    );
};

export default CheckedIcon;
