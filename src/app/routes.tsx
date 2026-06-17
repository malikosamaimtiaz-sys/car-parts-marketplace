import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./pages/HomePage";
import { BrowsePage } from "./pages/BrowsePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { VendorDashboard } from "./pages/VendorDashboard";
import { VendorProfilePage } from "./pages/VendorProfilePage";
import { AccountPage } from "./pages/AccountPage";
import { CartPage } from "./pages/CartPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { VendorAuth } from "./pages/VendorAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "browse", Component: BrowsePage },
      { path: "vendor-login", Component: VendorAuth },
      { path: "product/:id", Component: ProductDetailPage },
      { path: "vendor-dashboard", Component: VendorDashboard },
      { path: "vendor/:id", Component: VendorProfilePage },
      { path: "account", Component: AccountPage },
      { path: "cart", Component: CartPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
