<template>
  <div
    class="elevator"
    :style="elevatorStyle"
    :class="elevatorClass"
  >
    <div class="elevator__direction" v-if="showBoard">
      <span class="elevator__direction__floor-num">
        {{ headingToFloorNumber }}
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

export default {
  props: {
    id: Number,
    status: String, // idle, moving, resting
    direction: String || null, // up or down
    elevatorStyle: Object, // style, class
    headingToFloorNumber: Number,
  },
  computed: {
    showBoard() {
      return this.status === 'moving';
    },
    elevatorClass() {
      return this.status === 'resting' ? 'elevator_resting' : null;
    },
  },
};
</script>

<style>
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
