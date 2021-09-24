import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';
import AdminContextProvider from './contexts/AdminContext';
import CartPage from './pages/CartPage';
import LikedPage from './pages/LikedPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PayPage from './pages/PayPage';
import ClientContextProvider from './contexts/ClientContext';
 


const Routes = () => {
    return (
        <div>  
            <ClientContextProvider>
                <AdminContextProvider>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            <Route exact path="/admin" component={AdminPage}/>
                            <Route exact path="/cart" component={CartPage}/>
                            <Route exact path="/like" component={LikedPage}/>
                            <Route exact path="/sign-up" component={SignUpPage}/>
                            <Route exact path="/sign-in" component={SignInPage}/>
                            <Route exact path="/pay" component={PayPage}/>
                        </Switch>
                    </BrowserRouter>                       
                </AdminContextProvider>
            </ClientContextProvider>
            
        </div>
    );
};

export default Routes;