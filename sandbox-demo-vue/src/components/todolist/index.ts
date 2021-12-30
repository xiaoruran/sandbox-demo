import Vue from 'vue';
import TodoItem from './todoitem/index.vue';
import TodoHeader from './todoheader/index.vue';

interface ItemData {
  key: string;
  value: string;
  desc: string;
}

interface Data {
  data: ItemData[];
}

export default Vue.extend({
  components: {
    TodoItem,
    TodoHeader,
  },
  props: {
    items: {
      default() {
        return [];
      }
    },
  },
  data(): Data {
    return {
      data: []
    }
  },
  mounted() {
    this.data = this.items;
  },
  methods: {

    deleteItem(key: string) {
      console.log(key);
      this.data = this.data.filter(item => {
        return item.key !== key
      })
    },
    
    additem(item: ItemData) {
      this.data.push(item);
    }
  }
})
