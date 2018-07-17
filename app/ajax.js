const apiHost = `http://localhost:3000/shops?`;

export default {
  async fetchCoffeeShops(lat, long) {
    try {
      const response = await fetch(
        apiHost + `latitude=${lat}&longitude=${long}`,
        {
          method: "get"
        }
      );
      console.log("calling fetchCoffeeShops");
      const responseJson = await response.json();
      return responseJson;
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  }
};
