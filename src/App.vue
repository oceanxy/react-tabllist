<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  name: 'TGApp',
  created() {
    const tempState = JSON.parse(sessionStorage.getItem('state'))

    if (tempState) {
      // 在页面加载时读取sessionStorage里的状态信息，还原store
      this.$store.replaceState(tempState)
      // 还原store后，删除sessionStorage里的备份状态信息
      sessionStorage.removeItem('state')
    }

    // 在页面刷新时将store里的信息保存到sessionStorage里，以便刷新页面后还原store
    window.addEventListener('beforeunload', this.setStore)
  },
  methods: {
    setStore() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.setStore)
  }
}
</script>

<style>
html,
body,
#app {
  overflow: hidden;
  height: 100%;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /*滑块*/

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #3e3e3e;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #777777;
  }

  /*滑道*/

  ::-webkit-scrollbar-track {
    margin: 4px 0;
    border-radius: 10px;
    box-shadow: inset 0 0 6px #333333;
  }
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
