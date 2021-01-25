<template>
    <div id="app">
        <div class="store-catalog">
            <div class="store-catalog__top">
                <div class="store-catalog__top-action">
                    <button @click="changeCardShowType('line')" class="store-catalog__choose-show-type" :disabled="cardShowType == 'line'"><span class="icon-line"></span></button>
                    <button @click="changeCardShowType('tile')" class="store-catalog__choose-show-type" :disabled="cardShowType == 'tile'"><span class="icon-tile"></span></button>
                </div>
            </div>

            <div v-if="!products.length && !loadingProducts" class="store-catalog__no-found no-found">
                <div class="no-found__text">В магазине нет товаров</div>
                <div class="no-found__actions">
                    <a href="/" class="button button-outlined no-found__btn">Каталог</a>
                </div>

            </div>
            <div v-if="!!products.length" class="store-catalog__result" :class="'store-catalog__result_' + cardShowType">
                <CatalogCard class="catalog-card" :class="{'catalog-card_normal': cardShowType == 'tile', 'catalog-card_horizontal': cardShowType == 'line'}" v-for="(product, id) in products" :product="product" :key="id"/>
            </div>
            <div class="store-catalog__loader loader" v-if="loadingProducts">
                <div class="loader__inner loader__inner_circle"></div>
            </div>
            <div v-if="parseInt(totalProductCount) > products.length && !loadingProducts" class="store-catalog__pagination">
                <button @click="showMoreProducts(defaultLimit)" class="button button-outlined catalog-pagination__btn">Показать еще {{defaultLimit}}</button>
                <button @click="showMoreProducts(defaultLimit*3)" class="button button-outlined catalog-pagination__btn">Показать еще {{defaultLimit*3}}</button>
            </div>
        </div>
    </div>
</template>


<script>
import CatalogCard from './components/CatalogCard.vue'

export default {
    components: {
        CatalogCard
    },
    
    data() {
        return{
            cardShowType: 'tile',
            defaultLimit: 4,
            defaultOffset: 0,
            loadingProducts: false,
            products: [],
            totalProductCount: 0,
            productsLoad: [
                {
                    clientId: 1, favorite: true,
                    storeName: "Автолавка",
                    storeAddress: "Трубный проезд 7 офис 105",
                    id: 2812366,
                    article: "APTиKYл",
                    name: "Описание",
                    priceSelling: 0,
                    amount: 0,
                    isUsed: false,
                    images: ['https://picsum.photos/216/216','https://picsum.photos/217/207','https://picsum.photos/217/205','https://picsum.photos/217/218']
                }, {
                    clientId: 2, favorite: true,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 2990530,
                    article: "252594",
                    name: "Кольцо уплотнительное (резина)",
                    priceSelling: 1,
                    amount: 20,
                    isUsed: false,
                    images: ['https://picsum.photos/218/218','https://picsum.photos/219/219']
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 94905,
                    article: "440664",
                    name: "Хомут пластиковый L=200 (черн) (min.10)",
                    priceSelling: 1,
                    amount: 300,
                    isUsed: false,
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 2989893,
                    article: "191586",
                    name: "Винт М4",
                    priceSelling: 1,
                    amount: 240,
                    isUsed: false,
                    images: ['https://picsum.photos/221/221','https://picsum.photos/220/220','https://picsum.photos/227/227']
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 94907,
                    article: "440667",
                    name: "Шайба стопорная min100",
                    priceSelling: 1,
                    amount: 100,
                    isUsed: false,
                    images: ['https://picsum.photos/218/208']
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 94906,
                    article: "440666",
                    name: "Хомут пластиковый L=150 (черн) (min.10)",
                    priceSelling: 1,
                    amount: 290,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 3047878,
                    article: "108868755",
                    name: "Колпачок передн.задней ручки двери (L+R)  черный;34,6",
                    priceSelling: 1,
                    amount: 1,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 95178,
                    article: "2032501",
                    name: "Кольцо уплотнительное (резина)",
                    priceSelling: 1,
                    amount: 20,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 2989271,
                    article: "134279",
                    name: "Пружинка 0",
                    priceSelling: 1,
                    amount: 1500,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 2989850,
                    article: "190188",
                    name: "Хомут пластиковый L=150 (черн)",
                    priceSelling: 1,
                    amount: 400,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 114489,
                    article: "474137",
                    name: "Шайба форсунки сталь [5x11.4x1.3] [min10]",
                    priceSelling: 1,
                    amount: 20,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 2989897,
                    article: "191770",
                    name: "Винт М4",
                    priceSelling: 1,
                    amount: 200,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 116415,
                    article: "19629020",
                    name: "Прокл.впуск.кол-ра",
                    priceSelling: 1,
                    amount: 20,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 115255,
                    article: "24119443",
                    name: "Прокл.опоры задн.амортизатора верх. [замена 559.485]",
                    priceSelling: 1,
                    amount: 25,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 298451,
                    article: "2015279",
                    name: "Пружинка",
                    priceSelling: 1,
                    amount: 40,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 94704,
                    article: "440491",
                    name: "Пружинка min50",
                    priceSelling: 1,
                    amount: 200,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 94834,
                    article: "2023315",
                    name: "Винт М4",
                    priceSelling: 1,
                    amount: 150,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 94925,
                    article: "2024829",
                    name: "Кольцо стопорное",
                    priceSelling: 1,
                    amount: 190,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 94858,
                    article: "2024091",
                    name: "Винт М4",
                    priceSelling: 1,
                    amount: 60,
                    isUsed: false,
                    
                    images: []
                }, {
                    clientId: 2, favorite: false,
                    storeName: "Мой магазин",
                    storeAddress: "ул. Матрасная д1",
                    id: 2990532,
                    article: "252603",
                    name: "Кольцо уплотнительное (резина)",
                    priceSelling: 1,
                    amount: 50,
                    isUsed: false,
                    
                    images: []
                }
            ]
        }
    },
    
    created() {
        this.loadingProducts = true;
        this.totalProductCount = this.productsLoad.length;
        setTimeout(() => {
            this.products = this.productsLoad.splice(0, this.defaultLimit);
            this.loadingProducts = false;
            setTimeout(() => {
                this.imgSlider();
            }, 0);
        }, 3000);
    },
    methods: {
        changeCardShowType(type){
            this.cardShowType = type;
            localStorage.setItem('cardShowType', type)
        },
        showMoreProducts(count) {
            this.loadingProducts = true;
            setTimeout(() => {
                this.products = [...this.products, ...this.productsLoad.splice(0, count)];
                this.loadingProducts = false;
                setTimeout(() => {
                    this.imgSlider();
                }, 0);
            }, 3000);
        },
        imgSlider() {
            let imgSlidersArray,
            sliderArea,
            imageWrap;
            imgSlidersArray = Array.from(document.querySelectorAll('.card-img-slider'));
            let notEmptyImgSlidersArray = !!imgSlidersArray.length
            if (notEmptyImgSlidersArray){
                imgSlidersArray.forEach(imgSliderItem => {
                    if (!!imgSliderItem && imgSliderItem.hasChildNodes() && !imgSliderItem.classList.contains('card-img-slider_activated')){
                        sliderArea = document.createElement('div');
                        sliderArea.className = 'card-img-slider__area';
                        imageWrap = document.createElement('div');
                        imageWrap.className = 'card-img-slider__images';

                        Array.from(imgSliderItem.children).forEach(img => {
                            sliderArea.appendChild(document.createElement('div'));
                            imageWrap.appendChild(img.cloneNode());
                            img.remove();
                        })
                        if (sliderArea.childElementCount > 1) {
                            sliderArea.firstChild.classList.add('active');
                            imgSliderItem.appendChild(sliderArea);
                        }
                        imgSliderItem.appendChild(imageWrap);
                        sliderArea = null;
                        imageWrap = null
                        imgSliderItem.classList.add('card-img-slider_activated')
                    }
                });
                window.addEventListener("mousemove", (e) => {
                    imgSlidersArray.forEach(imgSliderItem => {
                        if (!!imgSliderItem && imgSliderItem.hasChildNodes()){
                            if (imgSliderItem.contains(e.target)) {
                                let idTarget = -1;
                                Array.from(imgSliderItem.children).forEach(sliderChildren => {
                                    let hasSliderChildren = !!sliderChildren;
                                    if (hasSliderChildren){
                                        if (sliderChildren.classList.contains('card-img-slider__area')) {
                                            Array.from(sliderChildren.children).forEach((areaChildren, id) => {
                                                areaChildren.classList.remove('active');
                                                if (areaChildren == e.target) {
                                                    areaChildren.classList.add('active');
                                                    idTarget = id;
                                                }
                                            });
                                        }
                                        if (sliderChildren.classList.contains('card-img-slider__images') && (idTarget > -1)) {
                                            Array.from(sliderChildren.children).forEach((img, id) => {
                                                img.style.display = 'none'
                                                if (idTarget == id) {
                                                    img.style.display = 'block';
                                                }
                                            });
                                        }
                                    }
                                });
                                idTarget = null;
                            }
                        }
                    })
                })
            }
        }
    },
}
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
<style lang="scss">
@import './sass/base/icons.css';
@import './sass/components/catalog';
</style>
