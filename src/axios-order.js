import axios from 'axios';

const instance = axios.create({
    baseURL : "https://react-burger-builder-98972-default-rtdb.firebaseio.com/"
})

export default instance;