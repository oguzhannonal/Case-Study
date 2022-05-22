import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

let baseUrl = "http://localhost:5000/"
axios.defaults.baseURL = baseUrl;
createApp(App).mount("#app");
