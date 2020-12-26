<template>
  <div class="col-md-8 bg-primary p-5">
    <div class="form-row text-success">
      <div class="form-group col-sm-6">
        <h3 class="text-title text-success">訂購人資訊</h3>
      </div>
      <div class="form-group col-sm-6">
        <div class="stepBar text-center">
          <div class="checkIcon checkIconPos1">
            <i class="fas fa-dot-circle"></i>
          </div>
          <div class="checkIcon checkIconPos2 text-info">
            <i class="far fa-dot-circle"></i>
          </div>
          <div class="checkIcon checkIconPos3 text-info">
            <i class="far fa-dot-circle"></i>
          </div>
        </div>
      </div>
    </div>
    <validation-observer v-slot="{ invalid }">
      <form
        class="font-weight-bold text-success my-3"
        @submit.prevent="createOrder"
      >
        <div class="form-row">
          <div class="col-sm-6 mb-3">
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="username">收件人姓名</label>
                <input
                  id="username"
                  type="text"
                  name="name"
                  v-model="form.user.name"
                  placeholder="輸入姓名"
                  class="form-control"
                  :class="classes"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
          <div class="col-sm-6 mb-3">
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="usertel">收件人電話</label>
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  name="phone"
                  :class="classes"
                  v-model="form.user.tel"
                  placeholder="請輸入電話"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
          <div class="col-md-6 mb-3">
            <validation-provider
              rules="required|email"
              v-slot="{ errors, classes }"
            >
              <div class="form-group">
                <!-- 輸入框 -->
                <label for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  v-model="form.user.email"
                  class="form-control"
                  :class="classes"
                  placeholder="請輸入 Email"
                />
                <!-- 錯誤訊息 -->
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
          <div class="col-md-6 mb-3">
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="useraddress">收件人地址</label>
                <input
                  type="text"
                  class="form-control"
                  name="address"
                  id="useraddress"
                  v-model="form.user.address"
                  :class="classes"
                  placeholder="請輸入地址"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
        </div>
        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name=""
            id="comment"
            class="form-control"
            cols="30"
            rows="5"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="d-flex justify-content-end mt-5">
          <router-link
            class="btn btn-outline-info font-weight-bold"
            to="/product_page"
            >繼續購物</router-link
          >
          <div class="text-right">
            <button
              class="btn btn-success ml-1 font-weight-bold"
              :disabled="invalid"
            >
              送出訂單<i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
      },
    };
  },
  methods: {
    createOrder() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      vm.isLoading = true;
      const order = vm.form;
      this.$http
        .post(api, {
          data: order,
        })
        .then((response) => {
          console.log("訂單已完成", response);
          if (response.data.success) {
            vm.$router.push(`/checkout/payment/${response.data.orderId}`);
          }
          vm.isLoading = false;
        });
    },
  }
};
</script>