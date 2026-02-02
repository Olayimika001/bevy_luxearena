<template>
  <footer class="bg-primary text-white mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
        <div>
          <img :src="logo" alt="Store Logo" class="h-20 sm:h-28 w-auto z-10 mb-2 sm:mb-4" />
          <p class="text-xs sm:text-sm text-gray-300">Crafted with care, designed for elegance.</p>
        </div>
        <div>
          <h4 class="font-bold text-xs sm:text-sm mb-3 sm:mb-4 uppercase">Shop</h4>
          <ul class="space-y-2 text-xs sm:text-sm text-gray-300">
            <li><a href="#" class="hover:text-accent transition">New Arrivals</a></li>
            <li><a href="#" class="hover:text-accent transition">Best Sellers</a></li>
            <li><a href="#" class="hover:text-accent transition">Sale</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-xs sm:text-sm mb-3 sm:mb-4 uppercase">Support</h4>
          <ul class="space-y-2 text-xs sm:text-sm text-gray-300">
            <li><a href="#" class="hover:text-accent transition">Contact Us</a></li>
            <li><a href="#" class="hover:text-accent transition">Shipping</a></li>
            <li><a href="#" class="hover:text-accent transition">Returns</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-xs sm:text-sm mb-3 sm:mb-4 uppercase">Company</h4>
          <ul class="space-y-2 text-xs sm:text-sm text-gray-300">
            <li><a href="#" class="hover:text-accent transition">About</a></li>
            <li><a href="#" class="hover:text-accent transition">Privacy</a></li>
            <li><a href="#" class="hover:text-accent transition">Terms</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2 text-xs sm:text-sm text-gray-400">
        <div class="flex items-center gap-4">
          <p class="m-0">&copy; 2026 bevy_luxearena. All rights reserved.</p>
          <a href="mailto:Mobolaji.familoyo@gmail.com" class="hover:text-accent transition">Mobolaji.familoyo@gmail.com</a>
        </div>
        <div class="flex gap-4">
          <a href="https://instagram.com/Luxe_accessories1" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition">Instagram</a>
          <a href="https://www.tiktok.com/@Luxe_accessories5" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition">Tiktok</a>
        </div>
      </div>
    </div>

    <!-- WhatsApp Floating Button -->
    <a 
      href="https://wa.me/2348149520479" 
      target="_blank" 
      rel="noopener noreferrer"
      class="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
      title="Chat with us on WhatsApp"
    >
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.783 1.14L.855 2.607.64.064A1.382 1.382 0 012.031 0h15.97a1.383 1.383 0 011.292 1.923l-.841 4.555a9.87 9.87 0 01-4.783-1.14m11.386 5.008C23.252 11.28 24 9.65 24 7.897c0-3.805-3.07-6.897-6.897-6.897-3.827 0-6.897 3.092-6.897 6.897 0 1.753.748 3.383 1.972 4.504"/>
      </svg>
    </a>
  </footer>
</template>

<script setup>
import logo from "../assets/pictures/Logo.png";
</script>
