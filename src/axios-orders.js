import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-62bf3.firebaseio.com/"
});

export default instance;
