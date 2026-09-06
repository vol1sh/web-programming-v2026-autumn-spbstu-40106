const CUTOFFS = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];

const SIGNS = [
  'Козерог',
  'Водолей',
  'Рыбы',
  'Овен',
  'Телец',
  'Близнецы',
  'Рак',
  'Лев',
  'Дева',
  'Весы',
  'Скорпион',
  'Стрелец',
];

export function getZodiacSign(date) {
  const month = date.getMonth();
  const day = date.getDate();

  return day < CUTOFFS[month] ? SIGNS[month] : SIGNS[(month + 1) % 12];
}
