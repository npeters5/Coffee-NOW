import { AsyncStorage } from "react-native";

export const USER_KEY = "api_token";

export const onSignIn = async response => {
  try {
    const value = await AsyncStorage.setItem(USER_KEY, response.api_token);
    console.log(value);
    return value;
  } catch (error) {
    console.log(error);
  }
};
//   AsyncStorage.setItem(USER_KEY, response.api_token);
//
// async function setItem(key, value) {
//   try {
//     const value = await AsyncStorage.setItem(key, value);
//     console.log(value);
//     return value;
//   } catch (error) {
//     console.log(error);
//   }
// }

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

//edit to handle displaying errors to user in form of alert popups?
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(signedIn => {
        console.log(signedIn);
        if (signedIn) {
          resolve({ signedIn: true });
        } else {
          resolve({ signedIn: false });
        }
      })
      .catch(err => reject(err));
  });
};
