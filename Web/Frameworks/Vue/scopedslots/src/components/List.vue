<template>
  <ul class="list">
    <Element v-for="element of elements" :key="element.id" :element="element">
      <template #[slotName]="{ id: number, x = '!' }">{{number}} {{x}}></template>
    </Element>
  </ul>
</template>

<script>
import Element from "./Element";

export default {
  name: "List",
  components: {
    Element
  },
  data() {
    return {
      slotName: "content"
    };
  },
  props: {
    elements: {
      type: Array,
      require: true
    }
  }
};
</script>

<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
