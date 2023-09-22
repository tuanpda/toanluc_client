<!-- <template>
  <div>
    <h1>Người dùng trực tuyến</h1>
    <ul>
      <li v-for="user in onlineUsers" :key="user">{{ user }}</li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      onlineUsers: [],
    };
  },
  mounted() {
    const socket = io("http://14.224.129.177:8888"); // Cập nhật URL máy chủ của bạn tại đây

    // Lắng nghe sự kiện 'onlineUsers' từ máy chủ
    socket.on("onlineUsers", (users) => {
      this.onlineUsers = users;
    });
  },
};
</script> -->
