import Vue from 'vue';
import axios from 'axios';
import vueAxios from 'vue-axios';

Vue.use(vueAxios,axios);

const Axios = axios.create({
    timeout: 3000
    // headers: headers
})
export default Axios;