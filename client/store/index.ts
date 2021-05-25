import { GetterTree, ActionTree, MutationTree } from 'vuex';

export const state = () => ({
  userId: '60ad3aa01b5d3520cc06a21b' as string,
  userBoards: [],
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  getUserId: (state) => state.userId,
  getUserBoards: (state) => state.userBoards,
};

export const mutations: MutationTree<RootState> = {
  setUserBoards(state: any, payload: any) {
    state.userBoards = payload;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchUserBoards() {
    const userId = this.getters.getUserId;
    const boards = await this.$axios
      .get(`http://localhost:5000/api/boards/list/${userId}`)
      .then((res: any) => res.data);

    this.commit('setUserBoards', boards);
  },
};
