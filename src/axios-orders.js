import axios from 'axios';

const instance = axios.create({

    baseURL:'https://burgerbuilder-62432.firebaseio.com/'

})

export default instance;