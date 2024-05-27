import { useState } from 'react'

import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from 'react-native-picker-select'; 

import { teamsNames } from "../constants/teamNames";
import { years } from '../constants/years';


export default function MatchupsScreen({navigation}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(teamsNames.map( team => (
        { label: team, value: team }
    )))
    const [yearsList, setYears] = useState(years.map( year => (
        {label: year, value: year}
    )))
    const [team1, setTeam1] = useState("")
    const [team2, setTeam2] = useState("")
    const [year, setYear] = useState("")

    function onSubmit() {
        console.log("submitted")
    }

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
                    <Text style={styles.buttonLabel}>Go Back</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainContent}>
                <Text style={styles.header}>Matchups Screen</Text>
            </View>
            <View>
                <RNPickerSelect
                    onValueChange={(value) => setTeam1(value)}
                    items={items}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'Pick a Team', value: null }}
                />
            </View>
            <View>
                <RNPickerSelect
                    onValueChange={(value) => setTeam2(value)}
                    items={items}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'Pick a Team', value: null }}
                />
            </View>
            <View>
                <RNPickerSelect
                    onValueChange={(value) => setYear(value)}
                    items={yearsList}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'Pick a Year', value: null }}
                />
            </View>
            <TouchableOpacity 
                style={styles.button}
                onPress={onSubmit}
            >
                <Text style={styles.buttonLabel}>Check Matchup</Text>
            </TouchableOpacity>
            {/* <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    theme="DARK"
                    placeholder="Pick a Team"
                    // style={styles.dropDown}
                    // textStyle={styles.dropDownText}
                    // containerStyle={styles.dropDown}
                    // labelStyle={styles.dropDown}
                />
            </View>
            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    theme="DARK"
                    placeholder="Pick a Team"
                    // style={styles.dropDown}
                    // textStyle={styles.dropDownText}
                    // containerStyle={styles.dropDown}
                    // labelStyle={styles.dropDown}
                />
            </View>
            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    theme="DARK"
                    placeholder="Pick a Year"
                    // style={styles.dropDown}
                    // textStyle={styles.dropDownText}
                    // containerStyle={styles.dropDown}
                    // labelStyle={styles.dropDown}
                />
            </View> */}
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
    dropDown: {
        backgroundColor: '#444444',
    },
    dropDownText: {
        color: '#dddddd',
    },
    dropdownContainer: {
        marginTop: '10%',
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
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      marginBottom: 20,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      marginBottom: 20,
    },
  });