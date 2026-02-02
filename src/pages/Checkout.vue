<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="section-title mb-8">Checkout</h1>

    <div v-if="cart.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      <!-- Checkout Form -->
      <form @submit.prevent="handleSubmit" class="lg:col-span-2 space-y-6 sm:space-y-8">
        <!-- Shipping Information -->
        <section class="bg-white rounded-lg p-4 sm:p-6 border border-muted">
          <h2 class="font-serif font-bold text-lg sm:text-xl mb-6">Shipping Information</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-bold mb-2">First Name *</label>
              <input 
                v-model="form.firstName" 
                type="text" 
                required 
                class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2">Last Name *</label>
              <input 
                v-model="form.lastName" 
                type="text" 
                required 
                class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
              />
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Email *</label>
            <input 
              v-model="form.email" 
              type="email" 
              required 
              class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Phone Number *</label>
            <input 
              v-model="form.phone" 
              type="tel" 
              required 
              class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Street Address *</label>
            <input 
              v-model="form.address" 
              type="text" 
              required 
              class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-bold mb-2">City *</label>
              <input 
                v-model="form.city" 
                type="text" 
                required 
                class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2">State/Province *</label>
              <input 
                v-model="form.state" 
                type="text" 
                required 
                class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2">ZIP/Postal Code *</label>
              <input 
                v-model="form.zip" 
                type="text" 
                required 
                class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
              />
            </div>
          </div>
        </section>

        <!-- Shipping Method -->
        <section class="bg-white rounded-lg p-4 sm:p-6 border border-muted">
          <h2 class="font-serif font-bold text-lg sm:text-xl mb-6">Shipping Method</h2>
          
          <div class="space-y-3">
            <label class="flex items-center p-4 border border-muted rounded cursor-pointer hover:bg-muted transition" :class="form.shipping === 'standard' && 'bg-blue-50 border-blue-300'">
              <input v-model="form.shipping" type="radio" value="standard" class="mr-3" />
              <div class="flex-grow">
                <p class="font-bold">Standard Shipping (5-7 business days)</p>
                <p class="text-sm text-gray-600">₦9.99</p>
              </div>
            </label>
            <label class="flex items-center p-4 border border-muted rounded cursor-pointer hover:bg-muted transition" :class="form.shipping === 'express' && 'bg-blue-50 border-blue-300'">
              <input v-model="form.shipping" type="radio" value="express" class="mr-3" />
              <div class="flex-grow">
                <p class="font-bold">Express Shipping (2-3 business days)</p>
                <p class="text-sm text-gray-600">₦24.99</p>
              </div>
            </label>
            <label class="flex items-center p-4 border border-muted rounded cursor-pointer hover:bg-muted transition" :class="form.shipping === 'overnight' && 'bg-blue-50 border-blue-300'">
              <input v-model="form.shipping" type="radio" value="overnight" class="mr-3" />
              <div class="flex-grow">
                <p class="font-bold">Overnight Shipping</p>
                <p class="text-sm text-gray-600">₦49.99</p>
              </div>
            </label>
          </div>
        </section>

        <!-- Payment Information -->
        <section class="bg-white rounded-lg p-4 sm:p-6 border border-muted">
          <h2 class="font-serif font-bold text-lg sm:text-xl mb-6">Payment Method</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <label class="flex items-center p-4 border border-muted rounded cursor-pointer hover:bg-muted transition" :class="form.paymentMethod === 'card' && 'bg-blue-50 border-blue-300'">
              <input v-model="form.paymentMethod" type="radio" value="card" class="mr-3" />
              <span class="font-bold text-sm">Credit/Debit Card</span>
            </label>
            <label class="flex items-center p-4 border border-muted rounded cursor-pointer hover:bg-muted transition" :class="form.paymentMethod === 'paypal' && 'bg-blue-50 border-blue-300'">
              <input v-model="form.paymentMethod" type="radio" value="paypal" class="mr-3" />
              <span class="font-bold text-sm">PayPal</span>
            </label>
          </div>

          <!-- Credit Card Form -->
          <div v-if="form.paymentMethod === 'card'" class="space-y-4">
            <div>
              <label class="block text-sm font-bold mb-2">Cardholder Name *</label>
              <input 
                v-model="form.cardName" 
                type="text" 
                required 
                class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
              />
            </div>

            <div>
              <label class="block text-sm font-bold mb-2">Card Number *</label>
              <input 
                v-model="form.cardNumber" 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                required 
                maxlength="19"
                @input="formatCardNumber"
                class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold mb-2">Expiry Date (MM/YY) *</label>
                <input 
                  v-model="form.expiry" 
                  type="text" 
                  placeholder="12/25" 
                  required 
                  maxlength="5"
                  @input="formatExpiry"
                  class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
                />
              </div>
              <div>
                <label class="block text-sm font-bold mb-2">CVV *</label>
                <input 
                  v-model="form.cvv" 
                  type="text" 
                  placeholder="123" 
                  required 
                  maxlength="3"
                  class="w-full border border-muted rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" 
                />
              </div>
            </div>

            <!-- Billing Address Check -->
            <label class="flex items-center">
              <input v-model="form.sameAsShipping" type="checkbox" class="mr-3" />
              <span class="text-sm">Billing address is same as shipping</span>
            </label>
          </div>

          <!-- PayPal Notice -->
          <div v-else class="bg-blue-50 border border-blue-200 rounded p-4">
            <p class="text-sm text-blue-800">You will be redirected to PayPal to complete your payment securely.</p>
          </div>
        </section>

        <!-- Terms and Conditions -->
        <div class="bg-gray-50 rounded-lg p-4 border border-muted">
          <label class="flex items-start cursor-pointer">
            <input v-model="form.termsAccepted" type="checkbox" class="mr-3 mt-1" required />
            <span class="text-sm">
              I agree to the 
              <a href="#" class="text-accent hover:underline">Terms and Conditions</a> and 
              <a href="#" class="text-accent hover:underline">Privacy Policy</a>
            </span>
          </label>
        </div>

        <button 
          type="submit" 
          :disabled="!form.termsAccepted"
          :class="['btn-primary w-full text-sm sm:text-base py-2 sm:py-3', !form.termsAccepted && 'opacity-50 cursor-not-allowed']"
        >
          Complete Purchase - ₦{{ finalTotal.toFixed(2) }}
        </button>

        <p class="text-xs text-center text-gray-600">
          Your payment is secure and encrypted. We never store your full card details.
        </p>
      </form>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-muted rounded-lg p-4 sm:p-6 sticky top-4">
          <h3 class="font-serif font-bold text-lg mb-6">Order Summary</h3>

          <!-- Cart Items Preview -->
          <div class="space-y-3 mb-6 pb-6 border-b border-gray-300 max-h-48 sm:max-h-64 overflow-y-auto">
            <div v-for="item in cart" :key="item.id" class="flex justify-between text-sm">
              <div>
                <p class="font-bold">{{ item.name }}</p>
                <p class="text-xs text-gray-600">Qty: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold">₦{{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <!-- Totals -->
          <div class="space-y-4 mb-6 pb-6 border-b border-gray-300">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-bold">₦{{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span class="font-bold">{{ shippingCost > 0 ? '₦' + shippingCost.toFixed(2) : 'FREE' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tax</span>
              <span class="font-bold">₦{{ tax.toFixed(2) }}</span>
            </div>
          </div>

          <div class="flex justify-between mb-6">
            <span class="font-serif font-bold text-lg">Total</span>
            <span class="font-serif font-bold text-2xl">₦{{ finalTotal.toFixed(2) }}</span>
          </div>

          <!-- Security Info -->
          <div class="space-y-2 text-xs text-gray-600 pt-4 border-t border-gray-300">
            <p class="flex items-center gap-2">
              <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              SSL Secured
            </p>
            <p class="flex items-center gap-2">
              <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              30-day Returns
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty Cart Message -->
    <div v-else class="text-center py-12">
      <p class="text-gray-600 mb-6">Your cart is empty. Add items before checkout.</p>
      <router-link to="/" class="btn-primary">Continue Shopping</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../composables/useStore'

const router = useRouter()
const { cart, cartTotal, clearCart } = useStore()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  shipping: 'standard',
  paymentMethod: 'card',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  sameAsShipping: true,
  termsAccepted: false,
})

const shippingCosts = {
  standard: 9.99,
  express: 24.99,
  overnight: 49.99,
}

const shippingCost = computed(() => {
  return shippingCosts[form.value.shipping] || 9.99
})

const tax = computed(() => {
  return (cartTotal.value + shippingCost.value) * 0.08
})

const finalTotal = computed(() => {
  return cartTotal.value + shippingCost.value + tax.value
})

const formatCardNumber = () => {
  form.value.cardNumber = form.value.cardNumber
    .replace(/\s/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()
}

const formatExpiry = () => {
  const value = form.value.expiry.replace(/\D/g, '')
  if (value.length >= 2) {
    form.value.expiry = value.substring(0, 2) + '/' + value.substring(2, 4)
  } else {
    form.value.expiry = value
  }
}

const handleSubmit = () => {
  // Validate form
  if (!form.value.termsAccepted) {
    alert('Please accept the terms and conditions')
    return
  }

  // Simulate order processing
  const orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase()
  
  alert(`Order placed successfully!\n\nOrder Number: ${orderNumber}\nOrder Total: ₦${finalTotal.value.toFixed(2)}\n\nThank you for your purchase!\n\nA confirmation email has been sent to ${form.value.email}`)
  
  clearCart()
  router.push('/')
}
</script>
