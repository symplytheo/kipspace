<template>
  <div id="mgr-profile">
    <DesktopView />
    <MobileView />
  </div>
</template>

<script>
export default {
  layout: 'manager',
  components: {
    DesktopView: () => import('~/components/manager/profile/desktop'),
    MobileView: () => import('~/components/manager/profile/mobile'),
  }
}
</script>

<style>

</style>