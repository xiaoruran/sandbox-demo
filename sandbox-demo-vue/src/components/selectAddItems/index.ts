import Vue from "vue";


export default Vue.extend({
  components:{
    VNodes: {
      functional: true,
      render: (h:any, ctx:any) => ctx.props.vnodes,
    },
  },
  props:{
    items: {
      type: Array,
    },
  },
  data() {
    return {
      selectValue:'',
      addItemContent:"",
      visible:false,
      msg: "test",
    };
  },
  methods: {
    addItem(e:Event) {
      e.preventDefault();
      this.visible = true;
    },
    handleOk(){ 
      this.visible = false;
      this.items.push(this.addItemContent);
      this.selectValue = this.addItemContent;
      this.addItemContent = '';
      this.$emit('click',1,2,3,4);
    },
  },
});