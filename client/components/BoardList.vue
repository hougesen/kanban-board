<template>
  <div>
    <h1>Boards</h1>
    <div class="boards">
      <button type="button" class="board" @click="newBoard">Create new board</button>

      <div v-for="element in getUserBoards" :key="element._id" class="board">
        <nuxt-link :to="`/board/${element._id}`">
          {{ element.board.title }}
        </nuxt-link>

        <button type="button" @click.stop="deleteBoard(element._id, element.board.title)">Delete board</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'BoardList',

  computed: {
    getUserBoards() {
      return this.$store.getters.getUserBoards;
    },
    getUserId() {
      return this.$store.getters.getUserId;
    },
  },
  methods: {
    async newBoard() {
      const newBoard: any = await this.$swal({
        title: 'Create new board',
        input: 'text',
        inputPlaceholder: 'Enter board title...',
        showCancelButton: true,
        confirmButtonText: 'Create board',
      });

      if (newBoard.isConfirmed) {
        const req = await this.$axios
          .post(`http://localhost:5000/api/boards/create`, {
            userId: this.getUserId,
            boardTitle: newBoard.value,
          })
          .then((res) => res.data);

        this.$swal({
          icon: 'success',
          title: 'Board has been created',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.$router.push(`/board/${req.b._id}`);
        });

        this.updateList();
      }
    },

    async deleteBoard(boardId: string, boardTitle: string) {
      const confirmation: any = await this.$swal({
        title: `Are you sure you want to delete ${boardTitle}?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (confirmation.isConfirmed) {
        await this.$axios
          .delete(`http://localhost:5000/api/boards/delete/${boardId}`)
          .then(() => {
            this.$swal({
              icon: 'success',
              title: 'Board has been deleted',
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((err) => {
            console.log(err);
            this.$swal({
              icon: 'error',
              title: 'Oops, something went wrong!',
              text: 'Please try again later',
            });
          });

        this.updateList();
      }
    },
    updateList() {
      this.$store.dispatch('fetchUserBoards');
    },
  },
});
</script>

<style lang="scss" scoped>
.boards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  .board {
    text-decoration: none;
    text-align: center;
    background-color: var(--column-color);
    margin: 2rem;
    padding: 2rem;
    border-radius: var(--default-border-radius);
    font-size: 1.25rem;
    color: var(--black);
    border: none;
  }
}
</style>
