import { useState } from 'react';
import { User, Package, Heart, Settings } from 'lucide-react';
import { Link } from 'react-router';
import { products } from '../data/mockData';

export function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="mb-8 text-2xl">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-20">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center">
                <User className="w-7 h-7 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">john.doe@email.com</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                  activeTab === 'orders'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                  activeTab === 'wishlist'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                  activeTab === 'profile'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="mb-5 text-lg">Order History</h2>
              <div className="space-y-4">
                {[
                  {
                    id: '#ORD-5678',
                    date: '2026-05-28',
                    items: 2,
                    total: 489.98,
                    status: 'Delivered',
                    products: ['Performance Brake Rotors Set', 'Cold Air Intake System']
                  },
                  {
                    id: '#ORD-5677',
                    date: '2026-05-15',
                    items: 1,
                    total: 899.99,
                    status: 'Delivered',
                    products: ['Coilover Suspension Kit']
                  },
                  {
                    id: '#ORD-5676',
                    date: '2026-04-30',
                    items: 1,
                    total: 349.99,
                    status: 'Delivered',
                    products: ['LED Headlight Assembly']
                  },
                ].map((order) => (
                  <div key={order.id} className="border border-border rounded-xl p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-medium mb-1 text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs">
                        {order.status}
                      </span>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="space-y-2 mb-4">
                        {order.products.map((product, idx) => (
                          <p key={idx} className="text-sm">{product}</p>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{order.items} items</p>
                        <p className="font-bold text-sm">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="mb-5 text-lg">My Wishlist</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
                  >
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <div className="p-3">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-sm mb-2 line-clamp-2 hover:text-primary">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm">${product.price}</span>
                        <span className="text-xs text-muted-foreground">★ {product.rating}</span>
                      </div>
                      <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="mb-5 text-lg">Account Settings</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@email.com"
                    className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Address</label>
                  <input
                    type="text"
                    defaultValue="123 Main Street"
                    className="w-full bg-input-background border border-border rounded-lg px-3 py-2 mb-3 text-sm"
                    placeholder="Street address"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      defaultValue="Los Angeles"
                      className="bg-input-background border border-border rounded-lg px-3 py-2 text-sm"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      defaultValue="CA 90001"
                      className="bg-input-background border border-border rounded-lg px-3 py-2 text-sm"
                      placeholder="State & ZIP"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
