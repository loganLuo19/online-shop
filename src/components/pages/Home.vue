<template>
  <div>
    <!-- header -->
    <header class="container">
      <div
        class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end"
        style="
          background-image: url(https://images.unsplash.com/photo-1531668720450-39cf1563fab9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=926&q=80);
        "
      ></div>
      <h1 class="text-hide">ST.19商場</h1>
      <div class="row justify-content-center character-section">
        <div class="col-md-10">
          <div class="row no-gutters">
            <a
              href="#todayFeature"
              id="scroll"
              class="col-4 text-center character-wrap active"
              @click.prevent="scrollFeature"
            >
              <span
                class="text-vertical h3 font-weight-bold text-soft scrollTop"
                >本日精選</span
              >
              <div class="character-cover"></div>
              <div
                class="character-image bg-cover"
                style="
                  background-image: url(https://images.unsplash.com/photo-1557224230-e8b6f8fac15f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80);
                "
              ></div>
            </a>
            <router-link to="/product_page"
              class="col-4 text-center character-wrap border-0"
            >
              <span class="text-vertical h3 font-weight-bold text-soft"
                >新品上市</span
              >
              <div class="character-cover"></div>
              <div
                class="character-image bg-cover"
                style="
                  background-image: url(https://images.unsplash.com/photo-1576161954389-69cb769e0eee?ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80);
                "
              ></div>
            </router-link>
            <router-link
              to="special_offers"
              class="col-4 text-center character-wrap"
            >
              <span class="text-vertical h3 font-weight-bold text-soft"
                >優惠活動</span
              >
              <div class="character-cover"></div>
              <div
                class="character-image bg-cover"
                style="
                  background-image: url(https://images.unsplash.com/photo-1592990379276-f15152f278e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80);
                "
              ></div>
            </router-link>
          </div>
        </div>
      </div>
    </header>
    <!-- main -->
    <section class="my-md-9">
      <div class="container">
        <div class="row my-5 d-md-none">
          <h4 class="col-12 display-4 text-title">佈置房間/</h4>
          <h4 class="col-12 display-4 text-title text-right">/與我何干?</h4>
        </div>
      </div>
      <div class="bg-soft mb-md-9">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div
                class="section-img h-100 bg-cover"
                style="
                  background-image: url(https://images.unsplash.com/photo-1594565280387-5a309836542a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60);
                "
              ></div>
            </div>
            <div class="col-md-6 d-md-flex text-primary justify-content-end">
              <div class="section-content text-md-vertical p-4 py-md-6">
                <p class="text-justify">
                  家裡的狀態能直接反映你的內心。當你心煩意亂時，家裡一定會雜亂無章。試想下班的時候，家裡本該是你好好放鬆的地方。
                </p>
                <p class="text-justify">
                  一進門，迎接你的卻是這麼糟糕的環境。這樣的惡性循環必定會影響身心靈健康。好好整理房間，並做些佈置。換一個健康的環境生活吧。
                </p>
              </div>
              <h4
                class="section-title display-4 mx-1 text-title d-none d-md-block text-vertical"
              >
                佈置房間/ /與我何干
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row my-5 d-md-none">
          <h4 class="col-12 display-4 text-title">小資族的/</h4>
          <h4 class="col-12 display-4 text-title text-right">/裝潢術</h4>
        </div>
      </div>
      <div class="bg-soft mb-md-9">
        <div class="container">
          <div class="row flex-row-reverse">
            <div class="col-md-6">
              <div
                class="section-img h-100 bg-cover"
                style="
                  background-image: url(https://images.unsplash.com/photo-1528557242643-e981f34a4058?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=646&q=80);
                "
              ></div>
            </div>
            <div class="col-md-6 d-md-flex text-primary justify-content-center">
              <div class="section-content text-md-vertical p-4 py-md-6">
                <p class="text-justify">
                  誰說佈置一定要砸大錢？只要掌握幾個重點，你要可以自己營造美麗的空間。
                </p>
                <p class="text-justify">
                  首先，先為你的空間訂一個主題。像是北歐簡約風、文青森林系或是個性工業風。接下來...
                </p>
              </div>
              <h4
                class="section-title display-4 mx-1 text-title d-none d-md-block text-vertical"
              >
                小資族的/ /裝潢術
              </h4>
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
      <div class="container">
          <Feature></Feature>
      </div>
    </section>
  </div>
</template>

<script>
import Feature from "../Feature";
import $ from "jquery";
export default {
  methods: {
    scrollFeature() {
      const target = $("#scroll").attr("href");
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
  },
  components: {
    Feature,
  },
};
</script>
