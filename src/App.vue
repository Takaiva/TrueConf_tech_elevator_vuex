<template>
  <div class="wrapper">
    <AppOptions/>
    <Shaft/>
  </div>
</template>

<script>
// import {
//   mapState, mapMutations, mapGetters, mapActions,
// } from 'vuex';
import AppOptions from '@/components/options/AppOptions.vue';
import Shaft from '@/components/ShaftComponent.vue';

export default {
  components: {
    AppOptions, Shaft,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  width: 100%;
  background: #393e46;
}

.wrapper {
  margin: 10px;
}

</style>
