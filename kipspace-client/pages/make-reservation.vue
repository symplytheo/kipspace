<template>
  <div id="make-reservation">
    <DesktopView />
    <MobileView />
  </div>
</template>

<script>
import DesktopView from "~/components/make-reservation/desktop";
import MobileView from "~/components/make-reservation/mobile";

export default {
  components: {
    DesktopView,
    MobileView
  },
  head() {
    return {
      title: 'Make Reservation'
    };
  }
}
</script>

<style>

</style>