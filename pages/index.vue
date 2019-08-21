<template>
  <div class="home-page">
    <section class="home-search-frame" id="search-frame">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-6 py-4 d-flex justify-content-center align-items-center">
            <div class="search-box">
              <div class="search-group">
                <div class="title">關鍵字</div>
                <a-input placeholder="請輸入店家、食物等關鍵字" :value="home_search_key" @change="changeKey" />
              </div>
              <div class="search-group">
                <div class="title">縣市 / 地區</div>
                <div class="d-flex">
                  <a-select class="w-100" :value="home_city_id" @change="selectCity">
                    <a-select-option
                      :value="item.code"
                      v-for="(item, key) in city"
                      :key="key"
                    >{{item.name}}</a-select-option>
                  </a-select>
                  <!-- <a-select
                    defaultValue="banqiao"
                    style="width: 50%"
                  >
                    <a-select-option value="banqiao">banqiao</a-select-option>
                    <a-select-option value="chungho">chungho</a-select-option>
                  </a-select>-->
                </div>
              </div>
              <!-- <div class="search-group">
                <div class="title">標籤 hashtag</div>
                <a-input placeholder="請輸入 hashtag" />
              </div>-->
              <div class="text-right">
                <div class="btn btn-primary btn-sm" @click="sendToSearch">送出</div>
              </div>
            </div>
          </div>
          <div class="col-md-4 py-4">
            <div class="trend-block top-area">
              <div class="trend-header">本週熱門 hashtag</div>
              <div class="item-box" v-for="(item, key) in hashtagList" :key="key">
                <a href="#">#{{item.tagName}}</a>
                <span class="badge">{{item.tagCount}}</span>
              </div>
            </div>
            <div class="trend-block bottom-area">
              <div class="trend-header">附近最新打卡地點</div>
              <div class="item-box" v-for="(item, key) in spotNearbyList" :key="key">
                <a href="#">📌 {{item.location}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="latest-frame container mt-3 wow fadeInUp">
      <div class="title-block">地區精選</div>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-3 p-3" v-for="(item, key) in spots_info" :key="key">
          <div class="spot-block">
            <nuxt-link :to="`/detail?r_id=${item.r_id}`">
              <div class="spot-img">
                <img :src="`${item.photo_url}`" alt />
                <div class="startCount">
                  <a-rate :defaultValue="item.star_count" allowHalf disabled />
                  {{item.star_count}}
                </div>
              </div>
            </nuxt-link>
            <div class="spot-desc">
              <h5 class="location" :title="item.name">
                🍽️
                <nuxt-link :to="`/detail?r_id=${item.r_id}`">
                  <span class="spot-title">{{item.name}}</span>
                </nuxt-link>
              </h5>
              <div class="d-flex align-items-start">
                <!-- <div class="userHead"></div> -->
                📌
                <span>{{item.address}}</span>
                <!-- <span>ted pig</span>
                <span class="timing">7 minutes ago</span>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="quick-frame container mt-3 wow fadeInUp" id="firstAnchor">
      <div class="title-block">美食分類</div>
      <div class="quick-slide-outer">
        <div class="row quick-slide-inner" :class="{second: isSlide}">
          <div class="quick-slide-panel">
            <div
              class="col-6 col-md-3 p-3"
              v-for="(item, key) in classify_info.slice(0,4)"
              :key="key"
            >
              <nuxt-link :to="`/search?tag=${item.tag}`">
                <div class="quick-block">
                  <img :src="`${item.photo_url}`" alt />
                  <span>{{item.name}}</span>
                </div>
              </nuxt-link>
            </div>
          </div>
          <div class="quick-slide-panel">
            <div
              class="col-6 col-md-3 p-3"
              v-for="(item, key) in classify_info.slice(4,8)"
              :key="key"
            >
              <nuxt-link :to="`/search?tag=${item.tag}`">
                <div class="quick-block">
                  <img :src="`${item.photo_url}`" alt />
                  <span>{{item.name}}</span>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <a-icon class="arrow" type="left" @click="slideQuickBlock(false)" />
        <a-icon class="arrow" type="right" @click="slideQuickBlock(true)" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import "animate.css";
import { callCityList } from "~/actions/api";
import { Select, Input, Icon, Rate } from "ant-design-vue";
const Option = Select.Option;
import { db } from "~/plugins/firebase.js";
if (process.browser) {
  // 在这里根据环境引入wow.js
  var { WOW } = require("wowjs");
}
// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;
export default {
  data() {
    return {
      home_search_key: "",
      home_city_id: "A",
      latest_flag: false,
      hashtagList: [
        { tagName: "tainan", tagCount: "105" },
        { tagName: "tainanfoodie", tagCount: "99" },
        { tagName: "tainanbnb", tagCount: "332" },
        { tagName: "tainanlunch", tagCount: "1,587" },
        { tagName: "tainanselfie", tagCount: "9,406" },
        { tagName: "tainantrip", tagCount: "993" },
        { tagName: "taiwanfood", tagCount: "22k" },
        { tagName: "instafood", tagCount: "7,399" },
        { tagName: "tainanlife", tagCount: "52k" },
        { tagName: "instadaily", tagCount: "39k" }
      ],
      spotNearbyList: [
        { location: "台江國家公園" },
        { location: "夕遊出張所" },
        { location: "四草綠色隧道" },
        { location: "林默娘公園" },
        { location: "安平燈塔" }
      ],
      isSlide: false // 季節精選區塊是否滑動至右側
    };
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Input.name]: Input,
    [Icon.name]: Icon,
    [Rate.name]: Rate
  },
  computed: {
    ...mapState(["spots_info", "classify_info", "city_id", "search_key"]),
    ...mapState("areaList", ["city"])

    // ...mapState([{ spots_info: "spots_info" }])
    // ...mapState("layoutStore", ["list"])
  },
  methods: {
    ...mapActions({
      update_data: "basicAction/update_data",
      getData_byFirebase: "basicAction/getData_byFirebase"
    }),
    slideQuickBlock(change) {
      this.isSlide = change;
    },
    detectView() {
      if (
        window.pageYOffset >=
        document.getElementById("search-frame").offsetHeight
      ) {
        this.update_data({ data: { searchBar_flag: true } });
      } else this.update_data({ data: { searchBar_flag: false } });
    },

    selectCity(value) {
      this.home_city_id = value;
    },
    changeKey(e) {
      this.home_search_key = e.target.value;
    },
    sendToSearch() {
      this.update_data({
        data: { city_id: this.home_city_id, search_key: this.home_search_key }
      });
      this.$router.push({
        path: "search",
        query: { city: this.home_city_id }
      });
    },
    startTouch(e) {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    },

    moveTouch(e) {
      if (initialX === null) {
        return;
      }

      if (initialY === null) {
        return;
      }

      var currentX = e.touches[0].clientX;
      var currentY = e.touches[0].clientY;

      var diffX = initialX - currentX;
      var diffY = initialY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
          // swiped left
          this.slideQuickBlock(true);
        } else {
          // swiped right
          this.slideQuickBlock(false);
        }
      }
      initialX = null;
      initialY = null;

      // e.preventDefault();
    }
  },

  beforeMount() {
    const that = this;
    // 取得city
    that.getData_byFirebase({
      storeName: "areaList",
      route: "city",
      listName: "city"
    });

    // const getCity = (async () => {
    //   const res = await callCityList();
    //   if (res.status == 200) {
    //     this.update_data({
    //       storeName: "areaList",
    //       data: { city: res.data.data }
    //     });
    //   }
    // })();

    /** 取得spots_info的值 */
    that.getData_byFirebase({
      route: "spots_info",
      listName: "spots_info"
    });
    /** 取得classify_info的值 */
    that.getData_byFirebase({
      route: "classify_info",
      listName: "classify_info"
    });
  },
  mounted() {
    this.detectView();
    window.addEventListener("scroll", this.detectView);
    if (process.browser) {
      // 根據環境實例化 WOW
      new WOW({
        live: false,
        offset: 0
      }).init();
    }
    var container = document.querySelector(".quick-slide-inner");

    container.addEventListener("touchstart", this.startTouch, false);
    container.addEventListener("touchmove", this.moveTouch, false);
  },
  destroyed() {
    window.removeEventListener("scroll", this.detectView);
  }
};
</script>

<style lang="scss">
.home-page {
  .title-block {
    display: inline-block;
    background: #faacd0;
    padding-left: 10px;
    font-weight: 500;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
    filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.3));
    &:after {
      content: "";
      position: absolute;
      border-style: solid;
      border-width: 0 25px 36px 0;
      border-color: transparent transparent #faacd0 transparent;
    }
  }
  i.arrow {
    position: absolute;
    top: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    z-index: 5;
    &.anticon-left {
      left: 0;
    }
    &.anticon-right {
      left: 100%;
    }
  }
  /* ---------- 搜尋區塊 ---------- */
  .home-search-frame {
    background-image: url("~static/coffeeShop.jpg");
    background-size: contain;
    .row {
      min-height: 550px;
    }
    .search-box {
      width: 80%;
      background-color: #c8dad3;
      padding: 16px;
    }
    .search-group {
      margin-bottom: 16px;
      .title {
        margin-bottom: 4px;
      }
    }
  }
  .trend-block {
    background-color: #fafdcb;
    // &.top-area {
    //   min-height: 60%
    // }
    // &.bottom-area {
    //   min-height: 40%
    // }
    .trend-header {
      background-color: #f7b71d;
      padding: 4px 8px;
      font-weight: bold;
    }
    .item-box {
      padding: 6px 8px;
      display: flex;
      align-items: center;
      .badge {
        padding: 4px 6px;
        margin-left: 6px;
        border-radius: 12px;
        background-color: #8f8f8f;
        color: #fff;
      }
    }
  }
  /* ---------- 地區精選 ---------- */
  .latest-frame {
    transform: translateY(0);
    opacity: 1;
    transition-property: opacity, transform;
    transition-duration: 1s;
    &.noShow {
      transform: translateY(50%);
      opacity: 0;
    }
    .spot-block {
      background-color: #fff;
      transform: scale(1);
      transition: transform 0.5s;
      .spot-img {
        width: 100%;
        padding-top: 100%;
        margin: auto;
        position: relative;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .startCount {
          position: absolute;
          padding: 0 8px 5px 8px;
          right: 10px;
          bottom: 5px;
          color: white;
          border-radius: 16px;
          text-shadow: 1px 1px 1.5px rgba(0, 0, 0, 0.25);
          background: rgba(0, 0, 0, 0.375);
          font-weight: bold;
        }
      }
      .spot-desc {
        padding: 8px 16px;
        background-color: #c8dad3;
        .spot-title {
          color: initial;
          cursor: pointer;
        }
        .location {
          margin-bottom: 8px;
          font-weight: bold;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .userHead {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #eee;
          margin-right: 8px;
        }
        .timing {
          margin-left: auto;
        }
      }
    }
  }

  /* ---------- 季節精選 ---------- */
  .quick-frame {
    position: relative;
    .quick-slide-outer {
      width: 100%;
      overflow-x: hidden;
      .quick-slide-inner {
        width: calc(200% + 60px);
        display: flex;
        flex-wrap: nowrap;
        transform: translate(0);
        transition: all 0.7s;
        &.second {
          transform: translate(-50%);
        }
        .quick-slide-panel {
          width: calc(50% + 30px);
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
    .quick-block {
      position: relative;
      width: 100%;
      padding-top: 100%;
      background-color: #c8dad3;
      transition: all 0.3s;
      cursor: pointer;
      font-size: 30px;
      font-weight: 600;
      overflow: hidden;
      color: #fff;
      text-shadow: black 0.1em 0.1em 0.2em;
      img {
        transition: all 0.3s;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        transform: scale(1);
      }

      span {
        position: absolute;
        width: 80%;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
/** 僅限在電腦版 */
.webView .home-page {
  .latest-frame {
    .spot-block {
      &:hover {
        transform: scale(1.1);
        .spot-img:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  .quick-frame {
    .quick-block {
      &:hover {
        img {
          transform: scale(1.5);
        }
      }
    }
  }
}
</style>
