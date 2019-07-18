var app = new Vue({
    el: '#app',
    data: {
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
        }
    }
})