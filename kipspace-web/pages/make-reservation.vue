<template>
  <div id="make-reservation">
    <DesktopView />
    <MobileView />
  </div>
</template>

<script>
export default {
  components: {
    DesktopView: () => import('~/components/make-reservation/desktop'),
    MobileView: () => import('~/components/make-reservation/mobile'),
  }
}
</script>

<style>

</style>