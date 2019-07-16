var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        altText: 'a pair of socks',
        inventory: 8,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantID: 2234,
                variantColor: 'green'
            },
            {
                variantID: 2235,
                variantColor: 'blue'
            }
        ],
        cart: 0,
        methods: {
            addToCart() {
                this.cart += 1
            }
        }
    }
})