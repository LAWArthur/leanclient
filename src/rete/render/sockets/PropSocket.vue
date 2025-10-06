<template>
  <div class="socket" :class="{ optional: data.isOptional && !data.isConnected }" :title="data.name"></div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss" scoped>
@use "sass:math";

$socket-size: 24px;
$socket-margin: 6px;
$socket-color: #4bacec;
$node-width: 180px;

.socket {
  display: inline-block;
  cursor: pointer;
  border: 2px solid white;
  border-radius: math.div($socket-size, 2);
  width: $socket-size;
  height: $socket-size;
  margin: $socket-margin;
  vertical-align: middle;
  background: $socket-color;
  z-index: 2;
  box-sizing: border-box;
  &.optional {
    border-style: dashed;
    opacity: 0.6;
  }
  &:hover {
    border-width: 4px;
    border-style: solid;
  }
  &.multiple {
    border-color: yellow;
  }
  &.output {
    margin-right: - math.div($socket-size, 2);
  }
  &.input {
    margin-left: - math.div($socket-size, 2);
  }
}
</style>