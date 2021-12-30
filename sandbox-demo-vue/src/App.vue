<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <!-- 侧边栏 -->
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['4']">
        <a-menu-item key="1">
          <router-link :to="{ path: '/user', query: { name: 'queryparams' } }">
            <a-icon type="user" />
            <span class="nav-text">user</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="'/test/2'">
            <a-icon type="video-camera" />
            <span class="nav-text">test</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link :to="{ path: '/line' }">
            <a-icon type="upload" />
            <span class="nav-text">line</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link :to="{ path: '/wordcloud' }">
            <a-icon type="bar-chart" />
            <span class="nav-text">wordcloud</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="cloud-o" />
          <span class="nav-text">nav 5</span>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="appstore-o" />
          <span class="nav-text">nav 6</span>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="team" />
          <span class="nav-text">nav 7</span>
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="shop" />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- 右边 -->
    <a-layout :style="{ marginLeft: '200px', background: '#F0F2F5' }">
      <!-- header -->
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <div class="header">header</div>
      </a-layout-header>

      <!-- content -->
      <a-layout-content
        :style="{ margin: '24px 16px 0', overflow: 'initial', padding: '24px' }"
      >
        <router-view></router-view>
      </a-layout-content>

      <!-- footer -->
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design Demo ©2021 Created by HanCao
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#components-layout-demo-fixed-sider {
  width: 100%;
  height: 100%;
}
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.header {
  text-align: center;
  font-size: 20px;
}
</style>
