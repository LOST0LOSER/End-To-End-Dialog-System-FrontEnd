<template>
  <q-layout view="lHh Lpr lFf" id="LayoutDefault">
    <q-page-container class="glossy">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: "LayoutDefault",
  components: {},
  mounted() {
    if (this.$q.platform.isdesktop) {
      document.body.style.zoom(1.5);
    }
  },
  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>

<style lang="scss" scoped>
#LayoutDefault{
  overflow: hidden;
  margin: 0 0;
  height: 100vh;
}
</style>
