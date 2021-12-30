import Vue from "vue";
import SelectAddItem from '../selectAddItems/index.vue';

export default Vue.extend({
  components:{
    SelectAddItem,
  },
  data() {
    return {
      items:[1,2,3],
      msg: "userPage",
      // params: this.$route.query.name,
      index:1,
    };
  },
  mounted() {
    // const selectbox = document.getElementById("selectdemo");
    // let options = selectbox.options;
    // let len = options.length;
    
    // 监听改变选项的事件
    // selectbox.addEventListener('change',this.changeHandler);
    // console.log(options);
    fetch('http://localhost:3000/user/list').then(response=>{
      return response.json();
    }).then(data=>{
      console.log(data);
    })
  },
  methods: {
    changeHandler(){
      // const selectbox = document.getElementById("selectdemo");
      // // let options = selectbox.options;
      // let len = options.length;
      // let ans = [];
      // for (let i = 0; i < len; i++) {
      //   if (options[i].selected)
      //   {
      //     ans.push(i);
      //   }
      //     // console.log(options[i].text + '---' + options[i].value);
      // }
      // console.log(ans);
      // const selectbox = document.getElementById("selectdemo");
      // console.log(selectbox.selectedIndex);
      // let option = new Option(`newtext${this.index}`,`newValue${this.index}`);
      // this.index++;
      // selectbox.add(option,null);
    },
    clickHandler(){
      console.log(111);
    },
  }
});
