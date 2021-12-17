import React from "react";
import Svg, { G, Path } from "react-native-svg";

const QuestionIcon = () => {
  return (
    <Svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24.000000 24.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <G
        transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="#000000"
      >
        <Path
          d="M75 231 c-36 -16 -67 -58 -72 -99 -17 -128 166 -183 222 -66 24 52
       19 90 -18 130 -34 37 -92 53 -132 35z m116 -40 c39 -39 40 -96 3 -140 -22 -26
       -33 -31 -71 -31 -62 0 -103 40 -103 100 0 91 106 135 171 71z"
        />
        <Path
          d="M92 188 c-7 -7 -12 -19 -12 -27 1 -13 2 -13 11 2 11 19 44 23 54 6 4
       -6 -3 -21 -16 -35 -27 -29 -19 -43 10 -17 34 29 22 83 -19 83 -9 0 -21 -5 -28
       -12z"
        />
        <Path
          d="M110 60 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
       -10 -4 -10 -10z"
        />
      </G>
    </Svg>
  );
};

export default QuestionIcon;
