import type { L3 } from './types';

export interface Promo {
  id: string;
  tag: 'club' | 'electric' | 'gift' | 'new' | 'deal' | 'points' | 'sale';
  title: L3;
  text: L3;
  big: string | L3;
  emoji: string;
  bg: string;
  fg: string;
  dates: L3;
  ad?: boolean;
  link?: string;
  img?: string;
}

export const promoTags: { id: Promo['tag'] | 'all'; n: L3 }[] = [
  { id: 'all', n: ['Hammasi', 'Все', 'All'] },
  { id: 'club', n: ["Do'stona narxlar", 'Дружеские цены', 'Friendly prices'] },
  { id: 'points', n: ['Jamg‘arma', 'Накопительные', 'Savings'] },
  { id: 'electric', n: ['Elektrika', 'Электрика', 'Electrical'] },
  { id: 'gift', n: ["Xarid uchun sovg'a", 'Подарок за покупку', 'Gift with purchase'] },
  { id: 'new', n: ['Yangilik', 'Новинка', 'New'] },
  { id: 'deal', n: ['Foydali narx', 'Выгодная цена', 'Great price'] },
  { id: 'sale', n: ['Sotuv', 'Распродажа', 'Sale'] },
];

export const promos: Promo[] = [
  { id: 'p1', tag: 'club', big: '1 000', emoji: '🎟️', bg: 'linear-gradient(135deg,#14171c,#2b3340)', fg: '#ff7a7e',
    title: ["Do'stlar klubiga 1 000 so'mga", 'В Клуб друзей за 1 000 сум', 'Join the Friends club for 1 000 UZS'],
    text: ["Klubga kirish chegarasi bekor qilindi — ballar va maxsus narxlar darhol.", 'Отменили порог вступления — баллы и особые цены сразу.', 'No entry threshold — points and special prices right away.'],
    dates: ['1-oktabrdan 31-dekabrgacha', 'с 1 октября по 31 декабря', 'Oct 1 – Dec 31'], link: '/account' },
  { id: 'p2', tag: 'club', big: ["DO'STONA NARXLAR", 'ДРУЖЕСКИЕ ЦЕНЫ', 'FRIENDLY PRICES'], emoji: '🤝', bg: 'linear-gradient(135deg,#7a3412,#c2651a)', fg: '#ffe9a8',
    title: ["Do'stona narxlar", 'Дружеские цены', 'Friendly prices'],
    text: ["Qurilish va ta'mir uchun tovarlarga klub a'zolari uchun maxsus narxlar.", 'Товары для стройки и ремонта по выгодным ценам для членов клуба.', 'Special prices on building and renovation goods for club members.'],
    dates: ['Doimiy', 'Постоянно', 'Ongoing'], link: '/catalog/stroy' },
  { id: 'p3', tag: 'gift', big: '50 000 000', emoji: '🎁', bg: 'linear-gradient(135deg,#e31e24,#b3121a)', fg: '#ffffff', ad: true,
    title: ["Ta'mir uchun 50 mln so'm yutib oling", 'Дарим 50 млн сум на ремонт', 'Win 50 million UZS for renovation'],
    text: ["Karta orqali 500 000 so'mdan xarid qiling va o'yinda ishtirok eting.", 'Покупайте картой от 500 000 сум и участвуйте в розыгрыше.', 'Pay by card from 500 000 UZS and join the prize draw.'],
    dates: ['8-oktabrdan 31-dekabrgacha', 'с 8 октября по 31 декабря', 'Oct 8 – Dec 31'] },
  { id: 'p4', tag: 'sale', big: '−40%', emoji: '🏷️', bg: 'linear-gradient(135deg,#5b21b6,#db2777)', fg: '#ffffff',
    title: ['Sotuv', 'Распродажа', 'Sale'],
    text: ["Ta'mir yakuniga oxirgi dona tovarlarni pasaytirilgan narxda olishga ulguring.", 'Успейте купить последние единицы товара по сниженным ценам.', 'Grab the last units at reduced prices before they are gone.'],
    dates: ['Doimiy', 'Постоянно', 'Ongoing'], link: '/sale' },
  { id: 'p5', tag: 'points', big: '+2%', emoji: '🪙', bg: 'linear-gradient(135deg,#1f2937,#374151)', fg: '#ff7a7e',
    title: ["Hamkorlardan ballar", 'Баллы от партнеров Клуба друзей', 'Partner points'],
    text: ["Hamkor tovarlarini xarid qiling va qo'shimcha ballar oling.", 'Покупайте товары партнеров и получайте дополнительные баллы.', 'Buy partner products and earn extra points.'],
    dates: ['Doimiy', 'Постоянно', 'Ongoing'] },
  { id: 'p6', tag: 'deal', big: '%', emoji: '🧱', bg: 'linear-gradient(135deg,#ffb100,#ff8a00)', fg: '#1d1d1d',
    title: ['Foydali narx', 'Выгодная цена', 'Great price'],
    text: ["Hozir tanlangan tovarlar narxi pasaytirildi. Muddat cheklangan.", 'Цена на эти товары сейчас снижена. Срок действия ограничен.', 'Prices on these items are reduced right now. Limited time.'],
    dates: ['31-oktabrgacha', 'до 31 октября', 'Until Oct 31'], link: '/sale' },
  { id: 'p7', tag: 'gift', big: '+25', emoji: '🪣', bg: 'linear-gradient(135deg,#0ea5e9,#2563eb)', fg: '#ffffff', ad: true,
    title: ["Ceresit zatirkasi uchun 25 ball sovg'a", '25 баллов в подарок за покупку затирки Церезит', '25 points for buying Ceresit grout'],
    text: ["100 000 so'mdan ortiq xarid uchun 25 ball.", 'При покупке от 100 000 сум.', 'On purchases over 100 000 UZS.'],
    dates: ['1-noyabrgacha', 'до 1 ноября', 'Until Nov 1'] },
  { id: 'p8', tag: 'electric', big: '−10%', emoji: '🔌', bg: 'linear-gradient(135deg,#111827,#0f766e)', fg: '#5eead4',
    title: ['SIP kabeliga savatda 10% gacha chegirma', 'Выгода в корзине до 10% на кабель СИП', 'Up to 10% off SIP cable in the cart'],
    text: ["Kabel va o'tkazgichlar uchun maxsus taklif.", 'Специальное предложение на кабель и провод.', 'Special offer on cable and wire.'],
    dates: ['15-noyabrgacha', 'до 15 ноября', 'Until Nov 15'], link: '/catalog/electric' },
  { id: 'p9', tag: 'new', big: '600', emoji: '🛁', bg: 'linear-gradient(135deg,#e7e5e4,#a8a29e)', fg: '#1c1917', ad: true,
    title: ["Keramogranit uchun 600 ball sovg'a", '600 баллов за покупку керамогранита', '600 points for porcelain tiles'],
    text: ["Kerama Marazzi kolleksiyasidan xarid qiling.", 'При покупке коллекции Kerama Marazzi.', 'When you buy the Kerama Marazzi collection.'],
    dates: ['30-noyabrgacha', 'до 30 ноября', 'Until Nov 30'], link: '/catalog/finish' },
  { id: 'p10', tag: 'gift', big: ["SOVG'A", 'ПОДАРОК', 'GIFT'], emoji: '🎀', bg: 'linear-gradient(135deg,#ffffff,#fde2e1)', fg: '#e31e24', ad: true,
    title: ["Profillar xaridiga lenta sovg'a", 'Лента в подарок при покупке профилей', 'Free tape with profiles'],
    text: ["15 dona profil uchun armirlovchi lenta sovg'a.", 'При покупке 15 профилей — армирующая лента в подарок.', 'Buy 15 profiles and get reinforcing tape free.'],
    dates: ['31-oktabrgacha', 'до 31 октября', 'Until Oct 31'] },
  { id: 'p11', tag: 'points', big: '1000', emoji: '🔥', bg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)', fg: '#ffffff', ad: true,
    title: ["Issiqlik pushkasi uchun 1000 ball", '1000 баллов при покупке тепловой пушки', '1000 points with a heat gun'],
    text: ["Kuzgi mavsum uchun isitish uskunalari.", 'Обогреватели к осеннему сезону.', 'Heating equipment for the autumn season.'],
    dates: ['31-dekabrgacha', 'до 31 декабря', 'Until Dec 31'] },
  { id: 'p12', tag: 'electric', big: '100', emoji: '💡', bg: 'linear-gradient(135deg,#f5f5f4,#d6d3d1)', fg: '#111827', ad: true,
    title: ['Chiroqlar xaridiga 100 ball', '100 баллов при покупке светильников', '100 points with ceiling lights'],
    text: ["3 ta chiroq xaridida 100 ball qo'shiladi.", 'При покупке 3 светильников — 100 баллов.', 'Buy 3 lights and get 100 points.'],
    dates: ['1-dekabrgacha', 'до 1 декабря', 'Until Dec 1'], link: '/catalog/electric' },
];

export interface Service { id: string; e: string; n: L3; img?: string }
export const services: Service[] = [
  { id: 'delivery', e: '🚚', n: ["Yetkazib berish va ko'tarish", 'Доставка и подъем', 'Delivery and lifting'] },
  { id: 'return', e: '📦', n: ['Qaytarish', 'Возврат', 'Returns'] },
  { id: 'rent', e: '🔧', n: ['Asbob ijarasi', 'Аренда инструмента', 'Tool rental'] },
  { id: 'tint', e: '🎨', n: ["Bo'yoqlarni kolerlash", 'Колеровка красок и штукатурок', 'Paint tinting'] },
  { id: 'cut', e: '🪚', n: ['Arralash', 'Распил', 'Cutting to size'] },
  { id: 'trash', e: '🗑️', n: ['Qurilish chiqindisini olib ketish', 'Вывоз мусора', 'Waste removal'] },
  { id: 'lumber', e: '🪵', n: ["Yog'och materiallarni saralash", 'Переборка пиломатериалов', 'Lumber sorting'] },
  { id: 'calc', e: '🧮', n: ["Ta'mir kalkulyatori", 'Калькулятор ремонта', 'Renovation calculator'] },
  { id: 'build-calc', e: '📐', n: ['Qurilish kalkulyatori', 'Строительный калькулятор', 'Building calculator'] },
  { id: 'showroom', e: '🏠', n: ['3D shourum', '3D шоурум', '3D showroom'] },
  { id: 'fitting', e: '🖼️', n: ['Virtual primerka', 'Виртуальная примерочная', 'Virtual fitting room'] },
  { id: 'pro', e: '👷', n: ['Ustalar birjasi', 'Биржа профессионалов', 'Find a contractor'] },
  { id: 'repair', e: '🛠️', n: ["Kalit topshirish ta'miri", 'Ремонт под ключ', 'Turnkey renovation'] },
  { id: 'bath', e: '🛁', n: ["Vannaxona ta'miri", 'Ремонт ванных комнат', 'Bathroom renovation'] },
  { id: 'design', e: '✏️', n: ['Dizayn loyihasi', 'Дизайн-проект', 'Interior design'] },
  { id: 'accept', e: '🔑', n: ['Kvartirani qabul qilish', 'Приемка квартир', 'Apartment inspection'] },
  { id: 'floor', e: '🧩', n: ["Pol qoplamalarini yotqizish", 'Укладка напольных покрытий', 'Floor installation'] },
  { id: 'doors', e: '🚪', n: ["Eshik o'rnatish", 'Установка дверей', 'Door installation'] },
  { id: 'fence', e: '🚧', n: ["To'siq va qoziq o'rnatish", 'Установка заборов и свай', 'Fence installation'] },
  { id: 'electro', e: '⚡', n: ['Elektr montaj ishlari', 'Электромонтажные работы', 'Electrical works'] },
  { id: 'plumb', e: '🚿', n: ["Santexnika o'rnatish", 'Установка сантехники', 'Plumbing installation'] },
  { id: 'tile', e: '🔲', n: ['Plitka yotqizish', 'Укладка плитки', 'Tiling'] },
  { id: 'measure', e: '📏', n: ["O'lchash va oshxona o'rnatish", 'Замер и установка кухни', 'Kitchen measuring and fitting'] },
  { id: 'concrete', e: '🏗️', n: ['Beton va qum yetkazish', 'Доставка бетона, песка и щебня', 'Concrete and sand delivery'] },
];

export const cities: L3[] = [
  ['Toshkent', 'Ташкент', 'Tashkent'],
  ['Samarqand', 'Самарканд', 'Samarkand'],
  ['Buxoro', 'Бухара', 'Bukhara'],
  ["Farg'ona", 'Фергана', 'Fergana'],
  ['Andijon', 'Андижан', 'Andijan'],
  ['Namangan', 'Наманган', 'Namangan'],
  ['Nukus', 'Нукус', 'Nukus'],
  ['Qarshi', 'Карши', 'Karshi'],
];

export const trucks: { e: string; n: L3; price: number; cap: number }[] = [
  { e: '📦', n: ['10 kg gacha', 'До 10 кг', 'Up to 10 kg'], price: 29000, cap: 10 },
  { e: '🚐', n: ['Kuryer ekspress', 'Курьер Экспресс', 'Express courier'], price: 49000, cap: 50 },
  { e: '🛻', n: ['Damas 0.5 t', 'Damas 0.5 т', 'Damas 0.5 t'], price: 120000, cap: 500 },
  { e: '🚚', n: ['Labo 1 t', 'Labo 1 т', 'Labo 1 t'], price: 180000, cap: 1000 },
  { e: '🚛', n: ['Isuzu 3.5 t', 'Isuzu 3.5 т', 'Isuzu 3.5 t'], price: 350000, cap: 3500 },
  { e: '🏗️', n: ['Manipulyator 6 t', 'Манипулятор 6 т', 'Crane truck 6 t'], price: 650000, cap: 6000 },
  { e: '🚜', n: ['Manipulyator 10 t', 'Манипулятор 10 т', 'Crane truck 10 t'], price: 950000, cap: 10000 },
];

export const districts: { n: L3; km: number }[] = [
  { n: ['Chilonzor', 'Чиланзар', 'Chilanzar'], km: 3 },
  { n: ['Yunusobod', 'Юнусабад', 'Yunusabad'], km: 12 },
  { n: ['Mirzo Ulug‘bek', 'Мирзо-Улугбек', 'Mirzo Ulugbek'], km: 14 },
  { n: ['Yakkasaroy', 'Яккасарай', 'Yakkasaray'], km: 6 },
  { n: ['Shayxontohur', 'Шайхантахур', 'Shaykhantakhur'], km: 8 },
  { n: ['Olmazor', 'Алмазар', 'Almazar'], km: 9 },
  { n: ['Uchtepa', 'Учтепа', 'Uchtepa'], km: 7 },
  { n: ['Sergeli', 'Сергели', 'Sergeli'], km: 11 },
  { n: ['Yashnobod', 'Яшнабад', 'Yashnabad'], km: 15 },
  { n: ['Mirobod', 'Мирабад', 'Mirabad'], km: 9 },
  { n: ['Bektemir', 'Бектемир', 'Bektemir'], km: 20 },
  { n: ['Yangihayot', 'Янгихаёт', 'Yangikhayot'], km: 16 },
  { n: ['Toshkent viloyati', 'Ташкентская область', 'Tashkent region'], km: 35 },
];

export const heroSlides: { bg: string; fg: string; emoji: string; to: string; t: L3; s: L3 }[] = [
  {
    bg: 'linear-gradient(110deg,#e31e24 0%,#e31e24 55%,#b3121a 100%)', fg: '#ffffff', emoji: '🧱🪣🛠️', to: '/catalog/stroy',
    t: ["Kuzgi ta'mir mavsumi: qurilish materiallariga −20% gacha", 'Осенний сезон ремонта: до −20% на стройматериалы', 'Autumn renovation season: up to −20% on building materials'],
    s: ["Sement, g'isht, gipsokarton va aralashmalar — Toshkent bo'ylab 2 soatda yetkazamiz", 'Цемент, кирпич, гипсокартон и смеси — доставим по Ташкенту за 2 часа', 'Cement, bricks, drywall and mixes delivered across Tashkent in 2 hours'],
  },
  {
    bg: 'linear-gradient(110deg,#17191d 0%,#2c3038 100%)', fg: '#ffffff', emoji: '🔌💡⚡', to: '/catalog/electric',
    t: ['Elektrika: kabel va avtomatlarga foydali narxlar', 'Электрика: выгодные цены на кабель и автоматы', 'Electrical: great prices on cable and breakers'],
    s: ["Legrand, Schneider Electric, IEK — rasmiy kafolat bilan", 'Legrand, Schneider Electric, IEK — с официальной гарантией', 'Legrand, Schneider Electric, IEK with official warranty'],
  },
  {
    bg: 'linear-gradient(110deg,#0f5132 0%,#198754 100%)', fg: '#ffffff', emoji: '🌿🔥🍖', to: '/catalog/garden',
    t: ["Bog' va dam olish: mangal, qozon va bog' texnikasi", 'Сад и досуг: мангалы, казаны и садовая техника', 'Garden & leisure: grills, kazans and garden machinery'],
    s: ["Dala hovli uchun hamma narsa bir joyda", 'Всё для дачи в одном месте', 'Everything for your country house in one place'],
  },
];
