import Vue from 'vue';

export default Vue.extend({
  props:{
    title:{
      type:String,
      default(){
        return "title"
      }
    }
  },
  data() {
    return {

    }
  }
})