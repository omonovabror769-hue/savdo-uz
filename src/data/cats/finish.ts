import type { Category } from '../types';

const c: Category = {
  id: 'finish',
  e: '🎨',
  n: ["Pardozlash ishlari", "Финишная отделка", "Finishing"],
  subs: [
    {
      id: 'finish-tile',
      e: '🟫',
      n: ["Kafel va keramogranit", "Плитка и керамогранит", "Ceramic tile & porcelain"],
      items: [
        {
          n: ["Pol uchun keramik plitka", "Плитка керамическая напольная", "Ceramic floor tile"],
          u: 'm2', e: '🟫',
          v: [["300×300 mm", 95000], ["400×400 mm", 110000], ["450×450 mm", 135000]],
          b: ["Kerama Marazzi", "Golden Tile", "Toshkent Kafel"],
        },
        {
          n: ["Devor uchun kafel", "Плитка настенная", "Wall tile"],
          u: 'm2', e: '🔲',
          v: [["200×300 mm", 98000], ["250×400 mm", 125000], ["300×600 mm", 165000]],
          b: ["Kerama Marazzi", "Cersanit", "Golden Tile"],
        },
        {
          n: ["Keramogranit", "Керамогранит", "Porcelain stoneware"],
          u: 'm2', e: '⬜',
          v: [["600×600 mm, 9 mm", 165000], ["600×1200 mm, 10 mm", 235000], ["800×800 mm, 10 mm", 215000]],
          b: ["Kerama Marazzi", "Cersanit", "Vitra"],
        },
        {
          n: ["Plitka yelimi", "Клей плиточный", "Tile adhesive"],
          u: 'bag', e: '🪣',
          v: [["C1, 25 kg", 48000], ["C2, 25 kg", 68000]],
          b: ["Ceresit", "Knauf", "Kreps"],
        },
      ],
    },
    {
      id: 'finish-laminate',
      e: '🪵',
      n: ["Laminat va parket", "Ламинат и паркет", "Laminate & flooring"],
      items: [
        {
          n: ["Laminat 32-sinf", "Ламинат 32 класс", "Laminate AC4 / class 32"],
          u: 'm2', e: '🪵',
          v: [["8 mm, 1285×192 mm", 95000], ["10 mm, 1285×192 mm", 125000], ["12 mm, 1285×192 mm", 155000]],
          b: ["Kronospan", "Egger", "Tarkett"],
        },
        {
          n: ["Laminat 33-sinf, suvga chidamli", "Ламинат 33 класс влагостойкий", "Water-resistant laminate class 33"],
          u: 'm2', e: '💧',
          v: [["10 mm, 1380×193 mm", 165000], ["12 mm, 1380×193 mm", 205000]],
          b: ["Quick-Step", "Egger", "Tarkett"],
        },
        {
          n: ["Kvarts-vinil qoplama (SPC)", "Кварц-виниловая плитка (SPC)", "SPC vinyl flooring"],
          u: 'm2', e: '🧱',
          v: [["4 mm, 1220×180 mm", 175000], ["5 mm, 1220×180 mm", 215000]],
          b: ["Tarkett", "Quick-Step"],
        },
        {
          n: ["Laminat tagligi (podlojka)", "Подложка под ламинат", "Laminate underlay"],
          u: 'roll', e: '📜',
          v: [["2 mm, 10 m²", 38000], ["3 mm, 10 m²", 52000], ["5 mm, 8 m²", 78000]],
          b: ["Tarkett", "Izolon"],
        },
      ],
    },
    {
      id: 'finish-linoleum',
      e: '🟦',
      n: ["Linoleum va gilam", "Линолеум и ковролин", "Linoleum & carpet"],
      items: [
        {
          n: ["Maishiy linoleum", "Линолеум бытовой", "Residential linoleum"],
          u: 'm2', e: '🟦',
          v: [["3.0 m, 2.5 mm", 55000], ["3.5 m, 3.0 mm", 68000], ["4.0 m, 3.5 mm", 82000]],
          b: ["Tarkett", "Juteks"],
        },
        {
          n: ["Tijorat linoleumi", "Линолеум коммерческий", "Commercial linoleum"],
          u: 'm2', e: '🏢',
          v: [["2.0 m, 2.0 mm", 95000], ["3.0 m, 2.5 mm", 125000]],
          b: ["Tarkett", "Armstrong"],
        },
        {
          n: ["Kovrolin", "Ковролин", "Carpet flooring"],
          u: 'm2', e: '🧶',
          v: [["4.0 m, 5 mm", 48000], ["4.0 m, 7 mm", 65000], ["3.0 m, 9 mm", 92000]],
          b: ["Balta", "Juteks"],
        },
      ],
    },
    {
      id: 'finish-wallpaper',
      e: '🖼️',
      n: ["Oboy", "Обои", "Wallpaper"],
      items: [
        {
          n: ["Vinil oboy", "Обои виниловые", "Vinyl wallpaper"],
          u: 'roll', e: '🖼️',
          v: [["1.06×10.05 m", 145000], ["1.06×10.05 m, 200 g/m²", 215000]],
          b: ["Erismann", "Marburg", "Palitra"],
        },
        {
          n: ["Flizelin oboy", "Обои флизелиновые", "Non-woven wallpaper"],
          u: 'roll', e: '🎞️',
          v: [["1.06×10.05 m", 185000], ["1.06×10.05 m, 260 g/m²", 275000], ["0.53×10.05 m", 125000]],
          b: ["Erismann", "Marburg"],
        },
        {
          n: ["Shisha tola oboy (bo'yaladigan)", "Стеклообои под покраску", "Paintable fiberglass wallpaper"],
          u: 'roll', e: '🧵',
          v: [["1×25 m, 110 g/m²", 285000], ["1×50 m, 160 g/m²", 590000]],
          b: ["Oscar", "Wellton"],
        },
        {
          n: ["Oboy yelimi", "Клей обойный", "Wallpaper paste"],
          u: 'pack', e: '🧴',
          v: [["250 g", 28000], ["500 g", 48000]],
          b: ["Quelyd", "Metylan"],
        },
      ],
    },
    {
      id: 'finish-doors',
      e: '🚪',
      n: ["Ichki eshiklar", "Межкомнатные двери", "Interior doors"],
      items: [
        {
          n: ["Ichki eshik, shpon", "Дверь межкомнатная шпонированная", "Veneered interior door"],
          u: 'set', e: '🚪',
          v: [["700×2000 mm", 1850000], ["800×2000 mm", 2050000], ["900×2000 mm", 2350000]],
          b: ["Akfa", "Imzo"],
        },
        {
          n: ["Ichki eshik, laminatsiyalangan (PVX)", "Дверь межкомнатная ПВХ", "PVC-laminated interior door"],
          u: 'set', e: '🚪',
          v: [["700×2000 mm", 1250000], ["800×2000 mm", 1450000], ["900×2000 mm", 1650000]],
          b: ["Imzo", "Akfa"],
        },
        {
          n: ["Shishali ichki eshik", "Дверь межкомнатная со стеклом", "Glazed interior door"],
          u: 'set', e: '🪟',
          v: [["700×2000 mm", 1750000], ["800×2000 mm", 1950000], ["900×2000 mm", 2250000]],
          b: ["Imzo", "Akfa"],
        },
        {
          n: ["Kirish metall eshigi", "Дверь входная металлическая", "Steel entrance door"],
          u: 'set', e: '🛡️',
          v: [["860×2050 mm, 1.2 mm", 3100000], ["960×2050 mm, 1.5 mm", 3900000]],
          b: ["Akfa", "Imzo"],
        },
      ],
    },
    {
      id: 'finish-ceilings',
      e: '⬜',
      n: ["Shiftlar (tortma, Armstrong)", "Потолки (натяжные, Армстронг)", "Ceilings (stretch / Armstrong)"],
      items: [
        {
          n: ["Armstrong shift plitasi", "Плита потолочная Армстронг", "Armstrong ceiling tile"],
          u: 'pack', e: '⬜',
          v: [["600×600×12 mm, 20 pcs", 285000], ["600×600×15 mm, 20 pcs", 345000], ["1200×600×12 mm, 10 pcs", 310000]],
          b: ["Armstrong", "Knauf", "Rockfon"],
        },
        {
          n: ["Armstrong uchun T-24 profil", "Профиль Т-24 для Армстронг", "T-24 suspended ceiling profile"],
          u: 'pc', e: '➖',
          v: [["3600 mm", 28000], ["1200 mm", 9500], ["600 mm", 5500]],
          b: ["Armstrong", "Knauf"],
        },
        {
          n: ["Tortma shift plyonkasi", "Пленка для натяжного потолка", "Stretch ceiling film"],
          u: 'm2', e: '🪞',
          v: [["3.2 m, 0.17 mm", 55000], ["3.2 m, 0.18 mm", 62000], ["3.2 m, 0.20 mm", 68000]],
          b: ["Pongs", "Descor"],
        },
        {
          n: ["PVX shift paneli", "Панель потолочная ПВХ", "PVC ceiling panel"],
          u: 'pc', e: '📏',
          v: [["250×6000×8 mm", 48000], ["250×3000×8 mm", 26000]],
          b: ["Navoiy Plastmass", "Decostar"],
        },
      ],
    },
    {
      id: 'finish-panels',
      e: '🧱',
      n: ["Devor panellari va dekor", "Стеновые панели и декор", "Wall panels & decor"],
      items: [
        {
          n: ["MDF devor paneli", "Панель стеновая МДФ", "MDF wall panel"],
          u: 'pc', e: '🟫',
          v: [["2600×200×8 mm", 42000], ["2600×250×10 mm", 58000]],
          b: ["Kronospan", "Egger"],
        },
        {
          n: ["PVX devor paneli", "Панель стеновая ПВХ", "PVC wall panel"],
          u: 'pc', e: '🔳',
          v: [["2700×250×8 mm", 38000], ["3000×250×8 mm", 42000], ["2700×300×9 mm", 55000]],
          b: ["Navoiy Plastmass", "Decostar"],
        },
        {
          n: ["3D gips paneli", "Панель гипсовая 3D", "3D gypsum panel"],
          u: 'pc', e: '🔷',
          v: [["500×500×20 mm", 52000], ["500×500×25 mm", 68000], ["600×600×25 mm", 95000]],
          b: ["Artdecor", "Gipsart"],
        },
        {
          n: ["Dekorativ shtukaturka", "Штукатурка декоративная", "Decorative plaster"],
          u: 'bag', e: '🎨',
          v: [["25 kg, 2.5 mm", 125000], ["25 kg, 1.5 mm", 98000], ["5 kg", 245000]],
          b: ["Ceresit", "Knauf", "Caparol"],
        },
      ],
    },
    {
      id: 'finish-skirting',
      e: '📏',
      n: ["Plintus va ostonalar", "Плинтусы и пороги", "Skirting boards & thresholds"],
      items: [
        {
          n: ["PVX plintus kabel kanali bilan", "Плинтус ПВХ с кабель-каналом", "PVC skirting with cable channel"],
          u: 'pc', e: '📏',
          v: [["55 mm, 2500 mm", 28000], ["70 mm, 2500 mm", 38000], ["85 mm, 2500 mm", 52000]],
          b: ["Ideal", "Navoiy Plastmass"],
        },
        {
          n: ["MDF plintus", "Плинтус МДФ", "MDF skirting board"],
          u: 'pc', e: '🪵',
          v: [["60×16×2400 mm", 42000], ["80×16×2400 mm", 58000], ["100×16×2400 mm", 78000]],
          b: ["Kronospan", "Egger"],
        },
        {
          n: ["Alyuminiy ostona", "Порог алюминиевый", "Aluminium threshold"],
          u: 'pc', e: '〰️',
          v: [["30 mm, 900 mm", 38000], ["40 mm, 1800 mm", 85000]],
          b: ["Akfa", "Ideal"],
        },
        {
          n: ["Plitka burchagi profili", "Уголок для плитки", "Tile edge trim"],
          u: 'pc', e: '📐',
          v: [["10 mm, 2500 mm", 18000], ["12 mm, 2500 mm", 24000]],
          b: ["Ideal", "Profilplast"],
        },
      ],
    },
  ],
};

export default c;
