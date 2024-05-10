import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import MatchupsScreen from './src/screens/MatchupsScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import PredictiveScreen from './src/screens/PredictiveScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Matchups" component={MatchupsScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Prediction" component={PredictiveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
