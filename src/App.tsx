import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Страницы
import Index from "./pages/home/Index";
import CategoryPage from "./pages/catalog/CategoryPage";
import ProductPage from "./pages/catalog/ProductPage";
import SearchPage from "./pages/catalog/SearchPage";
import WishlistPage from "./pages/user/WishlistPage";
import CartPage from "./pages/user/CartPage";
import ProfilePage from "./pages/user/ProfilePage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path="girls" element={<CategoryPage category="girls" />} />
                    <Route path="boys" element={<CategoryPage category="boys" />} />
                    <Route path="newborn" element={<CategoryPage category="newborn" />} />
                    <Route path="collections" element={<CategoryPage featured />} />
                    <Route path="sale" element={<CategoryPage sale />} />
                    <Route path="product/:id" element={<ProductPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="admin" element={<AdminLogin />} />
                    <Route path="admin/dashboard" element={<AdminDashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
