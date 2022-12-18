export default {
  state: () => ({
    status: 'idle',
    direction: null,
    targetFloor: null,
    elevatorStyle: {}, // { style, class }
  }),
  getters: {
    getElevatorClass(state) {
      switch (state.status) {
        case 'idle':
          return null;
        case 'resting':
          return 'elevator_resting';
        default:
          return null;
      }
    },
    getDirection(state) {
      return state.direction;
    },
    getElevatorStyle(state) {
      return state.elevatorStyle;
    },
    getTargetFloor(state) {
      return state.targetFloor;
    },
  },
  mutations: {
    setStatus(state, payload) {
      state.status = payload;
    },
    setDirection(state, payload) {
      state.direction = payload;
    },
    setElevatorStyle(state, payload) {
      state.elevatorStyle = payload;
    },
    setTargetFloor(state, payload) {
      state.targetFloor = payload;
    },
  },
  namespaced: true,
};
