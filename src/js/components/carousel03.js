// Só funciona 1 componente por página
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          img: "src/img/aula/static-09.jpg",
          alt: "Fast food",

          //html
          html: `
            <p class="purple-text"><b>E qual é o porquê do alerta inicial?</b></p>
            <br>
            <p>
            Porque os alimentos ultraprocessados são aqueles produzidos em grandes indústrias, que passam por diferentes técnicas e são produzidos com muitas substâncias, algumas de uso exclusivamente industrial.</p>
            `,
        },
        {
          id: 2,
          img: "src/img/aula/static-10.jpg",
          alt: "Biscoitos",

          //html
          html: `
            <p>
            Como exemplo, podemos citar os biscoitos, os salgadinhos, o macarrão instantâneo, os refrigerantes, entre outros.
            </p>
            `,
        },
        {
          id: 3,
          img: "src/img/aula/static-10.1.webp",
          alt: "Doces",

          //html
          html: `
            <p>
          Esses alimentos são nutricionalmente desbalanceados, contendo altos valores calóricos e excesso de nutrientes.
          </p>
            `,
        },
        {
          id: 4,
          img: "src/img/aula/static-11.jpg",
          alt: "Miojo",

          //html
          html: `
            <p>
           Geralmente, esses alimentos contêm substâncias que realçam o sabor, fazendo com que você coma muito mais do que o recomendado e, por isso, estão associados ao sobrepeso e outros problemas de saúde.
</p>
            `,
        }
      ],
      carousel: {
        class: "carousel-03",
        key: 0,
        elemento: null,
        qtdSlides: 0,
        ordem: 1,
        ordemAnterior: 99,
      },

      instances: null, // Declare instances as a reactive variable
    };
  },
  methods: {
    next() {
      this.carousel.elemento.querySelector(".previous").style.display = "flex";
      this.instances[this.carousel.key].next(); // Access the first carousel instance
    },
    previous() {
      this.instances[this.carousel.key].prev();
    },
  },
  mounted() {
    this.carousel.elemento = document.querySelector(
      "."+this.carousel.class
    );

    let elems = document.querySelectorAll(
      ".carousel." + this.carousel.class
    );
    this.instances = M.Carousel.init(elems, {
      fullWidth: true,
      indicators: true,
      shift: 20,
      numVisible: 1,
      onCycleTo: (slide) => {
        // this.qtdSlides = slide.parentNode.querySelectorAll(".carousel-item").length;

        // Lógica para saber o slide atual
        let search = slide.parentNode;
        let slideIndex = [...search.children].indexOf(slide);
        this.carousel.ordem = slideIndex;
        this.carousel.ordemAnterior = this.ordem - 1;

        // Se for o primeiro slide, não mostrar o botão anterior
        if (this.carousel.ordem == 1) {
          this.carousel.elemento.querySelector(".previous").style.display = "none";
        } else {
          this.carousel.elemento.querySelector(".previous").style.display = "flex";
        }
      },
    });
    this.carousel.elemento.querySelector(".previous").style.display =
      "none";
  },

  //html
  template: `
    <!-- Carousel -->
    <div class="carousel carousel-slider center" :class="[carousel.class]">
    <!-- Arrows -->
      <div class="carousel-fixed-item center">
        <a @click="previous" class="previous flex--align-center card card--purple-shadow">
          <span class="material-symbols-rounded">
            chevron_left
          </span>
        </a>
        <a @click="next" class="next flex--align-center card ml-4 card--purple-shadow">
          <span class="material-symbols-rounded">
            chevron_right
          </span>
        </a>
      </div>

      <!-- slides -->
      <!-- item -->
      <div v-for="item in items" :key="item.id" class="carousel-item card">
        <div class="row card-content">
        <div class="col s12 m6 img--round">
          <img :src="item.img" :alt="item.alt" class="img--round">
          </div>
          <div class="col s12 m6 left-align" v-html="item.html"></div>
        </div>
      </div>
      <!-- item -->
      
    </div>
    <!-- Fim Carousel -->
  `,
};
