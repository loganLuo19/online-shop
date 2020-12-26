<template>
  <div class="row">
    <div class="col-md-4 col-sm-6 my-3" v-for="(item, i) in saleItem" :key="i">
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
        <div class="card-footer d-flex">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm"
            @click="getItem(item.id)"
          >
            <i
              class="fas fa-spinner fa-spin"
              v-if="loading.loadingInfo === item.id"
            ></i>
            查看更多
          </button>
          <button
            type="button"
            class="btn btn-outline-danger btn-sm ml-auto"
            @click="addItem(item.id)"
          >
            <i
              class="fas fa-spinner fa-spin d-none"
              v-if="loading.loadingCart === item.id"
            ></i>
            加到購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["loading",'saleItem'],
  methods: {
    getItem(value) {
      console.log(value)
      this.$emit('get-item',value);
    },
    addItem(value) {
      console.log(value)
      this.$emit('add-item',value);
    },
  },
};
</script>
