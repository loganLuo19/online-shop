<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <div class="container">
            <button class="navbar-toggler border-0 mr-auto" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <router-link class="navbar-brand" to="/st.19_shop">
                <img src="@/img/shopLogo.png" class="d-none d-sm-inline-block" style="height: 35px;" alt="">
                <img src="@/img/shopLogo-s.png" class="d-sm-none" style="height: 25px;" alt="">
            </router-link>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ml-auto font-weight-bold">
                    <router-link class="nav-link" to="/st.19_shop">首頁 <span class="sr-only">(current)</span></router-link>
                    <router-link class="nav-link" to="/product_page">商品目錄</router-link>
                    <router-link class="nav-link" to="/admin/products" v-if="status">管理頁面</router-link>
                    <router-link class="nav-link" to="/login" v-if="!status">登入</router-link>
                    <a class="nav-link" href="#" @click.prevent="signout" v-else>登出</a>
                </div>
            </div>
            <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
            <div class="dropdown ml-auto">
                <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
                    <i class="fas fa-shopping-cart text-primary fa-2x d-none d-sm-inline-block"></i>
                    <i class="fas fa-shopping-cart text-primary d-sm-none"></i>
                    <span class="badge badge-pill badge-danger">{{itemInCart.carts.length}}</span>
                </button>
                <div class="dropdown-menu dropdown-menu-right" style="min-width:300px">
                    <div class="px-4 py-3">
                        <h6>已選擇商品</h6>
                        <table class="table table-sm table-hover">
                            <tbody>
                                <tr v-for="item in itemInCart.carts" :key="item.id">
                                    <td class="align-middle text-center">
                                        <button class="btn text-danger d-block btn-icon" @click="removeModal(item)">
                                            <i class="far fa-trash-alt"></i>
                                        </button>
                                    </td>
                                    <td class="align-middle">{{item.product.title}}</td>
                                    <td class="align-middle">{{item.qty}}</td>
                                    <td class="align-middle text-right">{{item.total | currency}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <router-link to="/shopping_cart" class="btn btn-info btn-block btn-sm">查看購物車</router-link>
                    </div>
                </div>
            </div>
        </div>

    </nav>
    <!-- Modal -->
    <div class="modal fade" id="removeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">刪除訂單</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempCartItem.product.title }}</strong> 訂單(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-outline-danger" @click="removeCartItem(tempCartItem.id)">確定</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
    data() {
        return {
            status: false,
            tempCartItem: {
                product: ''
            }, //刪除單筆訂單
            itemInCart: {
                carts: {}
            }, //存取購物車項目
        }
    },
    methods: {
        signout() {
            const api = `${process.env.APIPATH}logout`;
            const vm = this;
            this.$http.post(api).then((response) => {
                console.log(response.data.message);
                if (response.data.success) {
                    vm.$router.push('/login')
                }
            })
        },
        loginCheck() {
            const vm = this;
            const api = `${process.env.APIPATH}api/user/check`;
            vm.$http.post(api).then((response) => {
                // console.log(response.data)
                if (response.data.success) {
                    vm.status = true;
                } else {
                    vm.status = false;
                }
            })
        },
        getCart() {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                // console.log(response.data);
                vm.itemInCart = response.data.data;
                vm.isLoading = false;
            })
        },
        removeModal(item) {
            this.tempCartItem = item;
            $('#removeModal').modal('show');
        },
        removeCartItem(id) {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
            const vm = this;
            this.$http.delete(api).then((response) => {
                if(response.data.success) {
                     $('#removeModal').modal('hide');
                    vm.getCart();
                    // console.log(response.data.message)
                }else {
                    $('#removeModal').modal('hide');
                    vm.getCart();
                    // console.log(response.data.message)
                }
            })
        },
    },
    watch: {
        itemInCart: function() {
            this.getCart()
        }
    },
    created() {
        this.loginCheck(),
        this.getCart()
    }
}
</script>
