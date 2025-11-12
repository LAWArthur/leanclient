<template>
<div class="control-title" data-testid="input-title">{{ data.label }}
</div>
<input type="checkbox"
  :checked="data.value"
  :readonly="data.readonly"
  @change="change"
  @pointerdown.stop="">
</input>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    change() {
      this.data.setValue(!this.data.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";

input {
  border-radius: 30px;
  background-color: white;
  margin: 10px;
  border: 1px solid #999;
  font-size: 110%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
}
.control-title {
    vertical-align: middle;
    color: white;
    display: inline-block;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 24px;
  }
</style>