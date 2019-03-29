<template>
  <div class="my-view">
    <div class="my-component-wrapper">
      <my-component></my-component>
      <my-component2></my-component2>
    </div>
  </div>
</template>

<script>
import MyComponent from "@/components/MyComponent.vue";
import MyComponent2 from "@/components/MyComponent2.vue";

export default {
  name: "myView",
  components: {
    MyComponent,
    MyComponent2
  }
};
</script>
<style>
  .my-component-wrapper {
    display: flex;
    justify-content: center;
  }
</style>


