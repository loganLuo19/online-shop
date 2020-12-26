<template>
  <div>
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleCaptions"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="@/img/Valentine'sDay-sale.png"
            class="d-block w-100 bg-cover"
            alt=""
          />
        </div>
        <div class="carousel-item">
          <img src="@/img/season-sale.png" class="d-block w-100" alt="" />
        </div>
        <div class="carousel-item">
          <img src="@/img/BF-sale.png" class="d-block w-100" alt="" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="py-5 bg-soft">
      <div class="container">
          <div class="row text-primary flex-row-reverse">
              <div class="col-md-5 my-4">
                  <img src="@/img/Valentine'sDay-AD.png" alt="" class="img-thumbnail">
              </div>
              <div class="col-md-7">
                  <h2 class="font-weight-bold"><span class="badge badge-danger mr-2">活動預告</span>2021情人節活動 -《戀愛空間》</h2>
                  <p class="section-content py-2" style="text-indent: 36px;">送完就忘的禮物、吃完就沒的巧克力。還有其他過情人節的方式?美好的戀情需要細心呵護經營。除了贈與感謝的禮物之外，將生活空間打造成舒適、有情調的氛圍。讓對方離不開與你的戀愛空間！
                  </p>
                  <dl class="row section-content">
                      <dt class="col-sm-3">活動日期</dt>
                      <dd class="col-sm-9">2021/2/11~2021/2/17</dd>

                      <dt class="col-sm-3">活動內容</dt>
                      <dd class="col-sm-9">慶祝情人節的到來，ST.19商場推出全館85折優惠。購物滿3,000元，加碼贈送 百合香氛蠟燭一個(限量80個)。</dd>

                      <dt class="col-sm-3">活動辦法</dt>
                      <dd class="col-sm-9">
                      <div>階段一: 在活動期間輸入 優惠碼:<span class="text-danger">LoveSpace</span>，即享全館85折優惠。</div>
                      <div>階段二: 在ST.19商場消費滿3,000元，再送百合香氛蠟燭一個(限量80個)，送完為止。</div>
                      </dd>
                  </dl>
              </div>

          </div>
      </div>
      
    </div>
    <section class="bg-primary text-info py-4">
        <div class="container">
            <div class="row text-justify">
                <div class="col-md-4">
                    <div class="mb-2"><i class="fas fa-2x fa-glass-cheers"></i></div>
                    <h3>活動預告</h3>
                   <p><a href="#" class="text-success  h5">《戀愛空間》輸入優惠碼:LoveSpace 享全館85折優惠</a></p>
                    <div class="text-right text-info">2021/2/11~2021/2/17</div>
                </div>
                <div class="col-md-4">
                    <div class="mb-2"><i class="fas fa-2x fa-gifts"></i></i></div>
                    <h3>當前活動</h3>
                    <p><a href="#" class="text-success h5">《秋季特惠》輸入優惠碼:code90 享全館九折優惠</a></p>
                    <div class="text-right text-info">2021/2/31止</div>
                </div>
                <div class="col-md-4">
                    <div class="mb-2"><i class="fas fa-2x fa-angle-double-left"></i></div>
                    <h3>上期活動</h3>
                    <p><a href="#" class="text-success h5">《嘿!五折》Black Friday 輸入優惠碼 享全館5折優惠 </a></p>
                    <div class="text-right text-info">2020/11/15止</div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  created() {
    $('.carousel').carousel({
      interval: 1000
    })
  },
}
</script>
