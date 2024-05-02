import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to NBAMatchups</Text>
            <Text style={styles.text}>
                Jump into Matchups, and compare teams based on their opposing stats.
            </Text>
            <Button title='Go to Team Matchups'/>
            <Text style={styles.text}>
                Explore our predictive feature, that predicts the winner of a given nba game
            </Text>
            <Button title="Go to Win/Loss Prediction" />
            <Text style={styles.text}>
                Dig into Dashboard, allowing you to see trends of a teams stats for the past several years
            </Text>
            <Button title="Go to Dashboard" />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222222',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    header: {
        marginTop: '10%',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: '30sp', //TODO #10
    },
    text: {
        color: '#dddddd',
    }
});