import Vue from "vue";

import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar, Scroll, QScrollArea } from "quasar";

Vue.use(Quasar, {
  config: {
    // preFetch:true
  },
  plugins: {},
  components: { QScrollArea },
  directives: {
    Scroll,
  },
  animations: [
    // or embedding only specific animations
    'bounceInLeft',
    'bounceOutRight'
  ]
});
Vue.prototype.$Scroll = Scroll;
