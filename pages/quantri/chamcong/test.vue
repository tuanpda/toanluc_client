<template>
  <div>
    <div>
      <button @click="chamcong">chamcong</button>
    </div>

    <div class="">
      <!-- Toggle class  -->
      <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-1">
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <span
                  style="font-size: small; font-weight: bold; color: #48c78e"
                  >Tiến trình chấm công</span
                >
              </div>
              <div class="column" style="text-align: right">
                <a @click="isActive = false">
                  <span style="color: red" class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </a>
              </div>
            </div>
            <div>
              {{ countDown }}
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      countDown: 5,
      isActive: false,
    };
  },
  methods: {
    async chamcong() {
      const result = await Swal.fire({
        title: `Xác nhận chấm công?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xác nhận",
        denyButtonText: `Hủy xác nhận`,
      });
      if (result.isConfirmed) {
        this.isActive = true
        const chamcong = [
          { macn: "cn123", tencn: "tei", mapx: "123" },
          { macn: "cn125", tencn: "tei", mapx: "123" },
          { macn: "cn124", tencn: "tei", mapx: "123" },
        ];

        for (let i = 0; i < chamcong.length; i++) {
          const data = chamcong[i];
          let res = await this.$axios.$post(`/api/congnhan/addchamcong`, data);
          console.log(res);
        }
      }
    },
  },
};
</script>

<style scoped>
.modal-content,
.modal-card {
  width: 320px;
}
</style>
