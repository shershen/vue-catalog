<template>
    <div class="catalog-card">
        <a :href="'/products/' + product.id" class="catalog-card__photo">
            <div class="catalog-card__slider card-img-slider">
                <template v-if="!!product.images && !!product.images.length">
                <img v-for="(img, id) in product.images" :src="img" :key="id" :alt="'фото ' + product.name + ' #' + id" />
                </template>
                <img v-else src="../assets/empty-product.jpg" alt="Нет фото" />
            </div>
            <button class="button catalog-card__btn-favorite" :class="{'button catalog-card__btn-favorite_active': product.favorite}" @click.prevent.stop="changeFavorite()"><span class="icon-star"></span></button>
        </a>
        <div class="catalog-card__info-stock">
            <div class="catalog-card__state">
                <span v-if="product.isUsed">Б/У</span>
                <span v-else>Новая</span>
            </div>
            <div v-if="parseInt(product.amount) > 0" class="catalog-card__stock catalog-card__stock_lot">В наличии:</div>
            <div v-else class="catalog-card__stock">Под заказ</div>
            <div v-if="parseInt(product.amount) > 0" class="catalog-card__amount">{{product.amount}}шт.</div>
        </div>

        <div class="catalog-card__info">
            <div class="catalog-card__code">
                <div class="catalog-card__code-title">Артикул:</div>
                <div class="catalog-card__code-value">{{product.article}}</div>
            </div>
            <a :href="'/products/' + product.id" class="catalog-card__name">{{product.name}}</a>
        </div>
        <div v-if="false" class="catalog-card__mode">
            BMW
        </div>
        <div class="catalog-card__shope-info">
            <template v-if="product.storeName">
            <div class="catalog-card__shope-name"><span class="icon-shop"></span><a :href="'/stores/' + product.clientId + '/search'" class="catalog-card__shope-name-value">{{product.storeName}}</a></div>
            </template>
            <div v-if="!!product.storeCity || !!product.storeAddress" class="catalog-card__shope-address"><span class="icon-map-pic"></span><div class="catalog-card__shope-address-value">{{product.storeCity}}<template v-if="!!product.storeCity && !!product.storeAddress">,</template> {{product.storeAddress}}</div></div>
        </div>
        <div class="catalog-card__action-block">
            <div class="catalog-card__price">
                <div v-if="false" class="catalog-card__price-old-block"><span class="catalog-card__price-old">{{formatPrice(product.priceSelling + product.priceSelling * 0.2)}}&#x20bd;</span><div class="catalog-card__discount-percent">-20%</div></div>
                <div class="catalog-card__price-total">{{formatPrice(product.priceSelling)}} &#x20bd;</div>
            </div>
            <div class="catalog-card__order-block">
                <div v-if="false" class="catalog-card__count count">
                    <button class="button count__btn count__btn_plus" @click="changeCount(1)">+</button>
                    <button class="button count__btn count__btn_minus" @click="changeCount(-1)">-</button>
                    <input v-model="count" class="count__input" />
                </div>
                <a :href="'/products/' + product.id" class="button button-secondary catalog-card__btn-order">Заказать</a>
            </div>
        </div>
    </div>
</template>

<script>
import { formatPrice } from '../service/functions';

export default {
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            count: 1,
            formatPrice
        }
    },
    computed: {},
    methods: {
        changeCount(n) {
            if ((n < 0 && this.count > 0) || n > 0) this.count = this.count + n;
        },
        changeFavorite() {
            this.product.favorite = !this.product.favorite;
        }
    }
}
</script>