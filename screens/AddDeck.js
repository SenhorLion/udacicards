import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Constants, AppLoading } from 'expo';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  black,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../utils/colors';

// TODO: Make Button into a module component
const AddDeckButton = ({ onPress }) => (
  <TouchableOpacity
    style={[styles.button, { marginTop: 20, width: 150 }]}
    onPress={onPress}
  >
    <FontAwesome name="plus" size={20} color={antiFlashWhite} />
    <Text style={{ fontSize: 18, color: antiFlashWhite }}>Add Deck</Text>
  </TouchableOpacity>
);

export default class AddDeck extends React.Component {
  state = {
    isReady: false,
    title: '',
  };

  handleAddDeck = () => {
    const { title } = this.state;

    console.log('@handleAddDeck', title);

    // TODO: check input values
    // TODO: Add deck to decks data
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Add Deck" backgroundColor={purple} marginBottom={6} />
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={styles.title}>Enter the Deck title</Text>

          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Deck Ttitle"
            placeholderTextColor={black}
            onChangeText={title => this.setState(() => ({ title }))}
          />
          <AddDeckButton onPress={this.handleAddDeck} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    margin: 10,
    padding: 15,
    height: 50,
    width: 280,
    backgroundColor: antiFlashWhite,
    borderRadius: 3,
    color: black,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: purple,
    textAlign: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    padding: 4,
    margin: 4,
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: purple,
  },
  submitBtnText: {
    color: purple,
    fontSize: 22,
    textAlign: 'center',
  },
});
