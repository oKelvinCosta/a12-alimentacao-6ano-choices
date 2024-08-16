import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// Esse dá erro
// import {
//   createApp,
// } from "https://unpkg.com/vue@3.4.35/dist/vue.esm-browser.prod.js";
import Carousel from "./components/carousel.js";
import Sidebar from "./components/sidebar.js";
import Questions from "./components/questions.js";
import Navbar from "./components/navbar.js";
import Hero from "./components/hero.js";
import ImgSideCard from "./components/img-side-card.js";
import AppFooter from "./components/app-footer.js";
import Concluir from "./components/concluir.js";
import Carousel03 from "./components/carousel03.js";

const app = createApp({
  components: {
    Carousel,
    Sidebar,
    Questions,
    Navbar,
    Hero,
    ImgSideCard,
    AppFooter,
    Concluir,
    Carousel03,
  },
  data() {
    return {
      isSmallScreen: false,
    };
  },
  /**
   * Inicializa a funcionalidade de scrollspy e adiciona um ouvinte de evento de scroll.
   *
   * Esta função é chamada quando o componente é montado. Ela seleciona todos os elementos
   * com a classe "scrollspy" usando `document.querySelectorAll` e inicializa o scrollspy
   * usando `M.ScrollSpy.init`. A função `M.ScrollSpy.init` recebe dois parâmetros: os elementos
   * a serem inicializados e um objeto de opções opcional.
   *
   * Após inicializar o scrollspy, a função adiciona um ouvinte de evento de scroll à janela
   * usando `window.addEventListener`. O ouvinte de evento chama o método `handleScroll`
   * do componente atual.
   *
   * @return {void} Esta função não retorna um valor.
   */
  mounted() {
    // scrollspy -----------------------------------------------------
    // Para a ancoragem de links de funcionar de modo animado
    // var elems = document.querySelectorAll(".scrollspy");
    // var instances = M.ScrollSpy.init(elems, {
    //   // specify options here
    // });

    // Adiciona o evento de scroll
    window.addEventListener("scroll", this.handleScroll);

    // Solução erro de scrollspy no T2K -----------------------------------------------------

    const x = window.matchMedia("(max-width: 600px)");

    // Call listener function at run time
    this.mediaQuery(x);

    // Attach listener function on state changes
    x.addEventListener("change", this.mediaQuery);

    // AOS Animation -------------------------------------
    AOS.init({
      delay: 50,
    });
  },
  methods: {
    // Barra de progresso Scroll -----------------------------------------------------

    /**
     * Atualiza a barra de progresso e exibe a porcentagem rolada.
     *
     * Esta função calcula a porcentagem rolada com base na posição de rolagem do usuário. Em seguida, atualiza a largura da barra de progresso e exibe a porcentagem rolada na caixa de progresso.
     *
     * @return {void} Esta função não retorna nenhum valor.
     */
    handleScroll() {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;

      var barras = document.querySelectorAll(".determinate");

      barras.forEach((barra) => {
        barra.style.width = scrolled + "%";
      });

      document.querySelector(".progress-box__number").innerHTML =
        Math.round(scrolled) + "%";

      // console.log("winScroll", winScroll);
      // console.log("height", height);
      // console.log("scrolled", scrolled);
    },

    mediaQuery(event) {
      this.isSmallScreen = event.matches;
      if (this.isSmallScreen) {
        console.log("mobile here");

        
      }
    },
  },
  beforeDestroy() {
    // Clean up the event listener to avoid memory leaks
    const x = window.matchMedia("(max-width: 600px)");
    x.removeEventListener("change", this.mediaQuery);
  },
});

app.mount("#app");
