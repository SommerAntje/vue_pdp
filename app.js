Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            reqired: true
        }
    },
    template: `<ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul> `
})

Vue.component('product-tabs', {
    template:`
        <div>
            <span class="tab" 
            :class="{activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" 
            @click="selectedTab = tab" 
            :key="index">{{ tab }}
            </span>
        </div>
    `,
    data () {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">

            <p class="error-box" v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
            </p>

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name" >
            </p>

            <p>
                 <label for="review">Review:</label>
                 <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                Would you recommend this product?
            </p>
                <label>Yes
                    <input type="radio" value="recommend: yes" v-model.value="recommend" />
                </label>
                <label>No
                     <input type="radio" value="recommend: no" v-model.value="recommend" />
                </label>
            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },   
    methods: {
        onSubmit() {
            this.errors = []
            if(this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name is required!") 
                if(!this.review) this.errors.push("Review is required!")
                if(!this.rating) this.errors.push("Rating is required!")
                if(!this.recommend) this.errors.push("Recommend is required!")
            }
        }
    }
})


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
                <p>User is premium: {{premium}}</p>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>{{sale}}</p>
                <product-details :details="details"></product-details>
                <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box" :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)" @mouseleave="mouseleave">
                </div>
                <button v-on:click="addToCart " :disabled="!inStock " :class="{disabledButton: !inStock} ">Add to cart</button>
                <button v-on:click="clearCart">Clear Cart</button>
            </div> 

            <product-tabs></product-tabs> 

            <div>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul v-else>
                    <li v-for="(review, index) in reviews" :key="index">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }} </p>
                        <p>{{ review.review }}</p>
                        <p>{{ review.recommend }}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>
        </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            altText: 'a pair of socks',
            reviews: [],
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
            onSale: true
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',  this.variants[this.selectedVariant].variantID)
        },
        clearCart() {
            this.$emit('clear-cart',  this.variants[this.selectedVariant].variantID)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        mouseleave() {
            this.selectedVariant = 0
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
            if (this.premium) {
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
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i=this.cart.length -1; i >= 0; i--) {
                if(this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})