import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from "react-native";

export default function DashboardScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Dashboard Screen</Text>
            <StatusBar style="light" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222222',
      paddingHorizontal: '10%',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    header: {
        marginTop: '25%',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 30, //TODO #10
    },
})