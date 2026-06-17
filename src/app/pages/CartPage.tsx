import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { products } from '../data/mockData';

interface CartItem {
  product: typeof products[0];
  quantity: number;
}

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 1 },
    { product: products[2], quantity: 1 },
  ]);

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.product.id !== productId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-card border border-border rounded-xl p-16 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="mb-3 text-xl">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Start shopping to add items to your cart
          </p>
          <Link
            to="/browse"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            Browse Parts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="mb-8 text-2xl">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex gap-5">
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg bg-muted hover:opacity-80 transition-opacity"
                  />
                </Link>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="mb-1 hover:text-primary text-sm font-medium">{item.product.name}</h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.product.category}
                      </p>
                      <Link
                        to={`/vendor/${item.product.vendorId}`}
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        {item.product.vendor}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                      aria-label="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-7 h-7 border border-border rounded hover:bg-secondary transition-colors flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-7 h-7 border border-border rounded hover:bg-secondary transition-colors flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-bold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-20">
            <h2 className="mb-5 text-lg">Order Summary</h2>

            <div className="space-y-3 mb-5 pb-5 border-b border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-5">
              <span className="font-medium text-sm">Total</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity mb-3 text-sm font-medium">
              Proceed to Checkout
            </button>

            <Link
              to="/browse"
              className="block text-center text-primary hover:underline text-sm"
            >
              Continue Shopping
            </Link>

            {subtotal < 100 && (
              <div className="mt-5 p-4 bg-secondary rounded-lg">
                <p className="text-sm">
                  Add <span className="font-medium">${(100 - subtotal).toFixed(2)}</span> more
                  to get <span className="font-medium">FREE shipping</span>!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
