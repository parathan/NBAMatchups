import { View } from "react-native";
import { StyleSheet, Text } from "react-native";

export default function MatchupsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Matchups Screen</Text>
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
        marginTop: '10%',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 30, //TODO #10
    },
})