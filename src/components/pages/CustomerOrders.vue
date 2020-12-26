<template>
<div>
    <loading :active.sync="isLoading"></loading>
    <!--Product Card-->
    <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
            <div class="card border-0 shadow-sm">
                <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage : `url(${item.imageUrl})`}">
                </div>
                <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.description}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <!-- <div class="h5">2,800 元</div> -->
                        <div class="h5" v-if="!item.price">原價 {{item.origin_price | currency}}</div>
                        <del class="h6" v-if="item.price">原價 {{item.origin_price | currency}}</del>
                        <div class="h5" v-if="item.price">現在只要 {{item.price | currency}}</div>
                    </div>
                </div>
                <div class=" card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingInfo === item.id"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCart(item.id)">
                        <i class="fas fa-spinner fa-spin d-none" v-if="status.loadingCart === item.id"></i>
                        加到購物車
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!--Cart List-->
    <div class="row mt-4 justify-content-center" v-if="itemInCart.carts.length!= 0">
        <div class="col-md-8">
            <table class="table">
                <thead>
                    <tr>
                        <th width="80"></th>
                        <th>品名</th>
                        <th width="80">數量</th>
                        <th width="80">單價</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in itemInCart.carts" :key="item.id">
                        <td>
                            <button class="btn btn-outline-danger" @click="removeCartItem(item.id)">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                        <td>
                            {{item.product.title}}
                            <div class="text-success" v-if="item.coupon">已套用優惠卷</div>
                        </td>
                        <td>{{item.qty}}</td>
                        <td class="text-right">{{item.total}}</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td class="text-right">{{itemInCart.total}}</td>
                    </tr>
                    <tr class="text-success" v-if="itemInCart.final_total !== itemInCart.total">
                        <td colspan="3" class="text-right">折扣價</td>
                        <td class="text-right">{{itemInCart.final_total}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="input-group mb-3 input-group-sm">
                <input type="text" class="form-control" placeholder="請輸入優惠碼" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="coupon_code">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addCouponCode">套用優惠碼</button>
                </div>
            </div>

        </div>
    </div>
    <!--Order Form-->
    <div class="my-5 row justify-content-center">
        <validation-observer class="col-md-6" v-slot="{ invalid }">
            <form @submit.prevent="createOrder">
                <validation-provider rules="required|email" v-slot="{ errors, classes }">
                    <div class="form-group">
                        <!-- 輸入框 -->
                        <label for="email">Email</label>
                        <input id="email" type="email" name="email" v-model="form.user.email" class="form-control" :class="classes" placeholder="請輸入 Email">
                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                    <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <input id="username" type="text" name="name" v-model="form.user.name" placeholder="輸入姓名" class="form-control" :class="classes">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                    <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input type="tel" class="form-control" id="usertel" name="phone" :class="classes" v-model="form.user.tel" placeholder="請輸入電話">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                    <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address" :class="classes" placeholder="請輸入地址">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                </validation-provider>
                <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                </div>
            </form>
        </validation-observer>
    </div>
    <!--Pagination-->
    <Pagination :pages="pagination" @emit-page="getProducts"></Pagination>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        {{product.title}}
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt="">
                    <blockquote class="blockquote mt-3">
                        <p class="mb-0">{{product.content}}</p>
                        <footer class="blockquote-footer text-right">{{product.description}}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h4" v-if="!product.price">原價 {{product.origin_price | currency}} 元</div>
                        <del class="h6" v-if="product.price">原價 {{product.origin_price | currency}} 元</del>
                        <div class="h4" v-if="product.price">現在只要 {{product.price | currency}} 元</div>
                    </div>
                    <select name="" class="form-control mt-3" v-model="product.num">
                        <option :value="num" v-for="num in 10" :key="num">
                            選購 {{num}} {{product.unit}}
                        </option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                        小計 <strong>{{product.num * product.price}}</strong> 元
                    </div>
                    <button type="button" class="btn btn-primary" @click="addToCart(product.id, product.num)">加到購物車</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../Pagination';
export default {
    data() {
        return {
            products: [],
            product: {}, //單一商品資料
            coupon_code: '', //代入優惠碼
            itemInCart: {
                carts: {}
            }, //存取購物車項目
            isLoading: false, //網頁loading效果
            pagination: {}, //分頁設定
            status: {
                //判斷正在讀取中的元素
                loadingInfo: '',
                loadingCart: ''
            },
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''
                }
            }
        }
    },
    components: {
        Pagination
    },
    methods: {
        getProducts(page = 1) {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products?page=${page}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                // console.log(response.data);
                vm.products = response.data.products;
                vm.pagination = response.data.pagination;
                vm.isLoading = false;
            })
        },
        getProduct(id) {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
            const vm = this;
            vm.status.loadingInfo = id;
            this.$http.get(api).then((response) => {
                // console.log(response.data);
                vm.product = response.data.product;
                response.data.product.num = 1;
                vm.status.loadingInfo = '';
                $('#productModal').modal('show');
            })
        },
        addToCart(id, qty = 1) {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            vm.status.loadingCart = id;
            vm.isLoading = true;
            const cart = {
                product_id: id,
                qty
            }
            this.$http.post(api, {
                data: cart
            }).then((response) => {
                // console.log(response.data);
                vm.status.loadingCart = '';
                vm.getCart();
                $('#productModal').modal('hide');
            })
        },
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
        removeCartItem(id) {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.delete(api).then((response) => {
                // console.log(response.data);
                vm.getCart();
                vm.isLoading = false;
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
        createOrder() {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order`;
            const vm = this;
            vm.isLoading = true;
            const order = vm.form;
            this.$http.post(api, {
                data: order
            }).then((response) => {
                console.log('訂單已完成', response);
                if (response.data.success) {
                    vm.$router.push(`/customer_checkout/${response.data.orderId}`)
                }
                vm.isLoading = false;
            })
        }
    },
    created() {
        this.getProducts();
        this.getCart();
    }
}
</script>
