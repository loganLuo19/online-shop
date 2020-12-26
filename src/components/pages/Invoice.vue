<template>
  <div class="col-md-8 bg-primary p-5">
    <div class="form-row text-success">
      <div class="form-group col-sm-6">
        <h3 class="text-title text-success">開立發票</h3>
      </div>
      <div class="form-group col-sm-6">
        <div class="stepBar text-center">
          <div class="completeBar">
            <div class="checkIcon checkIconPos1">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="checkIcon checkIconPos2">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="checkIcon checkIconPos3">
              <i class="fas fa-dot-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form class="font-weight-bold text-success my-3">
      <div class="text-center my-5 mt-sm-0">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            class="btn btn-lg btn-outline-info font-weight-bold active"
          >
            電子發票
          </button>
          <button
            type="button"
            class="btn btn-lg btn-outline-info font-weight-bold"
          >
            郵寄發票
          </button>
        </div>
      </div>
      <div class="form-group">
        <label for="Email">電子信箱</label>
        <input
          type="email"
          class="form-control"
          placeholder="請輸入電子信箱"
          id="Email"
        />
      </div>
      <div class="form-group">
        <label for="GUInumber">統一編號（選填）</label>
        <input
          type="email"
          class="form-control"
          placeholder="請輸入統號"
          id="GUInumber"
        />
      </div>
      <div class="d-flex justify-content-end mt-5">
        <button class="btn btn-success ml-1 font-weight-bold" @click="nextPage">
          下一步<i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderId: ""
    };
  },
  methods: {
    nextPage() {
      this.$router.push(`/customer_checkout/${this.orderId}`);
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId)
  }  

};
</script>
