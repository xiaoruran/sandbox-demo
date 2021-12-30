<template>
  <div class="box">
    <li>{{ item.value }}</li>
    <div class="delbtn" @click="deleteItem(item.key)"><a-icon type="delete" theme="twoTone" /></div>
  </div>
</template>

<script lang='ts' src='./index.ts'>
</script>


<style scoped>
.box {
  position: relative;
}
.box:hover {
  background-color:bisque;
}
li {
  list-style: none;
  display: inline-block;
  padding: 0;
  width: 50px;
  height: 30px;
}
.delbtn {
  display: inline-block;
  position: absolute;
  right: 5px;
}
.delbtn:hover {
  cursor: pointer;
}
</style>
