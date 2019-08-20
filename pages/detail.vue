<template>
  <div class="detail-page">
    <section class="mainTitle-frame container py-4">
      <div class="title-block mb-3">
        <h3 class="title-name mb-0 mr-5">測試用123456我是店名</h3>
        <div class="title-rate">
          <a-rate :defaultValue="1" allowHalf disabled />(1/5)
        </div>
      </div>
      <div class="title-desc">
        <a-icon class="mr-1" type="compass" />
        <span>我只是地址我只是地址我只是地址我只是地址</span>
      </div>
    </section>
    <section class="detail-frame container">
      <div class="row">
        <div class="detail-main-panel col-lg-8 py-3">
          <div class="carousel-block">
            <carousel
              :per-page="1"
              :autoplay="true"
              :loop="true"
              :pagination-padding="5"
              :autoplay-timeout="4000"
            >
              <slide>
                <img :src="'spot_0.jpg'" />
              </slide>
              <slide>
                <img :src="'spot_0.jpg'" />
              </slide>
            </carousel>
          </div>
          <div class="comment-block">
            <a-list
              class="comment-list"
              :header="`${comment_list.length} replies`"
              itemLayout="vertical"
              :dataSource="comment_list"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-comment
                  :author="item.author"
                  :avatar="item.gender=='male'? 'male.png' :'female.png'"
                >
                  <p slot="content">{{item.comment}}</p>
                  <a-tooltip slot="datetime" :title="item.datetime">
                    <span>{{moment(item.datetime,'YYYY-MM-DD HH:mm:ss').fromNow()}}</span>
                  </a-tooltip>
                </a-comment>
                <div style="margin-left: 44px">
                  評分:
                  <a-rate :defaultValue="item.rate" allowHalf disabled />
                </div>
              </a-list-item>
            </a-list>
          </div>
          <div class="add-comment-block py-3">
            <h4>可在此留下您的評論</h4>
            <table class="comment-table">
              <tbody>
                <tr>
                  <td>訪客名稱</td>
                  <td>
                    <a-input placeholder="請輸入名稱" v-model="author_value" @change="typeAuthor" />
                  </td>
                </tr>
                <tr>
                  <td>性別</td>
                  <td>
                    <a-radio-group @change="detectGender" v-model="gender_value">
                      <a-radio :value="'male'">男生</a-radio>
                      <a-radio :value="'female'">女生</a-radio>
                    </a-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>評分</td>
                  <td>
                    <a-rate :defaultValue="0" v-model="rate_value" allowHalf @change="detectRate" />
                  </td>
                </tr>
                <tr>
                  <td>評論</td>
                  <td>
                    <a-textarea :rows="4" @change="typeComment" v-model="comment_value"></a-textarea>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td class="text-right">
                    <div
                      class="btn btn-primary btn-sm"
                      style="word-break: keep-all;"
                      @click="onSubmit"
                    >送出</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="detail-info-panel col-lg-4 py-3">
          <div class="blocks location-block pb-3">
            <div class="detail-title">店家位置</div>
            <div class="location"></div>
          </div>
          <div class="blocks basicInfo-block pb-3">
            <div class="detail-title">基本資訊</div>
            <table class="basicInfo-table">
              <tbody>
                <tr>
                  <td>類型</td>
                  <td>
                    <a-tag color="rgb(252,190,88)">壽司</a-tag>
                  </td>
                </tr>
                <tr>
                  <td>電話</td>
                  <td class="d-flex align-items-center">
                    <a-icon type="phone" />+886 983-783-081
                  </td>
                </tr>
                <tr>
                  <td>營業時間</td>
                  <td>11:00～20:00(L.O.19:30)</td>
                </tr>
                <tr>
                  <td>公休日</td>
                  <td>禮拜天公休</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import "animate.css";
import { callCityList } from "~/actions/api";
import moment from "moment";
import {
  Select,
  Input,
  Icon,
  Rate,
  Tag,
  List,
  Comment,
  Tooltip,
  Avatar,
  InputNumber,
  Radio
} from "ant-design-vue";
const Option = Select.Option;
const ListItem = List.Item;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
import Carousel from "vue-carousel/src/Carousel.vue";
import Slide from "vue-carousel/src/Slide.vue";

if (process.browser) {
  // 在这里根据环境引入wow.js
  var { WOW } = require("wowjs");
}

export default {
  data() {
    return {
      author_value: "",
      gender_value: "",
      rate_value: 0,
      comment_value: "",
      moment
    };
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Input.name]: Input,
    [Icon.name]: Icon,
    [Rate.name]: Rate,
    [Tag.name]: Tag,
    [List.name]: List,
    [ListItem.name]: ListItem,
    [Comment.name]: Comment,
    [Tooltip.name]: Tooltip,
    [Avatar.name]: Avatar,
    [TextArea.name]: TextArea,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup
  },
  computed: {
    ...mapState(["spots_info", "classify_info"]),
    ...mapState("areaList", ["city"]),
    ...mapState("commentStore", ["comment_list"])

    // ...mapState([{ spots_info: "spots_info" }])
    // ...mapState("layoutStore", ["list"])
  },
  methods: {
    ...mapActions({
      update_data: "basicAction/update_data",
      getData_byFirebase: "basicAction/getData_byFirebase",
      pushData_byFirebase: "basicAction/pushData_byFirebase"
    }),
    typeAuthor(e) {
      this.auther_value = e.target.value;
    },
    detectGender(e) {
      this.gender_value = e.target.value;
    },
    detectRate(num) {
      this.rate_value = num;
    },
    typeComment(e) {
      this.comment_value = e.target.value;
    },
    onSubmit() {
      const postData = {
        id: new Date().valueOf(),
        author: this.author_value,
        gender: this.gender_value,
        rate: this.rate_value,
        comment: this.comment_value,
        datetime: this.moment().format("YYYY-MM-DD HH:mm:ss")
      };

      if (!postData.author) return alert("請輸入名稱唷QAQ");
      if (!postData.gender) return alert("請選擇性別唷QAQ");
      if (!postData.rate) return alert("請選擇評分唷QAQ");
      if (!postData.comment) return alert("請輸入評論唷QAQ");

      /** 送出評論 */
      this.pushData_byFirebase({
        route: `/comment/${this.$route.query.r_id}/data`,
        postData
      });
      /** 重讀評論 */
      this.getData_byFirebase({
        storeName: "commentStore",
        route: `/comment/${this.$route.query.r_id}`,
        listName: "comment_list"
      });
      /** 清空欄位 */
      this.author_value = "";
      this.gender_value = "";
      this.rate_value = 0;
      this.comment_value = "";
    }
  },

  beforeMount() {
    if (this.$route.query.hasOwnProperty("r_id")) {
      this.getData_byFirebase({
        storeName: "commentStore",
        route: `/comment/${this.$route.query.r_id}`,
        listName: "comment_list"
      });
    }
  },
  mounted() {},
  destroyed() {
    this.update_data({
      storeName: "commentStore",
      data: { comment_list: [] }
    });
  }
};
</script>

<style lang="scss">
.detail-page {
  .mainTitle-frame {
    position: relative;
    border-bottom: 1px solid #aaaaaa;
    margin-bottom: -1px;
    .title-block {
      display: flex;
      flex-wrap: nowrap;
      @media (max-width: 768px) {
        display: block;
      }
      .title-name {
      }
    }
    .title-desc {
      display: flex;
      align-items: center;
    }
  }
  .detail-frame {
    .detail-main-panel {
      border-right: 1px solid #aaaaaa;
      @media (max-width: 992px) {
        border: none;
      }
      .carousel-block {
        .VueCarousel-wrapper {
          background: #fff;
          .VueCarousel-slide {
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #fff;
            box-sizing: border-box;
            width: 100%;
            height: 250px;
            img {
              position: relative;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
        .VueCarousel-pagination {
          position: relative;
          top: -10px;
        }
      }
      .comment-block {
        border-bottom: 1px solid #aaaaaa;
      }
      .add-comment-block {
        .comment-table {
          width: 100%;
          tbody tr {
            display: flex;
            margin-bottom: 2px;
            td:first-child {
              min-width: 100px;
              font-weight: bold;
            }
            td:last-child {
              width: 100%;
            }
          }
        }
      }
    }
    .detail-info-panel {
      /** common */
      .detail-title {
        margin-bottom: 5px;
      }
      /////////////
      .blocks {
        border-bottom: 1px solid #aaaaaa;
        margin-bottom: 10px;
      }
      .location-block {
        .location {
          width: 100%;
          padding-bottom: 100%;
          background: pink;
        }
      }
      .basicInfo-block {
        .basicInfo-table {
          tbody tr {
            display: flex;
            margin-bottom: 2px;
            td:first-child {
              min-width: 100px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
