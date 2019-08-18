<template>
  <div class="search-page">
    <div class="spin_mask" v-if="isFetching">
        <a-spin size="large" />
    </div>
    <div class="search-frame" :class="{mobile:!map_visible}">
        <div class="search-filter-frame pb-3">
            <div class="search-filter mb-2">
                <span class="search-filter-title">搜尋條件：</span>
                <div class="search-filter-tags">
                    <a-tag color="#f50" class="mb-1"><a-icon class="mr-1" type="search" />關鍵字內容</a-tag>
                    <a-tag color="#2db7f5" class="mb-1"><a-icon class="mr-1" type="compass" />縣市</a-tag>
                    <a-tag color="#87d068" class="mb-1"><a-icon class="mr-1" type="tags" />食物分類</a-tag>
                </div>
            </div>
            <div class="row">
                <div class="search-block col-6 mb-2">
                    縣市：                  
                    <a-select
                        :defaultValue="1"
                        style="width: 100%"
                    >
                    <a-select-option :value="1">{{123}}</a-select-option>
                  </a-select>
                </div>
                <div class="search-block col-6 mb-2">
                    分類：                  
                    <a-select
                        :defaultValue="1"
                        style="width: 100%"
                    >
                    <a-select-option :value="1">{{123}}</a-select-option>
                  </a-select>
                </div>
                <div class="search-block col-9">關鍵字：<a-input placeholder="請輸入店家、食物等關鍵字" /></div>
                <div class="offset-1 col-2 d-flex justify-content-end align-items-end">
                    <div class="btn btn-primary btn-sm" @click="writeToFirestore()">送出</div>
                </div>
            </div>
        </div>
        <div class="search-result-frame">
            <div class="row">
                <div class="col-sm-6 p-3">
                    <div class="spot-block">
                        <div class="spot-img">
                            <img :src="`${'spot_0.jpg'}`" alt />
                            <div class="startCount"><a-rate :defaultValue="1" allowHalf disabled /> {{1}}</div>
                        </div>
                        <div class="spot-desc">
                            <h5 class="location" :title="'測試'">🍽️ {{'測試'}}</h5>
                            <div class="d-flex align-items-start">
                                <!-- <div class="userHead"></div> -->
                                📌
                                <span>{{'測試'}}</span>
                                <!-- <span>ted pig</span>
                                <span class="timing">7 minutes ago</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="map-frame" v-if="map_visible">
        <GmapMap :center="{lat:25.0169639, lng:121.2261834}"
            :zoom="10"
            map-type-id="terrain"
            style="width: 100%; height: 100%">
        </GmapMap>
  </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import "animate.css";
import { Select, Input, Icon, Rate, Tag, Spin } from "ant-design-vue";
const Option = Select.Option;
import { db } from "~/plugins/firebase.js";
if (process.browser) {
  // 在这里根据环境引入wow.js
  var { WOW } = require("wowjs");
}

export default {
  layout: "default_noFooter",
  data() {
    return { map_visible: true };
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Input.name]: Input,
    [Icon.name]: Icon,
    [Rate.name]: Rate,
    [Tag.name]: Tag,
    [Spin.name]: Spin
  },
  computed: {
    ...mapState("searchStore", ["isFetching"])
  },
  methods: {
    ...mapActions({
      update_data: "basicAction/update_data"
    }),
    detectWidth() {
      if (document.body.clientWidth <= 768) {
        this.map_visible = false;
      } else this.map_visible = true;
    },
    async writeToFirestore() {
      this.update_data({
        storeName: "searchStore",
        data: { isFetching: true }
      });
      setTimeout(() => {
        this.update_data({
          storeName: "searchStore",
          data: { isFetching: false }
        });
      }, 1000);
      //   db
      //     .ref("/search_list/tag/taiwan_food")
      //     .set({
      //       data: [
      //         {
      //           id: "0",
      //           city: "A",
      //           tag: "taiwan_food",
      //           name: "貓下去敦北俱樂部",
      //           photo_url: "spot_2.jpg",
      //           address: "No, No. 218敦化北路松山區台北市105",
      //           star_count: 4.5,
      //           center: { lat: 25.0585149, lng: 121.5467025 }
      //         },
      //       ]
      //     })
      //     .then(function() {
      //       alert("建立成功");
      //     })
      //     .catch(function() {
      //       alert("伺服器發生錯誤，請稍後再試");
      //     });
    }
  },

  mounted() {
    this.detectWidth();
    window.addEventListener("resize", this.detectWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.detectWidth);
  }
};
</script>

<style lang="scss">
.ant-tag {
  display: flex;
  align-items: center;
}
.search-page {
  .search-frame {
    width: 600px;
    margin-right: calc(100vw - 600px);
    padding: 2.5rem 2.125rem 0 2.125rem;
    &.mobile {
      width: 100%;
      margin: 0;
    }
    .search-filter-frame {
      border-bottom: 1px solid #aaaaaa;
      .search-filter {
        display: flex;
        flex-wrap: nowrap;
        .search-filter-title {
          word-break: keep-all;
        }
        .search-filter-tags {
          display: flex;
          flex-wrap: wrap;
        }
        span {
          font-size: 16px;
        }
      }
    }
    .search-result-frame {
      .spot-block {
        background-color: #fff;
        transform: scale(1);
        transition: transform 0.5s;
        .spot-img {
          width: 100%;
          padding-top: 100%;
          margin: auto;
          position: relative;
          cursor: pointer;

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
  }
  .map-frame {
    position: fixed;
    top: 60px;
    right: 0;
    width: calc(100vw - 600px);
    height: calc(100vh - 60px);
    background: powderblue;
  }
}
/** 僅限在電腦版 */
.webView {
  .search-result-frame {
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
}
</style>
