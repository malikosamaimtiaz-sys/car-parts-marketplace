import { Link, useParams } from 'react-router';
import { ShoppingCart, Heart, Share2, Star, Package, Truck, Shield, ChevronRight } from 'lucide-react';
import { products, vendors } from '../data/mockData';

export function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const vendor = product ? vendors.find((v) => v.id === product.vendorId) : null;

  if (!product || !vendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1>Product not found</h1>
        <Link to="/browse" className="text-primary hover:underline mt-4 inline-block">
          Browse all parts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/browse" className="hover:text-foreground">Browse</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/browse?category=${product.category}`} className="hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Product Image */}
        <div>
          <div className="aspect-square bg-muted rounded-xl overflow-hidden sticky top-20">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">{product.category}</span>
            <h1 className="mt-1 text-2xl lg:text-3xl">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-primary text-primary'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
              <span className="text-sm text-muted-foreground capitalize">
                {product.condition}
              </span>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Package className="w-4 h-4" />
                <span>In Stock - Ships within 2-3 business days</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <Package className="w-4 h-4" />
                <span>Currently Out of Stock</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm font-medium"
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              className="bg-secondary text-secondary-foreground p-3 rounded-lg hover:bg-secondary/80 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              className="bg-secondary text-secondary-foreground p-3 rounded-lg hover:bg-secondary/80 transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Vendor Info */}
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <h3 className="mb-4 text-sm font-medium">Sold by</h3>
            <Link
              to={`/vendor/${vendor.id}`}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center text-2xl">
                {vendor.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium">{vendor.name}</h4>
                  {vendor.verified && (
                    <Shield className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>★ {vendor.rating}</span>
                  <span>•</span>
                  <span>{vendor.reviews} reviews</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{vendor.location}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-0.5">Fast Shipping</p>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $100
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-0.5">Buyer Protection</p>
                <p className="text-sm text-muted-foreground">
                  30-day return policy for unused parts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="border-t border-border pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Description */}
          <div>
            <h2 className="mb-4 text-xl">Description</h2>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{product.description}</p>

            <h3 className="mb-3 text-base">Specifications</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex">
                <dt className="text-muted-foreground w-32">Condition:</dt>
                <dd className="capitalize font-medium">{product.condition}</dd>
              </div>
              <div className="flex">
                <dt className="text-muted-foreground w-32">Category:</dt>
                <dd className="font-medium">{product.category}</dd>
              </div>
              <div className="flex">
                <dt className="text-muted-foreground w-32">Warranty:</dt>
                <dd className="font-medium">1 Year Manufacturer Warranty</dd>
              </div>
            </dl>
          </div>

          {/* Compatibility */}
          <div>
            <h2 className="mb-4 text-xl">Vehicle Compatibility</h2>
            <ul className="space-y-2">
              {product.compatibility.map((vehicle, index) => (
                <li
                  key={index}
                  className="bg-secondary text-secondary-foreground px-4 py-3 rounded-lg text-sm"
                >
                  {vehicle}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Compatibility information is provided by the vendor. Please verify fitment before purchasing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
