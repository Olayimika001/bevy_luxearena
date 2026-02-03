<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Breadcrumb -->
    <nav class="mb-8 text-sm text-gray-600">
      <router-link to="/" class="hover:text-accent transition">Shop</router-link>
      <span class="mx-2">/</span>
      <router-link :to="`/?category=${product.category}`" class="hover:text-accent transition">{{ product.category }}</router-link>
      <span class="mx-2">/</span>
      <span>{{ product.name }}</span>
    </nav>

    <!-- Product Details -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-16">
      <!-- Image Gallery -->
      <div class="bg-muted rounded-lg overflow-hidden aspect-square">
        <template v-if="product.video">
          <video :src="product.video" autoplay muted playsinline controls :poster="product.image" class="w-full h-full object-cover"></video>
        </template>
        <template v-else>
          <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
        </template>
      </div>

      <!-- Details -->
      <div class="flex flex-col">
        <p class="text-xs uppercase tracking-widest text-accent mb-4">{{ product.category }}</p>
        <h1 class="text-3xl sm:text-4xl font-serif font-bold mb-4">{{ product.name }}</h1>
        
        <!-- Price and Stock -->
        <div class="flex items-center gap-4 mb-6">
          <div>
            <span class="text-3xl font-serif font-bold">₦{{ product.price }}</span>
          </div>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-4 mb-6">
          <div class="flex text-accent text-lg">
            <span v-for="i in 5" :key="i" :class="i <= Math.round(product.rating) ? 'text-accent' : 'text-gray-300'">★</span>
          </div>
          <span class="text-sm text-gray-600">({{ product.reviews }} reviews)</span>
          <span class="text-sm text-green-600 font-bold">In Stock</span>
        </div>

        <p class="text-gray-600 mb-8 leading-relaxed">{{ product.description }}</p>

        <!-- Specifications -->
        <div class="space-y-3 mb-8 pb-8 border-b border-muted">
          <div class="flex justify-between">
            <span class="font-bold">Material:</span>
            <span>{{ product.material }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-bold">Color:</span>
            <span>{{ product.color }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-bold">Dimensions:</span>
            <span>{{ product.dimensions }}</span>
          </div>
        </div>

        <!-- Quantity & Add to Cart -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="flex items-center border border-muted rounded w-full sm:w-auto">
            <button @click="quantity > 1 ? quantity-- : null" class="px-4 py-2 hover:bg-muted transition">−</button>
            <input type="number" v-model.number="quantity" min="1" class="w-12 text-center border-0 focus:outline-none focus:ring-0" />
            <button @click="quantity++" class="px-4 py-2 hover:bg-muted transition">+</button>
          </div>
          <button 
            @click="handleAddToCart" 
            class="btn-primary flex-grow sm:flex-grow-0"
          >
            Add to Cart
          </button>
          <button 
            @click="toggleWishlist"
            :class="['px-6 py-3 rounded border border-muted hover:bg-muted transition', isWishlisted && 'bg-red-50 border-red-300']"
            title="Add to Wishlist"
          >
            <svg class="w-6 h-6" :fill="isWishlisted ? 'red' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <button class="btn-secondary w-full mb-8">Ask a Question</button>

        <!-- Additional Info -->
        <div class="space-y-4 text-sm text-gray-600">
          <div class="flex gap-2">
            <svg class="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>30-day returns on all orders</span>
          </div>
          <div class="flex gap-2">
            <svg class="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Lifetime quality guarantee</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <section class="border-t border-muted pt-16">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Review Stats -->
        <div class="md:col-span-1">
          <h3 class="font-serif font-bold text-lg mb-6">Customer Reviews</h3>
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-3xl font-serif font-bold">{{ product.rating }}</span>
              <div class="flex text-accent">
                <span v-for="i in 5" :key="i" :class="i <= Math.round(product.rating) ? 'text-accent' : 'text-gray-300'">★</span>
              </div>
            </div>
            <p class="text-sm text-gray-600">Based on {{ product.reviews }} reviews</p>
          </div>
        </div>

        <!-- Review Form -->
        <div class="md:col-span-2">
          <h4 class="font-serif font-bold text-lg mb-4">Leave a Review</h4>
          <form @submit.prevent="submitReview" class="space-y-4">
            <div>
              <label class="block text-sm font-bold mb-2">Name</label>
              <input v-model="reviewForm.name" type="text" required class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>

            <div>
              <label class="block text-sm font-bold mb-2">Rating</label>
              <div class="flex gap-2">
                <button 
                  v-for="i in 5" 
                  :key="i"
                  type="button"
                  @click="reviewForm.rating = i"
                  class="text-3xl transition"
                  :class="i <= reviewForm.rating ? 'text-accent' : 'text-gray-300'"
                >
                  ★
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold mb-2">Comment</label>
              <textarea v-model="reviewForm.comment" required rows="4" class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
            </div>

            <button type="submit" class="btn-primary">Submit Review</button>
          </form>
        </div>
      </div>

      <!-- Review List -->
      <div v-if="displayedReviews.length > 0" class="mt-12">
        <h4 class="font-serif font-bold text-lg mb-6">Recent Reviews</h4>
        <div class="space-y-6">
          <div v-for="review in displayedReviews" :key="review.id" class="border border-muted rounded p-6">
            <div class="flex justify-between items-start mb-2">
              <span class="font-bold">{{ review.name }}</span>
              <div class="flex text-accent text-sm">
                <span v-for="i in 5" :key="i" :class="i <= review.rating ? 'text-accent' : 'text-gray-300'">★</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-2">{{ formatDate(review.date) }}</p>
            <p class="text-gray-700">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Products -->
    <section class="mt-20 pt-12 border-t border-muted">
      <h3 class="section-title mb-8">You May Also Like</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <article v-for="item in relatedProducts" :key="item.id" class="product-card group">
            <div class="relative overflow-hidden bg-muted aspect-square rounded-lg">
            <router-link :to="`/product/${item.id}`" class="block w-full h-full">
              <template v-if="item.video">
                <video :src="item.video" controls class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </template>
              <template v-else>
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </template>
            </router-link>
          </div>
          <div class="p-4">
            <p class="text-xs uppercase tracking-widest text-accent mb-2">{{ item.category }}</p>
            <router-link :to="`/product/${item.id}`">
              <h4 class="text-base font-serif font-bold mb-2 hover:text-accent transition">{{ item.name }}</h4>
            </router-link>
            <div class="flex justify-between items-center">
              <p class="font-bold">₦{{ item.price }}</p>
              <button 
                @click="addToCart(item)" 
                class="bg-accent text-white p-2 rounded hover:bg-opacity-90 transition"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <p class="text-center text-gray-600">Product not found</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../composables/useStore'

const route = useRoute()
const { products, addToCart: storeAddToCart } = useStore()
const quantity = ref(1)
const isWishlisted = ref(false)
const reviews = ref([
  { id: 1, name: 'Sarah M.', rating: 5, comment: 'Absolutely love this bag! Quality is exceptional.', date: new Date('2024-01-15') },
  { id: 2, name: 'John D.', rating: 4, comment: 'Great bag, very durable. Arrived quickly.', date: new Date('2024-01-10') },
])
const reviewForm = ref({
  name: '',
  rating: 5,
  comment: ''
})

const product = computed(() => {
  return products.find(p => p.id === parseInt(route.params.id))
})

const relatedProducts = computed(() => {
  return products.filter(p => p.category === product.value?.category && p.id !== product.value?.id).slice(0, 4)
})

const displayedReviews = computed(() => {
  return reviews.value.sort((a, b) => b.date - a.date)
})

const handleAddToCart = () => {
  if (product.value) {
    for (let i = 0; i < quantity.value; i++) {
      storeAddToCart(product.value)
    }
    quantity.value = 1
    alert('Added to cart!')
  }
}

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
}

const submitReview = () => {
  if (reviewForm.value.name && reviewForm.value.comment) {
    reviews.value.push({
      id: reviews.value.length + 1,
      name: reviewForm.value.name,
      rating: reviewForm.value.rating,
      comment: reviewForm.value.comment,
      date: new Date()
    })
    reviewForm.value = { name: '', rating: 5, comment: '' }
    alert('Thank you for your review!')
  }
}

const formatDate = (date) => {
  if (typeof date === 'string') date = new Date(date)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
