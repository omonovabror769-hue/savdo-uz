import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { StoreProvider } from './store';
import Header from './components/Header';
import { FeedbackBar, Footer, LangModal, LoginModal, Toast } from './components/ui';
import Home from './pages/Home';
import { CategoryPage, SalePage, SearchPage, SubPage } from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import { Account, Compare, Favorites, Orders, Points } from './pages/Account';
import { Delivery, Promos, Services } from './pages/Promos';
import NotFound from './pages/NotFound';

function ScrollTop() {
  const { pathname, search } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname, search]);
  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <StoreProvider>
        <HashRouter>
          <ScrollTop />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog/:catId" element={<CategoryPage />} />
              <Route path="/catalog/:catId/:subId" element={<SubPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/sale" element={<SalePage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/account" element={<Account />} />
              <Route path="/account/orders" element={<Orders />} />
              <Route path="/account/points" element={<Points />} />
              <Route path="/promos" element={<Promos />} />
              <Route path="/services" element={<Services />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <FeedbackBar />
          <Footer />
          <LoginModal />
          <LangModal />
          <Toast />
        </HashRouter>
      </StoreProvider>
    </I18nProvider>
  );
}
