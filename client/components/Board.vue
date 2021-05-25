<template>
  <div id="board">
    <h2>{{ board.title }}</h2>

    <button type="button" class="button" @click="addColumn">Add new column</button>

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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';

export default Vue.extend({
  name: 'Board',
  components: {
    draggable,
  },
  data() {
    return {
      board: {
        title: 'Test title',
        columns: [
          {
            title: 'Backlog',
            tasks: [{ task: 'John' }, { task: 'Joao' }, { task: 'Jean' }, { task: 'Gerard' }],
          },
          {
            title: 'To do',
            tasks: [{ task: 'Juan' }, { task: 'Edgard' }, { task: 'Johnson' }],
          },
        ],
      },
    };
  },

  methods: {
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
      console.log('updateBoard');
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
    width: 100%;
    background-color: var(--pos-color);
  }
}
</style>
