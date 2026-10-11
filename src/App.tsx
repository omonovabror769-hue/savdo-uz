import { useEffect, type ReactNode } from 'react';
import { HashRouter, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

// Claude ichidagi ko'rib chiqish oynasida manzil satri o'zgarmasligi kerak — u yerda MemoryRouter ishlatiladi.
// GitHub Pages va oddiy brauzerda — HashRouter (#/catalog/... ko'rinishidagi manzillar).
const Router = import.meta.env.VITE_ROUTER === 'memory' ? MemoryRouter : HashRouter;
import { I18nProvider } from './i18n';
import { StoreProvider } from './store';
import Header from './components/Header';
import { FeedbackBar, Footer, LangModal, LoginModal, Toast } from './components/ui';
import Home from './pages/Home';
import { CategoryPage, SalePage, SearchPage, SubPage } from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import { Account, Compare, Favorites, Orders, Points, Requests } from './pages/Account';
import { Delivery, Promos } from './pages/Promos';
import { ServicePage, Services } from './pages/Services';
import { About, B2B, Club, Feedback, Payment, PromoPage, Returns, Stores } from './pages/Info';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

function SafeMain({ children }: { children: ReactNode }) {
  const { pathname, search } = useLocation();
  return <ErrorBoundary resetKey={pathname + search}>{children}</ErrorBoundary>;
}

function ScrollTop() {
  const { pathname, search } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname, search]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
    <I18nProvider>
      <StoreProvider>
        <Router>
          <ScrollTop />
          <Header />
          <main>
            <SafeMain>
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
              <Route path="/account/requests" element={<Requests />} />
              <Route path="/promos" element={<Promos />} />
              <Route path="/promos/:id" element={<PromoPage />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/club" element={<Club />} />
              <Route path="/b2b" element={<B2B />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/about" element={<About />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServicePage />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </SafeMain>
          </main>
          <FeedbackBar />
          <Footer />
          <LoginModal />
          <LangModal />
          <Toast />
        </Router>
      </StoreProvider>
    </I18nProvider>
    </ErrorBoundary>
  );
}
