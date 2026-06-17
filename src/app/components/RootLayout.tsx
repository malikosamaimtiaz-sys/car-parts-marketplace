import { Outlet, Link, useLocation } from 'react-router';
import { ShoppingCart, User, Store, Menu } from 'lucide-react';
import { useState } from 'react';

export function RootLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = 3;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">BP</span>
              </div>
              <span className="font-bold text-lg tracking-tight">Basic Part</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/browse"
                className={`hover:text-primary transition-colors text-sm ${
                  location.pathname === '/browse' ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                Browse Parts
              </Link>
              <Link
                to="/vendor-dashboard"
                className={`flex items-center gap-1.5 hover:text-primary transition-colors text-sm ${
                  location.pathname === '/vendor-dashboard' ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                <Store className="w-4 h-4" />
                Sell Parts
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="relative hover:text-primary transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <Link
                to="/account"
                className="hover:text-primary transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                className="md:hidden hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-border">
              <nav className="flex flex-col gap-2">
                <Link
                  to="/browse"
                  className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Parts
                </Link>
                <Link
                  to="/vendor-dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors py-2 flex items-center gap-1.5 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Store className="w-4 h-4" />
                  Sell Parts
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4 text-sm font-medium">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">For Buyers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/browse" className="hover:text-primary transition-colors">Browse Parts</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">How to Order</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">For Vendors</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/vendor-dashboard" className="hover:text-primary transition-colors">Vendor Dashboard</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Start Selling</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Shipping Info</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Track Order</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Basic Part. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
