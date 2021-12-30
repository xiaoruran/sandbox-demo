<template>
  <div class="selectbox">
    <a-modal
      v-model="visible"
      title="标签添加"
      @ok="handleOk"
      okText="确定添加"
      cancelText="取消"
    >
      <a-input placeholder="输入添加条目" v-model="addItemContent" />
    </a-modal>
    <a-select v-model="selectValue" style="width: 120px">
      <!-- <a-icon  @click="addItem" slot="suffixIcon" type="plus" /> -->
      <div slot="dropdownRender" slot-scope="menu">
        <v-nodes :vnodes="menu" />
        <!-- ;border-bottom:1px solid #409EFF -->
        <a-divider style="margin: 4px 0" />
        <div
          style="padding: 4px 8px; cursor: pointer"
          @mousedown="(e) => e.preventDefault()"
          @click="addItem"
        >
          <!-- 设置插槽(icon) -->
          <slot name="icon" :item="123" :value="234">
            <a-icon type="plus" />
          </slot>
          添加标签
        </div>
      </div>
      <a-select-option v-for="item in items" :key="item" :value="item">
        {{ item }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style scoped>
.selectbox {
}
</style>