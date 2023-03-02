import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './card.style';
export default function Card({ jobsList, navigations }) {

    function getDetails(param) {
        navigations.navigate("JobDetail", jobsList.id)
    }
    return (
        <TouchableWithoutFeedback onPress={getDetails}>
            <View style={styles.card}>

                <Text style={styles.card_text}>{jobsList.name}</Text>
                <Text >{jobsList.company.name}</Text>
                <Text style={styles.card_location}>{jobsList.locations[0].name}</Text>
                <Text style={styles.card_footer_text}>{jobsList.levels[0].name}</Text>

            </View>
        </TouchableWithoutFeedback>
    );

}