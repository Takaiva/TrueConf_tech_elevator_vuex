import _ from 'lodash';

export default {
  state: () => ({
    floorsCount: Array.from({ length: 5 }, (__, i) => i + 1),
    elevatorsCount: Array.from({ length: 1 }, (__, i) => i + 1),
  }),
  getters: {
    getFloorsCount(state) {
      return state.floorsCount;
    },
    getElevatorsCount(state) {
      return state.elevatorsCount;
    },
  },
  mutations: {
    plusFloor(state) {
      state.floorsCount.push(_.last(state.floorsCount) + 1);
    },
    minusFloor(state) {
      state.floorsCount.pop();
    },
    plusElevator(state) {
      state.elevatorsCount.push(_.last(state.elevatorsCount) + 1);
    },
    minusElevator(state) {
      state.elevatorsCount.pop();
    },
  },
  namespaced: true,
};
