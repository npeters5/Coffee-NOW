import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import ajax from "../ajax";
import Swipeout from "react-native-swipeout";

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
      favorite: this.props
    };
  }

  async componentDidMount() {
    const { favorite } = this.props;
    const fav = await ajax.fetchShopDetail(favorite.shop_id);
    console.log(fav);
    this.setState({
      favorite: fav
    });
    console.log(this.state.favorite);
  }

  render() {
    console.log(this.props);
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        this.setState({ activeRowKey: null });
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.favorite.shop_id });
        console.log(this.props);
      },
      right: [
        {
          onPress: () => {
            Alert.alert(
              "Alert",
              "Are you sure?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel pressed"),
                  style: "cancel"
                },
                {
                  text: "Yes",
                  onPress: () => {
                    ajax.removeFavorite(this.props.favorite.shop_id);
                  }
                }
              ],
              { cancelable: true }
            );
          },
          text: "Remove",
          type: "delete"
        }
      ],
      rowId: this.props.id,
      sectionId: 1
    };
    return (
      <Swipeout {...swipeSettings}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "column", height: 75 }}>
              <Text style={styles.flatListItem}>
                {this.state.favorite.name}
              </Text>
            </View>
          </View>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  flatListItem: {
    color: "white",
    padding: 10,
    fontSize: 16
  }
});

export default Favorite;
