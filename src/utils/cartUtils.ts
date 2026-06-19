export interface CartItem {
  bookId: number;
  quantity: number;
}

export const getCart = (): CartItem[] => {
  const data = localStorage.getItem('pages_co_cart');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('pages_co_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
};

export const addToCart = (bookId: number, qty: number = 1) => {
  const cart = getCart();
  const existing = cart.find((item) => item.bookId === bookId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ bookId, quantity: qty });
  }
  saveCart(cart);
};

export const removeFromCart = (bookId: number) => {
  const cart = getCart().filter((item) => item.bookId !== bookId);
  saveCart(cart);
};

export const updateQuantity = (bookId: number, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(bookId);
    return;
  }
  const cart = getCart();
  const item = cart.find((i) => i.bookId === bookId);
  if (item) {
    item.quantity = quantity;
  }
  saveCart(cart);
};

export const getCartCount = (): number => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};
