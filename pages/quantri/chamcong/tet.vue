<template>
  <div>
    <select name="club" id="club" :value="club"></select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNgaychamcong: [],
      club: "aresnal",
      form: {
        mapx: "AL_PXD",
        ngaychamcong: "2023-06-27",
      },
    };
  },

  mounted() {
    this.showdata();
  },

  methods: {
    async showdata() {
      this.showNgaychamcong = await this.$axios.$get(
        `/api/congnhan/showngaychamcongandmapx?mapx=${this.form.mapx}&ngaychamcong=${this.form.ngaychamcong}`
      );
    },
  },
};
</script>
