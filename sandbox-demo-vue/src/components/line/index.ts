import Vue from 'vue';
import { Line } from '@antv/g2plot';
import moment from 'moment';
// import { message } from 'ant-design-vue';
const lineData = [

  {
    "Date": 1632636847171,
    "scales": 1856,
    "type": '播放数',
  },
  {
    "Date": 1632636796150,
    "scales": 2107,
    "type": '播放数',
  },
  {
    "Date": 1632637320000,
    "scales": 3000,
    "type": '播放数',
  },
  {
    "Date": 1632637302000,
    "scales": 2300,
    "type": '播放数',
  },
  {
    "Date": 1632636847171,
    "scales": 1700,
    "type": '生产人数',
  },
  {
    "Date": 1632636796150,
    "scales": 2300,
    "type": '生产人数',
  },
  {
    "Date": 1632637320000,
    "scales": 2493,
    "type": '生产人数',
  },
  {
    "Date": 1632637302000,
    "scales": 3202,
    "type": '生产人数',
  }

]



export default Vue.extend({
  mounted() {
    const line = new Line('container', {
      data: lineData,
      xField: 'Date',
      yField: 'scales',
      seriesField: 'type',
      meta: {
        Date: {
          alias: "times",
          formatter(value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
          }
        }
      },
      animation: {
        appear: {
          animation: 'wave-in', // 动画效果
          duration: 2000,  // 动画执行时间
        },
      },
      tooltip:{
        // 不显示辅助线
        showCrosshairs:false,
        // false表示只展示离的最近的点
        shared:false,
        // 设置标题（默认时横轴上的数据）
        title:(title)=>{
          return `时间：${title}`;
        }
      }
    });
    line.on('tooltip:change', (e: any) => {
      // 设置了上面的tooltip时，只会设置为当前的值
      this.hovorData = e.data.items[0].data;
    })
    // line.on('plot:click', () => {
    //   message.info(`${this.hovorData}`);
    //   console.log(this.hovorData);
    // })
    line.on('element:click', (e:any) => {
      console.log(e);
      console.log(this.hovorData);
    })
    line.render();
  },
  data() {
    return {
      hovorData: {},
    }
  }
})