import type { Category } from '../types';

const c: Category = {
  id: 'fasteners',
  e: '🔩',
  n: ["Mahkamlash buyumlari", "Крепеж", "Fasteners"],
  subs: [
    {
      id: 'fasteners-screws',
      e: '🔩',
      n: ["Shurup va o'zi kesuvchi vintlar", "Саморезы", "Self-tapping screws"],
      items: [
        {
          n: ["Yog'och uchun universal shurup", "Саморез универсальный по дереву", "Universal wood screw"],
          u: 'pack', e: '🔩',
          v: [["3.5×35 mm, 200 pcs", 22000], ["4.0×50 mm, 200 pcs", 38000], ["5.0×70 mm, 100 pcs", 42000]],
          b: ["Wkret-met", "Starfix", "Zubr"],
        },
        {
          n: ["Gipskarton uchun shurup (qora)", "Саморез по гипсокартону", "Drywall screw"],
          u: 'pack', e: '⚫',
          v: [["3.5×25 mm, 1000 pcs", 48000], ["3.5×35 mm, 1000 pcs", 58000], ["3.5×45 mm, 500 pcs", 38000]],
          b: ["Wkret-met", "Starfix"],
        },
        {
          n: ["Metall uchun o'zi kesuvchi vint", "Саморез по металлу", "Metal self-drilling screw"],
          u: 'pack', e: '🔧',
          v: [["4.2×16 mm, 500 pcs", 35000], ["4.8×19 mm, 500 pcs", 52000]],
          b: ["Wkret-met", "Zubr"],
        },
        {
          n: ["Tom yopish uchun shurup", "Саморез кровельный", "Roofing screw"],
          u: 'pack', e: '🏠',
          v: [["4.8×35 mm, 100 pcs", 48000], ["5.5×51 mm, 100 pcs", 78000]],
          b: ["Wkret-met", "Starfix"],
        },
      ],
    },
    {
      id: 'fasteners-dowels',
      e: '🔘',
      n: ["Dyubel va dyubel-mixlar", "Дюбели и дюбель-гвозди", "Dowels & dowel-nails"],
      items: [
        {
          n: ["Plastik dyubel", "Дюбель распорный", "Plastic expansion dowel"],
          u: 'pack', e: '⚪',
          v: [["6×30 mm, 100 pcs", 8000], ["8×40 mm, 100 pcs", 14000], ["10×50 mm, 50 pcs", 15000]],
          b: ["Fischer", "Mungo", "Starfix"],
        },
        {
          n: ["Dyubel-mix (tez montaj)", "Дюбель-гвоздь", "Nail-in dowel"],
          u: 'pack', e: '📍',
          v: [["6×40 mm, 100 pcs", 22000], ["6×60 mm, 100 pcs", 28000], ["6×80 mm, 100 pcs", 35000]],
          b: ["Fischer", "Starfix"],
        },
        {
          n: ["Fasad dyubeli", "Дюбель фасадный", "Frame fixing"],
          u: 'pack', e: '🏢',
          v: [["10×100 mm, 50 pcs", 65000], ["10×140 mm, 50 pcs", 85000]],
          b: ["Fischer", "Mungo"],
        },
        {
          n: ["Gipskarton uchun kapalak dyubel", "Дюбель-бабочка для ГКЛ", "Drywall butterfly anchor"],
          u: 'pack', e: '🦋',
          v: [["Ø10×50 mm, 50 pcs", 45000], ["Ø12×60 mm, 50 pcs", 62000]],
          b: ["Fischer", "Sormat"],
        },
      ],
    },
    {
      id: 'fasteners-nails',
      e: '📌',
      n: ["Mixlar", "Гвозди", "Nails"],
      items: [
        {
          n: ["Qurilish mixlari", "Гвозди строительные", "Construction nails"],
          u: 'kg', e: '📌',
          v: [["2.5×50 mm", 16000], ["3.0×80 mm", 15000], ["4.0×100 mm", 14000]],
          b: ["Zubr", "Mungo"],
        },
        {
          n: ["Pardozlash mixlari (shlyapkasiz)", "Гвозди финишные", "Finishing nails"],
          u: 'kg', e: '📍',
          v: [["1.4×30 mm", 24000], ["1.8×40 mm", 22000], ["2.0×50 mm", 20000]],
          b: ["Zubr", "Starfix"],
        },
        {
          n: ["Tom yopish mixlari", "Гвозди толевые", "Roofing nails"],
          u: 'kg', e: '🏠',
          v: [["3.0×30 mm", 22000], ["3.5×40 mm", 20000]],
          b: ["Zubr", "Mungo"],
        },
        {
          n: ["Vintli mix", "Гвозди винтовые", "Ring-shank nails"],
          u: 'kg', e: '🔩',
          v: [["3.1×75 mm", 26000], ["4.0×100 mm", 24000]],
          b: ["Mungo", "Zubr"],
        },
      ],
    },
    {
      id: 'fasteners-anchors',
      e: '⚓',
      n: ["Ankerlar", "Анкеры", "Anchors"],
      items: [
        {
          n: ["Ponali anker (ponali bolt)", "Анкер клиновой", "Wedge anchor"],
          u: 'pack', e: '⚓',
          v: [["M8×75 mm, 50 pcs", 68000], ["M10×100 mm, 25 pcs", 62000], ["M12×120 mm, 20 pcs", 75000]],
          b: ["Fischer", "Hilti", "Sormat"],
        },
        {
          n: ["Gilzali anker", "Анкер с гильзой", "Sleeve anchor"],
          u: 'pack', e: '🔗',
          v: [["M8×60 mm, 50 pcs", 58000], ["M10×80 mm, 25 pcs", 52000]],
          b: ["Fischer", "Sormat"],
        },
        {
          n: ["Kimyoviy anker", "Анкер химический", "Chemical anchor"],
          u: 'pc', e: '🧪',
          v: [["300 ml", 145000], ["410 ml", 215000]],
          b: ["Hilti", "Fischer", "Sormat"],
        },
        {
          n: ["Ilmoqli anker", "Анкер с крюком", "Hook anchor"],
          u: 'pack', e: '🪝',
          v: [["M6×60 mm, 20 pcs", 38000], ["M8×80 mm, 10 pcs", 32000]],
          b: ["Fischer", "Starfix"],
        },
      ],
    },
    {
      id: 'fasteners-bolts',
      e: '⚙️',
      n: ["Bolt, gayka va shayba (metrik)", "Болты, гайки, шайбы (метрика)", "Bolts, nuts & washers (metric)"],
      items: [
        {
          n: ["Olti qirrali bolt, 8.8", "Болт шестигранный 8.8", "Hex bolt, grade 8.8"],
          u: 'kg', e: '🔩',
          v: [["M8×40 mm", 26000], ["M10×60 mm", 24000], ["M12×80 mm", 22000]],
          b: ["Zubr", "Mungo"],
        },
        {
          n: ["Olti qirrali gayka", "Гайка шестигранная", "Hex nut"],
          u: 'kg', e: '⚙️',
          v: [["M8", 25000], ["M10", 23000], ["M12", 21000]],
          b: ["Zubr", "Mungo"],
        },
        {
          n: ["Yassi shayba", "Шайба плоская", "Flat washer"],
          u: 'kg', e: '⭕',
          v: [["M8", 22000], ["M10", 20000], ["M12", 19000]],
          b: ["Zubr", "Starfix"],
        },
        {
          n: ["Rezbali sterjen (shpilka)", "Шпилька резьбовая", "Threaded rod"],
          u: 'pc', e: '📏',
          v: [["M8×1000 mm", 12000], ["M10×1000 mm", 18000], ["M12×1000 mm", 26000]],
          b: ["Zubr", "Mungo"],
        },
      ],
    },
    {
      id: 'fasteners-perforated',
      e: '📐',
      n: ["Teshikli mahkamlagichlar va burchaklar", "Перфорированный крепеж и уголки", "Perforated fasteners & corners"],
      items: [
        {
          n: ["Montaj burchagi", "Уголок крепежный", "Mounting angle bracket"],
          u: 'pack', e: '📐',
          v: [["40×40×40 mm, 10 pcs", 18000], ["60×60×40 mm, 10 pcs", 28000], ["90×90×65 mm, 10 pcs", 52000]],
          b: ["Starfix", "Zubr"],
        },
        {
          n: ["Teshikli montaj lentasi", "Лента перфорированная монтажная", "Perforated mounting tape"],
          u: 'roll', e: '➰',
          v: [["12×0.5 mm, 10 m", 14000], ["20×0.75 mm, 10 m", 28000]],
          b: ["Starfix", "Zubr"],
        },
        {
          n: ["Teshikli plastina", "Пластина крепежная перфорированная", "Perforated plate"],
          u: 'pack', e: '▪️',
          v: [["40×120 mm, 10 pcs", 22000], ["60×180 mm, 10 pcs", 38000]],
          b: ["Starfix", "Wkret-met"],
        },
        {
          n: ["Balka tayanchi (bashmak)", "Опора бруса", "Joist hanger"],
          u: 'pc', e: '🪵',
          v: [["50×100 mm", 9500], ["60×140 mm", 12500], ["80×160 mm", 16500]],
          b: ["Starfix", "Zubr"],
        },
      ],
    },
    {
      id: 'fasteners-clamps',
      e: '🗜️',
      n: ["Xomutlar va osmalar", "Хомуты и подвесы", "Clamps & hangers"],
      items: [
        {
          n: ["Quvur xomuti, rezinali", "Хомут сантехнический с резиной", "Rubber-lined pipe clamp"],
          u: 'pack', e: '⭕',
          v: [["1/2\" (Ø20), 10 pcs", 18000], ["3/4\" (Ø25), 10 pcs", 24000], ["1\" (Ø32), 10 pcs", 32000]],
          b: ["Starfix", "Zubr"],
        },
        {
          n: ["Chervyakli xomut", "Хомут червячный", "Worm-drive hose clamp"],
          u: 'pack', e: '🗜️',
          v: [["8–16 mm, 10 pcs", 15000], ["16–27 mm, 10 pcs", 18000], ["40–60 mm, 10 pcs", 26000]],
          b: ["Zubr", "Mungo"],
        },
        {
          n: ["Plastik kabel xomuti", "Хомут пластиковый (стяжка)", "Plastic cable tie"],
          u: 'pack', e: '🔗',
          v: [["2.5×150 mm, 100 pcs", 9000], ["3.6×250 mm, 100 pcs", 16000], ["4.8×350 mm, 100 pcs", 28000]],
          b: ["Zubr", "Starfix"],
        },
        {
          n: ["Quvur osmasi (ilgak)", "Подвес для труб", "Pipe hanger"],
          u: 'pack', e: '🪝',
          v: [["M8, Ø20–25 mm, 10 pcs", 32000], ["M8, Ø32–40 mm, 10 pcs", 42000]],
          b: ["Starfix", "Hilti"],
        },
      ],
    },
  ],
};

export default c;
