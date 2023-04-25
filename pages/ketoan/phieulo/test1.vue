<!-- <template>
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
</style> -->

<!-- <template>
  <div>
    <table>
      <tr v-for="(item, index) in items" :key="index + 'cm-a'">
        <td style="text-align: center; font-size: small; font-weight: bold">
          {{ index + 1 }}
        </td>
        <td style="font-size: small; font-weight: bold">
          {{ item.nguyencong }}
        </td>
        <td style="font-size: small; font-weight: bold">
          <input
            v-model="item.sohong"
            ref="sodat{{index}}"
            @keydown="onKeyDown($event, index, 0)"
          />
        </td>
        <td style="font-size: small; font-weight: bold">
          <input
            v-model="item.sohong"
            ref="sohong{{index}}"
            @keydown="onKeyDown($event, index, 1)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { nguyencong: "Item 1", sodat: "", sohong: "" },
        { nguyencong: "Item 2", sodat: "", sohong: "" },
        { nguyencong: "Item 3", sodat: "", sohong: "" },
      ],
    };
  },
  methods: {
    onKeyDown(event, rowIndex, colIndex) {
      const rowLen = this.items.length;
      const colLen = 2; // Số cột của bảng (nguyencong, sohong)
      let nextRow = rowIndex;
      let nextCol = colIndex;

      // Xử lý phím di chuyển
      switch (event.keyCode) {
        case 37: // ArrowLeft
          nextCol = colIndex > 0 ? colIndex - 1 : colLen - 1;
          break;
        case 38: // ArrowUp
          nextRow = rowIndex > 0 ? rowIndex - 1 : rowLen - 1;
          break;
        case 39: // ArrowRight
          nextCol = colIndex < colLen - 1 ? colIndex + 1 : 0;
          break;
        case 40: // ArrowDown
          nextRow = rowIndex < rowLen - 1 ? rowIndex + 1 : 0;
          break;
        case 13: // Enter
          nextRow = rowIndex + 1;
          break;
      }

      // Di chuyển tới ô input mới
      if (nextRow !== rowIndex || nextCol !== colIndex) {
        const nextRef = `sodat${nextRow}${nextCol === 0 ? "" : "sohong"}`;
        this.$nextTick(() => {
          const nextInput = this.$refs[nextRef];
          if (nextInput) {
            nextInput.focus();
          }
        });
      }
    },
  },
};
</script> -->

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Nguyên công</th>
          <th>Nguyên công</th>
          <th>Nguyên công</th>
          <th>Số đạt</th>
          <th>Số hỏng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index + 'cm-a'" ref="rows">
          <td style="text-align: center; font-size: small; font-weight: bold">
            {{ index + 1 }}
          </td>
          <td style="font-size: small; font-weight: bold">
            {{ item.nguyencong }}
          </td>
          <td style="font-size: small; font-weight: bold">
            {{ item.doangia }}
          </td>
          <td style="font-size: small; font-weight: bold">
          
          </td>
          <td style="font-size: small; font-weight: bold">
            <input
              v-model="item.sodat"
              type="text"
              @keydown.arrow-down="moveToNextRow(index, $event)"
              @keydown.arrow-up="moveToPreviousRow(index, $event)"
              @keydown.arrow-right="moveToNextColumn(index)"
              @keydown.arrow-left="moveToPreviousColumn(index)"
              @keydown.enter.prevent="moveToNextRow(index)"
            />
          </td>
          <td style="font-size: small; font-weight: bold">
            <input
              v-model="item.sohong"
              type="text"
              @keydown.arrow-down="moveToNextRow(index, $event)"
              @keydown.arrow-up="moveToPreviousRow(index, $event)"
              @keydown.arrow-right="moveToNextColumn(index)"
              @keydown.arrow-left="moveToPreviousColumn(index)"
              @keydown.enter.prevent="moveToNextRow(index)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      items: [
        { nguyencong: "A", doangia: "C", ho: 2, sodat: "", sohong: "" },
        { nguyencong: "A", doangia: "C", ho: 2, sodat: "", sohong: "" },
        { nguyencong: "A", doangia: "C", ho: 2, sodat: "", sohong: "" },
        { nguyencong: "A", doangia: "C", ho: 2, sodat: "", sohong: "" },
        { nguyencong: "A", doangia: "C", ho: 2, sodat: "", sohong: "" },
        { nguyencong: "A", doangia: "C", ho: 2, sodat: "", sohong: "" },
        { nguyencong: "A", doangia: "C", ho: 2, sodat: "", sohong: "" },
        { nguyencong: "A", doangia: "C", ho: 2, sodat: "", sohong: "" },
        { nguyencong: "A", doangia: "C", ho: 2, sodat: "", sohong: "" },
        { nguyencong: "A", doangia: "C", ho: 2, sodat: "", sohong: "" },
      ],
    };
  },
 
  methods: {

    moveToNextRow(index, e) {
      const currentRowInputs =
        e.target.parentNode.parentNode.getElementsByTagName("input");
      const currentInputIndex = Array.prototype.indexOf.call(
        currentRowInputs,
        e.target
      );
      const nextRow = this.$refs.rows[index + 1];
      if (nextRow) {
        const nextRowInputs = nextRow.getElementsByTagName("input");
        // if (nextRowInputs.length > 0) {
        //   nextRowInputs[0].focus();
        // }
        if (nextRowInputs.length > currentInputIndex) {
          nextRowInputs[currentInputIndex].focus();
        }
      }
    },
    moveToPreviousRow(index, e) {
      const currentRowInputs =
        e.target.parentNode.parentNode.getElementsByTagName("input");
      const currentInputIndex = Array.prototype.indexOf.call(
        currentRowInputs,
        e.target
      );

      const previousRow = this.$refs.rows[index - 1];
      if (previousRow) {
        const previousRowInputs = previousRow.getElementsByTagName("input");
        if (previousRowInputs.length > currentInputIndex) {
          previousRowInputs[currentInputIndex].focus();
        }
      }
    },
    moveToNextColumn(index) {
      const currentRowInputs =
        this.$refs.rows[index].getElementsByTagName("input");
      const currentInput = document.activeElement;
      const currentIndex = Array.prototype.indexOf.call(
        currentRowInputs,
        currentInput
      );
      if (currentIndex < currentRowInputs.length - 1) {
        currentRowInputs[currentIndex + 1].focus();
      }
    },
    moveToPreviousColumn(index) {
      const currentRowInputs =
        this.$refs.rows[index].getElementsByTagName("input");
      const currentInput = document.activeElement;
      const currentIndex = Array.prototype.indexOf.call(
        currentRowInputs,
        currentInput
      );
      if (currentIndex > 0) {
        currentRowInputs[currentIndex - 1].focus();
      }
    },
  },
};
</script>
