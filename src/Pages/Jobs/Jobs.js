
import React, { useCallback } from 'react';
import {
    View,
    Button,
    Text,
    SafeAreaView,
    FlatList,
    useWindowDimensions,
    Alert, Linking,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Lottie from 'lottie-react-native';
import Card from '../../components/Card/Card';
import useFetch from '../../hooks/useFetch/useFetch';
import RenderHtml from 'react-native-render-html';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ArrowLeft } from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
function JobsPage({ navigation }) {
    const { data, loading, error } = useFetch(
        'https://www.themuse.com/api/public/jobs?page=1',
    );
    if (loading) {
        return (
            <Lottie source={require('../../assets/loading.json')} autoPlay loop />
        );
    }

    const renderPage = ({ item }) => (
        <Card jobsList={item} navigations={navigation} />
    );
    return (
        <SafeAreaView>
            <FlatList data={data.results} renderItem={renderPage}></FlatList>
        </SafeAreaView>
    );
}
function JobsDetail({ route, navigation }) {
    const dispatch = useDispatch();
    const isNull = async () => await AsyncStorage.getItem('@JOBS');
    if (isNull().length > 0) {
        dispatch({ type: 'CREATE_FAVORITE', payload: { data: JSON.parse(isNull) } });
    }
    const favJobs = useSelector(state => state.jobsList);
    const { width } = useWindowDimensions();
    const { data, loading, error } = useFetch(
        'https://www.themuse.com/api/public/jobs/' + route.params,
    );
    const source = {
        html: data.contents
    };
    if (loading) {
        return (
            <Lottie source={require('../../assets/loading.json')} autoPlay loop />
        );
    } else {
        navigation.setOptions(options = {
            header: () =>
            (
                <View style={{ width: '100%', padding: 10, alignItems: 'center', backgroundColor: 'white', flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
                        <ArrowLeft stroke="red" fill="#fff" width={30} height={30} />
                    </TouchableWithoutFeedback>
                    <Text style={{ width: '90%', textAlign: 'center', fontSize: 25 }}>{data.name}</Text>
                </View>
            ),
        }/*  */);

    }
    function addFavorite() {
        if (favJobs.find(item => item.id === data.id)) {
            Alert.alert("Error", "Job has already added the favorities")
        } else {
            dispatch({ type: "SET_FAVORITE", payload: { datas: data } });
            Alert.alert("Successfuly", "Job is added the favorities");
        }
    }
    const supportedURL = data.refs.landing_page;
    const OpenURLButton = ({ url }) => {
        const handlePress = useCallback(async () => {
            await Linking.openURL(url);
        }, [url]);
        return (<TouchableWithoutFeedback onPress={handlePress} style={{ width: 150, padding: 15, borderRadius: 15, backgroundColor: 'red' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Submit</Text>
        </TouchableWithoutFeedback>);
    };

    return (
        <SafeAreaView>

            <ScrollView >
                <View style={{ backgroundColor: 'rosegold', padding: '1%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{data.name}</Text>
                    <Text>
                        <Text style={{ fontWeight: 'bold', color: 'red' }}>Locations : </Text>
                        {data.categories[0].name}
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: 'bold', color: 'red' }}>Locations : </Text>
                        {data.categories[0].name}
                    </Text>
                </View>
                <View style={{ backgroundColor: 'white' }}>
                    <RenderHtml
                        contentWidth={width * 2}
                        source={source}
                    />
                </View>
                <View style={{ padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>

                    <OpenURLButton url={supportedURL}></OpenURLButton>
                    <TouchableWithoutFeedback onPress={addFavorite} style={{ width: 150, padding: 15, borderRadius: 15, backgroundColor: 'red' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Favorite Job</Text>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>


        </SafeAreaView >
    );
}

function Jobs() {
    return (
        <Stack.Navigator screenOptions={{ headerTintColor: 'red' }}>
            <Stack.Screen
                options={{
                    headerTitle: 'Jobs',
                    headerTitleStyle: { color: 'red' },
                    headerTitleAlign: 'center',
                }}
                name="Home"
                component={JobsPage}
            />
            <Stack.Screen name="JobDetail" component={JobsDetail} />
        </Stack.Navigator>
    );
}

export default Jobs;
