Vue.component('vc-product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image" v-bind:alt="altText" />
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p>Shipping: {{shipping}}</p>
                <p v-if="inStock > 10">In Stock</p>
                <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out</p>
                <p v-else>Out of Stock</p>
                <p>{{sale}}</p>
                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>
                <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box" :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)" @mouseleave="mouseleave">
                </div>
                <div class="cart ">
                    <p>Cart({{cart}})</p>
                </div>
                <button v-on:click="addToCart " :disabled="!inStock " :class="{disabledButton: !inStock} ">Add to cart</button>
            </div>
        </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            altText: 'a pair of socks',
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [{
                    variantID: 2234,
                    variantColor: 'green',
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10,
                    variantSale: true
                },
                {
                    variantID: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0,
                    variantSale: false
                },
            ],
            onSale: true,
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        mouseleave() {
            this.selectedVariant = 0
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.variants[this.selectedVariant].variantSale == this.onSale) {
                return this.variants[this.selectedVariant].variantColor + ' ' + this.brand + ' ' + this.product + ' are on sale!'
            }
            return this.variants[this.selectedVariant].variantColor + ' ' + this.brand + ' ' + this.product + ' are not on sale!'
        },
        shipping() {
            if (!this.premium) {
                return "Free shipping"
            } else {
                return 2.99
            }
        }

    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})