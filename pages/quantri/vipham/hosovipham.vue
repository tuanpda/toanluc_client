<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <div class="box" style="margin-top: 7px">
        <div class="columns">
          <div class="column is-11">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #f14668" class="fa fa-book"></i>
              </span>
              Hồ sơ vi phạm công ty
            </div>
          </div>
          <div class="column" style="text-align: right">
            <nuxt-link :to="`/`">
              <button class="button is-info is-fullwidth is-small">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Thoát</span>
              </button>
            </nuxt-link>
          </div>
        </div>
        <div class="table_wrapper table-height">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr>
              <td colspan="9" style="text-align: right">
                <vue-excel-xlsx
                  :data="hosovipham"
                  :columns="columns"
                  :file-name="'hosovipham'"
                  :file-type="'xlsx'"
                  :sheet-name="'Hồ sơ vi phạm'"
                >
                  Download Execl
                </vue-excel-xlsx>
              </td>
            </tr>
            <tr style="background-color: aliceblue">
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 3%;
                "
              >
                STT
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 5%;
                "
              >
                Mã phiếu
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 10%;
                "
              >
                Số QĐ
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 5%;
                "
              >
                Ngày xử phạt
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 7%;
                "
              >
                Nội dung
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 10%;
                "
              >
                Loại vi phạm
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 10%;
                "
              >
                Mức độ
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 10%;
                "
              >
                Hình thức xử phạt
              </td>
              <td
                style="
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                  width: 20%;
                "
              >
                Ghi chú
              </td>
            </tr>
            <tr v-for="(item, index) in hosovipham" :key="index">
              <td style="font-size: small; text-align: center">
                {{ index + 1 }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item._id }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.soqd }}
              </td>
              <td style="font-size: small; text-align: center">
                {{ item.ngayxuphat | formatDate }}
              </td>
              <td style="font-size: small">
                {{ item.noidung }}
              </td>
              <td style="font-size: small">
                {{ item.loaivp }}
              </td>
              <td style="font-size: small">
                {{ item.mucdovp }}
              </td>
              <td style="font-size: small">
                {{ item.mucdokl }}
              </td>
              <td style="font-size: small">
                {{ item.ghichu }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth-admin",
  data() {
    return {
      hosovipham: [],
      columns: [
        {
          label: "Ngày xử phạt",
          field: "ngayxuphat",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Số QĐ",
          field: "soqd",
        },
        {
          label: "Mã phân xưởng",
          field: "mapx",
        },
        {
          label: "Tên phân xưởng",
          field: "tenpx",
        },

        {
          label: "Mã tổ",
          field: "mato",
        },
        {
          label: "Tên tổ",
          field: "tento",
        },
        {
          label: "Mã công nhân",
          field: "macn",
        },
        {
          label: "Tên công nhân",
          field: "tencn",
        },
        {
          label: "Chức vụ",
          field: "chucvu",
        },
        {
          label: "Số điện thoại",
          field: "sdt",
        },

        {
          label: "Địa chỉ",
          field: "diachi",
        },
        {
          label: "CCCD",
          field: "cccd",
        },
        {
          label: "Nội dung",
          field: "noidung",
        },
        {
          label: "Mã loại vi phạm",
          field: "maloaivp",
        },

        {
          label: "Loại vi phạm",
          field: "loaivp",
        },
        {
          label: "Mã mức độ vi phạm",
          field: "mamucdocvp",
        },
        {
          label: "Mức độ vi phạm",
          field: "mucdovp",
        },
        {
          label: "Mã mức độ kỷ luật",
          field: "mamucdokl",
        },
        {
          label: "Mức độ kỷ luật",
          field: "mucdokl",
        },
        {
          label: "Người kiểm tra",
          field: "nguoikiemtra",
        },
        {
          label: "Ghi chú",
          field: "ghichu",
        },
        {
          label: "Lập bởi user",
          field: "createdBy",
        },
        {
          label: "Lập ngày",
          field: "createdAt",
          dataFormat: this.prefixformatDate,
        },
      ],
    };
  },
  mounted() {
    this.getHosovipham();
  },
  methods: {
    // format date
    prefixformatDate(value) {
      if (!value) {
        return "";
      }
      value = new Date(value);
      return (
        value.getFullYear() +
        "-" +
        ("0" + (value.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + value.getDate()).slice(-2)
      );
    },

    async getHosovipham() {
      this.hosovipham = await this.$axios.$get(`/api/congnhan/getallvipham`);
    },
  },
};
</script>
