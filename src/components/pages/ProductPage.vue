<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- header -->
    <header class="container">
      <div class="jumbotron jumbotron-fluid banner-bg d-flex align-items-end">
        <div class="container">
          <div class="bg-lighter py-3 text-center d-none d-sm-block">
            <h2 class="display-3 text-primary font-weight-bold letter-spacing">
              小資族的裝潢術
            </h2>
            <p class="lead font-weight-bold text-info">
              <em>無論空間大小，都可以很有個性</em>
            </p>
          </div>
        </div>
      </div>
    </header>
    <!-- main -->
    <div class="container">
      <div class="row">
        <!-- 左側選單 -->
        <div class="col-md-3 my-3">
          <div class="list-group sticky-top" style="top: 10px">
            <a
              href="#pane-1"
              class="list-group-item list-group-item-action list-group-item-info active"
              data-toggle="list"
            >
              <i class="fas fa-meteor mr-2"></i>全部商品
            </a>
            <a
              href="#pane-2"
              class="list-group-item list-group-item-action list-group-item-info"
              data-toggle="list"
            >
              <i class="fas fa-stopwatch mr-2"></i>限時下殺
            </a>
            <router-link
              to="product_info"
              class="list-group-item list-group-item-action list-group-item-info"
              data-toggle="list"
            >
              <i class="fab fa-hotjar mr-2"></i>人氣商品
            </router-link>
            <router-link
              to="special_offers"
              class="list-group-item list-group-item-action list-group-item-info"
              data-toggle="list"
            >
              <i class="far fa-lightbulb mr-2"></i>優惠活動
            </router-link>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-5">
              <div class="input-group my-3">
                <input
                  type="search"
                  class="form-control"
                  placeholder="輸入關鍵字..."
                  v-model="searchItem"
                />
                <div class="input-group-append">
                  <button
                    @click="search(searchItem)"
                    class="btn btn-outline-info btn-sm"
                    type="button"
                    id="button-addon2"
                  >
                    搜尋
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div class="tab-pane active" id="pane-1">
              <div class="row">
                <!--product card-->
                <div
                  class="col-lg-4 col-md-6 my-3"
                  v-for="item in products"
                  :key="item.id"
                >
                  <div class="card h-100 border-0 box-shadow">
                    <div
                      class="card-img-top"
                      style="
                        height: 150px;
                        background-size: cover;
                        background-position: center;
                      "
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    ></div>
                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{
                        item.category
                      }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-primary font-weight-bold">{{
                          item.title
                        }}</a>
                      </h5>
                      <p class="card-text">{{ item.description }}</p>
                      <div
                        class="d-flex justify-content-between align-items-baseline"
                      >
                        <div class="h5 text-info" v-if="!item.price">
                          原價 {{ item.origin_price | currency }}
                        </div>
                        <del class="h6 text-secondary" v-if="item.price"
                          >原價 {{ item.origin_price | currency }}</del
                        >
                        <div class="h4 text-right text-info" v-if="item.price">
                          現在只要 {{ item.price | currency }}
                        </div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-sm"
                        @click="getProduct(item.id)"
                      >
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.loadingInfo === item.id"
                        ></i>
                        查看更多
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm ml-auto"
                        @click="addToCart(item.id)"
                      >
                        <i
                          class="fas fa-spinner fa-spin d-none"
                          v-if="status.loadingCart === item.id"
                        ></i>
                        加到購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="pane-2">
              <OnSale
                :sale-item="featureProduct"
                :loading="status"
                @get-item="getProduct"
                @add-item="addToCart"
              ></OnSale>
            </div>
          </div>
          <!--Pagination-->
          <Pagination :pages="pagination" @emit-page="getProducts"></Pagination>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                原價 {{ product.origin_price | currency }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price | currency }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price | currency }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ (product.num * product.price) | currency }}</strong
              >元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.num)"
            >
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination";
import Alert from "../AlertMessage";
import OnSale from "../OnSaleCard";
export default {
  data() {
    return {
      products: [],
      product: {}, //單一商品資料
      isLoading: false, //網頁loading效果
      pagination: {}, //分頁設定
      status: {
        //判斷正在讀取中的元素
        loadingInfo: "",
        loadingCart: "",
      },
      featureProduct: [],
      searchItem: "", //存取搜尋文字內容
      result: [], //存取搜尋結果
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        const data = response.data.products;
        vm.products = data;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
        data.forEach((item) => {
          if (item.origin_price < 1000) {
            vm.featureProduct.push(item);
          }
        });
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingInfo = id;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.product = response.data.product;
        response.data.product.num = 1;
        vm.status.loadingInfo = "";
        $("#productModal").modal("show");
      });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingCart = id;
      vm.isLoading = true;
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
          vm.status.loadingCart = "";
          vm.getCart();
          $("#productModal").modal("hide");
          vm.isLoading = false;
          vm.$bus.$emit("message:push", response.data.message, "info");
        });
    },
    getCart() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.itemInCart = response.data.data;
        vm.isLoading = false;
      });
    },
    search(content) {
      const vm = this;
      vm.products.forEach((item) => {
        if (item.title.indexOf(content) !== -1) {
          vm.result.push(item);
          vm.products = vm.result;
        }
      });
      if(vm.result.length == 0){
          vm.$bus.$emit("message:push", "找不到該商品", "danger");
      }
    },
  },
  created() {
    this.getProducts();
  },
  watch: {
    searchItem: function () {
      this.products.length = 0;
      this.getProducts();
    },
  },
  components: {
    Pagination,
    Alert,
    OnSale,
  },
};
</script>
