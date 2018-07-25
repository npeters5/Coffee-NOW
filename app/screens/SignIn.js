import React, { Component } from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";
import ajax from "../ajax";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  onFieldChange = fieldName => text => {
    this.setState({
      [fieldName]: text
    });
  };

  render() {
    const { navigation } = this.props;
    console.log(this.state);

    return (
      <View
        style={{
          backgroundColor: "rgb(58, 48, 66)",
          paddingVertical: 20,
          height: "100%"
        }}
      >
        <Card containerStyle={{ backgroundColor: "rgb(237, 255, 217)" }}>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="Email address..."
            value={this.state.email}
            onChangeText={this.onFieldChange("email")}
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Password..."
            value={this.state.password}
            onChangeText={this.onFieldChange("password")}
          />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="rgb(219, 157, 71)"
            title="SIGN IN"
            onPress={() => {
              ajax
                .userSignIn(this.state.email, this.state.password)
                .then(onSignIn)
                .then(() => navigation.navigate("SignedIn"));
            }}
          />
        </Card>
      </View>
    );
  }
}

export default SignIn;
