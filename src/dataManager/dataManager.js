import { AsyncStorage } from "react-native"


export async function store(key,data){
    try {
        await AsyncStorage.setItem(key, data);
    } catch (error) {
        alert('error saving information')
    }
}

export async function get(key) {
        return await AsyncStorage.getItem(key, (error)  => {
            return null;
        });
}