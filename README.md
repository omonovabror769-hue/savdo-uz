# savdo.uz — qurilish va uy tovarlari marketpleysi

React + TypeScript + Vite asosidagi internet-do'kon. 3 tilda (O'zbekcha / Русский / English), kirish faqat Google orqali.

## Imkoniyatlar

- **9 ta bo'lim, 75 ta kichik kategoriya, ~820 ta tovar** — narxlari so'mda (`src/data/cats/*.ts`)
- **3 til**: birinchi kirganda til tanlash oynasi chiqadi, keyin yuqoridagi UZ / RU / EN tugmasi bilan almashtiriladi
- **Google orqali kirish (faqat Google)**: Google Identity Services, `auto_select` yoqilgan — ilgari kirgan foydalanuvchi keyingi safar avtomatik kiradi (One Tap)
- Katalog mega-menyusi, kategoriya sahifalari, filtrlar (narx, brend, mavjudlik, chegirma), saralash, ro'yxat/panjara ko'rinishi
- Tovar sahifasi (variantlar, xususiyatlar), qidiruv (3 tilda ishlaydi)
- Savat, buyurtma rasmiylashtirish (kuryer / olib ketish, karta / naqd), buyurtmalar tarixi
- Sevimlilar, taqqoslash, shaxsiy kabinet, ballar
- Aksiyalar, Xizmatlar, Yetkazib berish sahifalari
- Telefon va kompyuterga moslashgan

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tayyor sayt dist/ papkasida
```

## Google orqali kirishni ulash

1. https://console.cloud.google.com/apis/credentials → **Create credentials → OAuth client ID → Web application**
2. **Authorized JavaScript origins** ga sayt manzillarini qo'shing:
   - `http://localhost:5173`
   - `https://<github-login>.github.io` (GitHub Pages uchun)
   - `https://savdo.uz` (o'z domeningiz)
3. Client ID ni oling va loyiha ildizida `.env` fayl yarating:

```
VITE_GOOGLE_CLIENT_ID=1234567890-xxxxxxxx.apps.googleusercontent.com
```

Client ID qo'shilmaguncha sayt **demo rejimda** ishlaydi: "Google orqali kirish" tugmasi sinov akkaunti bilan kiritadi.

> Muhim: hozir foydalanuvchi ma'lumotlari brauzerda saqlanadi (backend yo'q). Haqiqiy savdo uchun backend qo'shganda Google'dan kelgan ID tokenni serverda tekshirish kerak.

## GitHub'ga joylash

```bash
git init
git add .
git commit -m "savdo.uz: birinchi versiya"
git branch -M main
git remote add origin https://github.com/<login>/savdo-uz.git
git push -u origin main
```

**GitHub Pages**: repo → Settings → Pages → Source: **GitHub Actions**. `.github/workflows/deploy.yml` har push'da saytni avtomatik yig'ib joylaydi.
Google Client ID ni repo → Settings → Secrets and variables → Actions → **Variables** bo'limiga `VITE_GOOGLE_CLIENT_ID` nomi bilan qo'shing.

## Tuzilma

```
src/
  data/cats/*.ts     — tovarlar va narxlar (har bo'lim alohida fayl)
  data/catalog.ts    — tovarlar ro'yxatini yasash, qidiruv
  data/content.ts    — aksiyalar, xizmatlar, shaharlar, yetkazib berish tariflari
  i18n/index.tsx     — barcha matnlar 3 tilda
  store/auth.ts      — Google orqali kirish
  store/index.tsx    — savat, sevimlilar, buyurtmalar
  components/        — Header, mahsulot kartalari, filtrlar, modal oynalar
  pages/             — sahifalar
  styles.css         — dizayn
```

## Tovar qo'shish

`src/data/cats/` dagi kerakli faylga yangi qator qo'shing:

```ts
{ n: ["O'zbekcha nomi", "Русское название", "English name"], u: 'pc', e: '🧱',
  v: [["250×120×65 mm", 1900], ["250×120×88 mm", 2600]],   // [o'lcham, narx so'mda]
  b: ["Brend 1", "Brend 2"],
  img: "https://.../rasm.jpg" }                              // ixtiyoriy: haqiqiy rasm
```
