import Highcharts, { type Options } from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
// import data from "highcharts/modules/data";

export default (node: HTMLElement, options: Options) => {
  // data(Highcharts);
  highcharts3d(Highcharts);
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
