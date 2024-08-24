import Template from "./template/Template";
import LayoutAdmin from "./adminDash/LayoutAdmin"; // Import your admin layout
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import Login from "./components/Login";
import Signup from "./components/Singup";
import AdminHome from "./contentAdmin/adminHome";
import ProductDashboard from "./contentAdmin/ProductDashboard";
import CategoryDashboard from "./contentAdmin/CategoryDashboard";
import AddCategory from "./contentAdmin/AddCategory"
import AddProduct from "./contentAdmin/AddPoduct";
import UpdateProduct from "./contentAdmin/UpdateProduct"
import UpdateCategory from "./contentAdmin/UpdateCategory"
import CartPage from "./products/CartPage";
import OrderDash from "./contentAdmin/OrderDash";
import { AuthProvider } from './components/authContext'; 
import PrivateRoute from './components/PrivateRoute'; 
import OrderCus from "./components/OrderCus";
// import myOrder from './products/myOrder'

function App() {
  return (
    <AuthProvider>
      <Switch>
        {/* Admin routes */}
        <Route path="/admin">
          <LayoutAdmin>
            <PrivateRoute path="/admin" exact component={AdminHome} />
            <PrivateRoute path="/admin/products" exact component={ProductDashboard} />
            <PrivateRoute path="/admin/products/add" exact component={AddProduct} />
            <PrivateRoute path="/admin/products/update/:slug" exact component={UpdateProduct} />
            <PrivateRoute path="/admin/category" exact component={CategoryDashboard} />
            <PrivateRoute path="/admin/category/add" exact component={AddCategory} />
            <PrivateRoute path="/admin/order" exact component={OrderDash} />
            <PrivateRoute path="/admin/category/update/:id" exact component={UpdateCategory} />
          </LayoutAdmin>
        </Route>

        {/* Main site routes */}
        <Route>
          <Template>
            <Route path="/products" exact>
              <ProductList />
            </Route>

            
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/products/:slug">
              <ProductDetail />
            </Route>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/cart">
            <CartPage />
            </Route>
            <Route path="/myOrder">
            <OrderCus  />
            </Route>
          </Template>
        </Route>
      </Switch>
    </AuthProvider>
  );
}

export default App;
