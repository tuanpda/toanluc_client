<template>
  <div class="table_wrapper" style="margin-right: 10px;" ref="wrapper">
    <table class="table is-responsive is-bordered is-narrow is-fullwidth" ref="table">
      <thead>
        <tr class="">
          <th style="background-color: aliceblue; font-size: small; text-align: center;" class="headcol headcol0">Mã PX
            <input type="text" class="input is-small" v-model="search_Mapx">
          </th>
          <th style="background-color: aliceblue; font-size: small; text-align: center;" class="headcol headcol1">Lô KHPX
            <input type="text" class="input is-small" v-model="search_Lokhpx">
          </th>
          <th style="background-color: aliceblue; font-size: small; text-align: center;" class="headcol headcol2">Mã SP
            <input type="text" class="input is-small" v-model="search_Masp">
          </th>
          <th style="background-color: aliceblue; font-size: small; text-align: center;" class="headcol headcol6">Nhóm SP
            <input type="text" class="input is-small" v-model="search_Nhomsp">
          </th>
          <th style="background-color: aliceblue; font-size: small; text-align: center;" class="headcol headcol3">Số lượng
          </th>
          <th style="background-color: aliceblue; font-size: small; text-align: center;" class="headcol headcol4">Thời
            gian</th>
          <th style="background-color: aliceblue; font-size: small; text-align: center;" class="headcol headcol5">Tuần
          </th>
          <th style="background-color: #f3fdec; font-size: small;" v-for="week in numberOfWeeks" :key="week">
            Tuần {{ week }}
            <br>
            {{ getWeekStartDate(week) }} - {{ getWeekEndDate(week) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="" v-for="dt in lokehoachpx" :key="dt.id">
          <td class="headcol headcol0" style="font-size: small; background-color: #f4f2f8">{{ dt.mapx }}</td>
          <td class="headcol headcol1" style="font-size: small; background-color: #effaf5;">{{ dt.malosx }}</td>
          <td class="headcol headcol2" style="font-size: small;">{{ dt.masp }}</td>
          <td class="headcol headcol6" style="font-size: small; text-align: center;">{{ dt.nhomsp }}</td>
          <td class="headcol headcol3" style="font-size: small; text-align: center;">{{ dt.soluong }}</td>
          <td class="headcol headcol4" style="font-size: small; text-align: center;">{{ Math.round(dt.thoigiantuan) }}
          </td>
          <td class="headcol headcol5" style="font-size: small; text-align: center;">{{ dt.tuan }}</td>

          <td style="font-size: small; text-align: center;" v-for="week in numberOfWeeks" :key="week">
            <template v-if="week == dt.tuan">
              LOSX
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'YearTimeline',
  data() {
    return {
      year: 2023,
      numberOfWeeks: 52,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      lokehoachpx: []
    };
  },
  mounted() {
    this.showAllLokhpx()
  },
  methods: {
    getWeekStartDate(week) {
      const d = new Date(this.year, 0, 1);
      const dayOffset = d.getDay();
      const diff = (week - 1) * 7 - dayOffset;
      return new Date(this.year, 0, 1 + diff).toLocaleDateString();
    },
    getWeekEndDate(week) {
      const d = new Date(this.year, 0, 1);
      const dayOffset = d.getDay();
      const diff = (week - 1) * 7 - dayOffset;
      return new Date(this.year, 0, 1 + diff + 7).toLocaleDateString();
    },
    getWeeksInMonth(month) {
      const weeks = [];
      const d = new Date(this.year, month - 1, 1);
      const firstWeek = this.getWeekNumber(d);
      for (let i = firstWeek; i < firstWeek + 5; i++) {
        weeks.push(i);
      }
      return weeks;
    },
    getWeekNumber(date) {
      const onejan = new Date(date.getFullYear(), 0, 1);
      return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    },

    async showAllLokhpx() {
      this.lokehoachpx = await this.$axios.$get(
        `/api/lokehoach/gettest`
      );
      this.search_timestart = ""
      this.search_timeend = ""
      // this.lokehoachpx = [
      //   {
      //     id: 1,
      //     mapx: "PXGC",
      //     malosx: 'A-BDN-81',
      //     masp: 'A-BDN-81',
      //     soluong: '2800',
      //     thoigian: 0.345,
      //     tuan: 1,

      //   },
      //   {
      //     id: 2,
      //     mapx: "PXGC",
      //     malosx: 'A-BDN-81-23P1-LOSO1',
      //     masp: 'A-BDN-81',
      //     soluong: '2800',
      //     thoigian: 0.345,
      //     tuan: 2,

      //   },
      //   {
      //     id: 3,
      //     mapx: "PXGC",
      //     malosx: 'A-BDN-81-23P1-LOSO1',
      //     masp: 'A-BDN-81',
      //     soluong: '2800',
      //     thoigian: 0.345,
      //     tuan: 2,

      //   },
      //   {
      //     id: 4,
      //     mapx: "PXGC",
      //     malosx: 'A-BDN-81-23P1-LOSO1',
      //     masp: 'A-BDN-81',
      //     soluong: '2800',
      //     thoigian: 0.345,
      //     tuan: 2,

      //   },
      //   {
      //     id: 5,
      //     mapx: "PXGC",
      //     malosx: 'A-BDN-81-23P1-LOSO1',
      //     masp: 'A-BDN-81',
      //     soluong: '2800',
      //     thoigian: 0.345,
      //     tuan: 3,

      //   },
      //   {
      //     id: 11,
      //     mapx: "PXGC",
      //     malosx: 'A-BDN-81-23P1-LOSO1',
      //     masp: 'A-BDN-81',
      //     soluong: '2800',
      //     thoigian: 0.345,
      //     tuan: 1,

      //   },
      //   {
      //     id: 12,
      //     mapx: "PXGC",
      //     malosx: 'A-BDN-81-23P1-LOSO1',
      //     masp: 'A-BDN-81',
      //     soluong: '2800',
      //     thoigian: 0.345,
      //     tuan: 2,

      //   },
      //   {
      //     id: 13,
      //     mapx: "PXGC",
      //     malosx: 'A-BDN-81-23P1-LOSO1',
      //     masp: 'A-BDN-81',
      //     soluong: '2800',
      //     thoigian: 0.345,
      //     tuan: 2,

      //   },
      //   {
      //     id: 14,
      //     mapx: "PXGC",
      //     malosx: 'A-BDN-81-23P1-LOSO1',
      //     masp: 'A-BDN-81',
      //     soluong: '2800',
      //     thoigian: 0.345,
      //     tuan: 2,

      //   },
      //   {
      //     id: 15,
      //     mapx: "PXGC",
      //     malosx: 'A-BDN-81-23P1-LOSO1',
      //     masp: 'A-BDN-81',
      //     soluong: '2800',
      //     thoigian: 0.345,
      //     tuan: 3,

      //   },
      // ]
    },
  }
};
</script>
<style scoped>
th,
td {
  /* border: solid black; */
}

th {
  height: 90px;
}

td {
  min-height: 19px;
  height: 33px;
}

table {
  border-collapse: collapse;
}

.headcol {
  position: absolute;
  width: 70px;
  top: auto;
}

.headcol0 {
  left: 10px;
  width: 80px;
}

.headcol1 {
  left: 90px;
  width: 180px;
}

.headcol2 {
  left: 270px;
  width: 150px;
}

.headcol3 {
  left: 590px;
}

.headcol4 {
  left: 520px;
}

.headcol5 {
  left: 660px;
}

.headcol6 {
  left: 420px;
  width: 100px;
}

.table_wrapper {
  overflow-x: scroll;
  margin-left: 732px;
  overflow-y: visible;
  padding: 0;
}
</style>
