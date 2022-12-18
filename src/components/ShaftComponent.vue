<template>
  <div class="container">
    <div
      v-for="count in floorsCount"
      :key="count"
      class="floor"
    >
      <div class="floor__container">
        <Floor>
          <Elevator
            v-if="count === 1"
          />
        </Floor>
      </div>
      <FloorControls
      :floorNumber="count"
      />
    </div>
  </div>
</template>

<script>
import Floor from '@/components/FloorComponent.vue';
import Elevator from '@/components/ElevatorComponent.vue';
import FloorControls from '@/components/FloorControls.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Floor, Elevator, FloorControls,
  },
  computed: {
    ...mapState({
      floorsCount: (state) => state.options.floorsCount,
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
