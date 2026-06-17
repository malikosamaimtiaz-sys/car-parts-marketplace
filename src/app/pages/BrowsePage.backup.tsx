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
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
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

  const activeFiltersCount = [
    selectedCategory,
    selectedMake,
    selectedCondition,
    inStockOnly
  ].filter(Boolean).length;

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