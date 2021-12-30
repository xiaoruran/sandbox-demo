<template>
  <div class="test">
    <div class="header">
      <div class="headerlogo">
        <img src="@/assets/gametalklogo.svg" alt="" />
      </div>
      <div class="menulist">
        <div
          v-for="(menu, index) in menus"
          :key="menu.key"
          @mouseenter="mouseenterHandler(index)"
          @mouseleave="mouseleaveHandler()"
          class="menuitem"
        >
          <transition name="fade">
            <div
              v-if="menu.submenus.length !== 0 && hoverIndex === index"
              class="menuitemhover"
            >
              <div class="submenulist">
              <div
                class="submenuitem"
                v-for="item in menu.submenus"
                :key="item.key"
              >
                {{ item.value }}
              </div>
            </div>
            </div>
          </transition>
          <div class="menuitemtext">{{ menu.value }}</div>
        </div>
      </div>
      <div class="headerright">
        <!-- <div class="searchicon"></div> -->
        <img class="searchicon" src="@/assets/search.svg" alt="" />
        <img class="searchicon" src="@/assets/message.svg" alt="" />
        <div class="avator"></div>
      </div>
    </div>

    <div class="searchList">
      <div class="searchSpan">品类</div>
      <div class="searchListInner">
        <div class="btnlist">
          <div
            v-for="(item, index) in dataTree"
            :key="item.id"
            @click="clickHanlder1(index, item)"
            :class="ischeckeds[0] === index ? 'checked item' : 'item'"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="searchList">
      <div class="searchSpan">{{ gameType }}</div>
      <div class="searchListInner">
        <div class="btnlist">
          <div
            v-for="(item, index) in dataTreeLevel2"
            :key="item.id"
            @click="clickHanlder2(index, item)"
            :class="ischeckeds[1] === index ? 'checked item' : 'item'"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="ifGameName" class="searchList">
      <div class="searchSpan">游戏名称</div>
      <div class="searchListInner">
        <div class="btnlist">
          <div
            v-for="(item, index) in dataTreeLevel3"
            :key="item.id"
            @click="clickHanlder3(index, item)"
            :class="ischeckeds[2] === index ? 'checked item' : 'item'"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- <SelectAddItems :items="items" @click="onHandler">
      <template #icon="{ item, value }"> {{ item }}{{ value }} </template>
    </SelectAddItems>
    <TodoList :items="itemdatas" />
    <CheckBox
      :multiply="false"
      :selectValue="value"
      @selectChange="onChange"
      :items="itemsdata"
    /> -->
  </div>
</template>

<script src="./index.js">
</script>

<style scoped>
.test {
  padding: 0;
}
.header {
  width: 100%;
  height: 60px;
  position: relative;
  background: #1e1d2d;
  padding-left: 16px;
  padding-right: 16px;
}
.headerlogo {
  position: absolute;
  display: inline-block;
  left: 16px;
  width: 97px;
  height: 32px;
  margin-top: 14px;
}
.menulist {
  width: 50%;
  height: 100%;
  margin-left: 157px;
  display: flex;
  justify-content: left;
}
.menuitem {
  position: relative;
  flex: 1 1 auto;
  color: #ffffff;
  font-size: 16px;
  line-height: 60px;
  height: 100%;
  /* margin-right: 35px; */
}
.menuitemtext {
  width: 100%;
  height: 100%;
  color: #ffffff;
  font-size: 16px;
  line-height: 60px;
  overflow: hidden;
  /* transition: 0s background-color border-bottom color;
  transition-delay:0.01s; */
}
.menuitemhover {
  width: 100%;
  color: black;
  position: absolute;
  top: 60px;
}
.menuitemhover:hover ~ .menuitemtext {
  background: #20294f;
  color: #5d78ff;
  border-bottom: 1px solid #5d78ff;
}
.menuitemtext:hover {
  cursor: pointer;
  background: #20294f;
  color: #5d78ff;
  border-bottom: 1px solid #5d78ff;
}
.searchList {
  height: 30px;
  margin-top: 20px;
}
.list1 {
  width: 100%;
}
.searchSpan {
  display: inline-block;
  width: 80px;
}
.btnlist {
  display: flex;
  flex-direction: row;
  justify-items: left;
}
.searchListInner {
  display: inline-block;
}
.item {
  padding-left: 5px;
  padding-right: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  font-size: 12px;
  min-width: 64px;
  max-width: 112px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #dadfe8;
  border-radius: 12px;
  margin-left: 16px;
  text-align: center;
}
.item:hover {
  cursor: pointer;
  border: 1px solid #5d78ff;
}
.checked {
  background: rgba(93, 120, 255, 0.1);
  border: 1px solid #5d78ff;
  color: #6779d1;
}
.submenulist {
  width: 100%;
  background: #1e1d2d;
  color: #f1f1f1;
  font-size: 14px;
}
.submenuitem {
  /* padding-left:15px; */
  height: 34px;
  text-align: center;
  line-height: 34px;
}
.submenuitem:hover {
  cursor: pointer;
  background: rgba(93, 120, 255, 0.1);
  color: #6779d1;
}
.headerright {
  position: absolute;
  height: 100%;
  top: 0;
  right: 20px;
}
.searchicon {
  width: 24px;
  height: 24px;
  margin-top: -18px;
  line-height: 60px;
  margin-right: 20px;
}
.searchicon:hover {
  cursor: pointer;
}
.avator {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-color: white;
  margin-top: 14px;
  border-radius: 16px;
  margin-right: 20px;
}
.avator:hover {
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  /* transition-delay: 0.1s; */
  opacity: 0;
}
</style>