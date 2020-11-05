import { createApp } from "vue";
import App from "./App.vue";
/* import { ApolloClient, InMemoryCache } from "@apollo/client"; */
import "./registerServiceWorker";
import router from "./router";

/* const defaultClient = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
}); */

createApp(App)
  .use(router)
  .mount("#app");
