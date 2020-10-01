<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin'
import { mapMutations } from "vuex"

export default {
  name: "BaseLayout",
  components: {},
  data() {
    return {
      fullWidth: document.body.clientWidth,
    }
  },
  mixins: [ mixin ],
  computed: {
    isPC: function () {
      return !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
    }
  },
  mounted() {
    window.onresize = () => {
      if(!this.timer) {
        this.timer = true
        setTimeout(
          () => {
            this.fullWidth = document.body.clientWidth
            this.timer = false
          }, 400)
      }
    }
  },
  methods: {
    ...mapMutations ({
      layoutVersionCommit: 'LAYOUT_VERSION',
    }),
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
}
</script>

<style scoped lang="less">
  @import "~@/style/variables";
</style>
