<template>
  <div class="text-card col-lg-5 col-sm-12">
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
    margin-top: 20px;
  }
  .text-card-text {
    text-align: left;
  }

  /*mobile*/
  @media only screen and (max-width: 992px) {
    .text-card-image img {
      width: 300px;
    }
    .text-card-title {
      margin-bottom: 20px;
      text-align: left;
    }
    .text-card {
      margin-bottom: 50px;
    }
  }
</style>