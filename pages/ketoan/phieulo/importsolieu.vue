<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 10px; margin-right: 10px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-anchor"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Import kế hoạch năm</span
              >
            </div>
          </div>
        </div>

        <div class="columns" style="margin-top: 10px">
          <div class="column is-10">
            <div class="file is-small is-info has-name">
              <label class="file-label">
                <input
                  ref="fileInput"
                  @change="onFileChange"
                  class="file-input"
                  type="file"
                  name="resume"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label"> Chọn file excel </span>
                </span>
                <span class="file-name">
                  {{ fileName }}
                </span>
              </label>
            </div>
          </div>
          <div class="column">
            <button
              @click="onClickImport"
              class="button is-success is-small"
              style="width: 100%"
            >
              <span class="icon is-small">
                <i class="fas fa-cloud-download-alt"></i>
              </span>
              &ensp; Import Dữ liệu
            </button>
          </div>
        </div>

        <div class="table_wrapper table-height">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="background-color: #fffaeb">
                <th style="text-align: center; font-size: small; width: 7%">
                  Mã Kế hoạch
                </th>
                <th style="text-align: center; font-size: small; width: 10%">
                  Mã Thành phẩm
                </th>
                <th style="text-align: center; font-size: small; width: 7%">
                  Tên Thành phẩm
                </th>
                <th style="text-align: center; font-size: small; width: 7%">
                  Nhóm Thành phẩm
                </th>
                <th style="text-align: center; font-size: small; width: 7%">
                  Số lượng
                </th>
                <th style="text-align: center; font-size: small; width: 7%">
                  Mùa vụ P1
                </th>
                <th style="text-align: center; font-size: small; width: 7%">
                  Mùa vụ P2
                </th>
                <th style="text-align: center; font-size: small; width: 7%">
                  Mùa vụ P3
                </th>
                <th style="text-align: center; font-size: small; width: 10%">
                  Thời gian bắt đầu
                </th>
                <th style="text-align: center; font-size: small; width: 10%">
                  Thời gian kết thúc
                </th>
                <th style="text-align: center; font-size: small; width: 15%">
                  Tên khách hàng
                </th>
                <th style="text-align: center; font-size: small">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(excel, index) in dataPreview" :key="index">
                <td style="text-align: center; font-size: small">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="excel.makh"
                  />
                </td>
                <td style="text-align: center; font-size: small">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="excel.mathanhpham"
                  />
                </td>
                <td style="font-size: small">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="excel.tenthanhpham"
                  />
                </td>
                <td style="font-size: small">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="excel.nhomthanhpham"
                  />
                </td>
                <td style="text-align: right; font-size: small">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="excel.soluong"
                  />
                </td>
                <td style="text-align: right; font-size: small">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="excel.soluongmuavup1"
                  />
                </td>
                <td style="text-align: right; font-size: small">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="excel.soluongmuavup2"
                  />
                </td>
                <td style="text-align: right; font-size: small">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="excel.soluongmuavup3"
                  />
                </td>
                <td style="background-color: #fffaeb">
                  <input
                    class="input is-small"
                    type="date"
                    v-bind:value="excel.tgbatdau | inputDateFilter"
                    v-on:input="excel.tgbatdau = getDate($event.target.value)"
                  />
                </td>
                <td style="background-color: #fffaeb">
                  <input
                    class="input is-small"
                    type="date"
                    v-bind:value="excel.tgketthuc | inputDateFilter"
                    v-on:input="excel.tgketthuc = getDate($event.target.value)"
                  />
                </td>
                <td style="font-size: small">{{ excel.khachhang }}</td>
                <td style="text-align: right; font-size: small">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="excel.ghichu"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import XLSX from "xlsx";
export default {
  data() {
    return {
      fileName: "",
      selectedFile: null,
      file: null,
      dataPreview: [],
      createdAt: "",
      createdBy: this.$auth.$state.user.username,
      updateAt: "",
    };
  },

  // bind v-model input type date
  filters: {
    inputDateFilter: function (date) {
      if (!date) {
        return "";
      }
      date = new Date(date);
      return (
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2)
      );
    },
  },

  mounted() {
    this.currentDateTime();
  },

  methods: {
    currentDateTime() {
      const current = new Date();
      const date =
        current.getFullYear() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getDate();
      const time =
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
      this.createdAt = date + " " + time;
      this.updatedAt = date + " " + time;
    },
    // hàm bind v-model input type date
    getDate(value) {
      if (!value) {
        return null;
      }
      return new Date(value);
    },

    // chọn file execl
    onFileChange(e) {
      this.checkData = false;
      if (!e.target.files[0]) {
        return;
      }
      this.perproc = 0;
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
      if (
        this.selectedFile.type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        console.log(this.selectedFile);
        //console.log(this.selectedFile.type);
      } else {
        this.$toasted.show("Chỉ chấp nhận file excel xlsx, 2007 + ", {
          duration: 2000,
          theme: "bubble",
        });
      }

      const files = e.target.files;
      const fileReader = new FileReader(); // construction function that can read the file content
      fileReader.onload = (ev) => {
        const data = ev.target.result;
        const workbook = XLSX.read(data, {
          type: "binary", // binary
        });
        const wsname = workbook.SheetNames[0]; //take the first sheet
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
        // console.log(ws);
        this.dataPreview = ws;
        /* ws.forEach((value, index, ws) => {
                  console.log(value); // data for each line
                }); */
      };
      fileReader.readAsBinaryString(files[0]); // read file, trigger onload
    },

    // import
    async onClickImport() {
      try {
        let data = new FormData();
        data.append("file", this.selectedFile, this.selectedFile.name);
        data.append("createdAt", this.createdAt);
        data.append("updatedAt", this.updatedAt);
        data.append("createdBy", this.createdBy);
        //console.log(this.selectedFile.name);
        await this.$axios.$post("/api/lokehoach/importkehoachnam", data);
        Swal.fire("Import dữ liệu thành công", "", "success");
        this.checkData = false;
        // Reload lại page
        //localStorage.setItem("reloaded", "3");
        //location.reload();
      } catch (error) {
        console.log(error);
        Swal.fire("Có lỗi xảy ra", "Import dữ liệu thất bại.", "warning");
      }
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

.table_wrapper {
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.table-height {
  height: 400px;
}
</style>
