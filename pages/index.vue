<template>
  <div>
    <section class="search-frame" id="search-frame">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-6 py-4 d-flex justify-content-center align-items-center">
            <div class="search-box">
              <div class="search-group">
                <div class="title">關鍵字</div>
                <a-input placeholder="請輸入關鍵字" />
              </div>
              <div class="search-group">
                <div class="title">縣市 / 地區</div>
                <div class="d-flex">
                  <a-select
                    defaultValue="taipei"
                    style="width: 50%"
                    @change="console.log('change!')"
                  >
                    <a-select-option value="taipei">taipei</a-select-option>
                    <a-select-option value="taichung">taichung</a-select-option>
                    <a-select-option value="tainan">tainan</a-select-option>
                    <a-select-option value="kaohsiung">kaohsiung</a-select-option>
                  </a-select>
                  <a-select
                    defaultValue="banqiao"
                    style="width: 50%"
                    @change="console.log('change!')"
                  >
                    <a-select-option value="banqiao">banqiao</a-select-option>
                    <a-select-option value="chungho">chungho</a-select-option>
                  </a-select>
                </div>
              </div>
              <div class="search-group">
                <div class="title">標籤 hashtag</div>
                <a-input placeholder="請輸入 hashtag" />
              </div>
              <div class="text-right">
                <div class="btn btn-primary btn-sm">送出</div>
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
    <section
      :class="`latest-frame container mt-3 ${!latest_flag ? 'noShow' :''}`"
      id="latest-frame"
    >
      <h4>地區精選</h4>
      <div class="row">
        <div class="col-md-4 p-3" v-for="(item, key) in spots_info" :key="key">
          <div class="spot-block">
            <div class="spot-img">
              <img :src="`${item.photo_url}`" alt />
            </div>
            <div class="spot-desc">
              <h5 class="location">📌 {{item.name}}</h5>
              <div class="d-flex align-items-center">
                <div class="userHead"></div>
                <span>ted pig</span>
                <span class="timing">7 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="quick-frame container mt-3">
      <h4>季節精選</h4>
      <a-icon type="left" @click="slideQuickBlock(false)" />
      <div class="overflow-hidden">
        <div class="row" :class="{second: isSlide}">
          <div class="col-md-3 p-3" v-for="(item, key) in arr8" :key="key">
            <h4 class="quick-block">我愛夏天 {{key}}</h4>
          </div>
        </div>
      </div>
      <a-icon type="right" @click="slideQuickBlock(true)" />
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Select, Input, Icon } from "ant-design-vue";
const Option = Select.Option;
import config from "~/configs";
const { staticPath } = config;

export default {
  data() {
    return {
      latest_flag: false,
      arr3: [0, 1, 2],
      arr4: [0, 1, 2, 3],
      arr6: [0, 1, 2, 3, 4, 5],
      arr8: [0, 1, 2, 3, 4, 5, 6, 7],
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
    [Icon.name]: Icon
  },
  computed: {
    ...mapState(["spots_info"])

    // ...mapState([{ spots_info: "spots_info" }])
    // ...mapState("layoutStore", ["list"])
  },
  methods: {
    ...mapActions({
      update_data: "basicAction/update_data"
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

      if (
        document.body.clientHeight >=
        document.getElementById("latest-frame").getBoundingClientRect().top
      ) {
        this.latest_flag = true;
      } else this.latest_flag = false;
    }
  },
  mounted() {
    this.detectView();
    window.addEventListener("scroll", this.detectView);
  },
  destroyed() {
    window.removeEventListener("scroll", this.detectView);
  }
};
</script>

<style lang="scss">
/* ---------- 搜尋區塊 ---------- */
.search-frame {
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
  transition: all 1s;
  &.noShow {
    transform: translateY(50%);
    opacity: 0;
  }
  .spot-block {
    background-color: #fff;
    cursor: pointer;
    &:hover {
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
    .spot-img {
      width: 75%;
      padding-top: 75%;
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
    }
    .spot-desc {
      padding: 8px 16px;
      background-color: #c8dad3;
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
  .row {
    flex-wrap: nowrap;
    transition: all 0.7s;
    &.second {
      transform: translateX(-100%);
    }
  }
  .quick-block {
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c8dad3;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #63707e;
    }
  }
  i {
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
}
</style>
