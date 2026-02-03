<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-background py-20 md:py-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="section-title mb-4 text-text-pretty">Timeless Elegance Meets Modern Design</h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Discover our curated collection of premium handbags, crafted with the finest materials and attention to detail.</p>
        <button @click="shopNow" class="btn-primary">Shop Now</button>
      </div>
    </section>

    <!-- Products Section -->
    <section ref="productsSection" class="px-4 sm:px-6 lg:px-8 py-16">
      <h3 class="section-title mb-8 text-center">Featured Collection</h3>
      
      <!-- Products Grid -->
      <div class="w-full">
        <!-- Sort & Results -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-muted">
          <p class="text-sm text-gray-600">{{ displayedProducts.length }} products</p>
          <select v-model="selectedSort" class="w-full sm:w-auto text-sm border border-muted rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <!-- No Results Message -->
        <div v-if="displayedProducts.length === 0" class="text-center py-12">
          <p class="text-gray-600 mb-4">No products found matching your filters.</p>
          <button @click="resetFilters" class="btn-primary">Reset Filters</button>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <article v-for="product in displayedProducts" :key="product.id" class="product-card group cursor-pointer">
            <!-- Product Image with Badge -->
            <div class="relative overflow-hidden bg-muted aspect-square rounded-lg">
              <router-link :to="`/product/${product.id}`" class="block w-full h-full">
                <template v-if="product.video">
                  <video :src="product.video" autoplay muted playsinline loop :poster="product.image" controls class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"></video>
                </template>
                <template v-else>
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </template>
              </router-link>
            </div>
            
            <div class="p-4">
              <p class="text-xs uppercase tracking-widest text-accent mb-2">{{ product.category }}</p>
              <router-link :to="`/product/${product.id}`">
                <h4 class="text-lg font-serif font-bold mb-2 hover:text-accent transition">{{ product.name }}</h4>
              </router-link>
              
              <!-- Rating -->
              <div class="flex items-center gap-2 mb-3">
                <div class="flex text-accent text-sm">
                  <span v-for="i in 5" :key="i" :class="i <= Math.round(product.rating) ? 'text-accent' : 'text-gray-300'">★</span>
                </div>
                <span class="text-xs text-gray-600">({{ product.reviews }})</span>
              </div>

              <p class="text-sm text-gray-600 mb-4">{{ product.color }}</p>
              
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <span class="text-2xl font-serif font-bold text-foreground">₦{{ product.price }}</span>
                </div>
                <button 
                  @click="addToCart(product)" 
                  class="bg-accent text-white p-2 rounded transition hover:bg-opacity-90"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-primary text-white py-16 mt-20">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 class="section-title text-white mb-4">Subscribe to Our Newsletter</h3>
        <p class="text-gray-300 mb-8">Get exclusive updates on new arrivals and special offers.</p>
        <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            v-model="email"
            type="email" 
            placeholder="Enter your email" 
            required 
            class="flex-grow px-4 py-3 rounded text-foreground focus:outline-none focus:ring-2 focus:ring-accent" 
          />
          <button type="submit" class="btn-primary bg-accent text-foreground hover:bg-opacity-90">Subscribe</button>
        </form>
        <p v-if="subscriptionMessage" class="text-sm text-green-300 mt-3">{{ subscriptionMessage }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '../composables/useStore'

const productsSection = ref(null)
const email = ref('')
const subscriptionMessage = ref('')

const { 
  addToCart, 
  getCategories, 
  filteredProducts,
  searchQuery,
  selectedCategory,
  priceRange,
  selectedSort,
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setSelectedSort,
} = useStore()

const displayedProducts = computed(() => {
  return filteredProducts.value
})

const shopNow = () => {
  if (productsSection.value) {
    productsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleSubscribe = () => {
  if (email.value) {
    subscriptionMessage.value = 'Thank you for subscribing! Check your email.'
    email.value = ''
    setTimeout(() => {
      subscriptionMessage.value = ''
    }, 3000)
  }
}

const resetFilters = () => {
  setSearchQuery('')
  setSelectedCategory('All')
  setPriceRange([0, 20000])
}
// Watch for external changes
const handleSearchQuery = (value) => setSearchQuery(value)
const handleCategory = (value) => setSelectedCategory(value)
const handlePriceRange = (value) => setPriceRange(value)
const handleSort = (value) => setSelectedSort(value)
</script>
