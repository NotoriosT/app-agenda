// src/components/Logo.js

import React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';

// O seu SVG convertido para um componente React Native
export default function Logo(props) {
    return (
        <Svg
            width={props.width || 375}
            height={props.height || 375}
            viewBox="0 0 375 374.999991"
            {...props}
        >
            <Defs>
                <ClipPath id="clip1">
                    <Path d="M132 4.066h239.645V243H132z" />
                </ClipPath>
                <ClipPath id="clip2">
                    <Path d="M3.395 131H243v239.816H3.395z" />
                </ClipPath>
            </Defs>
            <G>
                <G clipPath="url(#clip1)">
                    <Path
                        d="M371.375 187.797c0 30.484-24.676 55.16-55.16 55.16H203.242c-39.051 0-70.762-31.711-70.762-70.762V59.227c0-30.488 24.676-55.16 55.16-55.16 30.489 0 55.157 24.672 55.157 55.16v73.41h73.414c30.485 0 55.16 24.777 55.16 55.16z"
                        fill="#EFC11D"
                    />
                </G>
                <G clipPath="url(#clip2)">
                    <Path
                        d="M3.504 187.082c0-30.484 24.672-55.16 55.16-55.16h112.969c39.05 0 70.761 31.711 70.761 70.762v112.972c0 30.485-24.676 55.16-55.16 55.16-30.485 0-55.16-24.675-55.16-55.16V242.24H58.664c-30.488 0-55.16-24.671-55.16-55.159z"
                        fill="#5C8030"
                    />
                </G>
                <Path
                    d="M242.395 202.684v40.273H203.242c-39.051 0-70.762-31.711-70.762-70.762V131.922h39.152c39.05 0 70.761 31.711 70.761 70.762z"
                    fill="#203D81"
                />
            </G>
        </Svg>
    );
}
