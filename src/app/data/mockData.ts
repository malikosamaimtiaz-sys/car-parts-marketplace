export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  vendor: string;
  vendorId: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  compatibility: string[];
  description: string;
  condition: 'new' | 'used' | 'refurbished';
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  location: string;
  joinedDate: string;
  totalProducts: number;
  verified: boolean;
}

export const categories = [
  'Engine Parts',
  'Brakes',
  'Suspension',
  'Exhaust',
  'Electrical',
  'Transmission',
  'Body Parts',
  'Interior',
  'Lighting',
  'Wheels & Tires',
  'Filters',
  'Cooling System'
];

export const makes = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz',
  'Audi', 'Volkswagen', 'Nissan', 'Mazda', 'Subaru', 'Hyundai'
];

export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'AutoPro Parts',
    logo: '🏢',
    rating: 4.8,
    reviews: 2543,
    location: 'Detroit, MI',
    joinedDate: '2020-03-15',
    totalProducts: 1247,
    verified: true
  },
  {
    id: 'v2',
    name: 'Performance Plus',
    logo: '⚡',
    rating: 4.6,
    reviews: 1876,
    location: 'Los Angeles, CA',
    joinedDate: '2019-08-22',
    totalProducts: 892,
    verified: true
  },
  {
    id: 'v3',
    name: 'Quality Motors Supply',
    logo: '🔧',
    rating: 4.9,
    reviews: 3421,
    location: 'Houston, TX',
    joinedDate: '2018-01-10',
    totalProducts: 2156,
    verified: true
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Performance Brake Rotors Set',
    category: 'Brakes',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    vendor: 'AutoPro Parts',
    vendorId: 'v1',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    compatibility: ['Toyota Camry 2018-2023', 'Toyota RAV4 2019-2023'],
    description: 'High-performance brake rotors designed for superior stopping power and heat dissipation.',
    condition: 'new'
  },
  {
    id: 'p2',
    name: 'Cold Air Intake System',
    category: 'Engine Parts',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    vendor: 'Performance Plus',
    vendorId: 'v2',
    rating: 4.9,
    reviews: 187,
    inStock: true,
    compatibility: ['Ford Mustang 2015-2023', 'Ford F-150 2018-2023'],
    description: 'Premium cold air intake system that increases horsepower and improves throttle response.',
    condition: 'new'
  },
  {
    id: 'p3',
    name: 'Coilover Suspension Kit',
    category: 'Suspension',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    vendor: 'Performance Plus',
    vendorId: 'v2',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    compatibility: ['Honda Civic 2016-2021', 'Honda Accord 2018-2022'],
    description: 'Adjustable coilover suspension kit for improved handling and customizable ride height.',
    condition: 'new'
  },
  {
    id: 'p4',
    name: 'LED Headlight Assembly',
    category: 'Lighting',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    vendor: 'Quality Motors Supply',
    vendorId: 'v3',
    rating: 4.6,
    reviews: 289,
    inStock: true,
    compatibility: ['BMW 3 Series 2019-2023', 'BMW 5 Series 2017-2022'],
    description: 'Premium LED headlight assembly with adaptive lighting technology.',
    condition: 'new'
  },
  {
    id: 'p5',
    name: 'Performance Exhaust System',
    category: 'Exhaust',
    price: 749.99,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800',
    vendor: 'Performance Plus',
    vendorId: 'v2',
    rating: 4.9,
    reviews: 412,
    inStock: true,
    compatibility: ['Subaru WRX 2015-2023', 'Subaru STI 2015-2021'],
    description: 'Cat-back exhaust system with stainless steel construction and aggressive sound.',
    condition: 'new'
  },
  {
    id: 'p6',
    name: 'Turbocharger Assembly',
    category: 'Engine Parts',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800',
    vendor: 'AutoPro Parts',
    vendorId: 'v1',
    rating: 4.8,
    reviews: 178,
    inStock: false,
    compatibility: ['Audi A4 2016-2022', 'Volkswagen GTI 2015-2021'],
    description: 'High-performance turbocharger for increased boost and power output.',
    condition: 'new'
  },
  {
    id: 'p7',
    name: 'Racing Seat Pair',
    category: 'Interior',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    vendor: 'Performance Plus',
    vendorId: 'v2',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    compatibility: ['Universal Fit'],
    description: 'Bucket racing seats with 5-point harness compatibility and ergonomic support.',
    condition: 'new'
  },
  {
    id: 'p8',
    name: 'Alloy Wheel Set (4)',
    category: 'Wheels & Tires',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    vendor: 'Quality Motors Supply',
    vendorId: 'v3',
    rating: 4.9,
    reviews: 567,
    inStock: true,
    compatibility: ['Mercedes-Benz C-Class 2015-2023', 'Mercedes-Benz E-Class 2016-2022'],
    description: 'Lightweight forged alloy wheels with premium finish. Set of 4.',
    condition: 'new'
  }
];
