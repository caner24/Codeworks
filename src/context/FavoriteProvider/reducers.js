import AsyncStorage from "@react-native-async-storage/async-storage";

export default function reducers(state, action) {

    switch (action.type) {
        case 'CREATE_FAVORITE':
            const { data } = action.payload;
            const newList = [data, ...state.jobsList];
            return { ...state, jobsList: newList };

        case 'SET_FAVORITE':

            const { datas } = action.payload;
            if (state.jobsList.find(item => item.id === datas.id)) {
                return state;
            }
            const newList2 = [datas, ...state.jobsList];
            const islem = async () => await AsyncStorage.setItem('@JOBS', JSON.stringify(newList2));
            return { ...state, jobsList: newList2 };

        case 'REMOVE_FAVORITE':
            console.log("Silme basladi");
            const { id } = action.payload;
            const newFavJobList = state.jobsList.filter(item => item.id !== id);
            const islem2 = async () => await AsyncStorage.setItem('@JOBS', JSON.stringify(newFavJobList));
            return { ...state, jobsList: newFavJobList }

        default:
            return state;
    }

}