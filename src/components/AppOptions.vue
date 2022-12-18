<template>
  <div class="options">
    <div>Количество этажей</div>
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
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      plusFloor: 'options/plusFloor',
      minusFloor: 'options/minusFloor',
      plusElevator: 'options/plusElevator',
      minusElevator: 'options/minusElevator',
    }),
  },
  computed: {
    ...mapState({
      floorsCount: (state) => state.options.floorsCount,
      elevatorsCount: (state) => state.options.elevatorsCount,
    }),
    ...mapGetters({
      getFloorsCount: 'options/getFloorsCount',
      getElevatorsCount: 'options/getElevatorsCount',
    }),
  },
};
</script>

<style scoped>
.options {
  color: #eb6841;
  font-size: 22px;
  background: #393e46;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 20px;

  height: 100%;
}
form {
  display: flex;
  align-items: center;
  justify-content: center;
  background: floralwhite;
  border-radius: 8px;
  max-width: 200px;
  padding: 10px;
}
input {
  width: 88px;
  height: 44px;
  border: 0;
  text-align: center;
  font-size: 20px;
  background: orange;
  border-radius: 8px;
  margin: 5px;
}
button {
  font-size: 22px;
  width: 44px;
  height: 44px;
  border: 0;
  background: #00a0b0;
  border-radius: 8px;
}
button:active {
  color: #eb6841;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
