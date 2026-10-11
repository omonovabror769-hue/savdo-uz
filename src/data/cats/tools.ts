import type { Category } from '../types';

const c: Category = {
  id: 'tools',
  e: '🛠️',
  n: ["Asboblar", "Инструмент", "Tools"],
  subs: [
    {
      id: 'tools-drill',
      e: '🔧',
      n: ["Drellar va shurupovertlar", "Дрели и шуруповёрты", "Drills and screwdrivers"],
      items: [
        {
          n: ["Akkumulyatorli drel-shurupovert", "Дрель-шуруповёрт аккумуляторный", "Cordless drill driver"],
          u: 'pc', e: '🔧',
          v: [["12 V, 2×2.0 Ah", 690000], ["18 V, 2×2.0 Ah", 1150000], ["18 V BL, 2×4.0 Ah", 1790000]],
          b: ["Bosch", "Makita", "Dewalt"],
        },
        {
          n: ["Zarbli akkumulyatorli drel", "Дрель-шуруповёрт ударный аккумуляторный", "Cordless impact drill driver"],
          u: 'pc', e: '🔧',
          v: [["18 V, 2×2.0 Ah", 1350000], ["18 V BL, 2×5.0 Ah", 2150000]],
          b: ["Makita", "Dewalt", "Bosch"],
        },
        {
          n: ["Elektr drel tarmoqdan ishlaydigan", "Дрель электрическая сетевая", "Corded electric drill"],
          u: 'pc', e: '🔌',
          v: [["500 W, 13 mm", 340000], ["710 W, 13 mm", 520000], ["800 W, 13 mm, 3000 bpm", 640000]],
          b: ["Bosch", "Makita", "Zubr"],
        },
        {
          n: ["Mini akkumulyatorli otvyortka", "Аккумуляторная отвёртка мини", "Mini cordless screwdriver"],
          u: 'pc', e: '🪛',
          v: [["3.6 V, 1.5 Ah", 285000], ["4 V, 2.0 Ah", 365000]],
          b: ["Bosch", "Stanley", "Matrix"],
        },
      ],
    },
    {
      id: 'tools-rotary',
      e: '🔨',
      n: ["Perforatorlar", "Перфораторы", "Rotary hammers"],
      items: [
        {
          n: ["Perforator SDS-plus", "Перфоратор SDS-plus", "SDS-plus rotary hammer"],
          u: 'pc', e: '🔨',
          v: [["600 W, 2.0 J", 780000], ["800 W, 2.7 J", 1150000], ["1100 W, 3.5 J", 1590000]],
          b: ["Bosch", "Makita", "Dewalt"],
        },
        {
          n: ["Perforator SDS-max", "Перфоратор SDS-max", "SDS-max rotary hammer"],
          u: 'pc', e: '🔨',
          v: [["1100 W, 8 J", 3250000], ["1500 W, 11 J", 5200000]],
          b: ["Makita", "Bosch", "Dewalt"],
        },
        {
          n: ["Akkumulyatorli perforator", "Перфоратор аккумуляторный", "Cordless rotary hammer"],
          u: 'pc', e: '🔋',
          v: [["18 V, 2.0 J, 2×4.0 Ah", 2350000], ["36 V, 3.0 J, 2×5.0 Ah", 4150000]],
          b: ["Makita", "Bosch", "Dewalt"],
        },
        {
          n: ["Demontaj bolg'asi (otboynik)", "Отбойный молоток", "Demolition hammer"],
          u: 'pc', e: '⛏️',
          v: [["1300 W, 16 J", 3650000], ["1600 W, 25 J", 5900000], ["1750 W, 28 J, HEX 30", 8400000]],
          b: ["Makita", "Bosch", "Inforce"],
        },
      ],
    },
    {
      id: 'tools-grinder',
      e: '⚙️',
      n: ["Burchak jilvirlagichlar (bolgarka)", "Углошлифовальные машины (болгарки)", "Angle grinders"],
      items: [
        {
          n: ["Burchak jilvirlagich 125 mm", "УШМ 125 мм", "Angle grinder 125 mm"],
          u: 'pc', e: '⚙️',
          v: [["Ø125, 750 W", 395000], ["Ø125, 900 W", 560000], ["Ø125, 1200 W, 10000 rpm", 780000]],
          b: ["Bosch", "Makita", "Zubr"],
        },
        {
          n: ["Burchak jilvirlagich 180–230 mm", "УШМ 180–230 мм", "Angle grinder 180–230 mm"],
          u: 'pc', e: '⚙️',
          v: [["Ø180, 1800 W", 1150000], ["Ø230, 2000 W", 1390000], ["Ø230, 2400 W", 1790000]],
          b: ["Makita", "Bosch", "Dewalt"],
        },
        {
          n: ["Akkumulyatorli burchak jilvirlagich", "УШМ аккумуляторная", "Cordless angle grinder"],
          u: 'pc', e: '🔋',
          v: [["Ø125, 18 V, 2×4.0 Ah", 1850000], ["Ø125, 18 V BL, 2×5.0 Ah", 2650000]],
          b: ["Makita", "Dewalt", "Bosch"],
        },
        {
          n: ["Silliqlash mashinasi eksentrik", "Эксцентриковая шлифмашина", "Random orbital sander"],
          u: 'pc', e: '🌀',
          v: [["Ø125, 300 W", 520000], ["Ø125, 480 W", 890000]],
          b: ["Bosch", "Makita", "Matrix"],
        },
      ],
    },
    {
      id: 'tools-saws',
      e: '🪚',
      n: ["Arralar", "Пилы", "Saws"],
      items: [
        {
          n: ["Doira arra", "Пила дисковая циркулярная", "Circular saw"],
          u: 'pc', e: '🪚',
          v: [["Ø165, 1200 W", 790000], ["Ø190, 1600 W", 1050000], ["Ø235, 2000 W", 1590000]],
          b: ["Makita", "Bosch", "Dewalt"],
        },
        {
          n: ["Elektr lobzik", "Электролобзик", "Electric jigsaw"],
          u: 'pc', e: '🪚',
          v: [["550 W", 420000], ["700 W", 650000], ["800 W, 3000 spm", 890000]],
          b: ["Bosch", "Makita", "Zubr"],
        },
        {
          n: ["Elektr zanjirli arra", "Пила цепная электрическая", "Electric chain saw"],
          u: 'pc', e: '🪵',
          v: [["2000 W, 40 cm", 790000], ["2400 W, 45 cm", 1090000]],
          b: ["Makita", "Stihl", "Bosch"],
        },
        {
          n: ["Benzinli zanjirli arra", "Бензопила", "Petrol chain saw"],
          u: 'pc', e: '🪵',
          v: [["45 cm³, 40 cm", 1450000], ["52 cm³, 45 cm", 1990000], ["62 cm³, 50 cm", 3150000]],
          b: ["Stihl", "Husqvarna", "Champion"],
        },
      ],
    },
    {
      id: 'tools-weld',
      e: '🔥',
      n: ["Payvandlash uskunalari", "Сварочное оборудование", "Welding equipment"],
      items: [
        {
          n: ["Payvandlash invertori MMA", "Сварочный инвертор MMA", "MMA welding inverter"],
          u: 'pc', e: '🔥',
          v: [["200 A, 220 V", 690000], ["250 A, 220 V", 890000], ["315 A, 380 V", 1650000]],
          b: ["Resanta", "Telwin", "Svarog"],
        },
        {
          n: ["Yarim avtomat payvandlash MIG/MAG", "Сварочный полуавтомат MIG/MAG", "MIG/MAG welding machine"],
          u: 'pc', e: '🔥',
          v: [["200 A, 220 V", 1650000], ["250 A, 380 V", 2950000]],
          b: ["Resanta", "Telwin", "Fubag"],
        },
        {
          n: ["Payvandlash elektrodlari", "Электроды сварочные", "Welding electrodes"],
          u: 'pack', e: '⚡',
          v: [["Ø2.5 mm, 1 kg", 24000], ["Ø3 mm, 5 kg", 125000], ["Ø4 mm, 5 kg", 118000]],
          b: ["ESAB", "Lincoln Electric", "Uzmetkombinat"],
        },
        {
          n: ["Payvandchi niqobi xameleon", "Маска сварщика хамелеон", "Auto-darkening welding helmet"],
          u: 'pc', e: '🥽',
          v: [["DIN 9–13, 90×35 mm", 195000], ["DIN 4/9–13, 100×60 mm", 360000]],
          b: ["Fubag", "Resanta", "Telwin"],
        },
      ],
    },
    {
      id: 'tools-measure',
      e: '📏',
      n: ["O'lchov asboblari", "Измерительный инструмент", "Measuring tools"],
      items: [
        {
          n: ["Lazerli nivelir", "Лазерный нивелир", "Laser level"],
          u: 'pc', e: '🔴',
          v: [["2L, 20 m", 590000], ["3D 12L, 30 m", 1750000], ["3D 12L, 40 m, 532 nm", 2950000]],
          b: ["Bosch", "Makita", "Dewalt"],
        },
        {
          n: ["Pufakchali daraja", "Уровень пузырьковый", "Spirit level"],
          u: 'pc', e: '📐',
          v: [["40 cm", 48000], ["60 cm", 69000], ["120 cm", 135000]],
          b: ["Stanley", "Matrix", "Zubr"],
        },
        {
          n: ["Ruletka", "Рулетка", "Tape measure"],
          u: 'pc', e: '📏',
          v: [["3 m × 16 mm", 22000], ["5 m × 25 mm", 38000], ["8 m × 25 mm", 62000]],
          b: ["Stanley", "Matrix", "Kapro"],
        },
        {
          n: ["Lazerli masofa o'lchagich", "Лазерный дальномер", "Laser distance meter"],
          u: 'pc', e: '🎯',
          v: [["30 m", 420000], ["50 m", 650000], ["100 m", 1250000]],
          b: ["Bosch", "Leica", "Dewalt"],
        },
      ],
    },
    {
      id: 'tools-hand',
      e: '🔨',
      n: ["Qo'l asboblari", "Ручной инструмент", "Hand tools"],
      items: [
        {
          n: ["Bolg'a slesarlik", "Молоток слесарный", "Claw hammer"],
          u: 'pc', e: '🔨',
          v: [["300 g", 38000], ["500 g", 52000], ["800 g", 74000]],
          b: ["Stanley", "Matrix", "Zubr"],
        },
        {
          n: ["Otvyortkalar to'plami", "Набор отвёрток", "Screwdriver set"],
          u: 'set', e: '🪛',
          v: [["×6", 62000], ["×12", 115000], ["×24, 1/4″", 198000]],
          b: ["Stanley", "Matrix", "Inforce"],
        },
        {
          n: ["Ploskogubtsi va kusachki to'plami", "Набор плоскогубцев и бокорезов", "Pliers and cutters set"],
          u: 'set', e: '🗜️',
          v: [["×3, 160–200 mm", 128000], ["×5, 160–250 mm", 215000]],
          b: ["Stanley", "Knipex", "Matrix"],
        },
        {
          n: ["Kalitlar va soket boshlar to'plami", "Набор ключей (рожково-накидных и головок)", "Wrench and socket set"],
          u: 'set', e: '🔧',
          v: [["×24, 1/4″", 165000], ["×46, 1/4″+1/2″", 345000], ["×108, 1/4″+3/8″+1/2″", 790000]],
          b: ["Stanley", "Inforce", "Matrix"],
        },
      ],
    },
    {
      id: 'tools-consum',
      e: '💿',
      n: ["Sarf materiallari", "Расходные материалы", "Consumables"],
      items: [
        {
          n: ["Burg'ilar to'plami metall uchun", "Набор свёрл по металлу", "Metal drill bit set"],
          u: 'set', e: '🔩',
          v: [["Ø1–10 mm, ×19", 135000], ["Ø1–13 mm, ×25", 215000]],
          b: ["Bosch", "Makita", "Zubr"],
        },
        {
          n: ["SDS-plus burg'i beton uchun", "Бур SDS-plus по бетону", "SDS-plus concrete drill bit"],
          u: 'pc', e: '🔩',
          v: [["Ø6×160 mm", 19000], ["Ø10×210 mm", 29000], ["Ø14×260 mm", 48000]],
          b: ["Bosch", "Makita", "Matrix"],
        },
        {
          n: ["Kesuvchi disk metall uchun", "Диск отрезной по металлу", "Metal cutting disc"],
          u: 'pack', e: '💿',
          v: [["Ø125×1.0 mm, ×25", 135000], ["Ø125×1.2 mm, ×25", 148000], ["Ø230×2.0 mm, ×25", 395000]],
          b: ["Bosch", "Luga", "Hammer"],
        },
        {
          n: ["Arra diski yog'och uchun", "Диск пильный по дереву", "Wood saw blade"],
          u: 'pc', e: '⭕',
          v: [["Ø165×20 mm, 24T", 98000], ["Ø190×30 mm, 40T", 135000], ["Ø235×30 mm, 48T", 189000]],
          b: ["Bosch", "Makita", "Dewalt"],
        },
      ],
    },
    {
      id: 'tools-compressor',
      e: '💨',
      n: ["Kompressorlar va generatorlar", "Компрессоры и генераторы", "Compressors and generators"],
      items: [
        {
          n: ["Havo kompressori porshenli", "Компрессор воздушный поршневой", "Piston air compressor"],
          u: 'pc', e: '💨',
          v: [["24 l, 1.5 kW", 1250000], ["50 l, 2.2 kW", 2190000], ["100 l, 2.2 kW", 3150000]],
          b: ["Fubag", "Remeza", "Elitech"],
        },
        {
          n: ["Benzinli generator", "Бензиновый генератор", "Petrol generator"],
          u: 'pc', e: '⚡',
          v: [["2.5 kW, 220 V", 2650000], ["5.5 kW, 220 V", 5890000], ["8 kW, 380 V", 11500000]],
          b: ["Honda", "Hyundai", "Champion"],
        },
        {
          n: ["Dizel generator", "Дизельный генератор", "Diesel generator"],
          u: 'pc', e: '🔋',
          v: [["6 kW, 220 V", 9800000], ["10 kW, 380 V", 15500000], ["20 kW, 380 V", 29500000]],
          b: ["Hyundai", "Fubag", "Ricardo"],
        },
        {
          n: ["Yuqori bosimli yuvish apparati", "Мойка высокого давления", "High-pressure washer"],
          u: 'pc', e: '🚿',
          v: [["110 bar, 1400 W", 1250000], ["130 bar, 1600 W", 1950000], ["160 bar, 2100 W", 3150000]],
          b: ["Kärcher", "Bosch", "Makita"],
        },
      ],
    },
    {
      id: 'tools-ladder',
      e: '🪜',
      n: ["Zinalar va iskalalar", "Лестницы и строительные леса", "Ladders and scaffolding"],
      items: [
        {
          n: ["Alyuminiy zina-trasformer", "Лестница-трансформер алюминиевая", "Aluminium multi-purpose ladder"],
          u: 'pc', e: '🪜',
          v: [["4×3, 3.4 m", 1190000], ["4×4, 4.5 m", 1650000], ["4×5, 5.6 m", 2250000]],
          b: ["Krause", "Zarges", "Alumet"],
        },
        {
          n: ["Zina-stremyanka yig'ma", "Стремянка складная", "Step ladder"],
          u: 'pc', e: '🪜',
          v: [["×3, 0.6 m", 235000], ["×5, 1.0 m", 385000], ["×7, 1.4 m", 560000]],
          b: ["Krause", "Alumet", "Novaya Vysota"],
        },
        {
          n: ["Teleskopik zina", "Лестница телескопическая", "Telescopic ladder"],
          u: 'pc', e: '🪜',
          v: [["2.6 m", 890000], ["3.8 m", 1290000], ["4.7 m", 1790000]],
          b: ["Krause", "Zarges", "Telesteps"],
        },
        {
          n: ["Qurilish iskalasi ramali", "Леса строительные рамные", "Frame scaffolding"],
          u: 'set', e: '🏗️',
          v: [["1.2×1.8 m, L1", 1650000], ["1.2×1.8 m, L2", 3150000], ["1.2×1.8 m, L3", 4590000]],
          b: ["Uzmetkombinat", "Stroymash", "Akfa Metal"],
        },
      ],
    },
  ],
};

export default c;
