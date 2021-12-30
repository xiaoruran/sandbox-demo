<template>
  <div class="box">
    <ul>
      <TodoHeader>
        <!-- 通过slot进行父组件传递给这个template中的值 -->
        <!-- <template #titleName="{title}">todolist vue demo {{title}}</template> -->
        <!-- <template #titleName>todolist</template>
        <template #headerRight>
              <a-icon :style="{color:'#1890FF'}" type="setting" />
        </template> -->
      </TodoHeader>
      <TodoItem @add='additem' @delete='deleteItem' v-for="item in data" :item="item" :key="item.key"></TodoItem>
    </ul>
  </div>
</template>

<script lang='ts' src='./index.ts'>
</script>


<style scoped>
ul {
  margin-top:16px;
  list-style: none;
  padding: 0;
  width: 200px;
  /* height:20px; */
}
</style>