import React from "react";
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";

export default ({ navigation }) => (
  <View
    style={{
      paddingVertical: 20,
      backgroundColor: "rgb(58, 48, 66)",
      height: "100%"
    }}
  >
    <Card
      title="Bob Loblaw"
      containerStyle={{ backgroundColor: "rgb(237, 255, 217)" }}
    >
      <View
        style={{
          backgroundColor: "#bcbec1",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}
      >
        <Text style={{ color: "white", fontSize: 28 }}>BL</Text>
      </View>
      <Button
        backgroundColor="rgb(219, 157, 71)"
        title="SIGN OUT"
        onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
      />
    </Card>
  </View>
);
