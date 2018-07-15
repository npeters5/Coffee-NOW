import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

class LoginScreen extends Component {
  // static navigationOptions = {
  //   title: "Please sign in"
  // };
  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }
  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate("HomeScreen");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default LoginScreen;
