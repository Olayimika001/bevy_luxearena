<template>
  <header class="bg-white border-b border-muted sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top Bar -->
      <!-- <div class="py-3 border-b border-gray-100 text-sm text-gray-600 flex justify-between items-center">
        <div class="flex gap-4 text-xs">
          <a href="#" class="hover:text-accent transition">Help</a>
          <a href="#" class="hover:text-accent transition">Return</a>
          <a href="#" class="hover:text-accent transition">Track Order</a>
        </div>
      </div> -->

      <!-- Main Header -->
      <div class="py-4 flex items-center justify-between gap-6">
        <!-- Logo -->
        <router-link to="/" class="flex items-center flex-shrink-0">
          <img src="/logo.png" alt="Store Logo" class="h-28 w-25 z-10" />
        </router-link>

        <!-- Search Bar (Hidden on Mobile) -->
        <div class="hidden md:flex flex-grow max-w-md">
          <div class="relative w-full">
            <input 
              v-model="searchInput"
              @keyup.enter="performSearch"
              @input="showSuggestions = true"
              type="text" 
              placeholder="Search for bags..." 
              class="w-full border border-muted rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            
            <!-- Search Suggestions -->
            <div v-if="showSuggestions && searchInput && filteredSuggestions.length > 0" class="absolute top-full left-0 right-0 bg-white border border-t-0 border-muted rounded-b shadow-lg max-h-64 overflow-y-auto">
              <button 
                v-for="product in filteredSuggestions" 
                :key="product.id"
                @click="selectProduct(product)"
                class="w-full text-left px-4 py-2 hover:bg-muted transition flex items-center gap-3"
              >
                <img :src="product.image" :alt="product.name" class="w-8 h-8 object-cover rounded" />
                <div class="flex-grow text-sm">
                  <p class="font-bold">{{ product.name }}</p>
                  <p class="text-xs text-gray-600">${{ product.price }}</p>
                </div>
              </button>
            </div>

            <button 
              @click="performSearch"
              class="bg-accent text-white px-4 py-2 rounded-r hover:bg-opacity-90 transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden lg:flex items-center gap-8">
          <router-link to="/" class="text-sm uppercase tracking-wide hover:text-accent transition">
            Shop
          </router-link>
          <a href="#" class="text-sm uppercase tracking-wide hover:text-accent transition">
            About
          </a>
          <a href="#" class="text-sm uppercase tracking-wide hover:text-accent transition">
            Contact
          </a>
        </nav>

        <!-- Right Icons -->
        <div class="flex items-center gap-6">
          <!-- Search Mobile -->
          <button @click="mobileSearchOpen = !mobileSearchOpen" class="lg:hidden">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Wishlist -->
          <button class="relative" title="Wishlist">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <!-- Cart -->
          <router-link to="/cart" class="relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0h1m-1 0a1 1 0 100 2 1 1 0 000-2m0 0a1 1 0 100 2 1 1 0 000-2m6-9a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {{ cartCount }}
            </span>
          </router-link>

          <!-- Menu Mobile -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search -->
      <div v-if="mobileSearchOpen" class="pb-4 lg:hidden">
        <input 
          v-model="searchInput"
          @keyup.enter="performSearch"
          type="text" 
          placeholder="Search for bags..." 
          class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <!-- Mobile Menu -->
      <nav v-if="mobileMenuOpen" class="pb-4 lg:hidden border-t border-muted space-y-2">
        <router-link to="/" class="block text-sm uppercase tracking-wide hover:text-accent transition py-2">
          Shop
        </router-link>
        <a href="#" class="block text-sm uppercase tracking-wide hover:text-accent transition py-2">
          About
        </a>
        <a href="#" class="block text-sm uppercase tracking-wide hover:text-accent transition py-2">
          Contact
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'

const router = useRouter()
const mobileMenuOpen = ref(false)
const mobileSearchOpen = ref(false)
const searchInput = ref('')
const showSuggestions = ref(false)

const { cartCount, products, setSearchQuery } = useStore()

const filteredSuggestions = computed(() => {
  if (!searchInput.value) return []
  const query = searchInput.value.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  ).slice(0, 5)
})

const performSearch = () => {
  if (searchInput.value) {
    setSearchQuery(searchInput.value)
    router.push('/')
    searchInput.value = ''
    showSuggestions.value = false
    mobileSearchOpen.value = false
  }
}

const selectProduct = (product) => {
  router.push(`/product/${product.id}`)
  searchInput.value = ''
  showSuggestions.value = false
  mobileSearchOpen.value = false
}
</script>
