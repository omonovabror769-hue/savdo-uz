import type { Category } from '../types';

const c: Category = {
  id: 'stroy',
  e: '🧱',
  n: ["Qurilish materiallari", "Стройматериалы", "Building materials"],
  subs: [
    {
      id: 'stroy-wall',
      e: '🧱',
      n: ["Devor va fasad materiallari", "Стеновые и фасадные материалы", "Wall and facade materials"],
      items: [
        {
          n: ["Keramik g'isht oddiy M150", "Кирпич керамический рядовой М150", "Ceramic common brick M150"],
          u: 'pc', e: '🧱',
          v: [["250×120×65 mm, 1NF", 1900], ["250×120×88 mm, 1.4NF", 2600]],
          b: ["Qizilqum Keramika", "Kattaqo'rg'on G'isht"],
        },
        {
          n: ["Silikat g'isht M150", "Кирпич силикатный М150", "Sand-lime brick M150"],
          u: 'pc', e: '🧱',
          v: [["250×120×65 mm, 1NF", 1700], ["250×120×88 mm, 1.4NF", 2300], ["250×120×138 mm, 2.1NF", 3400]],
          b: ["Chirchiq Silikat", "Angren Silikat"],
        },
        {
          n: ["Gazobeton blok D500", "Газобетонный блок D500", "Aerated concrete block D500"],
          u: 'pc', e: '⬜',
          v: [["600×300×100 mm", 16500], ["600×300×200 mm", 31000], ["600×300×300 mm", 45500]],
          b: ["Aeroblok Uz", "Bekobod Gazobeton", "Ytong"],
        },
        {
          n: ["Fasad paneli vinil sayding", "Фасадная панель виниловый сайдинг", "Vinyl siding facade panel"],
          u: 'pc', e: '🏠',
          v: [["3660×230 mm, 0.84 m²", 78000], ["3050×205 mm, 0.62 m²", 62000]],
          b: ["Docke", "Alta-Profile", "Deke"],
        },
      ],
    },
    {
      id: 'stroy-roof',
      e: '🏠',
      n: ["Tom yopish va suv oqizish", "Кровля и водосток", "Roofing and drainage"],
      items: [
        {
          n: ["Profnastil C8 qoplamali", "Профнастил С8 окрашенный", "Painted corrugated sheet C8"],
          u: 'sheet', e: '🏠',
          v: [["1200×2000 mm, 0.4 mm", 112000], ["1200×2000 mm, 0.5 mm", 138000], ["1200×3000 mm, 0.5 mm", 205000]],
          b: ["Uzmetkombinat", "Akfa Metal", "Grand Line"],
        },
        {
          n: ["Metall cherepitsa Monterrey", "Металлочерепица Монтеррей", "Metal roof tile Monterrey"],
          u: 'sheet', e: '🏠',
          v: [["1180×2200 mm, 0.45 mm", 265000], ["1180×3000 mm, 0.5 mm", 395000]],
          b: ["Akfa Metal", "Metal Profil", "Grand Line"],
        },
        {
          n: ["Ondulin bitumli list", "Ондулин битумный лист", "Bituminous roofing sheet Ondulin"],
          u: 'sheet', e: '🟫',
          v: [["2000×950 mm, 3 mm", 98000], ["2000×760 mm, 2.6 mm", 79000]],
          b: ["Ondulin", "Onduline", "Gutta"],
        },
        {
          n: ["Suv tarnovi PVC to'plami", "Водосточная система ПВХ комплект", "PVC gutter system set"],
          u: 'set', e: '🌧️',
          v: [["Ø90, 3+3 m", 385000], ["Ø125, 3+3 m", 520000], ["Ø125, 6+6 m", 960000]],
          b: ["Docke", "Technonikol", "Vinyl-On"],
        },
      ],
    },
    {
      id: 'stroy-insul',
      e: '🧊',
      n: ["Issiqlik va tovush izolyatsiyasi", "Тепло- и звукоизоляция", "Thermal and sound insulation"],
      items: [
        {
          n: ["Tosh paxta Rockwool Light Butts", "Каменная вата Rockwool Лайт Баттс", "Rockwool Light Butts stone wool"],
          u: 'pack', e: '🧶',
          v: [["1000×600×50 mm, 6 m²", 189000], ["1000×600×100 mm, 3 m²", 205000], ["1000×600×150 mm, 2 m²", 228000]],
          b: ["Rockwool", "Technonikol", "Izovol"],
        },
        {
          n: ["Ekstruziya penopleks XPS", "Экструдированный пенополистирол XPS", "Extruded polystyrene XPS"],
          u: 'sheet', e: '🟦',
          v: [["1200×600×30 mm", 31000], ["1200×600×50 mm", 48000], ["1200×600×100 mm", 95000]],
          b: ["Penoplex", "Technonikol Carbon", "Ursa XPS"],
        },
        {
          n: ["Penopolistirol list PSB-S 25", "Пенополистирол лист ПСБ-С 25", "EPS foam board PSB-S 25"],
          u: 'sheet', e: '⬜',
          v: [["1000×1000×50 mm", 19000], ["1000×1000×100 mm", 36000]],
          b: ["Termopen", "Uz Styrofoam"],
        },
        {
          n: ["Folgali izolon", "Изолон фольгированный", "Foil-faced foam insulation"],
          u: 'roll', e: '🪙',
          v: [["1.0×25 m, 3 mm", 235000], ["1.0×25 m, 5 mm", 340000], ["1.2×25 m, 10 mm", 560000]],
          b: ["Penofol", "Izolon Uz", "Tepofol"],
        },
      ],
    },
    {
      id: 'stroy-drywall',
      e: '📐',
      n: ["Quruq qurilish materiallari", "Сухое строительство", "Dry construction materials"],
      items: [
        {
          n: ["Gipsokarton list Knauf", "Гипсокартонный лист Knauf", "Knauf gypsum board sheet"],
          u: 'sheet', e: '📐',
          v: [["2500×1200×9.5 mm", 58000], ["2500×1200×12.5 mm", 68000], ["3000×1200×12.5 mm", 82000]],
          b: ["Knauf", "Gyproc", "Lafarge"],
        },
        {
          n: ["Namlikka chidamli gipsokarton GKLV", "Влагостойкий гипсокартон ГКЛВ", "Moisture-resistant gypsum board GKLV"],
          u: 'sheet', e: '💧',
          v: [["2500×1200×9.5 mm", 74000], ["2500×1200×12.5 mm", 89000]],
          b: ["Knauf", "Gyproc"],
        },
        {
          n: ["Gipsokarton profili CD60", "Профиль потолочный CD60", "Ceiling profile CD60"],
          u: 'pc', e: '📏',
          v: [["60×27 mm, 3 m, 0.4 mm", 19500], ["60×27 mm, 3 m, 0.5 mm", 24500], ["60×27 mm, 4 m, 0.5 mm", 32500]],
          b: ["Knauf", "Akfa Profil", "Steel Uz"],
        },
        {
          n: ["Gipsokarton profili UD27 yo'naltiruvchi", "Профиль направляющий UD27", "Guide profile UD27"],
          u: 'pc', e: '📏',
          v: [["27×28 mm, 3 m, 0.4 mm", 13500], ["27×28 mm, 3 m, 0.5 mm", 17000]],
          b: ["Knauf", "Akfa Profil"],
        },
      ],
    },
    {
      id: 'stroy-mixes',
      e: '🪣',
      n: ["Quruq qorishmalar", "Сухие строительные смеси", "Dry mixes"],
      items: [
        {
          n: ["Gipsli shtukaturka Rotband", "Гипсовая штукатурка Ротбанд", "Gypsum plaster Rotband"],
          u: 'bag', e: '🪣',
          v: [["30 kg", 92000], ["25 kg", 78000]],
          b: ["Knauf", "Volma", "Ceresit"],
        },
        {
          n: ["Shpaklyovka finish", "Шпаклёвка финишная", "Finishing putty"],
          u: 'bag', e: '🪣',
          v: [["5 kg", 38000], ["20 kg", 118000], ["25 kg", 142000]],
          b: ["Knauf HP Finish", "Vetonit", "Ceresit"],
        },
        {
          n: ["Plitka yelimi", "Плиточный клей", "Tile adhesive"],
          u: 'bag', e: '🧱',
          v: [["C1, 25 kg", 58000], ["C2, 25 kg", 82000], ["C2 S1, 25 kg", 108000]],
          b: ["Ceresit CM 11", "Knauf Fliesen", "Mavzo"],
        },
        {
          n: ["Pol tekislagich nivelir", "Наливной пол нивелир", "Self-leveling floor compound"],
          u: 'bag', e: '🟫',
          v: [["25 kg, 3–15 mm", 89000], ["25 kg, 5–80 mm", 112000]],
          b: ["Ceresit CN 68", "Knauf Boden", "Bergauf"],
        },
      ],
    },
    {
      id: 'stroy-cement',
      e: '🏗️',
      n: ["Sement va to'kma materiallar", "Цемент и сыпучие материалы", "Cement and bulk materials"],
      items: [
        {
          n: ["Portlandsement M400", "Портландцемент М400", "Portland cement M400"],
          u: 'bag', e: '🏗️',
          v: [["50 kg, M400", 78000], ["25 kg, M400", 41000], ["50 kg, M500", 89000]],
          b: ["Qizilqum Sement", "Bekobod Sement", "Ohangaron Sement"],
        },
        {
          n: ["Qurilish qumi", "Строительный песок", "Construction sand"],
          u: 'm3', e: '⏳',
          v: [["0–2 mm", 95000], ["0–5 mm", 110000], ["2–5 mm", 125000]],
          b: ["Chirchiq Karyer", "Zangiota Qum"],
        },
        {
          n: ["Shag'al", "Щебень", "Crushed stone"],
          u: 'm3', e: '🪨',
          v: [["5–20 mm", 165000], ["20–40 mm", 150000], ["40–70 mm", 140000]],
          b: ["Ohangaron Karyer", "Nurafshon Shag'al"],
        },
        {
          n: ["So'ndirilgan ohak", "Известь гашёная", "Hydrated lime"],
          u: 'bag', e: '⚪',
          v: [["25 kg", 36000], ["10 kg", 17500]],
          b: ["Bekobod Ohak", "Navoiy Ohak"],
        },
      ],
    },
    {
      id: 'stroy-paint',
      e: '🎨',
      n: ["Bo'yoq va lak materiallari", "Лакокрасочные материалы", "Paints and varnishes"],
      items: [
        {
          n: ["Suv emulsiyali bo'yoq ichki ishlar uchun", "Водоэмульсионная краска для интерьера", "Interior water-based paint"],
          u: 'pc', e: '🎨',
          v: [["RAL 9003, 3 l", 98000], ["RAL 9003, 9 l", 265000], ["RAL 9003, 20 l", 560000]],
          b: ["Tikkurila", "Dulux", "Caparol"],
        },
        {
          n: ["Fasad akril bo'yog'i", "Фасадная акриловая краска", "Acrylic facade paint"],
          u: 'pc', e: '🏠',
          v: [["RAL 9010, 10 l", 365000], ["RAL 9010, 20 l", 690000]],
          b: ["Tikkurila", "Caparol", "Ceresit"],
        },
        {
          n: ["Chuqur kirib boruvchi grunt", "Грунтовка глубокого проникновения", "Deep penetration primer"],
          u: 'pc', e: '🧴',
          v: [["5 l", 58000], ["10 l", 108000], ["20 l", 205000]],
          b: ["Ceresit CT 17", "Knauf Tiefengrund", "Tikkurila"],
        },
        {
          n: ["Alkid emal PF-115", "Эмаль алкидная ПФ-115", "Alkyd enamel PF-115"],
          u: 'pc', e: '🖌️',
          v: [["RAL 9003, 0.9 kg", 38000], ["RAL 7040, 2.7 kg", 105000], ["RAL 9003, 20 kg", 690000]],
          b: ["Tikkurila", "Rainbow Paints", "Kronos"],
        },
      ],
    },
    {
      id: 'stroy-foam',
      e: '🧴',
      n: ["Montaj ko'pigi va germetiklar", "Монтажная пена и герметики", "Mounting foam and sealants"],
      items: [
        {
          n: ["Poliuretan montaj ko'pigi", "Монтажная пена полиуретановая", "Polyurethane mounting foam"],
          u: 'pc', e: '🧴',
          v: [["500 ml", 36000], ["750 ml", 48000], ["850 ml, PRO", 68000]],
          b: ["Tytan", "Soudal", "Penosil"],
        },
        {
          n: ["Silikon germetik universal", "Силиконовый герметик универсальный", "Universal silicone sealant"],
          u: 'pc', e: '🧴',
          v: [["260 ml, RAL 9003", 29000], ["280 ml, RAL 9003", 34000], ["600 ml, RAL 9003", 69000]],
          b: ["Ceresit", "Soudal", "Moment"],
        },
        {
          n: ["Akril germetik", "Акриловый герметик", "Acrylic sealant"],
          u: 'pc', e: '🧴',
          v: [["300 ml, RAL 9003", 24000], ["600 ml, RAL 9003", 42000]],
          b: ["Ceresit CS 5", "Tytan", "Soudal"],
        },
        {
          n: ["Suyuq mixlar montaj yelimi", "Жидкие гвозди монтажный клей", "Construction adhesive liquid nails"],
          u: 'pc', e: '🔩',
          v: [["300 ml", 42000], ["400 ml", 54000]],
          b: ["Moment Montazh", "Soudal", "Tytan"],
        },
      ],
    },
    {
      id: 'stroy-water',
      e: '💧',
      n: ["Gidroizolyatsiya", "Гидроизоляция", "Waterproofing"],
      items: [
        {
          n: ["Bitumli mastika", "Мастика битумная", "Bitumen mastic"],
          u: 'pc', e: '🛢️',
          v: [["10 kg", 125000], ["18 kg", 215000], ["20 kg", 238000]],
          b: ["Technonikol", "Bitum Uz", "Izoplast"],
        },
        {
          n: ["Sementli gidroizolyatsiya aralashmasi", "Цементная гидроизоляционная смесь", "Cementitious waterproofing mix"],
          u: 'bag', e: '💧',
          v: [["20 kg", 185000], ["5 kg", 52000]],
          b: ["Ceresit", "Knauf Flachendicht", "Mapei"],
        },
        {
          n: ["Bitumli yopishtirma membrana", "Битумная наплавляемая мембрана", "Torch-on bituminous membrane"],
          u: 'roll', e: '🟫',
          v: [["1×10 m, 3.5 mm", 245000], ["1×10 m, 4.5 mm", 315000], ["1×15 m, 4.0 mm", 410000]],
          b: ["Technonikol", "Bikrost", "Izopast"],
        },
        {
          n: ["Polietilen plyonka", "Полиэтиленовая плёнка", "Polyethylene film"],
          u: 'roll', e: '🎞️',
          v: [["3×50 m, 100 mkm", 185000], ["3×50 m, 150 mkm", 265000], ["3×50 m, 200 mkm", 345000]],
          b: ["Plastik Uz", "Technonikol"],
        },
      ],
    },
    {
      id: 'stroy-wood',
      e: '🪵',
      n: ["Yog'och plitalar", "Древесные плиты", "Wood panels"],
      items: [
        {
          n: ["OSB-3 plita", "Плита OSB-3", "OSB-3 board"],
          u: 'sheet', e: '🪵',
          v: [["2440×1220×9 mm", 138000], ["2440×1220×12 mm", 178000], ["2440×1220×18 mm", 265000]],
          b: ["Egger", "Kronospan", "Kalevala"],
        },
        {
          n: ["Fanera FK namlikka chidamli", "Фанера ФК влагостойкая", "Moisture-resistant plywood FK"],
          u: 'sheet', e: '🪵',
          v: [["1525×1525×6 mm", 118000], ["1525×1525×12 mm", 225000], ["1525×1525×18 mm", 335000]],
          b: ["Sveza", "Uzfanera", "Bakelit Uz"],
        },
        {
          n: ["LDSP laminatsiyalangan plita", "ЛДСП ламинированная плита", "Laminated chipboard"],
          u: 'sheet', e: '🟫',
          v: [["2750×1830×16 mm, U999", 345000], ["2800×2070×16 mm, W980", 405000]],
          b: ["Egger", "Kronospan", "Swiss Krono"],
        },
        {
          n: ["DVP (HDF) yupqa plita", "ДВП (HDF) тонкая плита", "Hardboard (HDF) thin panel"],
          u: 'sheet', e: '🟫',
          v: [["2440×1220×3 mm", 52000], ["2745×1700×3 mm", 84000]],
          b: ["Egger", "Kronospan"],
        },
      ],
    },
    {
      id: 'stroy-metal',
      e: '🔩',
      n: ["Metall prokat", "Металлопрокат", "Metal products"],
      items: [
        {
          n: ["Armatura A500C", "Арматура А500С", "Rebar A500C"],
          u: 't', e: '🔩',
          v: [["Ø10", 9300000], ["Ø12", 9100000], ["Ø16", 9000000]],
          b: ["Uzmetkombinat", "Bekobod Metallurgiya", "Navoiy Po'lat"],
        },
        {
          n: ["Profil quvur", "Профильная труба", "Steel profile pipe"],
          u: 'pc', e: '🪈',
          v: [["40×20×1.5 mm, 6 m", 112000], ["40×40×2 mm, 6 m", 196000], ["60×40×2 mm, 6 m", 245000]],
          b: ["Uzmetkombinat", "Akfa Metal", "Asia Steel"],
        },
        {
          n: ["Sinklangan po'lat list", "Лист оцинкованный", "Galvanized steel sheet"],
          u: 'sheet', e: '⬜',
          v: [["1250×2500×0.5 mm", 315000], ["1250×2500×0.7 mm", 435000], ["1250×2500×1.0 mm", 610000]],
          b: ["Uzmetkombinat", "Akfa Metal"],
        },
        {
          n: ["Qurilish to'ri payvandlangan", "Сетка строительная сварная", "Welded wire mesh"],
          u: 'sheet', e: '🔲',
          v: [["Ø4, 100×100 mm, 2×1 m", 52000], ["Ø5, 100×100 mm, 2×1 m", 78000], ["Ø4, 50×50 mm, 2×1 m", 98000]],
          b: ["Uzmetkombinat", "Setka Uz"],
        },
      ],
    },
    {
      id: 'stroy-paving',
      e: '🟫',
      n: ["Trotuar plitkasi va bordyurlar", "Тротуарная плитка и бордюры", "Paving tiles and curbs"],
      items: [
        {
          n: ["Trotuar plitkasi kvadrat", "Тротуарная плитка квадратная", "Square paving tile"],
          u: 'm2', e: '🟫',
          v: [["300×300×30 mm", 62000], ["300×300×40 mm", 76000], ["500×500×50 mm", 98000]],
          b: ["Brusbeton Uz", "Toshkent Beton", "Plita Servis"],
        },
        {
          n: ["Trotuar plitkasi to'lqin", "Тротуарная плитка волна", "Wave paving tile"],
          u: 'm2', e: '🟧',
          v: [["225×112×60 mm, RAL 7035", 85000], ["225×112×60 mm, RAL 8004", 92000]],
          b: ["Brusbeton Uz", "Plita Servis"],
        },
        {
          n: ["Yo'l bordyuri beton", "Бордюр дорожный бетонный", "Concrete road curb"],
          u: 'pc', e: '⬜',
          v: [["1000×300×150 mm", 72000], ["1000×200×80 mm", 38000]],
          b: ["Toshkent Beton", "Yunusobod Temirbeton"],
        },
        {
          n: ["Yomg'ir suvi lotogi", "Лоток водоотводный", "Drainage channel"],
          u: 'pc', e: '🌧️',
          v: [["1000×140×70 mm, B25", 98000], ["1000×130×65 mm, PP", 76000]],
          b: ["Toshkent Beton", "Standartpark", "Gidrolica"],
        },
      ],
    },
  ],
};

export default c;
