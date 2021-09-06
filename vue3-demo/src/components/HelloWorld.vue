<template>
  <div class="left-nav">

  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    }
  },
  setup: () => {

  }

})
</script>

<style lang="scss" scoped>

</style>
