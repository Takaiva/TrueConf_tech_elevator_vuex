<template>
  <div class="options__elevators">
    <div class="options__name">Количество лифтов</div>
    <form>
      <button :disabled="elevatorsCount.length <= 1" @click.prevent="minusElevator">
        –
      </button>
      <label for="elevators">
        <input disabled type="number" :value="elevatorsCount.length" min="2" id="elevators"/>
      </label>
      <button @click.prevent="plusElevator">+</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      plusElevator: 'options/plusElevator',
      minusElevator: 'options/minusElevator',
    }),
  },
  computed: {
    ...mapState({
      elevatorsCount: (state) => state.options.elevatorsCount,
    }),
    ...mapGetters({
      getElevatorsCount: 'options/getElevatorsCount',
    }),
  },
};
</script>

<style scoped>
</style>
