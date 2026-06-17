import { Link } from 'react-router';
import { Search, TrendingUp, Shield, Truck } from 'lucide-react';
import { products, categories } from '../data/mockData';

export function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-4xl lg:text-5xl">
              Find Quality Auto Parts from Trusted Vendors
            </h1>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
              Connect with verified sellers offering genuine parts for all makes and models.
              Fast shipping, competitive prices, guaranteed quality.
            </p>

            {/* Search Bar */}
            <div className="bg-card border border-border rounded-xl p-2 flex gap-2 max-w-2xl mx-auto">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by part name, number, or vehicle..."
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
              <Link
                to="/browse"
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-base mb-1">Verified Vendors</h3>
                <p className="text-muted-foreground text-sm">
                  All sellers are verified and rated by our community
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-base mb-1">Fast Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  Quick delivery from vendors across the country
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-base mb-1">Best Prices</h3>
                <p className="text-muted-foreground text-sm">
                  Compare prices from multiple vendors instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/browse?category=${encodeURIComponent(category)}`}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors text-center"
              >
                <p className="text-sm font-medium">{category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Featured Parts</h2>
            <Link to="/browse" className="text-primary hover:underline text-sm">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all group"
              >
                <div className="aspect-square bg-muted overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="text-sm mb-2 line-clamp-2 font-medium">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${product.price}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>★</span>
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{product.vendor}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-3xl">Start Selling Your Parts</h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-base">
            Join thousands of vendors already selling on Basic Part.
            Reach customers nationwide and grow your business.
          </p>
          <Link
            to="/vendor-dashboard"
            className="inline-block bg-background text-foreground px-8 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm font-medium"
          >
            Become a Vendor
          </Link>
        </div>
      </section>
    </div>
  );
}
