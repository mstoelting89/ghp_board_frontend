<template>
  <div class="footer row">
    <div class="col-lg-4 col-sm-12 col-xs-12 sub-text-footer pt-3 pb-3">
      The Guitar Hearts Project e.V.<br>
      vorstand@guitarheartsproject.de <br>
      Langgasse 17, 56348 Bornich, Germany<br>
      <br>
      ©2020 The Guitar Hearts Project e.V.
    </div>
    <div class="col-lg-6 col-sm-12 col-xs-12 partners pt-3 pb-3">
      <div id="partnerCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <a href="https://www.cordial-cables.com" target="_blank">
              <img src="@/assets/images/partner/IMG_20200219_091315_880.jpg" class="d-block" height="150" alt="cordial">
            </a>
          </div>
          <div class="carousel-item">
            <a href="https://www.kma-machines.com" target="_blank">
              <img src="@/assets/images/partner/KMA_LOGO.jpg" class="d-block" height="150" alt="kma">
            </a>
          </div>
          <div class="carousel-item">
            <a href="https://www.vip-guitar.de" target="_blank">
              <img src="@/assets/images/partner/124285556_384635166235082_8949292051946795198_n.jpg" class="d-block" height="150" alt="vip-guitar">
            </a>
          </div>
          <div class="carousel-item">
            <a href="https://www.meinemusikschule.net" target="_blank">
              <img src="@/assets/images/partner/IMG_2540.jpg" class="d-block " height="150" alt="meine-musikschule">
            </a>
          </div>
          <div class="carousel-item">
            <a href="https://www.meingitarrenkurs.de" target="_blank">
              <img src="@/assets/images/partner/IMG_2541.jpg" class="d-block " height="150" alt="mein-gitarrenkurs">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-2 col-sm-12 col-xs-12 secondary-menu pt-3 pb-3">
      <router-link to="/satzung">Satzung</router-link><br>
      <router-link to="/impressum">Impressum</router-link><br>
      <router-link to="/login">Mitglieder-Login</router-link><br>
      <!--
      <span class="contact" data-bs-toggle="modal" data-bs-target="#contact">Kontakt</span> -->
    </div>
    <ContactModal />
  </div>
</template>

<script>
import ContactModal from "@/components/members/container/contact/ContactModal";
export default {
  name: "Footer",
  components: {ContactModal}
}
</script>

<style scoped>
.footer {
  display:flex;
  background-color: #000000;
  color: #ffffff;
  margin: 0;
  padding: 0;
}
.sub-text-footer {
  text-align: left;
  padding-left: 20px;
}
.secondary-menu {
  text-align: right;
  padding-right: 20px;
}
.secondary-menu a {
  text-decoration: none;
  color: #fff;
}
.partnerCarousel img {
  max-height: 50px;
  width: auto;
}
.carousel-item-next, .carousel-item-prev, .carousel-item.active {
  display: flex;
  justify-content: center;
}
.contact {
  cursor: pointer;
}
/*mobile*/
@media only screen and (max-width: 992px) {
  .footer {
    margin-right: 0;
  }
  .secondary-menu {
    text-align: left;
    padding-left: 20px;
  }
  .carousel-item a img {
    max-width: 90%;
  }
  .partners {
    padding-left: 20px;
  }
}
</style>