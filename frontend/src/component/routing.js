import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { AdminLayout } from './admin/AdminLayout/adminlayout.component';
import { Dashboard, PrivateRoute } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { Layout } from './home/layout/main-content.component';
import { Login } from './home/login/login.component';
import { Logout } from './admin/logout/logout.component';
import { Register } from './home/register/register.component';

import { Category } from './admin/category/category.component';
import { CategoryForm } from './admin/category/category-form.component';
import { CategoryEdit } from './admin/category/category-edit.component';

import { Product } from './admin/product/product.component';
import { ProductCreate } from './admin/product/product-create.component';

import { AdminSlider } from './admin/slider/slider.component';
import { AdminSliderForm } from './admin/slider/slider-form.component';
import { AdminSliderEdit } from './admin/slider/slider-edit.component';
import { AdminAbout } from './admin/about/about.component';
import { AdminAboutEdit } from './admin/about/about-edit.component';

import { ProductDetail } from './home/products/single-product.component';
import {ErrorPage} from './home/errorpage/404.component';
import { SearchResult } from './home/search/search-list.component';

import { CategoryProduct } from './home/shops/category-product.component';
import { SubcategoryProduct } from './home/shops/subcategory-product.component';
import { ProductEdit } from './admin/product/product-edit.component';

import { CartData } from './home/cart/cart.component';
import { Checkout } from './home/checkout/checkout.component';
import { WishList } from './home/wishlist/wishlist.component';
import { OrderList } from './admin/orders/order-list.component';
import { OrderDetail } from './admin/orders/order-details.component';
 

export function AppRouting(){

    
    return(
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<Layout></Layout>}>
                    <Route index element={<HomeComponent></HomeComponent>}></Route>

                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>

                    <Route path="/product/detail/:id" element={<ProductDetail/>}></Route>

                    <Route path="/search" element={<SearchResult />}></Route>

                    <Route path="/category/:id" element={<CategoryProduct/>}></Route>
                    <Route path="/subcategory/:id" element={<SubcategoryProduct/>}></Route>

                    <Route path="/cart-detail" element={<CartData/>}></Route>
                    <Route path="/checkout" element={<Checkout/>}></Route>
                    <Route path="/wishlist" element={<WishList/>}></Route>

                    <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
                </Route>

                <Route path="/admin" element={<PrivateRoute><AdminLayout></AdminLayout></PrivateRoute>}>
                    <Route index element={<Dashboard></Dashboard>}></Route>
                    
                    <Route path="category" element={<PrivateRoute><Category></Category></PrivateRoute>}></Route>
                    <Route path="category/create" element={<PrivateRoute><CategoryForm></CategoryForm></PrivateRoute>}></Route>
                    <Route path="category/edit/:id" element={<PrivateRoute><CategoryEdit></CategoryEdit></PrivateRoute>}></Route>

                    <Route path="product" element={<PrivateRoute><Product></Product></PrivateRoute>}></Route>
                    <Route path="product/create" element={<PrivateRoute><ProductCreate></ProductCreate></PrivateRoute>}></Route>
                    <Route path="product/edit/:id" element={<PrivateRoute><ProductEdit></ProductEdit></PrivateRoute>}></Route>

                    <Route path="slider" element={<PrivateRoute><AdminSlider></AdminSlider></PrivateRoute>}></Route>
                    <Route path="slider/create" element={<PrivateRoute><AdminSliderForm></AdminSliderForm></PrivateRoute>}></Route>
                    <Route path="slider/edit/:id" element={<PrivateRoute><AdminSliderEdit></AdminSliderEdit></PrivateRoute>}></Route>
                    
                    <Route path="about" element={<PrivateRoute><AdminAbout></AdminAbout></PrivateRoute>}></Route>
                    <Route path="about/:id" element={<PrivateRoute><AdminAboutEdit></AdminAboutEdit></PrivateRoute>}></Route>

                    <Route path="order-list" element={<PrivateRoute><OrderList></OrderList></PrivateRoute>}></Route>
                    <Route path="order-detail/:id" element={<PrivateRoute><OrderDetail></OrderDetail></PrivateRoute>}></Route>

                </Route>

                <Route path="/user" element=""></Route>

                <Route path="/logout" element={<Logout></Logout>}></Route>

            </Routes>
        </BrowserRouter>
    );
 }
