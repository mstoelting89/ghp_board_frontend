<template>
  <div class="text-element">
    <div class="text-element-title">
      <div>
        <span class="first-word">{{ textElementFirstWord }}</span>
        {{ textElementTitle }}
      </div>
    </div>
    <div class="text-element-text">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextElement",
  props: [
      'textElementTitle',
      'textElementFirstWord'
  ]
}
</script>

<style scoped>
.text-element {
  margin-bottom: 50px;
}
.first-word {
  font-weight: 600;
  color: #a21d21;
}
.text-element-title {
  font-size: 2rem;
  text-align: left;
}
.text-element-text {
  margin-top: 20px;
  text-align: left;
}
</style>