<template>
<div class="control-title" data-testid="input-title">{{ data.label }}
</div>
<input :type="data.type"
  :value="data.value"
  :readonly="data.readonly"
  @input="change"
  @pointerdown.stop="">
</input>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    change(e) {
      const val = this.data.type === 'number'
        ? +e.target.value
        : e.target.value

      this.data.setValue(val)
    }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";

input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  box-sizing: border-box;
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