<template>
  <div>
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent">
          <li class="breadcrumb-item">
            <router-link to="/st.19_shop">首頁</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/product_page">新品上市</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            北歐城市掛畫
          </li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-4 mt-3">
          <div class="sticky-top" style="top: 10px">
            <h2 class="h3">{{ product.title }}</h2>
            <div class="d-flex justify-content-end align-items-end">
              <span class="text-muted"><s>售價: $990 元</s></span>
              <span class="h3 ml-auto mb-0 text-danger"
                ><small>特價:</small><strong> $890 元</strong></span
              >
            </div>
            <hr />
            尺寸:
            <div
              class="btn-group btn-group-toggle btn-group-sm m-1"
              data-toggle="buttons"
            >
              <label class="btn btn-outline-primary active">
                <input type="radio" name="options" id="option1" checked />大
              </label>
              <label class="btn btn-outline-primary">
                <input type="radio" name="options" id="option2" />中
              </label>
              <label class="btn btn-outline-primary">
                <input type="radio" name="options" id="option3" />小
              </label>
              <label class="btn btn-outline-primary disabled">
                <input type="radio" name="options" id="option3" disabled />特小
              </label>
            </div>
            <br />
            <form class="my-3">
              <div class="form-group d-flex">
                <label for="type" style="min-width: 35.69px">樣式: </label>
                <select
                  class="form-control border-primary form-control-sm ml-2"
                  style="max-width: 200px"
                  id="type"
                  disabled
                >
                  <option selected disabled>--請選擇樣式--</option>
                  <option>赫爾辛基款</option>
                  <option>約恩蘇款</option>
                  <option>赫爾辛基-教堂款</option>
                </select>
              </div>
            </form>
            <div class="input-group my-4">
              <select
                name=""
                id=""
                class="form-control mr-1 border-primary form-control-sm rounded"
                v-model="product.num"
              >
                <option :value="num" v-for="num in 10" :key="num">
                  {{ num }} {{ product.unit }}
                </option>
              </select>
              <a
                href="#"
                class="btn btn-primary btn-sm"
                @click.prevent="addToCart(product.id, product.num)"
              >
                <i class="fas fa-cart-plus"></i>
                加入購物車
              </a>
            </div>
            <hr />
          </div>
        </div>
        <div class="col-md-8 mt-3">
          <h2 class="font-weight-bold">北歐城市掛畫</h2>
          <p>
            來自芬蘭知名藝術插畫家 ──
            拉希沃，將芬蘭知名景點收入畫框。鮮明色彩搭上百搭背景，適合房間的任何一隅。提供多個尺寸、樣式選擇。
          </p>
          <div class="text-center mt-4">
            <h3 class="my-3">
              芬蘭首都<small class="text-info ml-3">赫爾辛基款</small>
            </h3>
            <img
              src="https://images.unsplash.com/photo-1592990379276-f15152f278e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80"
              class="img-fluid"
              alt="Responsive image"
            />
            <img
              src="https://images.unsplash.com/photo-1592990379164-2826ed0a6799?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
              class="img-fluid mt-3"
              alt="Responsive image"
            />

            <h3 class="mt-5 mb-3">
              知名城市<small class="text-info ml-3">約恩蘇款</small>
            </h3>
            <img
              src="https://images.unsplash.com/photo-1592990379451-8e4ca4a08d78?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
              class="img-fluid"
              alt="Responsive image"
            />

            <h3 class="mt-5 mb-3">
              典雅教堂<small class="text-info ml-3">赫爾辛基教堂款</small>
            </h3>
            <img
              src="https://images.unsplash.com/photo-1592990379316-3eb202b52ee9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
              class="img-fluid"
              alt="Responsive image"
            />
            <h5 class="mt-5 mb-3 text-info">各種款式</h5>
            <img
              src="https://images.unsplash.com/photo-1592990379324-45b15250bd99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDAxNX0&auto=format&fit=crop&w=700&q=80"
              class="img-fluid"
              alt="Responsive image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {},
      productId: "-MLMn3wDRtdRNaCZEmEa",
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const id = vm.productId;

      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.product = response.data.product;
        console.log(vm.product);
        response.data.product.num = 1;
      });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      //   vm.status.loadingCart = id;
      //   vm.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http
        .post(api, {
          data: cart,
        })
        .then((response) => {
          // console.log(response.data);
          //   vm.status.loadingCart = "";
          //   vm.getCart();
          //   vm.isLoading = false;
          vm.$bus.$emit("message:push", response.data.message, "info");
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
