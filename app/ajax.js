const apiHost = `http://172.24.23.97:3000/`;
// const apiHost = `https://coffee-now-api.herokuapp.com/`;
import { Alert, AsyncStorage } from "react-native";
import { USER_API_TOKEN } from "./auth";

async function getToken() {
  return AsyncStorage.getItem(USER_API_TOKEN);
}

export default {
  async fetchCoffeeShops(lat, long) {
    try {
      const token = await getToken();
      console.log(token);
      const response = await fetch(
        apiHost + `shops?latitude=${lat}&longitude=${long}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-Api-Token": `${token}`
          }
        }
      );
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
      Alert.alert(`${error.errors}`);
    }
  },
  async userSignUp(email, password) {
    let response = await await fetch(apiHost + `users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ user: { email: email, password: password } })
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log("Error: ", err);
      });
    return response;
  },
  async userSignIn(email, password) {
    try {
      const response = await fetch(apiHost + `users/sign_in`, {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ user: { email: email, password: password } })
      });
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.log(error);
      Alert.alert("Error!!!");
    }
  },
  async fetchShopDetail(shopId) {
    try {
      const token = await getToken();
      console.log(token);
      const response = await fetch(apiHost + `shops/${shopId}/show`, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Api-Token": `${token}`
        }
      });
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
      Alert.alert(`${error.errors}`);
    }
  },
  async getFavorites() {
    try {
      const token = await getToken();
      console.log(token);
      const response = await fetch(`${apiHost}favorites`, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Api-Token": token
        }
      });
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
      Alert.alert(`${error.errors}`);
    }
  },
  async addFavorite(shopId) {
    try {
      const token = await getToken();
      console.log(token);
      const response = fetch(`${apiHost}favorites`, {
        body: JSON.stringify({
          favorite: {
            shop_id: shopId
          }
        }),
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Api-Token": token
        }
      });
      console.log(response);
    } catch (error) {
      // ??
      console.error(error);
    }
  },
  async removeFavorite(shopId) {
    try {
      const token = await getToken();
      console.log(token);
      const response = fetch(`${apiHost}favorite`, {
        body: JSON.stringify({
          favorite: {
            shop_id: shopId
          }
        }),
        method: "delete",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Api-Token": token
        }
      });
      console.log(response);
    } catch (error) {
      // ??
      console.error(error);
    }
  }
};
