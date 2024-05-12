import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * HomeScreen is the initial screen a user will see when they open the app.
 * It contains short descriptions about the features in the app, as well as buttons that link
 * to the respective features' screens.
 * @param {navigation} navigation prop that is used for navigation to other screens 
 * @returns 
 */
export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to NBAMatchups</Text>
            <Text style={styles.text}>
                Jump into Matchups, and compare teams based on their opposing stats.
            </Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Matchups")}
            >
                <Text style={styles.buttonLabel}>Go to Team Matchups</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
                Explore our predictive feature, that predicts the winner of a given nba game
            </Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Prediction")}
            >
                <Text style={styles.buttonLabel}>Go to Win/Loss Prediction</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
                Dig into Dashboard, allowing you to see trends of a teams stats for the past several years
            </Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Dashboard")}
            >
                <Text style={styles.buttonLabel}>Go to Dashboard</Text>
            </TouchableOpacity>

            <StatusBar style="light" />
        </View>
    );
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
    text: {
        color: '#dddddd',
        marginTop: '5%',
        fontSize: 15,
        textAlign: 'center',
    },
    buttonLabel: {
        color: '#dddddd',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#444444',
        borderRadius: 4,
        borderStyle: 'none',
        fontSize: '16sp',
        overflow: 'none',
        marginHorizontal: '5%',
        marginVertical: '5%',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});