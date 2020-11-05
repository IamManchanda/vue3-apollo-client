import { createApp } from "vue";
import App from "./App.vue";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import "./registerServiceWorker";
import router from "./router";

const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const query = gql`
  query AllWines {
    allWines {
      title
      description
      variety
    }
  }
`;

defaultClient
  .query({
    query,
  })
  .then(res => console.log(res));

createApp(App)
  .use(router)
  .mount("#app");
