import { useState } from 'react'

import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import { teamsNames } from "../constants/teamNames";


export default function MatchupsScreen({navigation}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(teamsNames.map( team => (
        { label: team, value: team }
    )))
    // const [items, setItems] = useState([
    //     {label: 'Apple', value: 'apple'},
    //     {label: 'Banana', value: 'banana'}
    // ])

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
    dropDown: {
        backgroundColor: '#444444',
    },
    dropDownText: {
        color: '#dddddd',
    },
    dropdownContainer: {
        marginTop: '10%',
    }
})