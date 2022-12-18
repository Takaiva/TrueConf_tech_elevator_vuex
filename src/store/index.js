/* eslint-disable */

import { createStore } from 'vuex';

import elevatorModule from '@/store/elevator';
import optionsModule from '@/store/options';
import controlsModule from '@/store/controls';

export default createStore({
  state() {
    return {
      currentTargetFloor: 1,
      eventQueue: [],
    };
  },
  getters: {
    getEventQueue(state) {
      return state.eventQueue;
    },
    getNextEvent(state) {
      return state.eventQueue[0];
    },
    getCurrentFloor(state) {
      return state.currentTargetFloor;
    },
    getQueueStatus(state) {
      return state.eventQueue.length > 0;
    },
  },
  mutations: {
    addEventToQueue(state, event) {
      state.eventQueue.push(event);
    },
    removeEventFromQueue(state) {
      state.eventQueue.shift();
    },
    setCurrentTargetFloor(state, payload) {
      state.currentTargetFloor = payload;
    },
  },
  actions: {
    performTasks({ getters, commit, dispatch }) {
      if (!getters.getQueueStatus) {
        commit('elevator/setStatus', 'idle');
        return;
      }
      const {
        style, direction, timeToMove, targetFloor, input,
      } = getters.getNextEvent;
      console.log(input);
      commit('elevator/setElevatorStyle', style);
      commit('elevator/setDirection', direction);
      commit('elevator/setTargetFloor', targetFloor);
      commit('elevator/setStatus', 'moving');
      setTimeout(() => {
        commit('elevator/setStatus', 'resting');
        setTimeout(() => {
          commit('removeEventFromQueue');
          dispatch('performTasks');
        }, 3000)
      }, timeToMove);
    },
  },
  modules: {
    elevator: elevatorModule,
    options: optionsModule,
    controls: controlsModule,
  },
});
