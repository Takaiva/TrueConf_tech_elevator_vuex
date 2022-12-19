import _ from 'lodash';

export default {
  state: () => ({
    floorsCount: Array
      .from({ length: 5 }, (__, i) => ({ id: i + 1, inQueue: false })),
    elevatorsCount: Array
      .from({ length: 1 }, (__, i) => ({
        id: i + 1, status: 'idle', onFloorNumber: 1, headingToFloor: null, direction: null, style: {},
      })),
  }),
  getters: {
    getFloorsCount(state) {
      return state.floorsCount;
    },
    getElevatorsCount(state) {
      return state.elevatorsCount;
    },
    getNearestIdleElevatorData: (state) => (targetFloor) => {
      const idleElevators = state.elevatorsCount
        .filter((elevator) => elevator.status === 'idle' && elevator.onFloorNumber !== targetFloor);
      if (idleElevators.length === 0) {
        return null;
      }
      if (idleElevators.length === 1) {
        const idleElevator = idleElevators[0];
        const direction = targetFloor > idleElevator.onFloorNumber ? 'up' : 'down';
        const diff = Math.abs(targetFloor - idleElevator.onFloorNumber);
        return {
          elevatorId: idleElevator.id,
          direction,
          diff,
        };
      }
      let offset;
      idleElevators.forEach((idleElevator) => {
        if (offset) {
          const newDiff = Math.abs(targetFloor - idleElevator.onFloorNumber);
          const actualDiff = Math.abs(targetFloor - offset.onFloorNumber);
          if (actualDiff > newDiff) {
            offset = idleElevator;
          }
        }
        if (!offset) {
          offset = idleElevator;
        }
      });
      const direction = targetFloor > offset.onFloorNumber ? 'up' : 'down';
      const diff = Math.abs(targetFloor - offset.onFloorNumber);
      return {
        elevatorId: offset.id,
        direction,
        diff,
      };
    },
  },
  mutations: {
    plusFloor(state) {
      const newId = _.last(state.floorsCount).id + 1;
      state.floorsCount.push({ id: newId, inQueue: false });
    },
    minusFloor(state) {
      state.floorsCount.pop();
    },
    plusElevator(state) {
      const newId = _.last(state.elevatorsCount).id + 1;
      state.elevatorsCount.push({
        id: newId, status: 'idle', onFloorNumber: 1, headingToFloor: null, direction: null, style: {},
      });
    },
    minusElevator(state) {
      state.elevatorsCount.pop();
    },
    setFloorInQueue(state, payload) {
      state.floorsCount.forEach((control) => {
        if (control.id === payload.id) {
          const data = {
            id: control.id,
            inQueue: payload.inQueue,
          };
          Object.assign(control, data);
        }
      });
    },
    setElevatorOptionsById(state, payload) {
      state.elevatorsCount.forEach((elevator) => {
        if (elevator.id === payload.elevatorId) {
          const data = {
            id: elevator.id,
            direction: payload.direction ? payload.direction : elevator.direction,
            headingToFloor: payload.headingToFloor,
            style: payload.style ? payload.style : elevator.style,
            status: payload.status,
            onFloorNumber: payload.onFloorNumber,
          };
          Object.assign(elevator, data);
        }
      });
    },
  },
  namespaced: true,
};
