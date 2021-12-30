<template>
  <div class="box">
    <div id="container"></div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>


<style scoped>
.g2-tooltip {
  position: "absolute";
  width: 80px;
  height: 40px;
  background-color: rgba(13, 21, 42, 1);
  border: 1px solid rgba(51, 187, 255, 0.5);
  border-radius: "3px 3px 3px 3px";
  color: #fff;
  font-size: 12px;
  text-align: center;
  padding: 0;
  padding-left: 8px;
  margin-top: 3px;
  transition: top 200ms, left 200ms;
}
.g2-tooltip-title {
  display: "none";
}
</style>