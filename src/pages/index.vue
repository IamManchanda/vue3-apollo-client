<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>
      {{ message }}
    </p>
    <ul class="list-none">
      <li v-for="wine in wines" :key="wine.id">
        <p>
          {{ wine.title }} &nbsp;
          <button @click="deleteWineUpdateCache(wine.id)">
            Delete this wine
          </button>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
//#region Imports
import { reactive, toRefs } from "vue";
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";
import AllWinesQuery from "../graphql/all-wines.query.gql";
import DeleteWineMutation from "../graphql/delete-wine.mutation.gql";
//#endregion

export default {
  name: "Home",
  setup() {
    //#region GraphQL Queries
    const { result } = useQuery(AllWinesQuery);

    //#region Reactive References
    const state = reactive({
      message: "Hello GraphQL",
      wines: useResult(result, null, data => data.allWines),
    });
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    //#endregion

    //#region GraphQL Mutations
    const { mutate: deleteWine } = useMutation(DeleteWineMutation);
    //#endregion

    //#region Methods
    function deleteWineUpdateCache(id) {
      deleteWine(
        { id },
        {
          update: store => {
            const data = store.readQuery({
              query: AllWinesQuery,
            });
            const updatedData = data.allWines.filter(w => w.id !== id);
            store.writeQuery({
              query: AllWinesQuery,
              data: {
                allWines: updatedData,
              },
            });
          },
        },
      );
    }
    //#endregion
    return {
      ...toRefs(state),
      deleteWineUpdateCache,
    };
  },
};
</script>

<style lang="scss" scoped>
.list-none {
  list-style-type: none;
}
</style>
