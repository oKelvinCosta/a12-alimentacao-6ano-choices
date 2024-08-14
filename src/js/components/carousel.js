// Só funciona 1 componente por página
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          img: "src/img/aula/gif-05.webp",
          alt: "Frutas rodando",

          //html
          html: `
            <p class="body1"><b>Alimentos <i>in natura</i> ou minimamente processados</b></p>
            <br>
            <p>
            Esses alimentos devem ser a base da alimentação, pois garantem uma dieta balanceada, rica em nutrientes, além de serem ambientalmente sustentáveis.

            </p>
            `,
        },
        {
          id: 2,
          img: "src/img/aula/gif-06.webp",
          alt: "Ovos com olhos",

          //html
          html: `

            <p>
            Podendo ser de origem animal ou vegetal (maioria), são alimentos que não passam por qualquer alteração após serem retirados da natureza.

            </p>
            `,
        },
        {
          id: 3,
          img: "src/img/aula/static-02.jpg",
          alt: "comida humana para cachorro",

          //html
          html: `
            <p>
            Como exemplo de alimentos <i>in natura</i>, temos os vegetais, os ovos, as frutas, os tubérculos, entre outros.

            </p>
            `,
        },
        {
          id: 4,
          img: "src/img/aula/static-03.jpg",
          alt: "Farinha",

          //html
          html: `
            <p>
            Porém, esses alimentos, antes de serem disponibilizados, podem passar por limpeza, refrigeração, embalagem, secagem, trituração, pasteurização, entre outros processos mínimos. 

            </p>
            `,
        },
        {
          id: 5,
          img: "src/img/aula/static-04.jpg",
          alt: "Carnes",

          //html
          html: `
            <p>
            Esses processos, que não inserem sal, açúcar, gordura e/ou outras substâncias, transformam o alimento <i>in natura</i> em alimento minimamente processado.

            </p>
            <br>
            <p>
            Como exemplo, temos a carne, o leite e alguns grãos. 

            </p>

            `,
        },
        {
          id: 6,
          img: "src/img/aula/static-05.jpg",
          alt: "Indústria",

          //html
          html: `
            <p>
            Esses processos mínimos ajudam o alimento <i>in natura</i> a ter uma duração maior, permitindo que ele seja armazenado sem estragar rapidamente.
            </p>
            <br>
            <p>
            Em alguns casos, o processamento pode ajudar também o alimento a se tornar mais digestivo (fermentação, por exemplo).
            </p>

            `,
        },
      ],
      carousel: {
        class: "carousel-01",
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
