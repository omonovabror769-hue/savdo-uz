// savdo.uz sozlamalari
//
// GOOGLE_CLIENT_ID — Google Cloud Console'da yaratilgan "OAuth 2.0 Client ID" (Web application).
// Bu maxfiy kalit EMAS: u har doim brauzerga ochiq yuboriladi, shuning uchun kodda saqlash xavfsiz.
// Bo'sh qolsa, sayt demo rejimida ishlaydi.
export const GOOGLE_CLIENT_ID = '223134394211-q8pa3p1ovp54ndk6cf104pkkdb6vk0gs.apps.googleusercontent.com';

// YOPIQ REJIM: true bo'lsa, saytni faqat quyidagi ro'yxatdagi Gmail'lar ko'radi.
// Sayt tayyor bo'lgach false qiling — hamma uchun ochiladi.
// (Faqat haqiqiy Google kirish ulanganda ishlaydi, ya'ni GOOGLE_CLIENT_ID to'ldirilgan bo'lsa.)
export const PRIVATE_MODE = true;

// Ruxsat berilgan Gmail'lar (kichik harflarda). Yangi odam qo'shish uchun shu ro'yxatga yozing.
export const ALLOWED_EMAILS: string[] = [
  'omonovabror769@gmail.com',
];
