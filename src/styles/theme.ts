const theme = {
  color: {
    primary: '#FFDDDD',
    secondary: '#F0696A',

    yellow: '#F7E600',
    silver: '#F5F5F5',
    lightGray: '#D8D8D8',
    gray: '#ACACAC',
    black: '#000000',
    white: '#FFFFFF',

    error: '#F14646',
    warning: '#EF8523',
    success: '#31A115',

    font: {
      primary: '#000000',
    },

    background: {
      primary: '#FFFFFF',
      secondary: 'rgba(0, 0, 0, 0.3);',
    },
  },
  fontSize: {
    overline: '10px',
    caption: '12px',
    body2: '14px',
    body1: '16px',
    headline6: '20px',
    headline5: '24px',
  },

  shadow: {
    '1': '0 0 2px 2px rgba(0, 0, 0, 0.2)',
    '2': '0px 3px 8px rgba(0, 0, 0, 0.24)',
    '3': '0 0 4px 4px rgba(0, 0, 0, 0.2)',
    '4': '0 0 6px 6px rgba(0, 0, 0, 0.2)',
    '5': '0 0 8px 8px rgba(0, 0, 0, 0.2)',
    '6': '0 0 10px 10px rgba(0, 0, 0, 0.2)',
    map: 'rgba(60, 64, 67, 0.3) 0px 1px 2px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
  },
} as const;

export type Theme = typeof theme;

export default theme;
