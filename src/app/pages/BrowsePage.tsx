import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Filter } from 'lucide-react';
import { supabase } from '../../supabase';
import { categories, makes } from '../data/mockData';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  vendor_id: string;
  rating: number;
  reviews: number;
  in_stock: boolean;
  compatibility: string[];
  description: string;
  condition: string;
  part_number: string;
}

export function BrowsePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true);
      let query = supabase.from('parts').select('*');
      if (selectedCategory) query = query.eq('category', selectedCategory);
      if (selectedCondition) query = query.eq('condition', selectedCondition);
      if (inStockOnly) query = query.eq('in_stock', true);
      query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);
      const { data, error } = await query;
      if (!error && data) setProducts(data);
      setLoading(false);
    };
    fetchParts();
  }, [selectedCategory, selectedCondition, inStockOnly, priceRange]);

  const filteredProducts = selectedMake
    ? products.filter(p => p.compatibility?.some(c => c.includes(selectedMake)))
    : products;

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedMake('');
    setSelectedCondition('');
    setPriceRange([0, 2000]);
    setInStockOnly(false);
  };

  const activeFiltersCount = [selectedCategory, selectedMake, selectedCondition, inStockOnly].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="mb-1 text-2xl">Browse Auto Parts</h1>
        <p className="text-muted-foreground text-sm">
          {loading ? 'Loading...' : `${filteredProducts.length} parts available`}
        </p>
      </div>
      <div className="flex gap-6">
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
          <div className="bg-card border border-border rounded-xl p-5 sticky top-20">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <h3 className="text-sm font-medium">Filters</h3>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground">
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Vehicle Make</label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">All Makes</option>
                  {makes.map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Condition</label>
                <div className="space-y-2">
                  {['new', 'used', 'refurbished'].map((condition) => (
                    <label key={condition} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value={condition}
                        checked={selectedCondition === condition}
                        onChange={(e) => setSelectedCondition(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm capitalize">{condition}</span>
                    </label>
                  ))}
                  {selectedCondition && (
                    <button onClick={() => setSelectedCondition('')} className="text-xs text-primary hover:underline">
                      Clear selection
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">In Stock Only</span>
                </label>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <div className="mb-4 lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <p className="text-muted-foreground mb-4 text-sm">No parts found matching your filters</p>
              <button onClick={clearFilters} className="text-primary hover:underline text-sm">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all group"
                >
                  <div className="aspect-square bg-muted overflow-hidden relative">
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : '🔧'}
                    </div>
                    {!product.in_stock && (
                      <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                    {product.condition !== 'new' && (
                      <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded capitalize">
                        {product.condition}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="text-sm mb-2 line-clamp-2 font-medium">{product.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">${product.price}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>★ {product.rating} ({product.reviews})</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">#{product.part_number}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}