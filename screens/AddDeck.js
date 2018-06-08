import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Constants, AppLoading } from 'expo';
import { onAddDeck } from '../actions/deck-actions';
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

class AddDeck extends React.Component {
  state = {
    isReady: false,
    deckTitle: '',
  };

  handleAddDeck = () => {
    const { deckTitle } = this.state;

    console.log('@handleAddDeck', deckTitle);

    // TODO: check input values
    if (!deckTitle) {
      // return  error notification
      console.warn('You must submit a title for the deck');
      return;
    }
    const newDeck = {
      title: deckTitle,
      questions: [],
    };

    // TODO: Add deck to decks data
    // TODO: Save to DB
    this.props.dispatch(onAddDeck(newDeck));

    console.log(`Added ${newDeck} deck to storage`);

    // TODO: Navigate to AddCard
    this.props.navigation.navigate('AddCard', {
      deck: newDeck,
      entryId: deckTitle,
    });

    // TODO: Show notification
    // clearLocalNotifications().then(setLocalNotification);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Add Deck" backgroundColor={purple} marginBottom={6} />
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={styles.title}>Enter the title for this Deck:</Text>

          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Deck Title"
            placeholderTextColor={black}
            onChangeText={deckTitle => this.setState(() => ({ deckTitle }))}
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

export default connect()(AddDeck);
