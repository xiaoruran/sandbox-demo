import Vue from 'vue';
import { WordCloud } from '@antv/g2plot';
import moment from 'moment';

const wordData = [{
  "value": 9,
  "name": "AntV"
},
{
  "value": 8,
  "name": "F2"
},
{
  "value": 8,
  "name": "G2"
},
{
  "value": 8,
  "name": "G6"
},
{
  "value": 8,
  "name": "DataSet"
},
{
  "value": 8,
  "name": "墨者学院"
},
{
  "value": 6,
  "name": "Analysis"
},
{
  "value": 6,
  "name": "Data Mining"
},
{
  "value": 6,
  "name": "Data Vis"
},
{
  "value": 6,
  "name": "Design"
},
{
  "value": 6,
  "name": "Grammar"
},
{
  "value": 6,
  "name": "Graphics"
},
{
  "value": 6,
  "name": "Graph"
},
{
  "value": 6,
  "name": "Hierarchy"
},
{
  "value": 6,
  "name": "Labeling"
},
{
  "value": 6,
  "name": "Layout"
},
{
  "value": 6,
  "name": "Quantitative"
},
{
  "value": 6,
  "name": "Relation"
},
{
  "value": 6,
  "name": "Statistics"
},
{
  "value": 6,
  "name": "可视化"
},
{
  "value": 6,
  "name": "数据"
},
{
  "value": 6,
  "name": "数据可视化"
},
{
  "value": 4,
  "name": "Arc Diagram"
},
{
  "value": 4,
  "name": "Bar Chart"
},
{
  "value": 4,
  "name": "Canvas"
},
{
  "value": 4,
  "name": "Chart"
},
{
  "value": 4,
  "name": "DAG"
},
{
  "value": 4,
  "name": "DG"
},
{
  "value": 4,
  "name": "Facet"
},
{
  "value": 4,
  "name": "Geo"
},
{
  "value": 4,
  "name": "Line"
},
{
  "value": 4,
  "name": "MindMap"
},
{
  "value": 4,
  "name": "Pie"
},
{
  "value": 4,
  "name": "Pizza Chart"
},
{
  "value": 4,
  "name": "Punch Card"
},
{
  "value": 4,
  "name": "SVG"
},
{
  "value": 4,
  "name": "Sunburst"
},
{
  "value": 4,
  "name": "Tree"
},
{
  "value": 4,
  "name": "UML"
},
{
  "value": 3,
  "name": "Chart"
},
{
  "value": 3,
  "name": "View"
},
{
  "value": 3,
  "name": "Geom"
},
{
  "value": 3,
  "name": "Shape"
},
{
  "value": 3,
  "name": "Scale"
},
{
  "value": 3,
  "name": "Animate"
},
{
  "value": 3,
  "name": "Global"
},
{
  "value": 3,
  "name": "Slider"
},
{
  "value": 3,
  "name": "Connector"
},
{
  "value": 3,
  "name": "Transform"
},
{
  "value": 3,
  "name": "Util"
},
{
  "value": 3,
  "name": "DomUtil"
},
{
  "value": 3,
  "name": "MatrixUtil"
},
{
  "value": 3,
  "name": "PathUtil"
},
{
  "value": 3,
  "name": "G"
},
{
  "value": 3,
  "name": "2D"
},
{
  "value": 3,
  "name": "3D"
},
{
  "value": 3,
  "name": "Line"
},
{
  "value": 3,
  "name": "Area"
},
{
  "value": 3,
  "name": "Interval"
},
{
  "value": 3,
  "name": "Schema"
},
{
  "value": 3,
  "name": "Edge"
},
{
  "value": 3,
  "name": "Polygon"
},
{
  "value": 3,
  "name": "Heatmap"
},
{
  "value": 3,
  "name": "Render"
},
{
  "value": 3,
  "name": "Tooltip"
},
{
  "value": 3,
  "name": "Axis"
},
{
  "value": 3,
  "name": "Guide"
},
{
  "value": 3,
  "name": "Coord"
},
{
  "value": 3,
  "name": "Legend"
},
{
  "value": 3,
  "name": "Path"
},
{
  "value": 3,
  "name": "Helix"
},
{
  "value": 3,
  "name": "Theta"
},
{
  "value": 3,
  "name": "Rect"
},
{
  "value": 3,
  "name": "Polar"
},
{
  "value": 3,
  "name": "Dsv"
},
{
  "value": 3,
  "name": "Csv"
},
{
  "value": 3,
  "name": "Tsv"
},
{
  "value": 3,
  "name": "GeoJSON"
},
{
  "value": 3,
  "name": "TopoJSON"
},
{
  "value": 3,
  "name": "Filter"
}]

export default Vue.extend({
  mounted() {
    // 几天前
    console.log(moment(1632449410000).fromNow());
    const wordCloud = new WordCloud('container', {
      data: wordData,
      wordField: 'name',
      weightField: 'value',
      colorField: 'name',
      wordStyle: {
        fontFamily: 'Verdana',
        fontSize: [20, 32],
        rotation: 0,
      },
      spiral: 'archimedean', // archimedean-椭圆,rectangular-矩形 
      tooltip: {
        // formatter(data) {
        //   // console.log(data);
        //   // return { name: data.text, value: `频率：${data.value}` };
        // },
        containerTpl: `<div class="g2-tooltip"><p class="g2-tooltip-title"></p><ul class="g2-tooltip-list"></ul></div>`, // tooltip的外层模板
        itemTpl:
          '<li class="g2-tooltip-list-item" data-index={index}>'
          + '<div><div style="color: #33BBFF;  text-align: center; font-size: 12px;">热词：{name}</div><div style="font-size: 12px;">频率：{value}</div></div>'
          + '</li> ',
        offset: 0,
        position: 'top',
        // inPlot: false, //不用tooltip一直在图表视图内,以便最末尾tooltip位置乱跑
        // triggerOn:'click', //触发方式,不选默认mousemove
      },
      // 返回一个固定值时，每次词语渲染的位置相同
      random: () => 0.5,

    })

    wordCloud.render();
  }
})