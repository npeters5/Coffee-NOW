const apiHost = "http://localhost:3000/shops";

export default {
  async fetchCoffeeShops() {
    try {
      const response = await fetch(apiHost, {
        method: "get"
      });
      const responseJson = await response.json();
      return responseJson;
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  }
};
