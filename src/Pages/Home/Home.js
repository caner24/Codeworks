import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from '../../components/Details/Details';

const Stack = createNativeStackNavigator();
export default function Home() {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Jobs" component={Jobs} />
            <Stack.Screen name="JobsDetails" component={Details} />
        </Stack.Navigator>
    );
}