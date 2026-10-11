import type { L3 } from './types';

export interface Store {
  id: string;
  city: number; // content.ts dagi cities indeksi
  name: L3;
  address: L3;
  hours: string;
  phone: string;
  features: ('pickup' | 'cut' | 'tint' | 'rent' | 'truck')[];
}

export const storeFeatures: Record<Store['features'][number], L3> = {
  pickup: ["Olib ketish punkti", 'Пункт самовывоза', 'Pickup point'],
  cut: ['Arralash', 'Распил', 'Cutting'],
  tint: ['Kolerlash', 'Колеровка', 'Tinting'],
  rent: ['Asbob ijarasi', 'Аренда инструмента', 'Tool rental'],
  truck: ['Yuk mashinasi uchun maydon', 'Площадка для грузовиков', 'Truck loading area'],
};

export const stores: Store[] = [
  { id: 'tash-chilonzor', city: 0, name: ['savdo.uz Chilonzor', 'savdo.uz Чиланзар', 'savdo.uz Chilanzar'], address: ["Toshkent, Chilonzor tumani, Bunyodkor shoh ko'chasi, 42", 'Ташкент, Чиланзарский район, проспект Бунёдкор, 42', 'Tashkent, Chilanzar district, Bunyodkor Ave, 42'], hours: '08:00–22:00', phone: '+998 (71) 200-00-01', features: ['pickup', 'cut', 'tint', 'rent', 'truck'] },
  { id: 'tash-sergeli', city: 0, name: ['savdo.uz Sergeli', 'savdo.uz Сергели', 'savdo.uz Sergeli'], address: ["Toshkent, Sergeli tumani, Yangi Sergeli ko'chasi, 7", 'Ташкент, Сергелийский район, улица Янги Сергели, 7', 'Tashkent, Sergeli district, Yangi Sergeli St, 7'], hours: '08:00–21:00', phone: '+998 (71) 200-00-02', features: ['pickup', 'cut', 'truck'] },
  { id: 'tash-yunusobod', city: 0, name: ['savdo.uz Yunusobod', 'savdo.uz Юнусабад', 'savdo.uz Yunusabad'], address: ["Toshkent, Yunusobod tumani, Amir Temur shoh ko'chasi, 108", 'Ташкент, Юнусабадский район, проспект Амира Темура, 108', 'Tashkent, Yunusabad district, Amir Temur Ave, 108'], hours: '09:00–22:00', phone: '+998 (71) 200-00-03', features: ['pickup', 'tint', 'rent'] },
  { id: 'tash-qoyliq', city: 0, name: ["savdo.uz Qo'yliq", 'savdo.uz Куйлюк', 'savdo.uz Kuylyuk'], address: ["Toshkent, Bektemir tumani, Qo'yliq bozori yonida", 'Ташкент, Бектемирский район, рядом с рынком Куйлюк', 'Tashkent, Bektemir district, next to Kuylyuk market'], hours: '07:00–20:00', phone: '+998 (71) 200-00-04', features: ['pickup', 'cut', 'truck', 'rent'] },
  { id: 'samarqand', city: 1, name: ['savdo.uz Samarqand', 'savdo.uz Самарканд', 'savdo.uz Samarkand'], address: ["Samarqand, Rudakiy ko'chasi, 150", 'Самарканд, улица Рудаки, 150', 'Samarkand, Rudaki St, 150'], hours: '08:00–21:00', phone: '+998 (66) 200-00-00', features: ['pickup', 'cut', 'tint'] },
  { id: 'buxoro', city: 2, name: ['savdo.uz Buxoro', 'savdo.uz Бухара', 'savdo.uz Bukhara'], address: ["Buxoro, Alpomish ko'chasi, 21", 'Бухара, улица Алпомиш, 21', 'Bukhara, Alpomish St, 21'], hours: '08:00–20:00', phone: '+998 (65) 200-00-00', features: ['pickup', 'tint'] },
  { id: 'fargona', city: 3, name: ["savdo.uz Farg'ona", 'savdo.uz Фергана', 'savdo.uz Fergana'], address: ["Farg'ona, Mustaqillik ko'chasi, 64", 'Фергана, улица Мустакиллик, 64', 'Fergana, Mustakillik St, 64'], hours: '08:00–20:00', phone: '+998 (73) 200-00-00', features: ['pickup', 'cut'] },
  { id: 'andijon', city: 4, name: ['savdo.uz Andijon', 'savdo.uz Андижан', 'savdo.uz Andijan'], address: ["Andijon, Bobur shoh ko'chasi, 12", 'Андижан, проспект Бобура, 12', 'Andijan, Babur Ave, 12'], hours: '08:00–20:00', phone: '+998 (74) 200-00-00', features: ['pickup', 'tint'] },
  { id: 'namangan', city: 5, name: ['savdo.uz Namangan', 'savdo.uz Наманган', 'savdo.uz Namangan'], address: ["Namangan, Islom Karimov ko'chasi, 33", 'Наманган, улица Ислама Каримова, 33', 'Namangan, Islam Karimov St, 33'], hours: '08:00–20:00', phone: '+998 (69) 200-00-00', features: ['pickup', 'cut'] },
  { id: 'nukus', city: 6, name: ['savdo.uz Nukus', 'savdo.uz Нукус', 'savdo.uz Nukus'], address: ["Nukus, Berdaq ko'chasi, 5", 'Нукус, улица Бердаха, 5', 'Nukus, Berdakh St, 5'], hours: '09:00–19:00', phone: '+998 (61) 200-00-00', features: ['pickup'] },
  { id: 'qarshi', city: 7, name: ['savdo.uz Qarshi', 'savdo.uz Карши', 'savdo.uz Karshi'], address: ["Qarshi, Mustaqillik ko'chasi, 90", 'Карши, улица Мустакиллик, 90', 'Karshi, Mustakillik St, 90'], hours: '08:00–20:00', phone: '+998 (75) 200-00-00', features: ['pickup', 'cut'] },
];
