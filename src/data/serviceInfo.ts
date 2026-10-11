import type { L3 } from './types';

export type ServiceKind = 'order' | 'calc-repair' | 'calc-build' | 'rent' | 'link';

export interface ServiceInfo {
  kind: ServiceKind;
  d: L3; // qisqa tavsif
  price?: number; // narx so'mda ("...dan")
  per?: L3; // narx birligi
  to?: string; // kind = 'link' bo'lsa — qaysi sahifaga
}

const m2: L3 = ['m² uchun', 'за м²', 'per m²'];
const job: L3 = ['xizmat uchun', 'за услугу', 'per job'];
const pc: L3 = ['dona uchun', 'за шт', 'per item'];
const hr: L3 = ['soat uchun', 'за час', 'per hour'];

export const serviceInfo: Record<string, ServiceInfo> = {
  delivery: { kind: 'link', to: '/delivery', d: ["Toshkent bo'ylab 2 soatda yoki qulay vaqtda yetkazib beramiz.", 'Доставим по Ташкенту за 2 часа или в удобное время.', 'Delivery across Tashkent in 2 hours or at a convenient time.'] },
  return: { kind: 'link', to: '/returns', d: ['Tovarni 365 kun ichida qaytarish mumkin.', 'Вернуть товар можно в течение 365 дней.', 'Return products within 365 days.'] },
  rent: { kind: 'rent', d: ["Perforator, bolgarka, payvandlash apparati va boshqa asboblarni kunlik ijaraga oling.", 'Возьмите в аренду перфоратор, болгарку, сварочный аппарат и другие инструменты посуточно.', 'Rent rotary hammers, grinders, welders and other tools by the day.'] },
  tint: { kind: 'order', price: 15000, per: job, d: ["Bo'yoq va shtukaturkani 2000+ rangga kompyuterda kolerlaymiz. 15 daqiqada tayyor.", 'Компьютерная колеровка красок и штукатурок в 2000+ оттенков. Готово за 15 минут.', 'Computer tinting of paints and plasters in 2000+ shades. Ready in 15 minutes.'] },
  cut: { kind: 'order', price: 3000, per: ['kesim uchun', 'за рез', 'per cut'], d: ["DSP, MDF, fanera va OSB plitalarni o'lchamingiz bo'yicha arralaymiz.", 'Распилим ДСП, МДФ, фанеру и OSB по вашим размерам.', 'We cut chipboard, MDF, plywood and OSB to your dimensions.'] },
  trash: { kind: 'order', price: 250000, per: ['reys uchun', 'за рейс', 'per trip'], d: ["Qurilish chiqindisini qoplarda yoki konteynerda olib ketamiz.", 'Вывезем строительный мусор в мешках или контейнере.', 'We remove construction waste in bags or a container.'] },
  lumber: { kind: 'order', price: 50000, per: ['m³ uchun', 'за м³', 'per m³'], d: ["Yog'och materiallarni sifati bo'yicha saralab beramiz.", 'Переберём пиломатериалы по качеству.', 'We sort lumber by quality for you.'] },
  calc: { kind: 'calc-repair', d: ["Xona o'lchamlarini kiriting — bo'yoq, oboy, laminat va plintus miqdori va narxini hisoblaymiz.", 'Введите размеры комнаты — посчитаем количество и стоимость краски, обоев, ламината и плинтуса.', 'Enter room dimensions to calculate the amount and cost of paint, wallpaper, laminate and skirting.'] },
  'build-calc': { kind: 'calc-build', d: ["Devor uchun g'isht yoki blok, poydevor uchun sement, qum va shag'al miqdorini hisoblang.", 'Рассчитайте кирпич или блоки для стены и цемент, песок, щебень для фундамента.', 'Calculate bricks or blocks for walls and cement, sand and gravel for a foundation.'] },
  showroom: { kind: 'order', price: 0, d: ["Shourumda tayyor interyerlarni ko'ring va maslahatchi bilan uchrashuv belgilang.", 'Посмотрите готовые интерьеры в шоуруме и запишитесь к консультанту.', 'See finished interiors in the showroom and book a consultant.'] },
  fitting: { kind: 'order', price: 0, d: ["Xonangiz suratini yuboring — plitka, oboy va pol qoplamalarini virtual tarzda ko'rsatamiz.", 'Пришлите фото комнаты — покажем плитку, обои и напольные покрытия виртуально.', 'Send a room photo and we will show tiles, wallpaper and flooring virtually.'] },
  pro: { kind: 'order', price: 0, d: ["Tekshirilgan ustalar va brigadalarni toping: santexnik, elektrik, plitkachi.", 'Найдите проверенных мастеров и бригады: сантехник, электрик, плиточник.', 'Find vetted contractors: plumbers, electricians, tilers.'] },
  repair: { kind: 'order', price: 1800000, per: m2, d: ["Kalit topshirish ta'miri: smeta, materiallar va ishlar bitta shartnomada.", 'Ремонт под ключ: смета, материалы и работы в одном договоре.', 'Turnkey renovation: estimate, materials and work in one contract.'] },
  bath: { kind: 'order', price: 9500000, per: job, d: ["Vannaxonani 14 kunda ta'mirlaymiz, 2 yil kafolat.", 'Отремонтируем ванную за 14 дней, гарантия 2 года.', 'Bathroom renovation in 14 days with a 2-year warranty.'] },
  design: { kind: 'order', price: 120000, per: m2, d: ["Dizayner xonangiz uchun loyiha va materiallar ro'yxatini tayyorlaydi.", 'Дизайнер подготовит проект и список материалов для вашей комнаты.', 'A designer prepares a project and materials list for your room.'] },
  accept: { kind: 'order', price: 600000, per: job, d: ["Yangi uyni qabul qilishda mutaxassis kamchiliklarni tekshiradi va dalolatnoma tuzadi.", 'Специалист проверит новую квартиру на дефекты и составит акт.', 'An expert inspects your new apartment for defects and writes a report.'] },
  floor: { kind: 'order', price: 45000, per: m2, d: ["Laminat, linoleum va kvarts-vinil yotqizish.", 'Укладка ламината, линолеума и кварц-винила.', 'Laminate, linoleum and vinyl floor installation.'] },
  doors: { kind: 'order', price: 350000, per: pc, d: ["Ichki va kirish eshiklarini o'rnatamiz.", 'Установим межкомнатные и входные двери.', 'Interior and entrance door installation.'] },
  fence: { kind: 'order', price: 120000, per: ['metr uchun', 'за метр', 'per metre'], d: ["Profnastil, setka va yog'och to'siqlar, vintli qoziqlar o'rnatish.", 'Установка заборов из профнастила, сетки и дерева, винтовых свай.', 'Fences from profiled sheet, mesh and wood, screw piles.'] },
  electro: { kind: 'order', price: 90000, per: ['nuqta uchun', 'за точку', 'per point'], d: ['Rozetka, avtomat, chiroq va kabel montaji.', 'Монтаж розеток, автоматов, светильников и кабеля.', 'Installation of sockets, breakers, lights and cable.'] },
  plumb: { kind: 'order', price: 250000, per: pc, d: ["Unitaz, rakovina, smesitel va suv isitgich o'rnatish.", 'Установка унитазов, раковин, смесителей и водонагревателей.', 'Installation of toilets, basins, mixers and water heaters.'] },
  tile: { kind: 'order', price: 110000, per: m2, d: ['Pol va devorga plitka yotqizish.', 'Укладка плитки на пол и стены.', 'Floor and wall tiling.'] },
  measure: { kind: 'order', price: 0, d: ["O'lchovchi bepul keladi, oshxonani loyihalaydi va o'rnatadi.", 'Замерщик приедет бесплатно, спроектирует и установит кухню.', 'A free measurer visits, designs and installs your kitchen.'] },
  concrete: { kind: 'order', price: 950000, per: ['m³ uchun', 'за м³', 'per m³'], d: ["Tayyor beton, qum va shag'alni avtobetonaralashtirgich yoki samosvalda yetkazamiz.", 'Доставим бетон, песок и щебень миксером или самосвалом.', 'Ready-mix concrete, sand and gravel delivered by mixer or tipper.'] },
};

export const hourWord = hr;
