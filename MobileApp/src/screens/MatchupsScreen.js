import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MatchupsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        } else {
                            console.log("couldn't go back")
                        }
                    }}
                >
                    <Text style={styles.buttonLabel}>Home</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainContent}>
                <Text style={styles.header}>Matchups Screen</Text>
            </View>
            <StatusBar style="light" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222222',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    mainContent: {
        paddingHorizontal: '10%',
    },
    header: {
        marginTop: '10%',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 30, //TODO #10
    },
    backButton: {
        marginTop: '15%',
        width: '25%',
        marginLeft: '5%',
    },
    buttonLabel: {
        color: '#dddddd',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#444444',
        borderRadius: 4,
        borderStyle: 'none',
        fontSize: '16sp',
        overflow: 'none',
        marginHorizontal: '5%',
        marginVertical: '5%',
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})