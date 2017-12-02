import { Config } from '../app.config';
import { NbMenuItem } from '@nebular/theme';

const BASIC_MENU_ITEMS = [
  {
    title: 'BASIC TOOLS',
    group: true,
  },
  {
    title: 'User commands',
    icon: 'nb-cloudy',
    link: '/pages/basic/user-commands',
  },
  {
    title: 'Topics data',
    icon: 'fa fa-lg fa-database',
    link: '/pages/basic/topics',
  },
];

const TEMPLATE_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'TEMPLATE FEATURES',
    group: true,
  },
  {
    title: 'Dashboard template',
    icon: 'nb-home',
    link: '/pages/templates/dashboard',
    home: true,
  },
  {
    title: 'UI Features',
    icon: 'nb-keypad',
    link: '/pages/templates/ui-features',
    children: [
      {
        title: 'Buttons',
        link: '/pages/templates/ui-features/buttons',
      },
      {
        title: 'Grid',
        link: '/pages/templates/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/templates/ui-features/icons',
      },
      {
        title: 'Modals',
        link: '/pages/templates/ui-features/modals',
      },
      {
        title: 'Typography',
        link: '/pages/templates/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/templates/ui-features/search-fields',
      },
      {
        title: 'Tabs',
        link: '/pages/templates/ui-features/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'nb-compose',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/templates/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/templates/forms/layouts',
      },
    ],
  },
  {
    title: 'Components',
    icon: 'nb-gear',
    children: [
      {
        title: 'Tree',
        link: '/pages/templates/components/tree',
      }, {
        title: 'Notifications',
        link: '/pages/templates/components/notifications',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/templates/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/templates/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/templates/maps/bubble',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/templates/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/templates/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/templates/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/templates/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/templates/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/templates/tables/smart-table',
      },
    ],
  },
];

export const PROJECT_ITEMS: NbMenuItem[] = [
  {
    title: 'PROJECT TOOLS',
    group: true,
  }
];

export const MENU_ITEMS: NbMenuItem[] = [
  ...PROJECT_ITEMS,
  ...BASIC_MENU_ITEMS,
];

if (Config.showTemplateSamples) {
  MENU_ITEMS.push(...TEMPLATE_MENU_ITEMS);
}
