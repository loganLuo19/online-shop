<template>
  <div>
    <Navbar />
    <Alert></Alert>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row align-items-start">
        <router-view></router-view>
        <div class="col-md-4">
          <div class="d-none d-md-block bg-soft p-2">
            <h3 class="text-title text-primary text-center py-3 mb-0">
              訂單摘要
            </h3>
            <hr class="border-primary mt-0" />
            <div class="row no-gutters">
              <div class="col-6 text-primary text-left">
                <div class="mb-3 font-weight-bold h5">總計</div>
                <div
                  class="mb-3 font-weight-bold h4"
                  v-if="itemInCart.final_total !== itemInCart.total"
                >
                  折扣價
                </div>
              </div>
              <div class="col-6 text-primary text-right">
                <div class="mb-3 h5 font-weight-bold">
                  NT{{ itemInCart.total | currency }}
                </div>
                <div
                  class="mb-3 font-weight-bold h4"
                  v-if="itemInCart.final_total !== itemInCart.total"
                >
                  NT{{ itemInCart.final_total | currency }}
                </div>
              </div>
            </div>
          </div>
          <div class="d-none d-md-block text-primary bg-soft mt-5 p-2">
            <h3 class="text-title text-center py-3 mb-0">購物清單</h3>
            <hr class="border-primary mt-0" />
            <div class="d-flex flex-column">
              <div
                class="media"
                v-for="item in itemInCart.carts"
                :key="item.id"
              >
                <div
                  class="mr-2 bg-cover img-thumbnail"
                  style="height: 95px; width:85px"
                  :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                ></div>
                <div class="media-body">
                  <h5 class="mt-0">{{ item.product.title }}</h5>
                  <small class="badge badge-info">數量: {{ item.qty }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from "./Navbar";
import Footer from "./Footer";
import Alert from "./AlertMessage";

export default {
  data() {
    return {
      itemInCart: {
        carts: {}
      }, //存取購物車項目
      isLoading: false
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        // console.log(response.data);
        vm.itemInCart = response.data.data;
        // console.log(vm.itemInCart.carts);
        vm.isLoading = false;
      });
    }
  },
  components: {
    Navbar,
    Footer,
    Alert,
  },
  created() {
    this.getCart();
  }
};
</script>
