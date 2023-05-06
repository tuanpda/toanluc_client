<!-- <template>
    <div class="container">
      <table class="table is-bordered is-striped is-narrow is-hoverable">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã công nhân</th>
            <th>Tên công nhân</th>
            <th v-for="date in dates" :key="date">{{ date }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in datas" :key="data.macn">
            <td>{{ index + 1 }}</td>
            <td>{{ data.macn }}</td>
            <td>{{ data.tencn }}</td>
            <td v-for="date in dates" :key="date">{{ data[date] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        datas: [
          {
            macn: "cn1",
            tencn: "abc",
            "2023-05-01": "2 ",
            "2023-05-02": "K ",
            "2023-05-03": "P",
            "2023-05-04": "1 ",
            "2023-05-05": "M ",
          },
          {
            macn: "cn2",
            tencn: "abcd",
            "2023-05-01": "2 ",
            "2023-05-02": "K ",
            "2023-05-03": "P",
            "2023-05-04": "1 ",
            "2023-05-05": "M ",
          },
          {
            macn: "cn3",
            tencn: "abcádffds",
            "2023-05-01": "2 ",
            "2023-05-02": "K ",
            "2023-05-03": "P",
            "2023-05-04": "1 ",
            "2023-05-05": "M ",
          },
        ],
      };
    },
    computed: {
      dates() {
        return Object.keys(this.datas[0]).filter((key) => key !== "macn" && key !== "tencn").sort();
      },
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 1rem;
  }
  </style> -->



  <template>
    <div class="container">
      <table class="table is-bordered is-striped is-narrow is-hoverable">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.name">{{ column.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.stt">
            <td>{{ row.stt }}</td>
            <td>{{ row.macongnhan }}</td>
            <td v-for="column in columns.slice(2)" :key="column.name">{{ row[column.name] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        datas: [
          {
            macn: "cn1",
            tencn: "abc",
            "2023-05-01": "2 ",
            "2023-05-02": "K ",
            "2023-05-03": "P",
            "2023-05-04": "1 ",
            "2023-05-05": "M ",
          },
          {
            macn: "cn2",
            tencn: "abcd",
            "2023-05-01": "2 ",
            "2023-05-02": "K ",
            "2023-05-03": "P",
            "2023-05-04": "1 ",
            "2023-05-05": "M ",
          },
          {
            macn: "cn3",
            tencn: "abcádffds",
            "2023-05-01": "2 ",
            "2023-05-02": "K ",
            "2023-05-03": "P",
            "2023-05-04": "1 ",
            "2023-05-05": "M ",
          },
        ],
      };
    },
    computed: {
      columns() {
        const dates = Object.keys(this.datas[0])
          .filter((key) => key !== "macn" && key !== "tencn")
          .sort();
        return [
          { name: "stt", title: "STT" },
          { name: "macongnhan", title: "Mã công nhân" },
          ...dates.map((date) => ({ name: date, title: date })),
        ];
      },
      rows() {
        return this.datas.map((data, index) => {
          const row = {
            stt: index + 1,
            macongnhan: data.macn,
          };
          for (const key in data) {
            if (key !== "macn" && key !== "tencn") {
              row[key] = data[key];
            }
          }
          return row;
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 1rem;
  }
  </style>