const mappings = {
  utilities: {
    // Backgrounds, Borders, Colors
    'bg--': 'background-color',
    'text--': 'font-size',
    'border--': 'border-width',
    'border-color--': 'border-color',
    'text-color--': 'color',

    // Spacing
    'p--': 'padding',
    'm--': 'margin',
    'pt--': 'padding-top',
    'pb--': 'padding-bottom',
    'pl--': 'padding-left',
    'pr--': 'padding-right',
    'mt--': 'margin-top',
    'mb--': 'margin-bottom',
    'ml--': 'margin-left',
    'mr--': 'margin-right',

    // Layout and Sizing
    'w--': 'width',
    'h--': 'height',
    'min-w--': 'min-width',
    'min-h--': 'min-height',
    'max-w--': 'max-width',
    'max-h--': 'max-height',
    'flex--': 'flex',
    'grid-cols--': 'grid-template-columns',

    // Fonts and Text
    'font--': 'font-family',
    'leading--': 'line-height',
    'tracking--': 'letter-spacing',
    'text-opacity--': 'color-opacity',
  },

  responsiveBreakpoints: {
    'sm:': '@media (min-width: 640px)',
    'md:': '@media (min-width: 768px)',
    'lg:': '@media (min-width: 1024px)',
    'xl:': '@media (min-width: 1280px)',
    '2xl:': '@media (min-width: 1536px)',
  },

  pseudoClasses: {
    'hover:': ':hover',
    'focus:': ':focus',
    'active:': ':active',
    'disabled:': ':disabled',
    'checked:': ':checked',
    'visited:': ':visited',
    'first:': ':first-child',
    'last:': ':last-child',
    'odd:': ':nth-child(odd)',
    'even:': ':nth-child(even)',
  }
};

module.exports = mappings;
