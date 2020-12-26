<template>
<div>

    <Alert></Alert>
    <div class="container-fluid">
        <div class="row">
            <Sidebar></Sidebar>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <Navbar />
                <router-view></router-view>
            </main>
        </div>
    </div>
    
</div>
</template>

<script>
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Alert from './AlertMessage';

export default {
    components: {
        Navbar,
        Sidebar,
        Alert
    },
    created() {
        const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.$http.defaults.headers.common.Authorization = `${myCookie}`;
    }
}
</script>
