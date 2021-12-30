<template>
  <div class="userBox">
    <!-- <h1>{{ msg }}</h1>
    {{ params }} -->
    <select name="demo" id="selectdemo" >
      <option value="key1">option1</option>
      <option value="key2">option2</option>
      <option value="key3">option3</option>
    </select>

    <SelectAddItem :items="items" @click="clickHandler"/>
  </div>
</template>

<script lang='ts' src="./index.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userBox {
}
</style>
