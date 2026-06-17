import { Link, useParams } from 'react-router';
import { Shield, Star, MapPin, Calendar, Package } from 'lucide-react';
import { vendors, products } from '../data/mockData';

export function VendorProfilePage() {
  const { id } = useParams();
  const vendor = vendors.find((v) => v.id === id);
  const vendorProducts = products.filter((p) => p.vendorId === id);

  if (!vendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl">Vendor not found</h1>
        <Link to="/browse" className="text-primary hover:underline mt-4 inline-block text-sm">
          Browse all parts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Vendor Header */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
            {vendor.logo}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-2xl">{vendor.name}</h1>
              {vendor.verified && (
                <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-foreground font-medium">{vendor.rating}</span>
                <span>({vendor.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{vendor.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(vendor.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-xl font-bold">{vendor.totalProducts}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Products</p>
              </div>
              <div>
                <p className="text-xl font-bold">{vendor.reviews}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Reviews</p>
              </div>
              <div>
                <p className="text-xl font-bold">98%</p>
                <p className="text-xs text-muted-foreground mt-0.5">Positive Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-5 h-5" />
          <h2 className="text-xl">Products from {vendor.name}</h2>
          <span className="text-muted-foreground text-sm">({vendorProducts.length})</span>
        </div>

        {vendorProducts.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground text-sm">This vendor has no products listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vendorProducts.map((product) => (
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
                    <span className="font-bold text-sm">${product.price}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>★</span>
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="mb-6 text-xl">Customer Reviews</h2>
        <div className="space-y-4">
          {[
            { author: 'John D.', rating: 5, date: '2026-05-20', comment: 'Great quality parts and fast shipping. Highly recommend this vendor!' },
            { author: 'Sarah M.', rating: 5, date: '2026-05-15', comment: 'Excellent customer service and genuine parts. Will buy again.' },
            { author: 'Mike R.', rating: 4, date: '2026-05-10', comment: 'Good products but shipping took a bit longer than expected.' },
          ].map((review, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium mb-1 text-sm">{review.author}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-primary text-primary' : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
