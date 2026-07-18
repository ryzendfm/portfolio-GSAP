import { lenis } from '@/main';
import router from '@/router';

const textSplitterIntoChar = (
  text: string,
  isFancyFont: boolean = false,
  isNewLine: boolean = false,
): string => {
  const words = text.split(' ');
  const char = words.map((word) => word.split(''));

  let result = '';
  char.forEach((word) => {
    result += '<span class="text-nowrap!  overflow-clip ';
    if (isNewLine) {
      result += ' leading-none block  ';
    } else {
      result += ' inline-block ';
    }
    result += '">';

    word.forEach((char) => {
      let classes =
        'letters translate-y-[120%] inline-block will-change-auto will-change-transform ';
      if (isFancyFont) {
        classes += ' font-fancy ';
      }

      result += `<span class="${classes}">${char}</span>`;
    });

    result += '</span> ';
  });

  return result;
};

const getAvailableForWorkDate = () => {
  const date = new Date();

  const year = date.getFullYear().toString().slice(-2);
  const monthNames = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  let index = date.getMonth();

  // Uncomment this if you want to include the next month
  // if (date.getMonth() < 12) {
  //   index += 1;
  // }
  const month = monthNames[index];

  return `${month} '${year}`;
};

const gotoSection = async (url: string) => {
  lenis.start();
  const target = url === '#testimonials-section' ? '#slider' : url;

  // Hash links point at sections on the home page. If we're currently on
  // another route (e.g. a category page), navigate home first, then scroll.
  if (target.startsWith('#') && router.currentRoute.value.name !== 'home') {
    await router.push({ name: 'home' });
    requestAnimationFrame(() => lenis.scrollTo(target, { duration: 2 }));
    return;
  }

  lenis.scrollTo(target, { duration: 3 });
};

export { textSplitterIntoChar, getAvailableForWorkDate, gotoSection };
