<template>
  <div class="box">
    <span>
      <slot name="titleName" :title="title">todolist</slot>
    </span>

    <div class="headerRight">
      <slot name="headerRight">
        <div class="add">
          <a-icon type="plus-circle" theme="twoTone" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang='ts' src="./index.ts">
</script>

<style scoped>
.box {
  position: relative;
  height: 40px;
  border-bottom: 1px solid gray;
  line-height: 40px;
  font-size: 16px;
}
.headerRight {
  display: inline-block;
  position: absolute;
  right: 5px;
}
.headerRight:hover {
  cursor: pointer;
}
.add {
  display: inline-block;
}
.add:hover {
  cursor: pointer;
}
</style>