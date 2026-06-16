import { reactive, computed } from 'vue'

const state = reactive({
  items: []
})

export function useCart() {
  const addItem = (product) => {
    const existing = state.items.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      state.items.push({ ...product, quantity: 1 })
    }
  }

  const removeItem = (productId) => {
    state.items = state.items.filter(item => item.id !== productId)
  }

  const clearCart = () => {
    state.items = []
  }

  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId)
  }

  const total = computed(() =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const totalItems = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return {
    state,
    addItem,
    removeItem,
    clearCart,
    isInCart,
    total,
    totalItems
  }
}