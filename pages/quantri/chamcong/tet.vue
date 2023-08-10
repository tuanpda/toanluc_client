<template>
  <div>
    <div class="">
      <!-- Toggle class  -->
      <div :class="{ 'is-active': isActive_Tenmodal }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-1">
          <header
            style="
              background-color: #3e8ed0;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            "
          >
            <div class="columns">
              <div class="column is-9">
                <p
                  style="
                    font-size: small;
                    font-weight: bold;
                    color: white;
                    padding: 15px;
                  "
                >
                  <span class="icon is-small is-left">
                    <i style="color: #ffd863ff" class="fas fa-tags"></i>
                  </span>
                  Thông tin của modal
                </p>
              </div>
              <div class="column" style="text-align: right">
                <a @click="isActive_Tenmodal = false">
                  <span style="color: red; padding: 20px" class="icon is-small">
                    <i class="fas fa-power-off"></i>
                  </span>
                </a>
              </div>
            </div>
          </header>
          <section class="modal-card-body">
            <span>Nội dung Modal thể hiện ra</span>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive_Tenmodal: false,
    };
  },

  mounted() {},

  methods: {
    async showmodal() {
      this.isActive_Tenmodal = true;
    },
  },
};
</script>
