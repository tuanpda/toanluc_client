import { LocalScheme } from '~auth/runtime'
// import { LocalScheme } from '@nuxtjs/auth'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser(endpoint) {
    // console.log(endpoint);
    // Gửi yêu cầu API để lấy thông tin người dùng từ máy chủ
    // const response = await this.$auth.requestWith(this.name, endpoint)

    // Token is required but not available
    // console.log(this.check());
    if (!this.check().valid) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // Try to fetch user and then set
    return this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    ).then((response) => {
      // console.log(response.data);
      const user = {
        email: response.data.email,
        username: response.data.username,
        name: response.data.name,
        role: response.data.role,
        avatar: response.data.avatar,
      };

      // Set the custom user
      // The `customUser` object will be accessible through `this.$auth.user`
      // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
      this.$auth.setUser(user)

      return response
    }).catch((error) => {
      this.$auth.callOnError(error, { method: 'fetchUser' })
    })
  }
}