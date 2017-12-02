export const DARK_THEME = {
  name: 'dark',
  base: 'default',
  variables: {

    temperature: [
      '#2ec7fe',
      '#31ffad',
      '#7bff24',
      '#fff024',
      '#f7bd59',
    ],

    solar: {
      gradientLeft: '#7bff24',
      gradientRight: '#2ec7fe',
      shadowColor: '#19977E',
      radius: ['70%', '90%'],
    },

    traffic: {
      colorBlack: '#000000',
      tooltipBg: 'rgba(0, 255, 170, 0.35)',
      tooltipBorderColor: '#00d977',
      tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 rgba(0, 255, 170, 0.35); border-radius: 10px; padding: 4px 16px;',
      tooltipTextColor: '#ffffff',
      tooltipFontWeight: 'normal',

      lineBg: '#d1d1ff',
      lineShadowBlur: '14',
      itemColor: '#BEBBFF',
      itemBorderColor: '#ffffff',
      itemEmphasisBorderColor: '#ffffff',
      shadowLineDarkBg: '#655ABD',
      shadowLineShadow: 'rgba(33, 7, 77, 0.5)',
      gradFrom: 'rgba(118, 89, 255, 0.4)',
      gradTo: 'rgba(164, 84, 255, 0.5)',
    },

    electricity: {
      tooltipBg: 'rgba(0, 255, 170, 0.35)',
      tooltipLineColor: 'rgba(255, 255, 255, 0.1)',
      tooltipLineWidth: '1',
      tooltipBorderColor: '#00d977',
      tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 rgba(0, 255, 170, 0.35); border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: '#ffffff',
      tooltipFontWeight: 'normal',

      axisLineColor: 'rgba(161, 161 ,229, 0.3)',
      xAxisTextColor: '#a1a1e5',
      yAxisSplitLine: 'rgba(161, 161 ,229, 0.2)',

      itemBorderColor: '#ffffff',
      lineStyle: 'dotted',
      lineWidth: '6',
      lineGradFrom: '#00ffaa',
      lineGradTo: '#fff835',
      lineShadow: 'rgba(120, 126, 129, 0.4)',

      areaGradFrom: '#8393AF',
      areaGradTo: '#2c3539',
      shadowLineDarkBg: '#a695ff',
    },

    bubbleMap: {
      titleColor: '#ffffff',
      areaColor: '#2c2961',
      areaHoverColor: '#a1a1e5',
      areaBorderColor: '#654ddb',
    },

    echarts: {
      bg: '#232a2e',
      textColor: '#ffffff',
      axisLineColor: '#a1a1e5',
      splitLineColor: '#342e73',
      itemHoverShadowColor: 'rgba(0, 0, 0, 0.5)',
      tooltipBackgroundColor: '#6a7985',
      areaOpacity: '1',
    },

    chartjs: {
      axisLineColor: '#a1a1e5',
      textColor: '#ffffff',
    },
  },
};