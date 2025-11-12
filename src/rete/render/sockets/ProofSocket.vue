<template>
  <div class="socket" :class="[{ optional: data.isOptional && !data.isConnected, bad: data.isBad }, ]" :title="data.name"></div>
</template>

<script>
import { Ref } from 'rete-vue-plugin'
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['data'],
  
});
</script>

<style lang="scss" scoped>
@use "sass:math";

$node-color: rgba(110,136,255,0.8);
$node-color-selected: #ffd92c;
$group-color: rgba(15,80,255,0.2);
$group-handler-size: 40px;
$group-handler-offset: -10px;
$socket-size: 24px;
$socket-margin: 6px;
$socket-color: #96b38a;
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
  &.bad {
    background: #F00;
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