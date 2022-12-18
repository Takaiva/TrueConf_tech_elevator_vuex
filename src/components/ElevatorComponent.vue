<template>
  <div
    class="elevator"
    :style="elevatorStyle"
    :class="elevatorClass"
  >
    <div class="elevator__direction" v-if="isPerformingTasks">
      <span class="elevator__direction__floor-num">
        {{ targetFloor }}
      </span>
      <span
        class="elevator__direction__arrow"
        v-if="direction === 'up'"
      >
        &#8593;
      </span>
      <span
        class="elevator__direction__arrow"
        v-if="direction === 'down'"
      >
        &#8595;
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isPerformingTasks: 'getQueueStatus',
      elevatorClass: 'elevator/getElevatorClass',
      direction: 'elevator/getDirection',
      elevatorStyle: 'elevator/getElevatorStyle',
      targetFloor: 'elevator/getTargetFloor',
    }),
  },
};
</script>

<style scoped>
.elevator {
  position: relative;
  width: 100%;
  height: 100%;
  background: #eb6841;
  border-radius: 14px;
  display: flex;
  justify-content: center;
}
.elevator__direction {
  margin-top: 10px;
  padding: 10px;
  background: #155263;
  border-radius: 10px;
  height: 30%;
  display: flex;
  /*justify-content: space-between;*/
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #eb6841;
  font-size: 30px;
  font-weight: bold;
}
.elevator__direction__arrow {
  font-size: 24px;
}

.elevator_resting {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
