<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="section-title mb-8">Shopping Cart</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div v-if="cart.length > 0" class="space-y-4">
          <!-- Cart Stats -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p class="text-sm text-blue-800">
              You have <strong>{{ cartCount }}</strong> item{{ cartCount !== 1 ? 's' : '' }} in your cart
            </p>
          </div>

          <article v-for="item in cart" :key="item.id" class="bg-white rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 border border-muted hover:shadow-lg transition">
            <!-- Product Image -->
            <router-link :to="`/product/${item.id}`" class="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded overflow-hidden">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover hover:scale-110 transition-transform" />
            </router-link>

            <!-- Product Info -->
            <div class="flex-grow min-w-0">
              <router-link :to="`/product/${item.id}`" class="font-serif font-bold text-base sm:text-lg hover:text-accent transition mb-1 block truncate">
                {{ item.name }}
              </router-link>
              <p class="text-sm text-gray-600 mb-2">{{ item.color }}</p>
              <p class="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-1">{{ item.material }}</p>
              
              <!-- Stock Status -->
              <span class="text-xs text-green-600 font-bold">✓ In Stock</span>
            </div>

            <!-- Quantity & Price -->
            <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
              <div class="text-right">
                <span class="font-serif font-bold text-base sm:text-lg">₦{{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
              
              <div class="flex items-center border border-muted rounded">
                <button @click="updateQuantity(item.id, item.quantity - 1)" class="px-2 sm:px-3 py-1 hover:bg-muted transition">−</button>
                <span class="px-3 sm:px-4 py-1 text-sm">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.id, item.quantity + 1)" class="px-2 sm:px-3 py-1 hover:bg-muted transition">+</button>
              </div>

              <button @click="removeFromCart(item.id)" class="text-xs sm:text-sm text-red-600 hover:text-red-700 transition whitespace-nowrap">
                Remove
              </button>
            </div>
          </article>

          <!-- Continue Shopping & Clear Cart -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8 pt-8 border-t border-muted">
            <router-link to="/" class="text-accent hover:text-foreground transition flex items-center gap-2">
              ← Continue Shopping
            </router-link>
            <button @click="handleClearCart" class="text-sm text-gray-600 hover:text-red-600 transition">
              Clear Cart
            </button>
          </div>
        </div>

        <!-- Empty Cart -->
        <div v-else class="text-center py-12">
          <svg class="w-12 sm:w-16 h-12 sm:h-16 mx-auto text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p class="text-gray-600 mb-6">Your cart is empty</p>
          <router-link to="/" class="btn-primary">Continue Shopping</router-link>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-muted rounded-lg p-4 sm:p-6 sticky top-4">
          <h3 class="font-serif font-bold text-lg mb-6">Order Summary</h3>

          <div class="space-y-4 mb-6 pb-6 border-b border-gray-300">
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm sm:text-base">Subtotal</span>
              <span class="font-bold">₦{{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm sm:text-base">Shipping</span>
              <span class="font-bold">₦{{ shippingCost.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm sm:text-base">Tax</span>
              <span class="font-bold">₦{{ tax.toFixed(2) }}</span>
            </div>
          </div>

          <div class="flex justify-between mb-6">
            <span class="font-serif font-bold text-lg">Total</span>
            <span class="font-serif font-bold text-xl sm:text-2xl">₦{{ finalTotal.toFixed(2) }}</span>
          </div>

          <router-link 
            to="/checkout" 
            :class="['btn-primary w-full text-center block text-sm sm:text-base py-2 sm:py-3', !cart.length && 'opacity-50 cursor-not-allowed pointer-events-none']"
          >
            Proceed to Checkout
          </router-link>

          <!-- Additional Info -->
          <div class="mt-6 pt-6 border-t border-gray-300 space-y-2 text-xs text-gray-600">
            <p>✓ Secure checkout</p>
            <p>✓ 30-day returns</p>
          </div>

          <!-- Promo Code -->
          <div v-if="cart.length > 0" class="mt-6 pt-6 border-t border-gray-300">
            <label class="block text-sm font-bold mb-2">Promo Code</label>
            <div class="flex gap-2 flex-col sm:flex-row">
              <input 
                v-model="promoCode" 
                type="text" 
                placeholder="Enter code" 
                class="flex-grow border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button 
                @click="applyPromoCode"
                class="px-3 sm:px-4 py-2 bg-accent text-white rounded text-sm hover:bg-opacity-90 transition whitespace-nowrap"
              >
                Apply
              </button>
            </div>
            <p v-if="promoMessage" :class="['text-xs mt-2', promoValid ? 'text-green-600' : 'text-red-600']">
              {{ promoMessage }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '../composables/useStore'

const { cart, cartTotal, removeFromCart, updateQuantity, cartCount, clearCart } = useStore()
const promoCode = ref('')
const promoMessage = ref('')
const promoValid = ref(false)
const appliedDiscount = ref(0)

const shippingCost = ref(9.99)

const tax = computed(() => {
  return (cartTotal.value + shippingCost.value) * 0.08
})

const finalTotal = computed(() => {
  return cartTotal.value + shippingCost.value + tax.value - appliedDiscount.value
})

const handleClearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    clearCart()
  }
}

const applyPromoCode = () => {
  const code = promoCode.value.toUpperCase()
  
  // Mock promo codes
  const promoCodes = {
    'WELCOME10': 0.10,
    'SAVE20': 0.20,
    'LUXE15': 0.15
  }

  if (promoCodes[code]) {
    appliedDiscount.value = cartTotal.value * promoCodes[code]
    promoValid.value = true
    promoMessage.value = `Promo code applied! You saved ₦${appliedDiscount.value.toFixed(2)}`
  } else {
    appliedDiscount.value = 0
    promoValid.value = false
    promoMessage.value = 'Invalid promo code'
  }
}
</script>
