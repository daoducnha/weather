import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import SearchInput from "./components/SearchInput";
import getImageForWeather from "./utils/getImageForWeather";
import { fetchLocationId, fetchWeather } from "./utils/api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      location: "",
      temperature: 0,
      weather: "",
    };
  }

  componentDidMount() {
    this.handleUpdateLocation("San Francisco");
  }
  handleUpdateLocation = async (city) => {
    if (!city) return;
    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId
        );

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  renderContent() {
    const { error } = this.state;
    return (
      <View>
        {error && (
          <Text style={[styles.smallText, styles.textStyle]}>
            Could not load weather, please try a differnt city.
          </Text>
        )}

        {!error && this.renderInfo()}
      </View>
    );
  }

  renderInfo() {
    const { location, weather, temperature } = this.state;
    return (
      <View>
        <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
        <Text
          style={[styles.largeText, styles.textStyle]}
        >{`${temperature}°`}</Text>
      </View>
    );
  }

  render() {
    const { loading, weather } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && this.renderContent()}

            <SearchInput
              placeholder="Search any city"
              onSubmit={this.handleUpdateLocation}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },

  textStyle: {
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontFamily: "AvenirNext-Regular",
      },
      android: {
        fontFamily: "Roboto",
      },
    }),
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textInput: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
});
