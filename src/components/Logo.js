// src/components/Logo.js

import React from 'react';
import { Image } from 'react-native';

export default function Logo(props) {
    return (
        <Image
            source={require('../assets/imagens/esteio_logo.png')}
            style={{ width: props.width || 100, height: props.height || 100 }}
            resizeMode="contain"
        />
    );
}
