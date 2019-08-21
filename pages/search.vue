<template>
  <div class="search-page">
    <div class="spin_mask" v-if="isFetching">
      <a-spin size="large" />
    </div>
    <div class="search-frame">
      <div class="search-filter-frame pb-3">
        <div class="search-filter mb-2">
          <span class="search-filter-title">搜尋條件：</span>
          <div class="search-filter-tags">
            <a-tag color="#f50" class="mb-1" v-if="final_search_key">
              <a-icon class="mr-1" type="search" />
              {{final_search_key}}
            </a-tag>
            <a-tag color="#2db7f5" class="mb-1" v-if="city_id">
              <a-icon class="mr-1" type="compass" />
              {{city.length ? city.filter(item =>item.code == city_id)[0].name : ''}}
            </a-tag>
            <a-tag color="#87d068" class="mb-1" v-if="tag_id && tag_id!='all'">
              <a-icon class="mr-1" type="tags" />
              {{tag.length && tag_id!="all" ? tag.filter(item =>item.code == tag_id)[0].name : ''}}
            </a-tag>
          </div>
        </div>
        <form class="row" @submit="writeToFirestore">
          <div class="search-block col-6 mb-2">
            縣市：
            <a-select
              :value="search_city"
              style="width: 100%"
              @change="(value)=>{changeValue(value,'city')}"
            >
              <a-select-option
                :value="item.code"
                v-for="(item, key) in city"
                :key="key"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
          <div class="search-block col-6 mb-2">
            分類：
            <a-select
              :value="search_tag"
              style="width: 100%"
              @change="(value)=>{changeValue(value,'tag')}"
            >
              <a-select-option :value="'all'">全部</a-select-option>
              <a-select-option
                :value="item.code"
                v-for="(item, key) in tag"
                :key="key"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
          <div class="search-block col-9">
            關鍵字：
            <a-input
              placeholder="請輸入店家、食物等關鍵字"
              :value="search_key"
              @change="(e)=>{this.search_key = e.target.value}"
            />
          </div>
          <div class="offset-1 col-2 d-flex justify-content-end align-items-end">
            <div
              class="btn btn-primary btn-sm"
              style="word-break: keep-all;"
              @click="writeToFirestore"
            >送出</div>
          </div>
        </form>
      </div>
      <div class="search-result-frame">
        <div class="row" v-if="search_filter_list.length">
          <div class="col-sm-6 p-3" v-for="(item, key) in search_filter_list" :key="key">
            <div class="spot-block">
              <nuxt-link :to="`/detail?r_id=${item.r_id}`">
                <div class="spot-img">
                  <img :src="`${item.photo_url}`" alt />
                  <div class="startCount">
                    <a-rate :value="item.star_count" allowHalf disabled />
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
        <div class="search-result-noData" v-else>目前查無資料唷 ~</div>
      </div>
    </div>
    <div class="map-frame" v-if="map_visible">
      <GmapMap
        ref="mapRef"
        :center="center"
        :zoom="13"
        map-type-id="roadmap"
        style="width: 100%; height: 100%"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in search_filter_list"
          :position="m.center"
          :clickable="true"
          :draggable="true"
          @click="center=m.center"
        />
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
    return {
      map_visible: false,
      search_tag: "",
      search_city: "",
      search_key: "",
      center: { lat: 25.0169639, lng: 121.2261834 }
    };
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
    ...mapState({ home_search_key: "search_key" }),
    ...mapState("areaList", ["city"]),
    ...mapState("tagList", ["tag"]),
    ...mapState("searchStore", ["isFetching", "city_id", "tag_id"]),
    ...mapState("searchStore", { final_search_key: "search_key" }),
    ...mapGetters("searchStore", ["search_filter_list"])
  },
  methods: {
    ...mapActions({
      update_data: "basicAction/update_data",
      getData_byFirebase: "basicAction/getData_byFirebase"
    }),
    detectWidth() {
      if (document.body.clientWidth <= 768) {
        this.map_visible = false;
      } else this.map_visible = true;
    },
    changeValue(value, key) {
      this[`search_${key}`] = value;
      let query = { ...this.$route.query };
      query[key] = value;
      if (key == "tag" && value == "all") delete query.tag;
      this.$router.replace({
        path: "search",
        query
      });
    },
    async writeToFirestore(e) {
      if (e) e.preventDefault();

      this.update_data({
        storeName: "searchStore",
        data: {
          isFetching: true
        }
      });

      setTimeout(() => {
        this.update_data({
          storeName: "searchStore",
          data: {
            isFetching: false,
            city_id: this.search_city,
            tag_id: this.search_tag,
            search_key: this.search_key
          }
        });
        this.getData_byFirebase({
          storeName: "searchStore",
          route: `search/${this.search_city}`,
          listName: "search_list"
        });
      }, 1000);

      // db
      //   .ref("/detail/qaz0008")
      //   .set({
      //     data: {
      //       name: "韓金館",
      //       address: "10491台北市中山區林森北路119巷68號",
      //       photo_urls: ["spot_7.jpg", "spot_7.jpg", "spot_7.jpg"],
      //       rate: 5,
      //       center: { lat: 25.0500785, lng: 121.5252875 },
      //       tag: "korea_food",
      //       phone: "(02)1234-5678",
      //       open_time: "11:00～20:00(L.O.19:30)",
      //       off_day: "禮拜天公休"
      //     }
      //   })
      //   .then(function() {
      //     alert("建立成功");
      //   })
      //   .catch(function() {
      //     alert("伺服器發生錯誤，請稍後再試");
      //   });
    }
  },

  beforeMount() {
    // 取得city
    this.getData_byFirebase({
      storeName: "areaList",
      route: "city",
      listName: "city"
    });

    // 取得tag
    this.getData_byFirebase({
      storeName: "tagList",
      route: "tag",
      listName: "tag"
    });
    this.update_data({ data: { searchBar_flag: true } });
  },
  mounted() {
    this.detectWidth();
    window.addEventListener("resize", this.detectWidth);

    this.search_key = this.home_search_key || "";

    const query = { ...this.$route.query };
    if (this.$route.query.hasOwnProperty("tag")) {
      this.search_tag = this.$route.query.tag;
    } else {
      this.search_tag = "all";
    }
    if (this.$route.query.hasOwnProperty("city")) {
      this.search_city = this.$route.query.city;
    } else {
      this.search_city = "A";
      this.$router.replace({
        path: "search",
        query: Object.assign(query, { city: "A" })
      });
    }

    this.getData_byFirebase({
      storeName: "searchStore",
      route: `search/${this.search_city}`,
      listName: "search_list"
    });

    this.update_data({
      storeName: "searchStore",
      data: {
        city_id: this.search_city,
        tag_id: this.search_tag,
        search_key: this.home_search_key
      }
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.detectWidth);
  },
  watch: {
    search_filter_list() {
      if (process.browser) {
        if (this.search_filter_list.length)
          this.center = this.search_filter_list[0].center;
        // this.$refs.mapRef.$mapPromise.then(map => {
        //   map.panTo(this.search_filter_list[0].center);
        // });
      }
    }
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
    @media (max-width: 768px) {
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
      .search-result-noData {
        padding: 10px 0;
        text-align: center;
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
