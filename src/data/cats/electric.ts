import type { Category } from '../types';

const c: Category = {
  id: 'electric',
  e: '⚡',
  n: ["Elektrika", "Электрика", "Electrical"],
  subs: [
    {
      id: 'electric-cable',
      e: '🔌',
      n: ["Kabel va simlar", "Кабель и провод", "Cable and wire"],
      items: [
        {
          n: ["Kabel VVGng(A)-LS", "Кабель ВВГнг(А)-LS", "Power cable VVGng(A)-LS"],
          u: 'm', e: '🔌',
          v: [["3×1.5 mm²", 8500], ["3×2.5 mm²", 13500], ["3×4 mm²", 21500]],
          b: ["Uzkabel", "Podolskkabel", "Kamkabel"],
        },
        {
          n: ["Mis sim PuGV", "Провод медный ПуГВ", "Copper wire PuGV"],
          u: 'roll', e: '🧵',
          v: [["1×1.5 mm², 100 m", 340000], ["1×2.5 mm², 100 m", 520000], ["1×4 mm², 100 m", 790000]],
          b: ["Uzkabel", "Elektrokabel", "Podolskkabel"],
        },
        {
          n: ["Havo liniyasi uchun SIP-4 kabeli", "Провод СИП-4", "Self-supporting insulated wire SIP-4"],
          u: 'm', e: '🪢',
          v: [["4×16 mm²", 14500], ["4×25 mm²", 21500], ["2×16 mm²", 8200]],
          b: ["Uzkabel", "Alyumet", "Kamkabel"],
        },
        {
          n: ["Tarmoq kabeli UTP", "Кабель витая пара UTP", "UTP network cable"],
          u: 'roll', e: '🌐',
          v: [["Cat5e, 4×2×0.5, 305 m", 790000], ["Cat6, 4×2×0.57, 305 m", 1190000]],
          b: ["Legrand", "Hyperline", "Cabeus"],
        },
      ],
    },
    {
      id: 'electric-sockets',
      e: '🔘',
      n: ["Rozetka va viklyuchatellar", "Розетки и выключатели", "Sockets and switches"],
      items: [
        {
          n: ["Rozetka ichki o'rnatiladigan yerlatgichli", "Розетка с заземлением скрытой установки", "Flush earthed socket"],
          u: 'pc', e: '🔘',
          v: [["16 A, 250 V", 32000], ["16 A, 250 V, USB", 98000], ["16 A, 250 V, IP44", 125000]],
          b: ["Legrand", "Schneider Electric", "Artel"],
        },
        {
          n: ["Viklyuchatel bir klavishli", "Выключатель одноклавишный", "Single-gang switch"],
          u: 'pc', e: '💡',
          v: [["10 A, 250 V", 28000], ["10 AX, 250 V", 78000]],
          b: ["Legrand", "Schneider Electric", "IEK"],
        },
        {
          n: ["Viklyuchatel ikki klavishli", "Выключатель двухклавишный", "Double-gang switch"],
          u: 'pc', e: '💡',
          v: [["10 A, 250 V", 36000], ["10 AX, 250 V", 96000]],
          b: ["Legrand", "Schneider Electric", "IEK"],
        },
        {
          n: ["Internet va TV rozetkasi", "Розетка интернет и ТВ", "Data and TV socket"],
          u: 'pc', e: '🌐',
          v: [["RJ45 Cat5e", 48000], ["RJ45 Cat6", 62000], ["TV + RJ45", 85000]],
          b: ["Legrand", "Schneider Electric", "Lezard"],
        },
      ],
    },
    {
      id: 'electric-breakers',
      e: '🎛️',
      n: ["Avtomat va shitlar", "Автоматы и щитки", "Circuit breakers and panels"],
      items: [
        {
          n: ["Avtomat o'chirgich 1P", "Автоматический выключатель 1P", "1P circuit breaker"],
          u: 'pc', e: '🎛️',
          v: [["C16 A, 4.5 kA", 28000], ["C25 A, 4.5 kA", 29000], ["C32 A, 6 kA", 36000]],
          b: ["IEK", "Schneider Electric", "ABB"],
        },
        {
          n: ["Avtomat o'chirgich 3P", "Автоматический выключатель 3P", "3P circuit breaker"],
          u: 'pc', e: '🎛️',
          v: [["C25 A, 6 kA", 118000], ["C40 A, 6 kA", 135000], ["C63 A, 6 kA", 175000]],
          b: ["IEK", "Schneider Electric", "ABB"],
        },
        {
          n: ["UZO (differensial o'chirgich)", "УЗО (дифференциальный выключатель)", "RCD residual current device"],
          u: 'pc', e: '🛡️',
          v: [["2P 25 A, 30 mA", 185000], ["2P 40 A, 30 mA", 205000], ["4P 40 A, 30 mA", 365000]],
          b: ["IEK", "Legrand", "Schneider Electric"],
        },
        {
          n: ["Taqsimlash shiti ichki o'rnatiladigan", "Щиток распределительный встраиваемый", "Flush distribution board"],
          u: 'pc', e: '🗄️',
          v: [["8M, IP30", 98000], ["12M, IP30", 135000], ["24M, IP40", 265000]],
          b: ["IEK", "Legrand", "Schneider Electric"],
        },
      ],
    },
    {
      id: 'electric-lights',
      e: '💡',
      n: ["Shiftga yoritgichlar va lyustralar", "Потолочные светильники и люстры", "Ceiling lights and chandeliers"],
      items: [
        {
          n: ["Lyustra shiftga osma", "Люстра потолочная подвесная", "Pendant chandelier"],
          u: 'pc', e: '🕯️',
          v: [["5×E14, Ø500 mm", 890000], ["8×E14, Ø700 mm", 1650000], ["12×E27, Ø900 mm", 3250000]],
          b: ["Eurosvet", "Maytoni", "Arte Lamp"],
        },
        {
          n: ["LED shift yoritgichi", "Светильник светодиодный потолочный", "LED ceiling light"],
          u: 'pc', e: '💡',
          v: [["36 W, Ø400 mm, 4000 K", 245000], ["60 W, Ø500 mm, 4000 K", 365000], ["100 W, 600×600 mm, 3000–6500 K", 690000]],
          b: ["Philips", "Eurosvet", "Ledvance"],
        },
        {
          n: ["Spot yoritgich ichki o'rnatiladigan", "Светильник точечный встраиваемый", "Recessed spotlight"],
          u: 'pc', e: '🔆',
          v: [["GU10, Ø85 mm", 28000], ["GU10, Ø85 mm, 35 W", 42000], ["LED 7 W, Ø90 mm, 4000 K", 58000]],
          b: ["Feron", "Eurosvet", "Ledvance"],
        },
        {
          n: ["Devor yoritgichi (bra)", "Бра настенное", "Wall sconce"],
          u: 'pc', e: '🏮',
          v: [["1×E14, 220 V", 245000], ["2×E14, 220 V", 385000]],
          b: ["Maytoni", "Eurosvet", "Arte Lamp"],
        },
      ],
    },
    {
      id: 'electric-led',
      e: '💡',
      n: ["LED lampalar", "Светодиодные лампы", "LED lamps and bulbs"],
      items: [
        {
          n: ["LED lampa E27", "Светодиодная лампа E27", "LED bulb E27"],
          u: 'pc', e: '💡',
          v: [["9 W, 4000 K", 14000], ["12 W, 4000 K", 18000], ["15 W, 6500 K", 24000]],
          b: ["Philips", "Osram", "Navigator"],
        },
        {
          n: ["LED lampa GU10 spot", "Светодиодная лампа GU10", "LED spot bulb GU10"],
          u: 'pc', e: '🔆',
          v: [["5 W, 3000 K", 13000], ["7 W, 4000 K", 17000]],
          b: ["Philips", "Osram", "Feron"],
        },
        {
          n: ["LED lenta", "Светодиодная лента", "LED strip"],
          u: 'roll', e: '🌈',
          v: [["5 m, 12 V, 4.8 W/m, IP20", 95000], ["5 m, 12 V, 14.4 W/m, IP65", 165000], ["5 m, 24 V, 19.2 W/m, IP20", 235000]],
          b: ["Feron", "Navigator", "Ledvance"],
        },
        {
          n: ["LED panel 600×600", "Светодиодная панель 600×600", "LED panel 600×600"],
          u: 'pc', e: '⬜',
          v: [["36 W, 4000 K", 135000], ["40 W, 6500 K", 148000], ["48 W, 4000 K", 195000]],
          b: ["Philips", "IEK", "Navigator"],
        },
      ],
    },
    {
      id: 'electric-ext',
      e: '🔋',
      n: ["Uzaytirgichlar va tarmoq filtrlari", "Удлинители и сетевые фильтры", "Extension cords and surge protectors"],
      items: [
        {
          n: ["Uzaytirgich rozetkali", "Удлинитель с розетками", "Extension cord with sockets"],
          u: 'pc', e: '🔌',
          v: [["3 m, ×4, 16 A", 65000], ["5 m, ×4, 16 A", 85000], ["10 m, ×6, 16 A", 175000]],
          b: ["IEK", "Legrand", "Era"],
        },
        {
          n: ["Tarmoq filtri himoyali", "Сетевой фильтр", "Surge protector"],
          u: 'pc', e: '🛡️',
          v: [["1.8 m, ×5, 2200 W", 98000], ["3 m, ×6, 2200 W, USB", 165000]],
          b: ["APC", "Pilot", "Era"],
        },
        {
          n: ["Kabel g'altagi (katushka) uzaytirgich", "Удлинитель на катушке", "Cable reel extension"],
          u: 'pc', e: '🧲',
          v: [["20 m, ×4, 2×1.5 mm²", 235000], ["30 m, ×4, 3×1.5 mm²", 345000], ["50 m, ×4, 3×2.5 mm²", 790000]],
          b: ["IEK", "Era", "Bosch"],
        },
        {
          n: ["Kuchlanish stabilizatori", "Стабилизатор напряжения", "Voltage stabilizer"],
          u: 'pc', e: '⚙️',
          v: [["1000 VA, 140–260 V", 520000], ["3000 VA, 140–260 V", 1250000], ["8000 VA, 140–260 V", 3150000]],
          b: ["Resanta", "Ruself", "Sven"],
        },
      ],
    },
    {
      id: 'electric-channel',
      e: '📎',
      n: ["Kabel-kanallar va gofra", "Кабель-каналы и гофра", "Cable channels and corrugated pipe"],
      items: [
        {
          n: ["Plastik kabel-kanal", "Кабель-канал пластиковый", "Plastic cable channel"],
          u: 'pc', e: '📎',
          v: [["16×16 mm, 2 m", 6500], ["25×16 mm, 2 m", 8500], ["40×25 mm, 2 m", 16500]],
          b: ["Legrand", "IEK", "DKC"],
        },
        {
          n: ["Gofra quvur PVC", "Гофра ПВХ", "PVC corrugated conduit"],
          u: 'm', e: '〰️',
          v: [["Ø16 mm", 1900], ["Ø20 mm", 2500], ["Ø25 mm", 3400]],
          b: ["IEK", "Ruvinil", "DKC"],
        },
        {
          n: ["Simlarni ulash klemmalari", "Клеммы для соединения проводов", "Wire connector terminals"],
          u: 'pack', e: '🔗',
          v: [["2P, ×50", 65000], ["3P, ×50", 85000], ["5P, ×30", 98000]],
          b: ["Wago", "IEK", "Legrand"],
        },
        {
          n: ["Elektr izolenta", "Изолента ПВХ", "PVC electrical tape"],
          u: 'pc', e: '🟦',
          v: [["19 mm × 20 m", 9500], ["19 mm × 20 m, ×10", 85000], ["50 mm × 33 m", 28000]],
          b: ["3M", "IEK", "Tesa"],
        },
      ],
    },
    {
      id: 'electric-heat',
      e: '🔥',
      n: ["Elektr isitish", "Электрическое отопление", "Electric heating"],
      items: [
        {
          n: ["Elektr konvektor", "Электроконвектор", "Electric convector heater"],
          u: 'pc', e: '♨️',
          v: [["1000 W, 220 V", 520000], ["1500 W, 220 V", 690000], ["2000 W, 220 V", 850000]],
          b: ["Ballu", "Electrolux", "Noirot"],
        },
        {
          n: ["Moyli radiator", "Радиатор масляный", "Oil-filled radiator"],
          u: 'pc', e: '♨️',
          v: [["1500 W, ×7", 595000], ["2000 W, ×9", 735000], ["2500 W, ×11", 890000]],
          b: ["Ballu", "Delonghi", "Polaris"],
        },
        {
          n: ["Issiq pol isitish kabeli", "Нагревательный кабель для тёплого пола", "Underfloor heating cable"],
          u: 'm2', e: '🔥',
          v: [["150 W/m², 220 V", 215000], ["200 W/m², 220 V", 255000]],
          b: ["Teplolux", "Devi", "Ryxon"],
        },
        {
          n: ["Issiq pol isitish matt", "Нагревательный мат для тёплого пола", "Underfloor heating mat"],
          u: 'm2', e: '🔥',
          v: [["150 W/m², 0.5×2 m", 235000], ["160 W/m², 0.5×4 m", 275000], ["200 W/m², 0.5×6 m", 345000]],
          b: ["Teplolux", "Devi", "Ryxon"],
        },
      ],
    },
  ],
};

export default c;
