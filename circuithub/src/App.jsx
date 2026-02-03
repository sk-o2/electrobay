// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Products from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import AdminDashboard from "./pages/AdminDashboard";
// import CartPage from "./pages/cartPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// // import ResetPassword from "./pages/ResetPassword";
// import ProfilePage from "./pages/ProfilePage";
// // import ProtectedRoute from "./components/ProtectedRoute";
// import CheckoutPage from "./pages/CheckoutPage";
// // import VerifyEmail from "./pages/VerifyEmail";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/products" element={<Products />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route
//           path="/checkout"
//           element={
//             <ProtectedRoute>
//               <CheckoutPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute roles={["admin"]}>
//               <AdminPanel />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;







// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/AdminDashboard";
import CartPage from "./pages/cartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />}/>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}

        {/* Admin route — protected and uses your AdminDashboard component */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

         

        {/* Add other routes (profile, etc.) */}
        <Route
          path="/profile"
          element={
              <ProfilePage />
          }
        />
      
      </Routes>
    </Router>
  );
}

export default App;
