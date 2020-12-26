<template>
<div>
    <Navbar></Navbar>
    <Alert></Alert>
    <!-- main -->
    <div class="container px-0 px-md-3">
        <div class="row justify-content-center no-gutters">
            <div class="col-md-10">
                <h4 class="text-title display-4 text-center bg-soft p-5 m-0 d-md-none">會員登入</h4>
                <div class="row flex-row-reverse no-gutters">
                    <div class="col-md-6 my-md-5">
                        <div class="bg-info text-center px-3 pt-5 pb-0 d-none d-md-block">
                            <h4 class="h3 text-success m-0 ">— 連結社群帳號 —</h4>
                        </div>
                        <div class="row p-5 bg-info no-gutters">
                            <div class="col-4 col-md-12 bg-soft mb-md-4">
                                <button class="btn btn-outline-success rounded-0 btn-block p-3 h-100">
                                    <img src="@/img/ic-facebook-logotype.svg" width="108" class="img-fluid" alt="">
                                </button>
                            </div>
                            <div class="col-4 col-md-12 bg-soft mb-md-4">
                                <button class="btn btn-outline-success rounded-0 btn-block p-3 h-100">
                                    <img src="@/img/ic-google.svg" width="94" class="img-fluid" alt="">
                                </button>
                            </div>
                            <div class="col-4 col-md-12 bg-soft mb-md-4">
                                <button class="btn btn-outline-success rounded-0 btn-block p-3 h-100">
                                    <img src="@/img/ic-yahoo.svg" width="97" class="img-fluid" alt="">
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <form class="bg-soft container p-5" @submit.prevent="singin">
                            <h3 class="text-title display-4 text-center bg-soft py-2 m-0 d-none d-md-block">會員登入</h3>
                            <div class="input-group  py-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text border-primary bg-info text-soft" id="basic-addon1"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="email" class="form-control border-primary" v-model="user.username" placeholder="輸入帳號 / 電子信箱" required>
                            </div>
                            <div class="input-group  pb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text border-primary bg-info text-soft" id="basic-addon1"><i class="fas fa-unlock-alt"></i></span>
                                </div>
                                <input type="password" class="form-control border-primary" v-model="user.password" placeholder="輸入使用者密碼" required>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheck1">
                                <label class="custom-control-label" for="customCheck1">記住此帳號</label>
                            </div>
                            <button type="submit" class="btn btn-success btn-lg btn-block mt-4">登入帳號</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import Navbar from '../Navbar';
import Footer from '../Footer';
import Alert from '../AlertMessage';

export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    components: {
        Navbar,
        Footer,
        Alert
    },
    methods: {
        singin() {
            const api = `${process.env.APIPATH}admin/signin`;
            const vm = this;
            this.$http.post(api, vm.user).then((response) => {
                console.log(response.data.message);
                if (response.data.success) {
                    const token = response.data.token;
                    const expired = response.data.expired;
                    // console.log(token, expired);
                    document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
                    vm.$bus.$emit('message:push', response.data.message, 'info');
                    vm.$router.push('/admin/products')
                } else {
                    vm.$bus.$emit('message:push', response.data.message, 'danger');
                }
            })
        }
    },
}
</script>
