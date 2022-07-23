<template>
  <div class="text-card">
    <div class="text-card-image">
      <img v-bind:src=textCardImgSource />
    </div>
    <div class="text-card-title">
      <div>
        <span class="first-word">{{ textCardFirstWord }}</span>
        {{ textCardTitle }}
      </div>

    </div>
    <div class="text-card-text">
      <slot />
    </div>

  </div>
</template>

<script>
export default {
  name: "TextCard",
  props: [
      'textCardFirstWord',
      'textCardTitle',
      'textCardImgSource'
  ]
}
</script>

<style scoped>
  .text-card {
    min-width: 37vw;
    max-width: 37vw;
    margin-right: 80px;
  }
  .text-card-image img {
    width:400px;
    height: auto;
  }
  .text-card-title .first-word {
    font-weight: 600;
    color: #a21d21;
  }
  .text-card-title {
    font-size: 2rem;
    min-height: 10rem;
    max-height: 12rem;
    margin-top: 20px;
  }
  .text-card-text {
    text-align: left;
  }
</style>