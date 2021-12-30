
import Vue from 'vue';


export default Vue.extend({
  name: 'todoitem',
  props: {
    item: {
      default() {
        return {
          key: '',
          value: '',
        }
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    deleteItem(key:string) {
      // console.log(key);
      this.$emit('delete',key);
    },
  }
})