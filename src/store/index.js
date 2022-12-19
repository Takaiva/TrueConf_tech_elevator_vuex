import { createStore } from 'vuex';
import optionsModule from '@/store/options';
import _ from 'lodash';

export default createStore({
  state() {
    return {
      eventQueue: [],
      performingTasks: false,
    };
  },
  getters: {
    getEventQueue(state) {
      return state.eventQueue;
    },
    getNextEvent(state) {
      return _.first(state.eventQueue);
    },
    isPerformingTasks(state) {
      return state.performingTasks;
    },
  },
  mutations: {
    addEventToQueue(state, event) {
      state.eventQueue.push(event);
    },
    removeEventFromQueue(state) {
      state.eventQueue.shift();
    },
    setPerformingTasks(state, payload) {
      state.performingTasks = payload;
    },
  },
  actions: {
    performTask({ commit }, eventData) {
      const {
        elevatorId, direction, timeToMove, style, targetFloor,
      } = eventData;
      const payloadForMoving = {
        elevatorId, direction, style, headingToFloor: targetFloor, status: 'moving',
      };
      const payloadForResting = {
        elevatorId, onFloorNumber: targetFloor, headingToFloor: null, status: 'resting',
      };
      const payloadForIdle = {
        elevatorId, status: 'idle', onFloorNumber: targetFloor, headingToFloor: null,
      };
      commit('options/setElevatorOptionsById', payloadForMoving);
      setTimeout(() => {
        commit('options/setElevatorOptionsById', payloadForResting);
        setTimeout(() => {
          commit('options/setElevatorOptionsById', payloadForIdle);
          commit('options/setFloorInQueue', { id: targetFloor, inQueue: false });
        }, 3000);
      }, timeToMove);
    },
    performTasks({ commit, getters, dispatch }) {
      if (getters.getEventQueue.length === 0) {
        commit('setPerformingTasks', false);
        return;
      }
      const { targetFloor } = getters.getNextEvent;
      const intervalId = setInterval(() => {
        const nearestIdleElevatorData = getters['options/getNearestIdleElevatorData'](targetFloor);
        if (nearestIdleElevatorData) {
          clearInterval(intervalId);
          commit('removeEventFromQueue');
          const { elevatorId, direction, diff } = nearestIdleElevatorData;
          const timeToMove = diff * 1000;
          const style = {
            transition: `transform ${diff}s linear 0s`,
            transform: `translateY(-${121 * (targetFloor - 1)}px)`,
          };
          const eventData = {
            elevatorId,
            targetFloor,
            direction,
            timeToMove,
            style,
          };
          dispatch('performTask', eventData);
          dispatch('performTasks');
        }
      }, 100);
    },
  },
  modules: {
    options: optionsModule,
  },
});
