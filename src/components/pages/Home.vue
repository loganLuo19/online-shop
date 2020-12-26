<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- header -->
    <div
      class="jumbotron jumbotron-fluid jumbotron-bg d-flex justify-content-center m-0"
      style="
        background-image: url(https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80);
      "
    >
      <div class="jumbotron-content text-center p-5">
        <div class="h3">尋找理想生活</div>
        <div class="h3">就在這裡!</div>
        <p class="lead mt-2">出發找尋</p>
        <div class="pt-2">
          <a href="#news" class="text-soft scroll" @click.prevent="scrollEffect">
            <i
              class="fas fa-chevron-down fa-2x animate__animated animate__bounce animate__infinite animate__slower"
            ></i
          ></a>
        </div>
      </div>
    </div>
    <!-- marquee -->
    <div class="d-md-flex justify-content-around my-3" id="news">
      <h3 class="h5 text-title marquee-title">最新消息</h3>
      <ul class="list-unstyled m-0 marquee-section">
        <li v-for="(item, i) in marqueeContent" :key="i">
          <div class="d-flex">
            <dt class="px-3 en-artistic">
              <em>{{ item.marqueeDate }}</em>
            </dt>
            <dd class="px-3 h6 font-weight-bold">
              <router-link to="special_offers">
                {{ item.marqueeTitle }}
              </router-link>
            </dd>
          </div>
        </li>
      </ul>
    </div>
    <!-- main -->
    <section class="my-5">
      <!-- category -->
      <div class="container">
        <h4 class="display-4 text-title mb-3"><i class="fas fa-meteor"></i>新品上市/</h4>
        <div class="row justify-content-center">
          <div class="col-10 bg-soft" style="height: 600px">
            <div class="row h-100">
              <div class="col-md-5 bg-cover"  style="background-image: url(https://images.unsplash.com/photo-1595162244081-72420b24fe6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60);">
               
              </div>
              <div class="col-md-7 bg-primary">
                <div class="row flex-column h-100">
                  <div class="col bg-white bg-cover h-50" style="background-image:url(https://images.unsplash.com/photo-1596120263564-fc7ee2d8538d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=600&q=60)" ></div>
                  <div class="col bg-secondary bg-cover" style="background-image: url(https://images.unsplash.com/photo-1488320504421-6f0d07388737?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTl8fHNvZmF8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60);"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--product card-->
      <div class="container">
        <h4 class="display-4 text-title mb-3"><i class="fas fa-meteor"></i>新品上市/</h4>
        <div class="form-row">
          <div class="col-lg-3 col-md-6 my-3" v-for="item in showProduct" :key="item.id">
            <div class="card h-100 border-0 box-shadow">
              <div
                class="card-img-top card-section-img"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              ></div>
              <div class="card-section-tag">新品上市</div>
              <div class="card-body">
                <span class="badge badge-secondary float-right ml-2">{{
                  item.category
                }}</span>
                <h5 class="card-title">
                  <a href="#" class="text-primary font-weight-bold">{{ item.title }}</a>
                </h5>
                <div class="d-flex justify-content-between align-items-baseline">
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
              <a class="likeBtn text-soft">
                <i
                  class="likeBtnAction fas fa-heart"
                  v-if="item.switchLikeBtn"
                  @click="switchLike(item)"
                ></i>
                <i class="far fa-heart" v-else @click="switchLike(item)"></i>
              </a>
              <div class="d-flex">
                <router-link
                  to="product_info"
                  class="btn btn-block btn-soft rounded-0 text-primary"
                >
                  商品資訊
                </router-link>
                <button
                  type="button"
                  class="btn btn-success rounded-0 text-primary"
                  @click="addToCart(item.id)"
                >
                  <i class="fas fa-spinner fa-spin d-none"></i>
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container" id="todayFeature">
        <div class="row flex-wrap justify-content-center my-5">
          <h4 class="col-md-8 display-4 text-title">輕鬆擁有/</h4>
          <h4 class="col-md-8 display-4 text-title text-right">/放空空間</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Feature from "../Feature";
import $ from "jquery";
export default {
  data() {
    return {
      marqueeContent: [
        {
          marqueeTitle: "《戀愛空間》享全館85折優惠 點我看詳細資訊",
          marqueeDate: "2021.2.11~ 2021.2.17",
        },
        {
          marqueeTitle: "《秋季特惠》享全館9折優惠 點我查看詳細資訊",
          marqueeDate: "即日起至2021.2.31",
        },
      ],
      showProduct: [],
      isLoading: false, //網頁loading效果
    };
  },
  methods: {
    newProducts() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products`;
      const vm = this;
      vm.$http.get(api).then((response) => {
        // console.log(response.data);
        const data = response.data.products.slice(0, 4);
        vm.showProduct = data;
        vm.showProduct.forEach(function (item) {
          vm.$set(item, "switchLikeBtn", false);
        });
      });
    },
    scrollEffect() {
      const target = $(".scroll").attr("href");
      const targetPos = $(target).offset().top;
      $("html, body").animate(
        {
          scrollTop: targetPos,
        },
        1000
      );
    },
    setLike() {
      $(".likeBtn").find(".likeBtnAction").toggleClass("d-inline-block");
    },
    marqueeAnimated() {
      setInterval(function () {
        arrange();
      }, 5000);
      function arrange() {
        $("#news li:first-child").slideUp(function () {
          $(this).appendTo($("#news ul")).slideDown();
        });
      }
    },
    switchLike(item) {
      if (!item.switchLikeBtn) {
        item.switchLikeBtn = true;
      } else {
        item.switchLikeBtn = false;
      }
      // console.log(item);
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
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
  },
  components: {
    Feature,
  },
  created() {
    this.marqueeAnimated();
    this.newProducts();
  },
  computed: {
    filteredItems: function () {
      return this.items.slice(0, 10);
    },
  },
};
</script>
