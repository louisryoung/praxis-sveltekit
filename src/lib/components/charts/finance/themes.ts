import type {
  AreaSeriesPartialOptions,
  CandlestickSeriesPartialOptions,
  ChartOptions,
  DeepPartial,
} from 'lightweight-charts';

export const AreaChartThemes = {
  dark: {
    chart: {
      layout: {
        background: {
          color: 'transparent',
        },
        // lineColor: 'black',
        textColor: '#D9D9D9',
        fontFamily:
          "'Open Sans', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      },
      grid: {
        vertLines: {
          color: 'rgba(23,23,23, 0.5)',
        },
        horzLines: {
          color: 'rgba(23,23,23, 0.5)',
        },
      },
      rightPriceScale: {
        autoScale: false,
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        visible: true,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      timeScale: {
        visible: true,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    } satisfies DeepPartial<ChartOptions>,
    series: {
      topColor: 'rgba(20, 184, 166, 0.56)',
      bottomColor: 'rgba(20, 184, 166, 0.04)',
      lineColor: 'rgba(20, 184, 166, 1)',
    } satisfies DeepPartial<AreaSeriesPartialOptions>,
  },
  light: {
    chart: {
      layout: {
        background: {
          color: 'transparent',
        },
        // lineColor: 'white',
        textColor: '#191919',
        fontFamily:
          "'Open Sans', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: '#fff',
        },
      },
      rightPriceScale: {
        autoScale: false,
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        visible: true,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      timeScale: {
        visible: true,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    } satisfies DeepPartial<ChartOptions>,
    series: {
      topColor: 'rgba(20, 184, 166, 0.56)',
      bottomColor: 'rgba(20, 184, 166, 0.04)',
      lineColor: 'rgba(20, 184, 166, 1)',
    } satisfies DeepPartial<AreaSeriesPartialOptions>,
  },
};

export const CandlestickChartThemes = {
  dark: {
    chart: {
      layout: {
        background: {
          color: 'transparent',
        },
        // lineColor: 'black',
        textColor: '#D9D9D9',
        fontFamily:
          "'Open Sans', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      },
      grid: {
        vertLines: {
          color: 'rgba(23,23,23, 0.5)',
        },
        horzLines: {
          color: 'rgba(23,23,23, 0.5)',
        },
      },
      rightPriceScale: {
        autoScale: false,
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        visible: true,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      timeScale: {
        visible: true,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    } satisfies DeepPartial<ChartOptions>,
    series: {
      upColor: 'rgba(20, 184, 166, 1)',
      downColor: '#000',
      borderDownColor: 'rgba(20, 184, 166, 1)',
      borderUpColor: 'rgba(20, 184, 166, 1)',
      wickDownColor: 'rgba(20, 184, 166, 1)',
      wickUpColor: 'rgba(20, 184, 166, 1)',
    } satisfies DeepPartial<CandlestickSeriesPartialOptions>,
  },
  light: {
    chart: {
      layout: {
        background: {
          color: 'transparent',
        },
        // lineColor: '#2B2B43',
        textColor: '#191919',
        fontFamily:
          "'Open Sans', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: '#fff',
        },
      },
      rightPriceScale: {
        autoScale: false,
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        visible: true,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      timeScale: {
        visible: true,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    } satisfies DeepPartial<ChartOptions>,
    series: {
      upColor: 'rgba(20, 184, 166, 1)',
      downColor: '#000',
      borderDownColor: 'rgba(20, 184, 166, 1)',
      borderUpColor: 'rgba(20, 184, 166, 1)',
      wickDownColor: 'rgba(20, 184, 166, 1)',
      wickUpColor: 'rgba(20, 184, 166, 1)',
    } satisfies DeepPartial<CandlestickSeriesPartialOptions>,
  },
};
