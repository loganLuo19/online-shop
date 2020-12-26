<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container my-md-5">
      <div class="row">
        <div class="col-md-8 mb-5">
          <h3 class="text-title bg-success text-center py-3">購物車項目</h3>
          <table class="table table-sm" v-if="itemInCart.carts.length != 0">
            <thead>
              <tr>
                <th class="align-middle" colspan="2" width="50"></th>
                <th>商品名稱及內容</th>
                <th class="align-middle" width="80">數量</th>
                <th class="text-rigth" width="80">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in itemInCart.carts" :key="item.id">
                <td class="align-middle text-center">
                  <button
                    class="btn text-danger d-block btn-icon"
                    @click="removeModal(item)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td>
                  <div
                    style="height: 150px; width: 150px"
                    class="img-thumbnail bg-cover d-none d-sm-block"
                    :style="{
                      backgroundImage: `url(${item.product.imageUrl})`,
                    }"
                  ></div>
                </td>
                <td class="align-middle text-center">
                  <a href="#" class="btn btn-link text-info">{{
                    item.product.title
                  }}</a>
                  <small class="text-secondary">{{
                    item.product.content
                  }}</small>
                  <div class="badge badge-danger" v-if="item.coupon">
                    已套用優惠卷
                  </div>
                </td>
                <td class="align-middle">
                  {{ item.qty }} {{ item.product.unit }}
                </td>
                <td class="align-middle text-right font-weight-bold">
                  NT{{ item.total | currency }}
                </td>
              </tr>
            </tbody>
          </table>
          <p class="h3 text-secondary text-center mt-5" v-else>
            (購物車內無內容)
          </p>
        </div>
        <div class="col-md-4" v-if="itemInCart.total !== 0">
          <div class="d-md-none">
            <h3 class="text-title bg-success text-center py-3">訂單摘要</h3>
            <div class="row">
              <div class="input-group mb-3 input-group-sm mx-3">
                <input
                  type="text"
                  class="form-control border-primary"
                  placeholder="請輸入優惠碼"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  v-model="coupon_code"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary text-success"
                    type="button"
                    id="button-addon2"
                    @click="addCouponCode"
                  >
                    套用優惠碼
                  </button>
                </div>
              </div>
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
            <hr />
            <div class="text-right">
              <router-link
                class="btn btn-info text-success font-weight-bold"
                to="/checkout/orderer"
                >前往結帳 <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>
          <div class="d-none d-md-block bg-primary p-2">
            <h3 class="text-title text-success text-center py-3 mb-0">
              訂單摘要
            </h3>
            <hr class="border-success mt-0" />
            <div class="row no-gutters">
              <div class="input-group mb-3 input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入優惠碼"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  v-model="coupon_code"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary text-success"
                    type="button"
                    id="button-addon2"
                    @click="addCouponCode"
                  >
                    套用優惠碼
                  </button>
                </div>
              </div>
              <div class="col-6 text-left">
                <div class="mb-3 text-soft h5">總計</div>
                <div
                  class="mb-3 text-success font-weight-bold h4"
                  v-if="itemInCart.final_total !== itemInCart.total"
                >
                  折扣價
                </div>
              </div>
              <div class="col-6 text-right">
                <div class="mb-3 text-soft h5">
                  NT{{ itemInCart.total | currency }}
                </div>
                <div
                  class="mb-3 text-success font-weight-bold h5"
                  v-if="itemInCart.final_total !== itemInCart.total"
                >
                  NT{{ itemInCart.final_total | currency }}
                </div>
              </div>
            </div>
            <div class="text-right my-3">
              <router-link
                class="btn btn-info text-success font-weight-bold"
                to="/checkout/orderer"
                >前往結帳 <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="removeCartItem"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">刪除訂單</h5>
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
            是否刪除
            <strong class="text-danger">{{
              tempCartItem.product.title
            }}</strong>
            訂單(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="removeCartItem(tempCartItem.id)"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
    data() {
        return {
            itemInCart: {
                carts: {}
            }, //存取購物車項目
            tempCartItem: {
                product: ''
            }, //刪除單筆訂單
            coupon_code: '', //代入優惠碼
            isLoading: false
        }
    },
    methods: {
        getCart() {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                vm.itemInCart = response.data.data;
                // console.log(vm.itemInCart.carts);
                vm.isLoading = false;
            })
        },
        removeModal(item) {
            this.tempCartItem = item;
            $('#removeCartItem').modal('show');
        },
        removeCartItem(id) {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
            const vm = this;
            this.$http.delete(api).then((response) => {
                if(response.data.success) {
                     $('#removeCartItem').modal('hide');
                    vm.getCart();

                    // console.log(response.data.message)
                }else {
                    $('#removeCartItem').modal('hide');
                    vm.getCart();
                    // console.log(response.data.message)
                }
            })
        },
        addCouponCode() {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/coupon`;
            const vm = this;
            vm.isLoading = true;
            const coupon = {
                code: vm.coupon_code
            }
            this.$http.post(api, {
                data: coupon
            }).then((response) => {
                console.log(response.data);
                vm.getCart();
                vm.isLoading = false;
            })
        },
    },
    created() {
        this.getCart()
    }
}
</script>