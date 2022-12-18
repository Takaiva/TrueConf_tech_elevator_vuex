<template>
  <div class="floor__item">
    <slot />
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.floor__item {
  width: 120px;
  height: 120px;
  background: #00a0b0;
  border: 1px solid orange;
  padding: 5px;
  border-radius: 8px;
}
</style>
