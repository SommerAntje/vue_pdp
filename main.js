var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        altText: 'a pair of socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        inventory: 8,
        onSale: true,
        inStock: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantID: 2234,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green-onWhite.jpg'
            },
            {
                variantID: 2235,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue-onWhite.jpg'
            }
        ],
        cart: 0
    },
        methods: {
            addToCart() {
                this.cart += 1
            },
            updateProduct(variantImage) {
                this.image = variantImage
            }
        }
})