import React from 'react';
import { StyleSheet } from 'react-native';


export default StyleSheet.create({

    card: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        margin: 10,
    },
    card_text: {
        fontWeight: 'bold',
        color:'black',
    },
    card_location: {
        marginTop: '1%',
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'red',
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    card_footer_text: {
        color:'red',
        textAlign:'right',
        fontWeight:'bold',
    }
});