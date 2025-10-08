# Enhanced Home Page Component with Modern Features
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Heart, 
  Star, 
  ShoppingCart, 
  Filter,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Truck,
  Shield,
  RefreshCw
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { addToWishlist, fetchWishlist } from "@/store/shop/wishlist-slice";
import { toast } from "sonner";

const EnhancedShoppingHome = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(state => state.shopProducts);
  const { user } = useSelector(state => state.auth);
  const { wishlist } = useSelector(state => state.wishlist);
  
  // State management
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced categories with icons and counts
  const categories = [
    { id: 'all', label: 'All Products', icon: Grid3X3, count: productList?.length || 0 },
    { id: 'men', label: 'Men', icon: Shirt, count: productList?.filter(p => p.category === 'men').length || 0 },
    { id: 'women', label: 'Women', icon: CloudLightning, count: productList?.filter(p => p.category === 'women').length || 0 },
    { id: 'kids', label: 'Kids', icon: BabyIcon, count: productList?.filter(p => p.category === 'kids').length || 0 },
    { id: 'accessories', label: 'Accessories', icon: WatchIcon, count: productList?.filter(p => p.category === 'accessories').length || 0 },
    { id: 'footwear', label: 'Footwear', icon: UmbrellaIcon, count: productList?.filter(p => p.category === 'footwear').length || 0 },
  ];

  // Trust indicators
  const trustIndicators = [
    { icon: Truck, text: 'Free Shipping', subtext: 'On orders over $50' },
    { icon: Shield, text: 'Secure Payment', subtext: '100% Protected' },
    { icon: RefreshCw, text: 'Easy Returns', subtext: '30-day policy' },
    { icon: Award, text: 'Quality Guarantee', subtext: 'Premium products' }
  ];

  // Enhanced product handling
  const handleAddToCart = async (productId) => {
    setIsLoading(true);
    try {
      await dispatch(addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      }));
      dispatch(fetchCartItems(user?.id));
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await dispatch(addToWishlist({
        userId: user?.id,
        productId
      }));
      toast.success("Added to wishlist!");
    } catch (error) {
      toast.error("Failed to add to wishlist");
    }
  };

  const handleQuickView = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  // Enhanced product card component
  const ProductCard = ({ product }) => {
    const isInWishlist = wishlist?.some(item => item.productId === product._id);
    const discountPercentage = product.salePrice ? 
      Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

    return (
      <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500">
              -{discountPercentage}%
            </Badge>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => handleAddToWishlist(product._id)}
              className="mb-2"
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-sm text-gray-500">({product.reviewCount || 0})</span>
            </div>
            
            {/* Price */}
            <div className="flex items-center space-x-2">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-bold text-green-600">${product.salePrice}</span>
                  <span className="text-sm text-gray-500 line-through">${product.price}</span>
                </>
              ) : (
                <span className="text-lg font-bold">${product.price}</span>
              )}
            </div>
            
            {/* Stock indicator */}
            <div className="text-xs">
              {product.totalStock > 10 ? (
                <span className="text-green-600">In Stock</span>
              ) : product.totalStock > 0 ? (
                <span className="text-orange-600">Only {product.totalStock} left</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <Button 
              className="flex-1" 
              onClick={() => handleAddToCart(product._id)}
              disabled={product.totalStock === 0 || isLoading}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleQuickView(product._id)}
            >
              Quick View
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Discover Amazing Products</h1>
          <p className="text-xl mb-8">Shop the latest trends with unbeatable prices</p>
          
          {/* Enhanced Search */}
          <div className="max-w-2xl mx-auto relative">
            <Input
              placeholder="Search for products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center">
                <indicator.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold">{indicator.text}</h3>
                <p className="text-sm text-gray-600">{indicator.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <category.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold">{category.label}</h3>
                  <p className="text-sm text-gray-600">{category.count} products</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Product Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {productList?.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedShoppingHome;

