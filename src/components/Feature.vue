<template>
  <div class="form-row">
    <div class="col-md-4 col-sm-6 my-3" v-for="(item, i) in data" :key="i">
      <div class="card h-100 border-0 box-shadow">
        <img
          :src="item.imgUrl"
          class="card-img-top todayFeature-img"
          alt="..."
        />
        <div class="todayFeature-tag">本日精選</div>
        <a class="likeBtn text-soft">
          <i
            class="likeBtnAction fas fa-heart"
            v-if="!item.switchLikeBtn"
            @click="switchLike(item)"
          ></i>
          <i class="far fa-heart" v-else @click="switchLike(item)"></i>
        </a>
        <div class="row no-gutters border border-soft text-center text-primary">
          <div class="col-6 border-right border-soft p-2 h5 m-0">
            {{ item.title }}
          </div>
          <div class="col-6 p-2 h5 font-weight-bold m-0">
            NT{{ item.price | currency }}
          </div>
        </div>
        <router-link
          to="product_info"
          class="btn btn-lg btn-block btn-soft rounded-0 text-primary"
        >
          了解更多
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1595162244081-72420b24fe6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
          title: "波斯氣質花瓶",
          price: "2999",
          switchLikeBtn: true
        },
        {
          imgUrl:
            "https://images.unsplash.com/photo-1557224230-e8b6f8fac15f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          title: "歐式微香蠟燭",
          price: "999",
          switchLikeBtn: true
        },
        {
          imgUrl:
            "https://images.unsplash.com/photo-1587717415723-8c89fe42c76c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
          title: "霧黑梯形層架",
          price: "3999",
          switchLikeBtn: true
        },
      ],
    };
  },
  methods:{
      switchLike(item){
          console.log(item)
          if(item.switchLikeBtn){
              item.switchLikeBtn = false;
          }else{
              item.switchLikeBtn = true;
          }
      }
  }
};
</script>
