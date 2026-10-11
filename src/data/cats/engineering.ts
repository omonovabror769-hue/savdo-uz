import type { Category } from '../types';

const c: Category = {
  id: 'engineering',
  e: '🔧',
  n: ["Muhandislik tizimlari", "Инженерные системы", "Engineering systems"],
  subs: [
    {
      id: 'engineering-water',
      e: '🚰',
      n: ["Suv ta'minoti (quvurlar, fitinglar)", "Водоснабжение (трубы, фитинги)", "Water supply (pipes, fittings)"],
      items: [
        {
          n: ["Polipropilen quvur PPR PN20", "Труба полипропиленовая PPR PN20", "PPR pipe PN20"],
          u: 'm', e: '🟢',
          v: [["Ø20 mm", 9000], ["Ø25 mm", 14000], ["Ø32 mm", 22000]],
          b: ["Valtec", "Rehau", "Navoiy Plastmass"],
        },
        {
          n: ["PPR fiting: burchak 90°", "Фитинг PPR: угол 90°", "PPR fitting: 90° elbow"],
          u: 'pc', e: '🔩',
          v: [["Ø20 mm", 2500], ["Ø25 mm", 3800], ["Ø32 mm", 6500]],
          b: ["Valtec", "Navoiy Plastmass"],
        },
        {
          n: ["PPR fiting: troynik", "Фитинг PPR: тройник", "PPR fitting: tee"],
          u: 'pc', e: '🔱',
          v: [["Ø20 mm", 3500], ["Ø25 mm", 5200], ["Ø32 mm", 8800]],
          b: ["Valtec", "Rehau", "Navoiy Plastmass"],
        },
        {
          n: ["Metall-plastik quvur", "Металлопластиковая труба", "Multilayer metal-plastic pipe"],
          u: 'm', e: '⚪',
          v: [["Ø16 mm", 11000], ["Ø20 mm", 15000], ["Ø26 mm", 24000]],
          b: ["Rehau", "Valtec"],
        },
      ],
    },
    {
      id: 'engineering-heat',
      e: '🔥',
      n: ["Isitish (radiatorlar, qozonlar)", "Отопление (радиаторы, котлы)", "Heating (radiators, boilers)"],
      items: [
        {
          n: ["Po'lat panelli radiator", "Радиатор стальной панельный", "Steel panel radiator"],
          u: 'pc', e: '♨️',
          v: [["T22, 500×800 mm", 1150000], ["T22, 500×1200 mm", 1590000], ["T22, 500×1600 mm", 1890000]],
          b: ["Kermi", "Buderus", "Rifar"],
        },
        {
          n: ["Bimetall radiator, seksiya", "Радиатор биметаллический, секция", "Bimetallic radiator, section"],
          u: 'pc', e: '🌡️',
          v: [["500/80 mm", 135000], ["350/80 mm", 105000]],
          b: ["Rifar", "Global"],
        },
        {
          n: ["Devorga o'rnatiladigan gaz qozoni", "Котел газовый настенный", "Wall-mounted gas boiler"],
          u: 'pc', e: '🔥',
          v: [["24 kW, 2 konturli", 7200000], ["28 kW, 2 konturli", 8500000], ["35 kW, 2 konturli", 11800000]],
          b: ["Baxi", "Ariston", "Buderus"],
        },
        {
          n: ["Issiq pol uchun PEX quvuri", "Труба PEX для теплого пола", "PEX underfloor heating pipe"],
          u: 'm', e: '〰️',
          v: [["Ø16×2.0 mm", 9500], ["Ø20×2.0 mm", 13500]],
          b: ["Rehau", "Valtec"],
        },
      ],
    },
    {
      id: 'engineering-vent',
      e: '🌬️',
      n: ["Ventilyatsiya", "Вентиляция", "Ventilation"],
      items: [
        {
          n: ["Hammom uchun o'qli ventilyator", "Вентилятор осевой вытяжной", "Axial extractor fan"],
          u: 'pc', e: '🌀',
          v: [["Ø100 mm, 15 W", 165000], ["Ø125 mm, 20 W", 215000], ["Ø150 mm, 25 W", 295000]],
          b: ["Vents", "Soler & Palau"],
        },
        {
          n: ["Egiluvchan ventilyatsiya quvuri", "Воздуховод гибкий", "Flexible air duct"],
          u: 'm', e: '〰️',
          v: [["Ø100 mm", 28000], ["Ø125 mm", 36000], ["Ø160 mm", 52000]],
          b: ["Vents", "Europlast"],
        },
        {
          n: ["Ventilyatsiya panjarasi", "Решетка вентиляционная", "Ventilation grille"],
          u: 'pc', e: '🔲',
          v: [["150×150 mm", 32000], ["200×200 mm", 48000], ["300×300 mm", 78000]],
          b: ["Europlast", "Vents"],
        },
        {
          n: ["Oshxona tortma qopqog'i", "Вытяжка кухонная", "Kitchen cooker hood"],
          u: 'pc', e: '🍳',
          v: [["60 cm, 450 m³/h", 950000], ["60 cm, 650 m³/h", 1450000], ["90 cm, 850 m³/h", 2350000]],
          b: ["Elikor", "Bosch", "Electrolux"],
        },
      ],
    },
    {
      id: 'engineering-ac',
      e: '❄️',
      n: ["Konditsionerlar", "Кондиционеры", "Air conditioning"],
      items: [
        {
          n: ["Split-tizim (on/off)", "Сплит-система (on/off)", "Split air conditioner (on/off)"],
          u: 'pc', e: '❄️',
          v: [["9000 BTU, 25 m²", 3200000], ["12000 BTU, 35 m²", 3900000], ["18000 BTU, 50 m²", 5600000]],
          b: ["Artel", "Midea", "Gree"],
        },
        {
          n: ["Invertorli split-tizim", "Сплит-система инверторная", "Inverter split air conditioner"],
          u: 'pc', e: '🧊',
          v: [["9000 BTU, 25 m²", 4300000], ["12000 BTU, 35 m²", 5100000], ["24000 BTU, 70 m²", 8900000]],
          b: ["Samsung", "LG", "Gree"],
        },
        {
          n: ["Mis quvur izolyatsiyada", "Медная труба в изоляции", "Insulated copper pipe"],
          u: 'm', e: '🟠',
          v: [["1/4\" + 3/8\"", 95000], ["1/4\" + 1/2\"", 118000]],
          b: ["Hailiang", "Halcor"],
        },
        {
          n: ["Konditsioner o'rnatish kronshteyni", "Кронштейн для кондиционера", "Air conditioner mounting bracket"],
          u: 'set', e: '🪝',
          v: [["400 mm, 90 kg", 85000], ["500 mm, 120 kg", 125000]],
          b: ["Zubr", "Starfix"],
        },
      ],
    },
    {
      id: 'engineering-pump',
      e: '⚙️',
      n: ["Nasoslar", "Насосы", "Pumps"],
      items: [
        {
          n: ["Yuzaki nasos", "Насос поверхностный", "Surface pump"],
          u: 'pc', e: '💧',
          v: [["0.55 kW, 40 l/min", 780000], ["0.75 kW, 50 l/min", 980000], ["1.1 kW, 70 l/min", 1450000]],
          b: ["Pedrollo", "Grundfos", "Wilo"],
        },
        {
          n: ["Quduq uchun cho'kma nasos", "Насос скважинный погружной", "Submersible borehole pump"],
          u: 'pc', e: '🕳️',
          v: [["0.75 kW, 55 m", 1650000], ["1.1 kW, 80 m", 2350000], ["1.5 kW, 100 m", 3150000]],
          b: ["Pedrollo", "Grundfos"],
        },
        {
          n: ["Sirkulyatsion nasos", "Насос циркуляционный", "Circulation pump"],
          u: 'pc', e: '🔄',
          v: [["25/60, 130 mm", 780000], ["25/80, 180 mm", 1150000], ["32/80, 180 mm", 1650000]],
          b: ["Wilo", "Grundfos"],
        },
        {
          n: ["Avtomatik nasos stansiyasi", "Насосная станция автоматическая", "Automatic pumping station"],
          u: 'pc', e: '🏭',
          v: [["0.8 kW, 24 l", 1350000], ["1.1 kW, 50 l", 1950000]],
          b: ["Pedrollo", "Wilo"],
        },
      ],
    },
    {
      id: 'engineering-sewer',
      e: '🚽',
      n: ["Kanalizatsiya va drenaj", "Канализация и дренаж", "Sewerage & drainage"],
      items: [
        {
          n: ["Ichki kanalizatsiya quvuri PVC", "Труба канализационная ПВХ внутренняя", "Internal PVC sewer pipe"],
          u: 'm', e: '🚰',
          v: [["Ø50×1000 mm", 18000], ["Ø110×1000 mm", 34000], ["Ø110×2000 mm", 66000]],
          b: ["Navoiy Plastmass", "Valtec", "Rehau"],
        },
        {
          n: ["Tashqi kanalizatsiya quvuri", "Труба канализационная наружная", "External sewer pipe"],
          u: 'm', e: '🟠',
          v: [["Ø110 mm, SN4", 38000], ["Ø160 mm, SN4", 72000], ["Ø200 mm, SN4", 112000]],
          b: ["Navoiy Plastmass", "Rehau"],
        },
        {
          n: ["Kanalizatsiya fitingi: tirsak 45°", "Фитинг канализационный: отвод 45°", "Sewer fitting: 45° bend"],
          u: 'pc', e: '↪️',
          v: [["Ø50 mm", 6500], ["Ø110 mm", 14000]],
          b: ["Navoiy Plastmass", "Valtec"],
        },
        {
          n: ["Polga trapi", "Трап сливной", "Floor drain"],
          u: 'pc', e: '⬛',
          v: [["100×100 mm, Ø50", 85000], ["150×150 mm, Ø50", 135000], ["300×300 mm, Ø110", 295000]],
          b: ["Hansgrohe", "Santek", "Samarqand Santexnika"],
        },
      ],
    },
    {
      id: 'engineering-wh',
      e: '🛁',
      n: ["Suv isitgichlar", "Водонагреватели", "Water heaters"],
      items: [
        {
          n: ["Jamlovchi elektr suv isitgich (boyler)", "Водонагреватель накопительный электрический", "Electric storage water heater"],
          u: 'pc', e: '🛢️',
          v: [["50 l, 1.5 kW", 2100000], ["80 l, 2.0 kW", 2650000], ["100 l, 2.0 kW", 3150000]],
          b: ["Ariston", "Thermex", "Artel"],
        },
        {
          n: ["Oqimli suv isitgich", "Водонагреватель проточный", "Instantaneous water heater"],
          u: 'pc', e: '🚿',
          v: [["5.5 kW", 650000], ["8 kW", 890000]],
          b: ["Thermex", "Electrolux"],
        },
        {
          n: ["Gaz kolonkasi", "Газовая колонка", "Gas water heater"],
          u: 'pc', e: '🔥',
          v: [["10 l/min, 20 kW", 1850000], ["12 l/min, 24 kW", 2250000]],
          b: ["Baxi", "Ariston"],
        },
        {
          n: ["Bilvosita isitish qozoni", "Бойлер косвенного нагрева", "Indirect heating cylinder"],
          u: 'pc', e: '♨️',
          v: [["100 l", 5400000], ["150 l", 7200000], ["200 l", 9300000]],
          b: ["Buderus", "Baxi"],
        },
      ],
    },
    {
      id: 'engineering-valves',
      e: '🔘',
      n: ["Jo'mraklar, kranlar va hisoblagichlar", "Арматура и счетчики", "Valves & meters"],
      items: [
        {
          n: ["Sharli kran (jo'mrak)", "Кран шаровой", "Ball valve"],
          u: 'pc', e: '🔴',
          v: [["1/2\"", 28000], ["3/4\"", 42000], ["1\"", 68000]],
          b: ["Valtec", "Rehau", "Akfa"],
        },
        {
          n: ["Suv hisoblagich", "Счетчик воды", "Water meter"],
          u: 'pc', e: '🔢',
          v: [["DN15, 1/2\"", 135000], ["DN20, 3/4\"", 195000]],
          b: ["Itelma", "Valtec"],
        },
        {
          n: ["Mexanik suv filtri", "Фильтр механической очистки", "Mechanical water strainer"],
          u: 'pc', e: '🧽',
          v: [["1/2\"", 55000], ["3/4\"", 75000], ["1\"", 115000]],
          b: ["Valtec", "Honeywell"],
        },
        {
          n: ["Bosim reduktori", "Редуктор давления", "Pressure reducing valve"],
          u: 'pc', e: '🎚️',
          v: [["1/2\", 0.5–6 bar", 285000], ["3/4\", 0.5–6 bar", 365000]],
          b: ["Honeywell", "Valtec"],
        },
      ],
    },
  ],
};

export default c;
