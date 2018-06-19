import React from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Constants, AppLoading } from 'expo';
import Header from '../components/ui/Header';
import ButtonTouchableOpacity from '../components/ui/ButtonTouchableOpacity';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  black,
  gray,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../utils/colors';
import { onAddCard } from '../actions';
import { getDeck } from '../api/index';
import AppModal from '../components/ui/AppModal';
import { InputText } from '../components/TextInput';

class AddCard extends React.Component {
  state = {
    isReady: false,
    question: null,
    answer: null,
    modalVisible: false,
  };

  componentDidMount() {
    console.log('@componentDidMount');

    const { deck, deckId } = this.props.navigation.state.params;

    // NOTE: getAsyncDeck for testing at the mo, remove if not using!
    this.getAsyncDeck(deckId);
  }

  handleAddCard = () => {
    const { question, answer } = this.state;
    const { deck, deckId } = this.props.navigation.state.params;

    // Check we have question || answer values
    if (!question || !answer) {
      console.log('You must add both a question and a answer!');

      // TODO: Display a modal message to user
      // - must refactor modal to handle mulitple uses
      return;
    }

    const newCard = {
      id: cuid(),
      question,
      answer,
    };

    this.setState({
      question: null,
      answer: null,
    });

    this.props.onAddCard(deckId, newCard).then(res => {
      // Notification on succesfully added card
      this.setModalVisible(true);
      // Allow user to add more cards...
    });
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  toggleModalVisible = () => {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  // NOTE: getAsyncDeck - used just for testing at the mo, remove if not going to use
  getAsyncDeck = async deckId => {
    console.log('\n@@@getAsyncDeck :: deckId', deckId);
    const deck = await getDeck(deckId);

    console.log('\tdeck', deck);
  };

  render() {
    const { deck, deckId } = this.props;
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{ alignItems: 'center', justifyContent: 'center' }}
          behavior="position"
        >
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.desc}>Add a new card</Text>

          <InputText
            placeholder="Add Question"
            onChangeText={question => this.setState(() => ({ question }))}
            value={question}
          />

          <InputText
            placeholder="Add Answer"
            onChangeText={answer => this.setState(() => ({ answer }))}
            value={answer}
          />

          <ButtonTouchableOpacity
            marginTop={20}
            width={150}
            backgroundColor={lightPurple}
            onPress={this.handleAddCard}
          >
            <FontAwesome name="plus" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Add Card
            </Text>
          </ButtonTouchableOpacity>
        </KeyboardAvoidingView>

        <AppModal
          backdropColor={black}
          isVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          closeModalTimer={1250}
          onBackdropPress={this.toggleModalVisible}
        >
          <View>
            <Text>New card added!</Text>
          </View>
        </AppModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: purple,
    textAlign: 'center',
  },
  desc: {
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 20,
    color: purple,
    paddingVertical: 10,
  },
});

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  const deck = decks.items[deckId];

  return {
    deckId,
    deck,
  };
};

export default connect(mapStateToProps, { onAddCard })(AddCard);