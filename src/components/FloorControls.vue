<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="floor__controls">
    <div class="floor__control__num">{{ floorNumber }}</div>
      <input
      type="checkbox"
      v-model="checked"
      :disabled="disabled"
      class="floor__control__custom-checkbox custom-checkbox"
      :class="isElevatorHeading ? 'current-target_active' : null"
      :id="floorNumber"
      @click="callElevator"
    />
    <label :for="floorNumber">
      {{ floorStatus }}
      {{ checked }}
    </label>
  </div>
</template>

<script>
import {
  mapState, mapMutations, mapActions,
} from 'vuex';

export default {
  props: {
    floorNumber: Number,
  },
  data() {
    return {
      checked: false,
      isElevatorHeading: false,
    };
  },
  computed: {
    ...mapState({
      currentTargetFloor: (state) => state.currentTargetFloor,
    }),
    floorStatus() {
      return this.checked ? 'Wait...' : 'Call';
    },
    disabled() {
      return this.floorNumber === this.currentTargetFloor || this.checked;
    },
    // eslint-disable-next-line
    checked() {
      return this.$store.state.controls.controls
        .find((control) => control.id === this.floorNumber).checked;
    },
  },
  methods: {
    ...mapMutations({
      setCurrentTargetFloor: 'setCurrentTargetFloor',
      addEventToQueue: 'addEventToQueue',
      setControlCheckedStatus: 'controls/setControlCheckedStatus',
    }),
    ...mapActions({
      performTasks: 'performTasks',
    }),
    callElevator(event) {
      const diff = this.floorNumber > this.currentTargetFloor
        ? this.floorNumber - this.currentTargetFloor : this.currentTargetFloor - this.floorNumber;
      const direction = this.floorNumber > this.currentTargetFloor ? 'up' : 'down';
      const timeToMove = diff * 1000;
      const style = {
        transition: `transform ${diff}s linear 0s`,
        transform: `translateY(-${121 * (this.floorNumber - 1)}px)`,
      };
      const targetFloor = this.floorNumber;
      this.addEventToQueue({
        style, direction, timeToMove, targetFloor, input: event.target,
      });
      this.setCurrentTargetFloor(this.floorNumber);
      this.setControlCheckedStatus({ id: this.floorNumber, checked: true });
      // this.performTasks();
    },
  },
};
</script>

<style scoped>
.floor__controls {
  /*width: 80px;*/
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.floor__control__num {
  font-size: 20px;
  font-weight: bold;
}
label {
  width: 50px;
  display: flex;
  gap: 5px;
}
.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 1em;
  /*margin-right: 0.5em;*/
  border: 1px solid rgba(255, 69, 0, 0.5);
  background-color: rgba(0, 160, 176, 0.5);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
/* when hovered */
.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: orangered;
  background-color: orange;
}
/* when focused */
.custom-checkbox:focus + label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
/* when checked */
.custom-checkbox:checked + label::before {
  background: linear-gradient(
    100deg,
    #eb6841,
    rgba(255, 153, 0, 0.63),
    #eb6841
  );
  background-size: 200% 200%;
  animation: gradient 2s ease-in-out infinite;
  outline: 5px solid rgba(130, 166, 168, 0.45);
  /*height: auto;*/
}
/* when disabled */
.custom-checkbox:disabled + label::before {
  background-color: #e9ecef;
}
/* when elevator is heading to the certain floor*/
.current-target_active:checked + label::before {
  outline: 5px solid rgba(130, 166, 168, 0.7);
  animation: blink 1s;
  animation-iteration-count: infinite;
}

@keyframes blink {
  50% {
    outline: 5px solid red;
  }
}

@keyframes gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
