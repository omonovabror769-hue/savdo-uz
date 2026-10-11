import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { L3, UnitKey } from '../data/types';
import { storage } from '../store/storage';

export type Lang = 'uz' | 'ru' | 'en';
export const LANGS: { id: Lang; label: string; short: string; flag: string }[] = [
  { id: 'uz', label: "O'zbekcha", short: 'UZ', flag: '🇺🇿' },
  { id: 'ru', label: 'Русский', short: 'RU', flag: '🇷🇺' },
  { id: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
];
const idx: Record<Lang, number> = { uz: 0, ru: 1, en: 2 };

const dict = {
  stores: ["Do'konlar", 'Магазины', 'Stores'],
  delivery: ['Yetkazib berish', 'Доставка и подъем', 'Delivery'],
  club: ["Do'stlar klubi", 'Клуб друзей', 'Friends club'],
  b2b: ['Biznes uchun', 'B2B', 'For business'],
  allDay: ['Kecha-kunduz:', 'Круглосуточно:', '24/7:'],
  orders: ['Buyurtmalar', 'Заказы', 'Orders'],
  catalog: ['Katalog', 'Каталог', 'Catalog'],
  searchPh: ["Samorez, 100231, asbob ijarasi, kodlar ro'yxati", 'Саморез, 100231, аренда инструмента, список кодов', 'Screw, 100231, tool rental, list of codes'],
  find: ['Topish', 'Найти', 'Search'],
  services: ['Xizmatlar', 'Сервисы', 'Services'],
  favorites: ['Sevimlilar', 'Избранное', 'Favorites'],
  compare: ['Taqqoslash', 'Сравнение', 'Compare'],
  login: ['Kirish', 'Войти', 'Sign in'],
  cart: ['Savat', 'Корзина', 'Cart'],
  promos: ['Aksiyalar', 'Акции', 'Promotions'],
  cashback: ['Keshbek', 'Кэшбэк', 'Cashback'],
  home: ['Bosh sahifa', 'Главная', 'Home'],
  toCart: ['Savatga', 'В корзину', 'Add to cart'],
  inCart: ['Savatda', 'В корзине', 'In cart'],
  priceFor: ['Narxi, 1', 'Цена за', 'Price per'],
  availToday: ['Bugun mavjud', 'Доступно сегодня', 'Available today'],
  onOrder: ['Buyurtma asosida', 'Под заказ', 'On order'],
  inStock: ['Omborda', 'В наличии', 'In stock'],
  found: ['Topildi', 'Найдено', 'Found'],
  sort: ['Saralash', 'Сортировать', 'Sort'],
  sortPop: ["Ommabopligi bo'yicha", 'По популярности', 'Popularity'],
  sortCheap: ['Avval arzonlari', 'Сначала дешевле', 'Cheapest first'],
  sortExp: ['Avval qimmatlari', 'Сначала дороже', 'Most expensive'],
  sortRating: ["Reyting bo'yicha", 'По рейтингу', 'Rating'],
  sortReviews: ["Sharhlar bo'yicha", 'По отзывам', 'Reviews'],
  price: ['Narx', 'Цена', 'Price'],
  from: ['dan', 'от', 'from'],
  to: ['gacha', 'до', 'to'],
  brand: ['Brend', 'Бренд', 'Brand'],
  showMore: ["Ko'proq ko'rsatish", 'Показать ещё', 'Show more'],
  showAll: ['Hammasini ko‘rsatish', 'Показать все', 'Show all'],
  hide: ['Yashirish', 'Скрыть', 'Hide'],
  availability: ['Mavjudlik', 'Наличие', 'Availability'],
  onlyStock: ['Faqat omborda borlari', 'Только в наличии', 'In stock only'],
  discounts: ['Chegirmadagilar', 'Со скидкой', 'Discounted'],
  novelties: ['Yangiliklar', 'Новинки', 'New arrivals'],
  resetFilters: ['Filtrlarni tozalash', 'Сбросить фильтры', 'Reset filters'],
  filters: ['Filtrlar', 'Фильтры', 'Filters'],
  pcs: ['dona', 'шт', 'pcs'],
  sku: ['Kod', 'Код', 'Code'],
  reviewsW: ['sharh', 'отзывов', 'reviews'],
  specs: ['Xususiyatlar', 'Характеристики', 'Specifications'],
  description: ['Tavsif', 'Описание', 'Description'],
  country: ['Ishlab chiqarilgan', 'Страна производства', 'Country of origin'],
  category: ['Kategoriya', 'Категория', 'Category'],
  size: ["O'lcham / parametrlar", 'Размер / параметры', 'Size / parameters'],
  unitW: ["O'lchov birligi", 'Единица измерения', 'Unit'],
  similar: ["O'xshash mahsulotlar", 'Похожие товары', 'Similar products'],
  mayNeed: ["Qo'shimcha kerak bo'lishi mumkin", 'Дополнительно может понадобиться', 'You may also need'],
  popular: ['Ommabop mahsulotlar', 'Популярные товары', 'Popular products'],
  hits: ['Savdo xitlari', 'Хиты продаж', 'Best sellers'],
  bestDeals: ['Foydali takliflar', 'Выгодные предложения', 'Best deals'],
  allCats: ['Barcha kategoriyalar', 'Все категории', 'All categories'],
  goods: ['tovar', 'товаров', 'products'],
  // savat
  cartEmpty: ["Savat bo'sh.", 'Корзина пуста.', 'Your cart is empty.'],
  cartEmptyHint: ["Ro'yxatni to'ldirish uchun qidiruv yoki katalogdan foydalaning", 'Чтобы наполнить список, воспользуйтесь поиском или каталогом', 'Use search or the catalog to add products'],
  back: ['Orqaga', 'Назад', 'Back'],
  total: ['Jami', 'Итого', 'Total'],
  goodsSum: ['Tovarlar', 'Товары', 'Products'],
  discount: ['Chegirma', 'Скидка', 'Discount'],
  deliveryCost: ['Yetkazib berish', 'Доставка', 'Delivery'],
  free: ['Bepul', 'Бесплатно', 'Free'],
  checkout: ['Buyurtmani rasmiylashtirish', 'Оформить заказ', 'Place order'],
  remove: ["O'chirish", 'Удалить', 'Remove'],
  clearCart: ['Savatni tozalash', 'Очистить корзину', 'Clear cart'],
  loginToOrder: ['Buyurtma berish uchun Google orqali kiring', 'Войдите через Google, чтобы оформить заказ', 'Sign in with Google to place an order'],
  orderPlaced: ['Buyurtma qabul qilindi', 'Заказ оформлен', 'Order placed'],
  orderNo: ['Buyurtma №', 'Заказ №', 'Order #'],
  address: ['Yetkazib berish manzili', 'Адрес доставки', 'Delivery address'],
  addressPh: ["Ko'cha, uy, xonadon", 'Улица, дом, квартира', 'Street, house, apartment'],
  phone: ['Telefon', 'Телефон', 'Phone'],
  payMethod: ["To'lov usuli", 'Способ оплаты', 'Payment method'],
  payCash: ['Qabul qilishda naqd', 'Наличными при получении', 'Cash on delivery'],
  payCard: ['Karta orqali (Uzcard / Humo)', 'Картой (Uzcard / Humo)', 'Card (Uzcard / Humo)'],
  deliveryType: ['Olish usuli', 'Способ получения', 'How to receive'],
  courier: ['Kuryer yetkazadi', 'Доставка курьером', 'Courier delivery'],
  pickup: ["Do'kondan olib ketish", 'Самовывоз из магазина', 'Pickup from store'],
  confirm: ['Tasdiqlash', 'Подтвердить', 'Confirm'],
  // auth
  loginTitle: ['savdo.uz ga kirish', 'Вход на savdo.uz', 'Sign in to savdo.uz'],
  loginSub: ["Ro'yxatdan o'tish va kirish faqat Google akkaunti orqali. Parol kerak emas.", 'Регистрация и вход — только через аккаунт Google. Пароль не нужен.', 'Sign up and sign in with your Google account only. No password needed.'],
  withGoogle: ['Google orqali kirish', 'Войти через Google', 'Continue with Google'],
  autoLogin: ['Keyingi safar avtomatik kirasiz', 'В следующий раз вход будет автоматическим', 'Next time you will be signed in automatically'],
  demoMode: ["Demo rejim: Google Client ID hali ulanmagan. Tugma sinov akkaunti bilan kiritadi.", 'Демо-режим: Google Client ID ещё не подключён. Кнопка выполнит вход тестовым аккаунтом.', 'Demo mode: Google Client ID is not connected yet. The button signs you in with a test account.'],
  terms: ["Kirish orqali siz foydalanish shartlari va maxfiylik siyosatiga rozilik bildirasiz", 'Входя, вы соглашаетесь с условиями использования и политикой конфиденциальности', 'By signing in you agree to the terms of use and privacy policy'],
  logout: ['Chiqish', 'Выйти', 'Sign out'],
  profile: ['Shaxsiy kabinet', 'Личный кабинет', 'My account'],
  personal: ["Shaxsiy ma'lumotlar", 'Личные данные', 'Personal data'],
  goodsH: ['Tovarlar', 'Товары', 'Products'],
  privileges: ['Imtiyozlaringiz', 'Ваши привилегии', 'Your benefits'],
  points: ['Ballar va sovg‘alar', 'Баллы и призы', 'Points and rewards'],
  myOrders: ['Mening buyurtmalarim', 'Мои заказы', 'My orders'],
  noOrders: ["Hozircha buyurtmalar yo'q", 'Заказов пока нет', 'No orders yet'],
  favEmpty: ["Sevimlilar ro'yxati bo'sh", 'Список избранного пуст', 'Your favorites list is empty'],
  cmpEmpty: ["Taqqoslash ro'yxati bo'sh", 'Список сравнения пуст', 'Nothing to compare yet'],
  welcome: ['Xush kelibsiz', 'Добро пожаловать', 'Welcome'],
  signedInAs: ['Siz kirdingiz:', 'Вы вошли как', 'Signed in as'],
  balance: ['Ballar balansi', 'Баланс баллов', 'Points balance'],
  status: ['Holati', 'Статус', 'Status'],
  statusNew: ['Qabul qilindi', 'Принят', 'Received'],
  date: ['Sana', 'Дата', 'Date'],
  // til
  chooseLang: ['Tilni tanlang', 'Выберите язык', 'Choose your language'],
  chooseLangSub: ["Saytni qaysi tilda ko'rishni xohlaysiz? Keyin yuqoridagi tugmadan o'zgartirish mumkin.", 'На каком языке показывать сайт? Позже можно сменить кнопкой вверху.', 'Which language should the site use? You can change it later from the header.'],
  city: ['Shahar', 'Город', 'City'],
  // sahifalar
  servicesTitle: ['Xizmatlar', 'Услуги', 'Services'],
  servicesLead: ["Yaxshi ta'mirda ishonchli yordam muhim. Murakkab bosqichda yordam kerak bo'lsa — xizmatlarimiz doim yoningizda.", 'В хорошем ремонте важна надежная поддержка. Если вам понадобится помощь на сложном этапе — наши сервисы всегда под рукой.', 'Good renovation needs reliable support. When a step gets hard, our services are at hand.'],
  promosTitle: ['Aksiyalar', 'Акции', 'Promotions'],
  all: ['Hammasi', 'Все', 'All'],
  deliveryTitle: ['Toshkentda yetkazib berish va ko‘tarish', 'Доставка и подъем в Ташкенте', 'Delivery and lifting in Tashkent'],
  deliveryAddrPh: ['Manzil yoki yetkazib berish koordinatalari', 'Адрес или координаты доставки', 'Address or delivery coordinates'],
  deliveryPrices: ['Yetkazib berish narxlari', 'Цены на доставку', 'Delivery prices'],
  deliveryRules: ['Yetkazib berish qoidalari', 'Правила доставки', 'Delivery rules'],
  liftRules: ['Tushirish va ko‘tarish qoidalari', 'Правила разгрузки и подъема', 'Unloading and lifting rules'],
  notFound: ['Sahifa topilmadi', 'Страница не найдена', 'Page not found'],
  toHome: ['Bosh sahifaga', 'На главную', 'Go home'],
  searchResults: ['Qidiruv natijalari', 'Результаты поиска', 'Search results'],
  nothingFound: ["Hech narsa topilmadi. So'rovni o'zgartirib ko'ring.", 'Ничего не найдено. Попробуйте изменить запрос.', 'Nothing found. Try a different query.'],
  feedback: ["Yaxshilashni taklif qilish yoki xato haqida xabar berish", 'Предложить улучшение или сообщить об ошибке', 'Suggest an improvement or report a bug'],
  added: ["Savatga qo'shildi", 'Добавлено в корзину', 'Added to cart'],
  addedFav: ["Sevimlilarga qo'shildi", 'Добавлено в избранное', 'Added to favorites'],
  addedCmp: ["Taqqoslashga qo'shildi", 'Добавлено к сравнению', 'Added to compare'],
  in: ['', 'в', 'in'],
  buyMore: ["Uyingiz uchun hamma narsa — bir joyda", 'Всё для стройки и дома — в одном месте', 'Everything for building and home in one place'],
  heroSub: ["820+ tovar, Toshkent bo'ylab 2 soatda yetkazib berish", '820+ товаров, доставка по Ташкенту за 2 часа', '820+ products, delivery across Tashkent in 2 hours'],
  goCatalog: ["Katalogga o'tish", 'Перейти в каталог', 'Open catalog'],
  seoBuy: ['sotib olish — savdo.uz', 'купить в savdo.uz', 'buy at savdo.uz'],
  seoDelivery: ["Toshkent bo'ylab 2 soatda yoki o'zingizga qulay vaqtda yetkazib beramiz", 'Доставка по Ташкенту за 2 часа или в удобное время', 'Delivery across Tashkent in 2 hours or at a time that suits you'],
  seoAuto: ["Avtomobil yuk ko'tarishi 10 tonnagacha", 'Авто тоннажем до 10 тонн', 'Trucks up to 10 tonnes'],
  seoReturn: ['Tovarni 365 kun ichida qaytarish', 'Возврат товара в течение 365 дней', 'Returns within 365 days'],
  mobileApps: ['Mobil ilovalarimiz', 'Наши мобильные приложения', 'Our mobile apps'],
  scanQr: ['Yuklab olish uchun QR-kodni skanerlang', 'Отсканируйте QR-код, чтобы скачать', 'Scan the QR code to download'],
  weAccept: ["To'lov uchun qabul qilamiz", 'Мы принимаем к оплате', 'We accept'],
  fbTitle: ['Qayta aloqa', 'Обратная связь', 'Feedback'],
  rights: ['Barcha huquqlar himoyalangan.', 'Все права защищены.', 'All rights reserved.'],
  qty: ['Soni', 'Количество', 'Quantity'],
  sum: ["so'm", 'сум', 'UZS'],
  listView: ["Ro'yxat", 'Список', 'List'],
  gridView: ['Panjara', 'Плитка', 'Grid'],
  canGet: ['Qachon olish mumkin', 'Можно получить', 'Get it'],
  today: ['Bugun', 'Сегодня', 'Today'],
  tomorrow: ['Bugun yoki ertaga', 'Сегодня или завтра', 'Today or tomorrow'],
  upTo5: ['5 kungacha', 'До 5 дней', 'Within 5 days'],
  newBadge: ['Yangi', 'Новинка', 'New'],
  hitBadge: ['Xit', 'Хит', 'Hit'],
  dealBadge: ['Foydali taklif', 'Выгодное предложение', 'Great deal'],
  accountMenu: ['Kabinet', 'Кабинет', 'Account'],
  saved: ['Saqlash', 'Сохранить', 'Save'],
  name: ['Ism', 'Имя', 'Name'],
  email: ['Email', 'Email', 'Email'],
  googleAcc: ['Google akkaunt', 'Аккаунт Google', 'Google account'],
  pointsInfo: ["Har bir xariddan 2% ball qaytadi. 1 ball = 1 so'm.", 'С каждой покупки возвращается 2% баллами. 1 балл = 1 сум.', 'Get 2% back in points on every purchase. 1 point = 1 UZS.'],
  clearCmp: ['Ro‘yxatni tozalash', 'Очистить список', 'Clear list'],
  menu: ['Menyu', 'Меню', 'Menu'],
} satisfies Record<string, L3>;

export type DictKey = keyof typeof dict;

const units: Record<UnitKey, L3> = {
  pc: ['dona', 'шт', 'pc'],
  bag: ['qop', 'мешок', 'bag'],
  m2: ['m²', 'м²', 'm²'],
  m: ['m', 'м', 'm'],
  kg: ['kg', 'кг', 'kg'],
  l: ['l', 'л', 'l'],
  pack: ['qadoq', 'упак', 'pack'],
  sheet: ['list', 'лист', 'sheet'],
  set: ['to‘plam', 'компл', 'set'],
  roll: ['rulon', 'рулон', 'roll'],
  m3: ['m³', 'м³', 'm³'],
  t: ['t', 'т', 't'],
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
  tr: (v: L3) => string;
  unit: (u: UnitKey) => string;
  money: (n: number) => string;
  chosen: boolean;
}
const I18nCtx = createContext<Ctx>(null as unknown as Ctx);

function detect(): Lang {
  const n = (navigator.language || 'uz').slice(0, 2);
  return n === 'ru' ? 'ru' : n === 'en' ? 'en' : 'uz';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const saved = storage.get<Lang | null>('lang', null);
  const [lang, setLangState] = useState<Lang>(saved || detect());
  const [chosen, setChosen] = useState<boolean>(!!saved);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    setChosen(true);
    storage.set('lang', l);
  };
  const i = idx[lang];
  const nf = new Intl.NumberFormat('ru-RU');
  const value: Ctx = {
    lang,
    setLang,
    chosen,
    t: (k) => dict[k][i],
    tr: (v) => v[i],
    unit: (u) => units[u][i],
    money: (n) => `${nf.format(n).replace(/[\u00a0\u202f]/g, ' ')} ${dict.sum[i]}`,
  };
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
