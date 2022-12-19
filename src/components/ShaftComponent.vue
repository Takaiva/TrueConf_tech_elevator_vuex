<template>
  <div class="container">
    <div
      v-for="floor in floorsCount"
      :key="floor.id"
      class="floor"
    >
      <div
        v-for="elevator in elevatorsCount"
        :key="elevator.id"
        class="floor__container"
      >
        <Floor>
          <Elevator
            v-if="floor.id === 1"
            :id="elevator.id"
            :status="elevator.status"
            :direction="elevator.direction"
            :elevatorStyle="elevator.style"
            :headingToFloorNumber="elevator.headingToFloor"
          />
        </Floor>
      </div>
      <FloorControls
      :floorNumber="floor.id"
      :inQueue="floor.inQueue"
      />
    </div>
  </div>
</template>

<script>
import Floor from '@/components/FloorComponent.vue';
import Elevator from '@/components/ElevatorComponent.vue';
import FloorControls from '@/components/FloorControls.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Floor, Elevator, FloorControls,
  },
  computed: {
    ...mapGetters({
      floorsCount: 'options/getFloorsCount',
      elevatorsCount: 'options/getElevatorsCount',
    }),
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
}
.floor {
  height: 100%;
  width: 100%;
  background: floralwhite;
  display: flex;
  flex-direction: row;
  gap: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
.floor__container {
  display: flex;
  border-radius: 8px;
}
</style>
