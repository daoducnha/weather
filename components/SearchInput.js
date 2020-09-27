import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { PropTypes } from "prop-types";
export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  handleChangeText = (text) => {
    this.setState({ text });
  };
  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;
    onSubmit(text);
    this.setState({ text: "" });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: "white",
  },
});

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequire,
  placeholder: PropTypes.string,
};

SearchInput.defaultPorps = {
  placeholder: "",
};

