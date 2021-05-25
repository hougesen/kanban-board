<template>
  <div id="board">
    <h2>{{ board.title }}</h2>

    <div class="columns">
      <div v-for="(column, columnIndex) in board.columns" :key="columnIndex" class="column">
        <h3>{{ column.title }}</h3>
        <button type="button" class="button button--card" @click="addCard(columnIndex)">Add card</button>

        <draggable :list="column.tasks" group="people" class="draggable" @change="log">
          <div v-for="(task, taskIndex) in column.tasks" :key="taskIndex" class="task">
            {{ task.task }} <button type="button" @click="removeCard(columnIndex, taskIndex)">X</button>
          </div>
        </draggable>
      </div>
      <div class="add-coloumn">
        <button type="button" class="button" @click="addColumn">Add new column</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';

export default Vue.extend({
  name: 'BoardPage',
  components: {
    draggable,
  },
  data() {
    return {
      boardId: '60ad3e88fe365e14c0742551' as string,
      board: {
        title: '' as string,
        columns: [
          {
            title: '' as string,
            tasks: [{ task: '' as string }],
          },
        ],
      },
    };
  },

  beforeMount() {
    this.boardId = window.location.pathname.replace('/board/', '');
    this.fetchBoard();
  },
  methods: {
    async fetchBoard() {
      const response = await this.$axios
        .get(`http://localhost:5000/api/boards/${this.boardId}`)
        .then((res: any) => res.data);

      this.board = response.board;
    },
    log(evt: any) {
      window.console.log(evt);

      this.updateBoard();
    },

    async addColumn() {
      const newColumn: any = await this.$swal({
        title: 'Add new column',
        input: 'text',
        inputPlaceholder: 'Enter column title...',
        showCancelButton: true,
        confirmButtonText: 'Add column',
      });

      if (newColumn.isConfirmed) {
        this.board.columns.push({
          title: newColumn.value,
          tasks: [],
        });

        this.updateBoard();
      }
    },

    removeColumn(columnIndex: number) {
      this.board.columns.splice(columnIndex, 1);

      this.updateBoard();
    },

    async addCard(columnIndex: number) {
      const newCard: any = await this.$swal({
        title: 'Add new task',
        input: 'text',
        inputPlaceholder: 'Enter task title',
        showCancelButton: true,
        confirmButtonText: 'Add task',
      });

      if (newCard.isConfirmed) {
        this.board.columns[columnIndex].tasks.push({ task: newCard.value });
        this.updateBoard();
      }
    },

    removeCard(columnIndex: number, taskIndex: number) {
      this.board.columns[columnIndex].tasks.splice(taskIndex, 1);

      this.updateBoard();
    },

    updateBoard() {
      this.$axios.put(`http://localhost:5000/api/boards/update/${this.boardId}`, {
        board: this.board,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.columns {
  display: flex;
  flex-direction: row;
  .draggable {
    height: 100%;
  }
  .column {
    width: 400px;
    background-color: var(--column-color);
    margin: 0 1rem;
    padding: 1rem;
    border-radius: var(--default-border-radius);

    .task {
      background-color: var(--task-color);
      padding: 0.5rem 1rem;
      margin: 0.5rem 0;
      cursor: move;
      border-radius: var(--default-border-radius);
    }
  }
}
.button {
  border: none;
  border-radius: var(--default-border-radius);
  &--card {
    padding: 0.5rem;
    width: 100%;
    background-color: var(--pos-color);
  }
}
.add-coloumn {
  width: 500px;
  button {
    padding: 1.5rem;
    width: 100%;
  }
}
</style>
