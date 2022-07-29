<template>
  <div class="header">
    <Slider />
  </div>

  <div class="content">
    <div class="intro fadein mb-6">
      <IntroText introTextFirstWord="Willkommen" introTextTitle="beim Guitar Hearts Project">
        <p>Im März 2015 hat Lars die Idee, zwei seiner Gitarren für einen wohltätigen Zweck zu verschenken. Seine Aktion postet er bei Facebook. Hunderte Menschen, von armen Musikern bis zu Asylbewerbern, aber auch viele Schulen und Musikinitiativen schreiben ihn an.</p>
        <p>Es melden sich aber nicht nur Leute, die diese Gitarren haben wollen – sondern auch viele, die selbst alte Instrumente, Verstärker und Equipment für Bands verschenken oder sonst irgendwie diese tolle Idee unterstützen möchten. Und so wird aus einer Idee ein Projekt und aus dem Projekt letztendlich ein eingetragener, gemeinnütziger Verein (e.V.).</p>
      </IntroText>
    </div>
    <div class="text-cards row fadein mb-5">
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
    <div class="amazon-part fadein mb-6">
      <div id="amznCharityBanner" class="container" @load="(function() {var iFrame = document.createElement('iframe'); iFrame.style.display = 'none'; iFrame.style.border = 'none'; iFrame.width = 310; iFrame.height = 256; iFrame.setAttribute && iFrame.setAttribute('scrolling', 'no'); iFrame.setAttribute('frameborder', '0'); setTimeout(function() {var contents = (iFrame.contentWindow) ? iFrame.contentWindow : (iFrame.contentDocument.document) ? iFrame.contentDocument.document : iFrame.contentDocument; contents.document.open(); contents.document.write(decodeURIComponent('%3Cdiv%20id%3D%22amznCharityBannerInner%22%3E%3Ca%20href%3D%22https%3A%2F%2Fsmile.amazon.de%2Fch%2F22-654-48766%22%20target%3D%22_blank%22%3E%3Cdiv%20class%3D%22text%22%20height%3D%22%22%3E%3Cdiv%20class%3D%22support-wrapper%22%3E%3Cdiv%20class%3D%22support%22%20style%3D%22font-size%3A%2025px%3B%20line-height%3A%2028px%3B%20margin-top%3A%201px%3B%20margin-bottom%3A%201px%3B%22%3EUnterst%C3%BCtzen%20Sie%20%3Cspan%20id%3D%22charity-name%22%20style%3D%22display%3A%20inline-block%3B%22%3EThe%20Guitarhearts%20Project%20e.V%2C%3C%2Fspan%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22when-shop%22%3Eindem%20Sie%20auf%20%3Cb%3Esmile.amazon.de%3C%2Fb%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22donates%22%3E%20einkaufen.%3C%2Fdiv%3E%3C%2Fdiv%3E%3C%2Fa%3E%3C%2Fdiv%3E%3Cstyle%3E%23amznCharityBannerInner%7Bbackground-image%3Aurl(https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FG%2F03%2Fx-locale%2Fpaladin%2Fcharitycentral%2Fbanner-background-image._CB485921641_.png)%3Bwidth%3A300px%3Bheight%3A250px%3Bposition%3Arelative%7D%23amznCharityBannerInner%20a%7Bdisplay%3Ablock%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Arelative%3Bcolor%3A%23000%3Btext-decoration%3Anone%7D.text%7Bposition%3Aabsolute%3Btop%3A20px%3Bleft%3A15px%3Bright%3A15px%3Bbottom%3A100px%7D.support-wrapper%7Boverflow%3Ahidden%3Bmax-height%3A86px%7D.support%7Bfont-family%3AArial%2Csans%3Bfont-weight%3A700%3Bline-height%3A28px%3Bfont-size%3A25px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.when-shop%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A15px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.donates%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A21px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D%3C%2Fstyle%3E')); contents.document.close(); iFrame.style.display = 'block';}); document.getElementById('amznCharityBanner').appendChild(iFrame); })();">
      </div>
    </div>
    <div class="blog fadein mb-3">
      <Blog />
    </div>
    <div class="how-it-works fadein mb-6">
      <TextElement textElementFirstWord="Wie" textElementTitle="funktioniert das Guitar Hearts Project?">
        <p>Ein solches Projekt erfordert nicht nur einen großen organisatorischen Aufwand. Die gespendeten Gitarren müssen zum größten Teil optimiert, eingestellt oder oft auch repariert werden, bevor sie weiter gespendet werden können.</p>
        <p>Das bedeutet natürlich Arbeit, die Beschaffung von Ersatzteilen, Werkzeug, Saiten und so weiter.
          Bisher wurden alle damit verbundenen Kosten privat gedeckt. Langfristig erhoffen wir uns eine Finanzierung durch Geldspenden.</p>
      </TextElement>
    </div>
    <div class="instruments-wrapper fadein mb-5">
      <Instruments />
    </div>
    <div class="social-media">
      <a href="https://www.facebook.com/guitarheartsprojecteV"><font-awesome-icon class="facebook" :icon="['fab', 'facebook']" /></a>
      <a href="https://www.instagram.com/guitarheartsproject/?utm_medium=copy_link"><font-awesome-icon class="instagram" :icon="['fab', 'instagram']" /></a>
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
      positionData: [],
      amazonPart: ''
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

    // amazon part

    var iFrame = document.createElement('iframe');
    iFrame.style.display = 'none';
    iFrame.style.border = "none";
    iFrame.width = 310;
    iFrame.height = 256;
    iFrame.setAttribute && iFrame.setAttribute('scrolling', 'no');

    iFrame.setAttribute('frameborder', '0');
    setTimeout(function() {
      var contents = (iFrame.contentWindow) ? iFrame.contentWindow : (iFrame.contentDocument.document) ? iFrame.contentDocument.document : iFrame.contentDocument;
      contents.document.open();
      contents.document.write(decodeURIComponent("%3Cdiv%20id%3D%22amznCharityBannerInner%22%3E%3Ca%20href%3D%22https%3A%2F%2Fsmile.amazon.de%2Fch%2F22-654-48766%22%20target%3D%22_blank%22%3E%3Cdiv%20class%3D%22text%22%20height%3D%22%22%3E%3Cdiv%20class%3D%22support-wrapper%22%3E%3Cdiv%20class%3D%22support%22%20style%3D%22font-size%3A%2025px%3B%20line-height%3A%2028px%3B%20margin-top%3A%201px%3B%20margin-bottom%3A%201px%3B%22%3EUnterst%C3%BCtzen%20Sie%20%3Cspan%20id%3D%22charity-name%22%20style%3D%22display%3A%20inline-block%3B%22%3EThe%20Guitarhearts%20Project%20e.V%2C%3C%2Fspan%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22when-shop%22%3Eindem%20Sie%20auf%20%3Cb%3Esmile.amazon.de%3C%2Fb%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22donates%22%3E%20einkaufen.%3C%2Fdiv%3E%3C%2Fdiv%3E%3C%2Fa%3E%3C%2Fdiv%3E%3Cstyle%3E%23amznCharityBannerInner%7Bbackground-image%3Aurl(https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FG%2F03%2Fx-locale%2Fpaladin%2Fcharitycentral%2Fbanner-background-image._CB485921641_.png)%3Bwidth%3A300px%3Bheight%3A250px%3Bposition%3Arelative%7D%23amznCharityBannerInner%20a%7Bdisplay%3Ablock%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Arelative%3Bcolor%3A%23000%3Btext-decoration%3Anone%7D.text%7Bposition%3Aabsolute%3Btop%3A20px%3Bleft%3A15px%3Bright%3A15px%3Bbottom%3A100px%7D.support-wrapper%7Boverflow%3Ahidden%3Bmax-height%3A86px%7D.support%7Bfont-family%3AArial%2Csans%3Bfont-weight%3A700%3Bline-height%3A28px%3Bfont-size%3A25px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.when-shop%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A15px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.donates%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A21px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D%3C%2Fstyle%3E"));
      contents.document.close();
      iFrame.style.display = 'block';
    });
    document.getElementById('amznCharityBanner').appendChild(iFrame);

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
  #amznCharityBanner {
    display: flex;
    justify-content: center;
  }
  .mb-6 {
    margin-bottom: 6rem;
  }
  .social-media {
    position: fixed;
    bottom: 5rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    font-size: 50px;
  }
  .social-media .facebook {
    color: #3B5998;
  }
  .social-media .instagram {
    color: #125688;
  }
  .social-media .facebook:hover {
    opacity: .5;
  }
  .social-media .instagram:hover {
    opacity: .5;
  }
</style>