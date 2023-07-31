<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Mã phòng</th>
          <th>Mã tổ</th>
          <th>Họ tên</th>
          <th>Sắp xếp <input type="number" v-model="sortValue" /></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedData" :key="index">
          <td>{{ item.maphong }}</td>
          <td>{{ item.mato }}</td>
          <td>{{ item.hoten }}</td>
          <td>{{ item.sort }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { maphong: "abc", mato: "bh", hoten: "alex", sort: 0 },
        { maphong: "hbh", mato: "hg", hoten: "tim", sort: 0 },
        { maphong: "hjh", mato: "yu", hoten: "lee", sort: 0 },
      ],
      sortValue: 0,
    };
  },
  computed: {
    sortedData() {
      return this.tableData.sort(
        (a, b) => a[this.sortValue] - b[this.sortValue]
      );
    },
  },
};
</script>

table { border-collapse: collapse; width: 100%; } th, td { text-align: left;
padding: 8px; } th { background-color: #f2f2f2; position: relative; } th input {
position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0;
z-index: 1; cursor: pointer; } th input:focus + label { border: 1px solid
#2196f3; } th label { position: relative; display: inline-block; padding: 8px
16px; border: 1px solid transparent; cursor: pointer; z-index: 0; } th
label:hover { border: 1px solid #ccc; } th label:after { content: ""; position:
absolute; top: 50%; right: 8px; transform: translateY(-50%); border-style:
solid; border-width: 0 4px 4px 0; border-color: #666; display: inline-block;
padding: 4px; vertical-align: middle; z-index: 2; } th label.asc:after {
border-color: #2196f3; }
