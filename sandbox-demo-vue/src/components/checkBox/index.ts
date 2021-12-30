import Vue from 'vue';



interface Data {
  value: string;
  selected: (number | undefined)[];
}

export default Vue.extend({
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    multiply: {
      type: Boolean,
      default() {
        return false;
      }
    },
    selectValue: {
      type: Array,
      default() {
        return [];
      }
    }

  },
  data(): Data {
    return {
      value: '',
      selected: [],
    }
  },
  methods: {
    select(key: string, index: number) {
      let res = this.selected[index] === undefined ? index : undefined;
      // vue2中触发更新方式2
      this.$set(this.selected,index,res);
      // vue2中触发更新方式1
      //this.selected = [...this.selected];

      // 单选，其他选项都要变成原样
      if (!this.multiply) {
        this.$set(this.selected,index,index);
        let len = this.selected.length;
        for (let i = 0; i < len; i += 1) {
          if (i !== index) {
            this.$set(this.selected,i,undefined);
          }
        }
        // 触发更新，一般来说数组增加或删除会触发，但更改数组元素内容不会触发视图更新
        // this.selected = [...this.selected]
        // 1表示单选框，2表示多选框添加
        this.$emit('selectChange', key, 1);
      } else {
        // 2表示添加，3表示删除
        if (this.selected[index] === index) {
          this.$emit('selectChange', key, 2);
        } else {
          this.$emit('selectChange', key, 3);
        }
      }
    }
  }
})