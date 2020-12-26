<template>
  <div>
    <div class="container">
      <div
        class="jumbotron-fluid jumbotron-bg py-9"
        style="background-image: url(https://images.unsplash.com/photo-1507807700760-c8b26e28f09e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80);"
      >
        <div class="container text-center bg-lightBlue py-3">
          <h3 class="display-3 text-title py-3 d-none d-sm-block text-soft">
            付款成功
          </h3>
          <h3 class="display-4 text-title py-3 d-sm-none text-soft">
            付款成功
          </h3>
          <router-link to="/product_page" class="btn btn-success btn-lg"
            >回到商城</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
