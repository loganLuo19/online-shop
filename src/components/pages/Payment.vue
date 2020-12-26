<template>
  <div class="col-md-8 bg-primary p-5">
    <div class="form-row text-success">
      <div class="form-group col-sm-6">
        <h3 class="text-title text-success">付款資料</h3>
      </div>
      <div class="form-group col-sm-6">
        <div class="stepBar text-center">
          <div class="activeBar">
            <div class="checkIcon checkIconPos1">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="checkIcon checkIconPos2">
              <i class="fas fa-dot-circle"></i>
            </div>
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
        @submit.prevent="nextPage"
      >
        <div class="form-row">
          <div class="col-sm-6 mb-3">
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="creditCardNumber">信用卡卡號</label>
                <input
                  type="text"
                  class="form-control"
                  id="creditCardNumber"
                  name="Credit Card Number"
                  :class="classes"
                  v-model="form.cardNumber"
                  placeholder="請輸入卡號"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
          <div class="col-sm-6 mb-3">
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="username">持卡人姓名</label>
                <input
                  id="username"
                  type="text"
                  name="name"
                  v-model="form.name"
                  placeholder="輸入持卡人姓名"
                  class="form-control"
                  :class="classes"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
        </div>
        <div class="form-row">
          <div class="col-6 mb-3">
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="dueDate">有效期限</label>
                <input
                  id="dueDate"
                  type="month"
                  name="Due Date"
                  v-model="form.due_date"
                  placeholder="請輸入有效期限"
                  class="form-control"
                  :class="classes"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
          <div class="col-6 mb-3">
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="CVV">CVV</label>
                <input
                  id="CVV"
                  type="text"
                  name="CVV"
                  v-model="form.CVV"
                  placeholder="請輸入檢查碼"
                  class="form-control"
                  :class="classes"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-5">
          <button
            @click="payOrder"
            class="btn btn-success ml-1 font-weight-bold"
            :disabled="invalid"
          >
            確認付款
          </button>
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
        cardNumber: "",
        name: "",
        due_date: "",
        CVV: ""
      },
      orderId: "",
    };
  },
  methods: {
    nextPage() {
      this.$router.push(`/checkout/invoice/${this.orderId}`);
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          console.log(response.data.message);
          vm.$bus.$emit("message:push", response.data.message, "info");
        }
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
  }
};
</script>
