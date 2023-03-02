import React from 'react';
import { Button, View, Text, FlatList, Alert, } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Jobs from './Pages/Jobs/Jobs';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from './components/Card/Card';
const Drawer = createDrawerNavigator();


function FavoriteJobList() {
  const dispatch = useDispatch();
  const isNull = async () => await AsyncStorage.getItem('@JOBS');
  if (isNull().length > 0) {
    dispatch({ type: 'CREATE_FAVORITE', payload: { data: JSON.parse(isNull) } });
  }
  const job = useSelector(state => state.jobsList);
  function renderData({ item }) {
    return (<View style={{ justifyContent: 'center' }}><Card jobsList={item} /><View style={{ alignSelf: 'center', width: '50%' }}><Button title='Remove Favorites' onPress={() => dispatch({ type: 'REMOVE_FAVORITE', payload: { id: item.id } })} /></View></View>);
  }
  return (
    <View>
      {job.length !== 0 && <FlatList data={job} renderItem={renderData} />}
    </View>
  );
}

export default function Router() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'Jobs',
            headerTitleStyle: { color: 'red' },
            headerShown: false,
          }}
          name="JobsPage"
          component={Jobs}
        />
        <Drawer.Screen name="FavoriteJobs" component={FavoriteJobList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
