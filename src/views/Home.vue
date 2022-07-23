<template>
  <div class="header">
    <Slider />
  </div>

  <div class="content">
    <div class="intro fadein">
      <IntroText introTextFirstWord="Willkommen" introTextTitle="beim Guitar Hearts Project">
        <p>Im März 2015 hat Lars die Idee, zwei seiner Gitarren für einen wohltätigen Zweck zu verschenken. Seine Aktion postet er bei Facebook. Hunderte Menschen, von armen Musikern bis zu Asylbewerbern, aber auch viele Schulen und Musikinitiativen schreiben ihn an.</p>
        <p>Es melden sich aber nicht nur Leute, die diese Gitarren haben wollen – sondern auch viele, die selbst alte Instrumente, Verstärker und Equipment für Bands verschenken oder sonst irgendwie diese tolle Idee unterstützen möchten. Und so wird aus einer Idee ein Projekt und aus dem Projekt letztendlich ein eingetragener, gemeinnütziger Verein (e.V.).</p>
      </IntroText>
    </div>
    <div class="text-cards row fadein">
      <TextCard
          textCardFirstWord="Wie"
          textCardTitle="bewerbe ich mich auf ein Instrument vom Guitar Hearts Project?"
          :textCardImgSource="require('@/assets/images/BilderLars/IMG_20150318_174532_HDR_zugeschnitten_small.png')"
      >
        Klicke auf die Schaltfläche "Bewerben" oben auf dieser Website. So bekommst du einen direkten Kontakt zu uns. Schreibe uns eine Nachricht, in welcher du uns erzählst, warum genau DU eines unserer Instrumente bekommen solltest.
        Erzähl uns von deiner Leidenschaft zur Musik und natürlich auch ein bisschen was über dich.
        <br><br>
        Alle Vereinsmitglieder entscheiden gemeinsam, wer die Spende bekommt und planen die Übergaben. Wir verschicken keine Gitarren auf dem Postweg, sondern übergeben alle Instrumente persönlich, weil wir diese gut untergebracht wissen möchten.

      </TextCard>
      <TextCard
          textCardFirstWord="Welches"
          textCardTitle="Ziel verfolgt das Guitar Hearts Project?"
          :textCardImgSource="require('@/assets/images/BilderLars/IMG_20190323_125518_small.png')"
      >
        Wir bekamen den Namen Guitar Hearts Project und organisieren uns seit April 2017 als eingetragener gemeinnütziger Verein. Wir sammeln nun offiziell nicht mehr benötigte Gitarren, E-Bässe, sowie Amps und Equipment, richten diese in Eigenleistung wieder her und spenden die Instrumente an gemeinnützige Organisationen, Schulen, soziale Projekte und bedürftige Privatpersonen. Schon in den ersten Wochen bekamen wir knapp zwei Dutzend Instrumente und Equipment gespendet.
      </TextCard>
    </div>
    <div class="amazon-part fadein">
    </div>
    <div class="blog fadein">
      <Blog />
    </div>
    <div class="how-it-works fadein">
      <TextElement textElementFirstWord="Wie" textElementTitle="funktioniert das Guitar Hearts Project?">
        <p>Ein solches Projekt erfordert nicht nur einen großen organisatorischen Aufwand. Die gespendeten Gitarren müssen zum größten Teil optimiert, eingestellt oder oft auch repariert werden, bevor sie weiter gespendet werden können.</p>
        <p>Das bedeutet natürlich Arbeit, die Beschaffung von Ersatzteilen, Werkzeug, Saiten und so weiter.
          Bisher wurden alle damit verbundenen Kosten privat gedeckt. Langfristig erhoffen wir uns eine Finanzierung durch Geldspenden.</p>
      </TextElement>
    </div>
    <div class="instruments-wrapper fadein">
      <Instruments />
    </div>
  </div>

  <Footer />
</template>

<script>
// @ is an alias to /src
import Slider from "@/components/landing-page/Slider";
import IntroText from "@/components/landing-page/IntroText";
import TextCard from "@/components/landing-page/TextCard";
import TextElement from "@/components/landing-page/TextElement";
import Footer from "@/components/Footer";
import Blog from "@/components/members/container/blog/Blog";
import Instruments from "@/components/members/container/instruments/Instruments";

export default {
  name: 'Home',
  components: {
    Instruments,
    Blog,
    Footer,
    TextElement,
    TextCard,
    IntroText,
    Slider
  },
  data() {
    return {
      positionData: []
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    let elements = document.querySelectorAll('.fadein');
    elements.forEach(element => {
      let data = {
        element: element,
        position: element.offsetTop
      };
      this.positionData.push(data);
    });
  },
  methods: {
    elementIsVisible(el) {
      let rect = el.getBoundingClientRect();
      let elementTop = rect.top + 200;
      return elementTop < window.innerHeight && rect.bottom >= 0;
    },
    handleScroll() {
      let i = 0;
      this.positionData.forEach(element => {

        if (this.elementIsVisible(element.element)) {
          element.element.style.opacity = 1;
          element.element.style.transition = "all 2s";
          this.positionData.splice(i, 1);// only allow it to run once
        }
        i += 1;
      });
    }
  }
}
</script>


<style scoped>
  .hidden {
  }
  .fadein {
    opacity: 0;
  }
  .text-cards {
    display: flex;
    margin-bottom: 50px;
    justify-content: space-between;
  }
  .content {
    margin-left: 10vw;
    margin-right: 10vw;
    line-height: 1.5;
    font-size: 1.2rem;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .instruments-wrapper {
    margin-bottom: 3rem;
  }
</style>