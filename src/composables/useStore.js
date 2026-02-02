import { ref, computed } from 'vue'

const cart = ref([])
const searchQuery = ref('')
const selectedCategory = ref('All')
const priceRange = ref([0, 20000])
const selectedSort = ref('featured')

const products = ref([
  {
    id: 1,
    name: "Leather Handbag",
    price: 15000,
    image: "/leather handbag.jpeg",
    // category: "Leather Handbag",
    description: "A timeless leather tote perfect for everyday use. Crafted with premium Italian leather.",
    color: "Cognac Brown",
    material: "Full-grain leather",
    dimensions: "14 x 10 x 5 inches",
    inStock: true,
    rating: 4.8,
    reviews: 48,
    discount: 0
  },
  {
    id: 2,
    name: "Crossbody Handbag",
    price: 8000,
    image: "/crossbody handbag.jpeg",
    // category: "Crossbody Handbag",
    description: "Sleek and functional crossbody bag for the modern lifestyle.",
    color: "Black",
    material: "Vegan leather",
    dimensions: "10 x 8 x 3 inches",
    inStock: true,
    rating: 4.6,
    reviews: 32,
    discount: 0
  },
  {
    id: 3,
    name: "Quality fashion handbag",
    price: 10000,
    image: "/quality fashion handbag.jpeg",
    // category: "Quality fashion handbag",
    description: "Spacious duffle bag ideal for travel and weekend getaways.",
    color: "Olive",
    material: "Canvas blend",
    dimensions: "18 x 10 x 10 inches",
    inStock: true,
    rating: 4.9,
    reviews: 26,
    discount: 0
  },
  {
    id: 4,
    name: "Retro handbag",
    price: 10000,
    image: "/Retro handbag.jpeg",
    // category: "Retro handbag",
    description: "Elegant structured bag with a refined silhouette.",
    color: "Cream",
    material: "Leather",
    dimensions: "12 x 9 x 4 inches",
    inStock: true,
    rating: 4.7,
    reviews: 19,
    discount: 0
  },
  {
    id: 5,
    name: "FNDEI handbag",
    price: 10000,
    image: "/FNDEI handbag.jpeg",
    // category: "FNDEI handbag",
    description: "Perfect for evening outings and special occasions.",
    color: "Gold",
    material: "Metallic leather",
    dimensions: "8 x 5 x 2 inches",
    inStock: true,
    rating: 4.5,
    reviews: 15,
    discount: 0
  },
  {
    id: 6,
    name: "Glossy handbag",
    price: 10000,
    image: "/Glossy handbag.jpeg",
    // category: "Backpack",
    description: "Versatile backpack combining style and functionality.",
    color: "Tan",
    material: "Leather",
    dimensions: "15 x 12 x 6 inches",
    inStock: true,
    rating: 4.8,
    reviews: 41,
    discount: 0
  },
  {
    id: 7,
    name: "Garavani Vlogo signature clutch bag",
    price: 10000,
    image: "/Garavani Vlogo signature clutch bag.jpeg",
    // category: "Totes",
    description: "Premium handcrafted satchel with Italian leather.",
    color: "Burgundy",
    material: "Full-grain leather",
    dimensions: "16 x 11 x 6 inches",
    inStock: true,
    rating: 5,
    reviews: 22,
    discount: 0
  },
  {
    id: 8,
    name: "spacious leather bag",
    price: 13000,
    image: "/spacious leather bag.jpeg",
    // category: "Crossbody",
    description: "Modern crossbody perfect for urban adventures.",
    color: "Navy Blue",
    material: "Vegan leather",
    dimensions: "9 x 7 x 3 inches",
    inStock: true,
    rating: 4.7,
    reviews: 28,
    discount: 0
  },
  {
    id: 9,
    name: "Beige and tan handbag",
    price: 10000,
    image: "/Beige and tan handbag.jpeg",
    // category: "Clutch",
    description: "Sophisticated clutch for special evenings.",
    color: "Silver",
    material: "Metallic leather",
    dimensions: "8 x 6 x 2 inches",
    inStock: true,
    rating: 4.6,
    reviews: 18,
    discount: 0
  },
])

const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

const removeFromCart = (productId) => {
  cart.value = cart.value.filter(item => item.id !== productId)
}

const updateQuantity = (productId, quantity) => {
  const item = cart.value.find(item => item.id === productId)
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = quantity
    }
  }
}

const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)
})

const getCategories = computed(() => {
  return ['All', ...new Set(products.value.map(p => p.category))]
})

const filteredProducts = computed(() => {
  let filtered = products.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  // Filter by price range
  filtered = filtered.filter(p => p.price >= priceRange.value[0] && p.price <= priceRange.value[1])

  // Sort products
  switch (selectedSort.value) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filtered.sort((a, b) => b.id - a.id)
      break
    case 'rating':
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    default:
      break
  }

  return filtered
})

const cartCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0)
})

const clearCart = () => {
  cart.value = []
}

const setSearchQuery = (query) => {
  searchQuery.value = query
}

const setSelectedCategory = (category) => {
  selectedCategory.value = category
}

const setPriceRange = (range) => {
  priceRange.value = range
}

const setSelectedSort = (sort) => {
  selectedSort.value = sort
}

export function useStore() {
  return {
    products,
    cart,
    searchQuery,
    selectedCategory,
    priceRange,
    selectedSort,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart,
    getCategories,
    filteredProducts,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setSelectedSort,
  }
}
