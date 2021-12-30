<template>
  <div class="box">
    <ul>
      <li v-for="(item,index) in items" :key="item.key" :class="selected[index] === index ? 'checked':''" @click="select(item.key,index)">
        <slot name="label">
          <span>{{ item.value }}</span>
        </slot>   
      </li>
    </ul>
  </div>
</template>
<script lang='ts' src='./index.ts'>
</script>


<style lang='less' scoped>
ul {
  padding: 0;
}
li {
  padding: 0;
  list-style: none;
  display: inline-block;
  margin-left: 16px;
}
li:hover {
  cursor: pointer;
  color: #1890FF;
}
.checked {
  color: #1890FF;
}
</style>