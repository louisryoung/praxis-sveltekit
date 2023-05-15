import Highcharts, { type Options } from 'highcharts';
import data from 'highcharts/modules/data';

export default (node: HTMLElement, options: Options) => {
  data(Highcharts);
  const redraw = true;
  const oneToOne = true;
  const animation = true;
  const chart = Highcharts.chart(node, options);

  return {
    update(options: Options) {
      chart.update(options, redraw, oneToOne, animation);
    },
    destroy() {
      chart.destroy();
    },
  };
};
