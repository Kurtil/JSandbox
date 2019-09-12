<template>
  <li class="element">
    <slot name="content" :id="element.id"></slot>
    {{element.message}}
  </li>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      require: true
    }
  }
};
</script>