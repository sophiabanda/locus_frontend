import axios from "axios";
import dotenv from 'dotenv';


  dotenv.config();
  console.table({ HOST, URL });
  function setToken() {
    axios
      .get(PING, {
        headers: { Authorization: sessionStorage.getItem(TOKEN) }
      })
      .then(({ data }) => {
        console.log("Token is valid.");
      })
      .catch(e => {
        //Probably not authorized so set a token
        axios
          .post(AUTHENTICATE, CREDENTIALS)
          .then(({ data }) => {
            console.log({ data });
            sessionStorage.setItem(TOKEN, data.auth_token);
          })
          .catch(e => {
            console.error(e.message);
          });
      });
  }
  let attempts = 0;
  const interval = setInterval(() => {
    const token = sessionStorage.getItem(TOKEN);
    console.log({ token });
    if (attempts === 5 || token != null) {
      this.setState({ finished: true });
      clearInterval(interval);
    } else {
      this.setState({ finished: false });
      setToken();
    }
    attempts += 1;
  }, WAIT);


export default Keygen
