<template>
  <div class="options__floors">
    <div class="options__name">Количество этажей</div>
    <form>
      <button :disabled="floorsCount.length <= 2" @click.prevent="minusFloor">
        –
      </button>
      <label for="floors">
        <input disabled type="number" :value="floorsCount.length" min="2" id="floors"/>
      </label>
      <button @click.prevent="plusFloor">+</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      plusFloor: 'options/plusFloor',
      minusFloor: 'options/minusFloor',
    }),
  },
  computed: {
    ...mapState({
      floorsCount: (state) => state.options.floorsCount,
    }),
    ...mapGetters({
      getFloorsCount: 'options/getFloorsCount',
    }),
  },
};
</script>

<style>
</style>
