<script setup>
// import cmp1 from './cmp1';
import NodeEditor from './NodeEditor';
</script>

<template>
  <!-- <cmp1 :index="1000"></cmp1> -->
  <NodeEditor 
    ref="node_editor"
    @add_node="(x,y)=> $refs.node_editor.node_add_at(`hello ${Math.round(Math.random()*100)}`, x, y)" 
    ></NodeEditor>
    <!-- @add_field="({node}) => $refs.node_editor.field_add(node.value, 'hello')" -->
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
