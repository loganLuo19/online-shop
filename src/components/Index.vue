<template>
<div>
    <Navbar />
    <Alert></Alert>
    <div class="container-fluid">
        <router-view></router-view>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import Navbar from './Navbar';
import Footer from './Footer';
import Alert from './AlertMessage';

export default {
    components: {
        Navbar,
        Footer,
        Alert
    }
}
</script>
