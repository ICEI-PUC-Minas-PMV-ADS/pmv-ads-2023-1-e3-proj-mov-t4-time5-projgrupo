import { Text } from "../components/Themed";
import {SafeAreaView} from "react-native";
import {useRoute} from "@react-navigation/native";

export default function ProfileScreen() {
    //@ts-ignore
    const { params: { id } } = useRoute();
    return (
        <SafeAreaView>
            <Text>{ id }</Text>
        </SafeAreaView>
    );
}