import de from './de.json';

const dict: { [key: string]: string } =
  typeof localStorage !== 'undefined' && localStorage.getItem('lang') === 'de'
    ? de
    : {};

export function i18n(text: string): string {
  return dict[text] || text;
}
