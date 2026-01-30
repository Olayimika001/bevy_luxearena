<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-background py-20 md:py-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="section-title mb-4 text-text-pretty">Timeless Elegance Meets Modern Design</h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Discover our curated collection of premium handbags, crafted with the finest materials and attention to detail.</p>
        <button class="btn-primary" @click="scrollToShop">Shop Now</button>
      </div>
    </section>

    <!-- Products Section -->
    <section class=" px-4 sm:px-6 lg:px-8 py-16" >
      <h3 class="section-title mb-8 text-center">Featured Collection</h3>
      
      <div class="">
        <!-- Sidebar Filters -->
        

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Sort & Results -->
          <div class="flex justify-between items-center mb-8 pb-4 border-b border-muted">
            <p class="text-sm text-gray-600">{{ displayedProducts.length }} products</p>
            <select v-model="selectedSort" class="text-sm border border-muted rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
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
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <article v-for="product in displayedProducts" :key="product.id" class="product-card group cursor-pointer">
              <!-- Product Image with Badge -->
              <div class="relative overflow-hidden bg-muted aspect-square rounded-lg">
                <router-link :to="`/product/${product.id}`" class="block w-full h-full">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </router-link>
                
                <!-- Stock Badge -->
                <div v-if="!product.inStock" class="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">
                  Out of Stock
                </div>

                <!-- Discount Badge -->
                <div v-else-if="product.discount > 0" class="absolute top-0 right-0 bg-accent text-white px-3 py-1 text-xs font-bold">
                  -{{ product.discount }}%
                </div>
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
                    <span class="text-2xl font-serif font-bold text-foreground">${{ (product.price * (1 - product.discount / 100)).toFixed(2) }}</span>
                    <span v-if="product.discount > 0" class="text-sm line-through text-gray-500">${{ product.price }}</span>
                  </div>
                  <button 
                    @click="addToCart(product)" 
                    :disabled="!product.inStock"
                    :class="['bg-accent text-white p-2 rounded transition', !product.inStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90']"
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
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-primary text-white py-16 mt-20">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 class="section-title text-white mb-4">Subscribe to Our Newsletter</h3>
        <p class="text-gray-300 mb-8">Get exclusive updates on new arrivals and special offers.</p>
        <form @submit.prevent="handleSubscribe" class="flex gap-2 max-w-md mx-auto">
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

const shopSection = ref(null)
const email = ref('')
const subscriptionMessage = ref('')
const showInStockOnly = ref(false)

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
  let products = filteredProducts.value
  if (showInStockOnly.value) {
    products = products.filter(p => p.inStock)
  }
  return products
})

const scrollToShop = () => {
  if (shopSection.value) {
    shopSection.value.scrollIntoView({ behavior: 'smooth' })
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
  showInStockOnly.value = false
}

// Watch for external changes
const handleSearchQuery = (value) => setSearchQuery(value)
const handleCategory = (value) => setSelectedCategory(value)
const handlePriceRange = (value) => setPriceRange(value)
const handleSort = (value) => setSelectedSort(value)
</script>
