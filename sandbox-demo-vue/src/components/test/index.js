import Vue from "vue";

import SelectAddItems from '../selectAddItems/index.vue';
import TodoList from '../todolist/index.vue';
import CheckBox from '../checkBox/index.vue';


const data = {
  "type": [
    {
      "id": "101",
      "name": "游戏"
    },
    {
      "id": "102",
      "name": "其他"
    }
  ],
  "typelist": {
    "101": [
      {
        "id": "3",
        "name": "FPS"
      },
      {
        "id": "4",
        "name": "MMORPG"
      },
      {
        "id": "5",
        "name": "二次元"
      }
    ],
    "102": [
      {
        "id": "7",
        "name": "其他",
      }
    ]
  },
  "game": {
    "3": [
      {
        "id": "8",
        "name": "穿越火线手游"
      },
      {
        "id": "9",
        "name": "天涯明月刀手游"
      },
      {
        "id": "10",
        "name": "光与夜之恋"
      }
    ]
  }
}

const dataTree = [
  {
    "id": "101",
    "name": "游戏",
    "children": [
      {
        "id": "78",
        "name": "全部类型",
        "children": [
          {
            "id": "88",
            "name": "全部类型",
            "children": []
          },
          {
            "id": "8",
            "name": "穿越火线手游",
            "children": []
          },
          {
            "id": "9",
            "name": "天涯明月刀手游",
            "children": []
          },
          {
            "id": "10",
            "name": "光与夜之恋",
            "children": []
          },
          {
            "id": "11",
            "name": "英雄联盟手游",
            "children": []
          },
          {
            "id": "12",
            "name": "和平精英",
            "children": []
          },
          {
            "id": "13",
            "name": "天龙八部手游",
            "children": []
          }
        ]
      },
      {
        "id": "3",
        "name": "FPS",
        "children": [
          {
            "id": "89",
            "name": "全部类型",
            "children": []
          },
          {
            "id": "8",
            "name": "穿越火线手游",
            "children": []
          },
          {
            "id": "9",
            "name": "天涯明月刀手游",
            "children": []
          },
          {
            "id": "10",
            "name": "光与夜之恋",
            "children": []
          }
        ]
      },
      {
        "id": "4",
        "name": "MMORPG",
        "children": [
          {
            "id": "90",
            "name": "全部类型",
            "children": []
          },
        ]
      },
      {
        "id": "5",
        "name": "二次元的世界世界世界",
        "children": [
          {
            "id": "91",
            "name": "全部类型",
            "children": []
          },
        ]
      }
    ]
  },
  {
    "id": "102",
    "name": "其他",
    "children": [
      {
        "id": "7",
        "name": "全部类型",
        "children": []
      },
      {
        "id": "30",
        "name": "生活",
        "children": []
      },
      {
        "id": "31",
        "name": "娱乐",
        "children": []
      },
      {
        "id": "32",
        "name": "旅行",
        "children": []
      },
      {
        "id": "33",
        "name": "运动",
        "children": []
      }
    ]
  }
]

// let index = 0;
export default Vue.extend({
  components: {
    SelectAddItems,
    TodoList,
    CheckBox
  },
  data() {
    return {
      addItemContent: "",
      visible: false,
      items: ['jack', 'lucy', 'hello'],
      msg: "test",
      params: this.$route.params.id,
      itemdatas: [
        { key: '1', value: "tag1" }, { key: '2', value: 'tag2' }, { key: '3', value: 'tag3' }
      ],
      itemsdata: [
        { key: "1", value: '选项一' },
        { key: '2', value: '选项二' },
        { key: '3', value: '选项三' },
      ],
      value: [],
      type: [],
      ischeckeds: [0, 0, 0],
      dataTree: [],
      dataTreeLevel2: [],
      dataTreeLevel3: [],
      gameType: '游戏类型',
      ifGameName: true,
      selected: [],
      menus:[
        {
          key:"1",
          value:'创作者热度',
          submenus:[]
        },
        {
          key:"2",
          value:'游戏榜单',
          submenus:[]
        },
        {
          key:"3",
          value:'热门内容',
          submenus:[
            {
              key:"5",
              value:'热点',
              submenus:[]
            },
            {
              key:"6",
              value:'热词',
              submenus:[]
            },
            {
              key:"7",
              value:'话题',
              submenus:[]
            }
          ]
        },{
          key:"4",
          value:'热点榜单',
          submenus:[
            {
              key:"5",
              value:'热点',
              submenus:[]
            },
            {
              key:"6",
              value:'热词',
              submenus:[]
            },
            {
              key:"7",
              value:'话题',
              submenus:[]
            }
          ]
        }
      ],
      hoverIndex:-1,
    };
  },
  mounted() {
    this.init();
    console.log(data);

  },
  methods: {
    init() {
      this.dataTree = dataTree;
      this.type = data.type;
      this.dataTreeLevel2 = this.dataTree[0].children;
      // console.log(this.dataTreeLevel3);
      this.getAllGame();
      this.selected = [this.dataTree[0], this.dataTreeLevel2[0], this.dataTreeLevel3[0]];
      console.log(this.selected);
    },
    getAllGame() {
      this.dataTreeLevel3 = this.dataTreeLevel2[0].children;
      console.log(this.dataTreeLevel3);
    },
    addItem(e) {
      e.preventDefault();
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
      this.items.push(this.addItemContent);
      this.selectValue = this.addItemContent;
    },
    onHandler(...args) {
      console.log(`args:${args}`);
    },
  
    onChange(value, type) {
      if (type === 1) {
        this.value = [value];
        console.log(this.value);
        return;
      }
      if (type === 2) {
        this.value.push(value);
        console.log(this.value);
        return;
      }
      this.value = this.value.filter(item => {
        return item !== value;
      })
      console.log(this.value);

    },
    mouseenterHandler(index){
      this.hoverIndex = index;
    },
    mouseleaveHandler(){
      this.hoverIndex = -1;
    },
    clickHanlder1(index, item) {
      this.$set(this.ischeckeds, 0, index);
      if (item.name !== '其他') {
        if (this.gameType !== '游戏类型') {
          this.$set(this.ischeckeds, 1, 0);
          this.$set(this.ischeckeds, 2, 0);
          this.gameType = '游戏类型'
          
          this.dataTreeLevel2 = this.dataTree[0].children;
          this.getAllGame();
          this.selected[1] = this.dataTreeLevel2[0];
          this.selected[2] = this.dataTreeLevel3[0];
        }
        this.ifGameName = true;
      } else {
        this.ifGameName = false;
        if (this.gameType !== '具体类型') {
          this.$set(this.ischeckeds, 1, 0);
          this.gameType = '具体类型'
        }
        this.selected[1] = this.dataTreeLevel2[0];
        this.selected.length = 2;
      }
      this.dataTreeLevel2 = this.getChildren(item);
      this.selected[0] = item;
    },
    getChildren(item) {
      let len = this.dataTree.length;
      let queue = [];
      for (let i = 0; i < len; i++) {
        queue.push(this.dataTree[i]);
      }
      while (queue.length > 0) {
        let temp = queue.shift();
        if (temp.id === item.id) {
          return temp.children;
        }
        if (temp.children.length > 0) {
          temp.children.forEach(tempitem => {
            queue.push(tempitem);
          })
        }
      }

    },
    clickHanlder2(index, item) {
      this.$set(this.ischeckeds, 1, index);
      // 如果是游戏类型
      if (this.ifGameName) {
        if(item.id !== this.selected[1].id){
          this.$set(this.ischeckeds, 2, 0);
          this.selected[2] = this.dataTreeLevel3[0];
          this.dataTreeLevel3 = this.getChildren(item);
        }
      }
      this.selected[1] = item;
      this.selected.length = 2;
    },
    clickHanlder3(index, item) {
      this.$set(this.ischeckeds, 2, index);
      this.selected[2] = item;
      // console.log(type);
    }

  },

});