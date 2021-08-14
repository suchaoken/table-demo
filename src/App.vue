<template>
  <div>
    <my-table :data="goodslist">
      <template v-slot:header>
        <th>#</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>标签</th>
        <th>操作</th>
      </template>
      <template v-slot:body="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.goods_name }}</td>
        <td>{{ row.goods_price }}</td>
        <td>
          <input
            type="text"
            class="from-control from-control-sm"
            v-if="row.inputVisible"
            v-focus
            v-model.trim="row.inputValue"
            @blur="onInputConfirm(row)"
            @keyup.enter="onInputConfirm(row)"
            @keyup.esc="row.inputValue=''"
          />
          <button
            type="button"
            class="btn btn-primary"
            v-else
            @click="row.inputVisible = 'true'"
          >
            +tag
          </button>
          <span
            class="badge bg-warning text-dark"
            v-for="item in row.tags"
            :key="item"
            >{{ item }}
          </span>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            @click="Onremove(row.id)"
          >
            删除
          </button>
        </td>
      </template>
    </my-table>
  </div>
</template>

<script>
import MyTable from "./components/my-table/MyTable.vue";

export default {
  components: { MyTable },
  name: "App",
  data() {
    return {
      goodslist: [],
    };
  },
  created() {
    this.getGoodlist();
  },
  methods: {
    async getGoodlist() {
      const { data: res } = await this.$http.get("/api/goods");
      if (res.status !== 0) return console.log("获取商品列表数据失败");
      this.goodslist = res.data;
    },
    Onremove(id) {
      console.log(id);
      this.goodslist = this.goodslist.filter((x) => x.id != id);
    },
    onInputConfirm(row) {
      const val = row.inputValue;
      row.inputValue = "";
      row.inputVisible = false;
      if (!val || row.tags.indexOf(val) !== -1) {
        return;
      }
      row.tags.push(val);
    },
  },
  directives: {
    focus(el) {
      el.focus();
    },
  },
  Components: {
    MyTable,
  },
};
</script>

<style>
</style>
