<template>
  <div class="detail-page">
      <section class="mainTitle-frame container py-4">
        <div class="title-block mb-3">
          <h3 class="title-name mb-0 mr-5">測試用123456我是店名</h3>
          <div class="title-rate">
            <a-rate :defaultValue="1" allowHalf disabled />
            (1/5)
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
                :header="`${2} replies`"
                itemLayout="horizontal"
                :dataSource="[{
                      author: '莫莉林',
                      avatar: 'female.png',
                      content: '好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃好難吃',
                      datetime: moment().subtract(1, 'days'),
                    }]"
              >
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-comment
                    :author="item.author"
                    :avatar="item.avatar"
                  >
                    <template slot="actions">
                      <p>評價: <a-rate :defaultValue="1.5" allowHalf disabled /></p>
                    </template>
                    <p slot="content">{{item.content}}</p>
                    <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                      <span>{{item.datetime.fromNow()}}</span>
                    </a-tooltip>
                  </a-comment>
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
                      <a-input placeholder="請輸入名稱" />
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
                      <a-rate :defaultValue="0" v-model="rate_value" allowHalf />
                    </td>
                  </tr>
                  <tr>
                    <td>評論</td>
                    <td>	
                      <a-textarea :rows="4" @change="typeComment" v-model="comment_value" ></a-textarea>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td class="text-right">	
                      <div class="btn btn-primary btn-sm" style="word-break: keep-all;">送出</div>
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
                      <a-icon type="phone" /> +886 983-783-081
                    </td>
                  </tr>
                  <tr>
                    <td>營業時間</td>
                    <td>	
                      11:00～20:00(L.O.19:30)
                    </td>
                  </tr>
                  <tr>
                    <td>公休日</td>
                    <td>	
                      禮拜天公休
                    </td>
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
    ...mapState("areaList", ["city"])

    // ...mapState([{ spots_info: "spots_info" }])
    // ...mapState("layoutStore", ["list"])
  },
  methods: {
    ...mapActions({
      update_data: "basicAction/update_data",
      getData_byFirebase: "basicAction/getData_byFirebase"
    }),
    detectGender(e) {
      console.log(e.target.value);
    },
    typeComment(e) {
      console.log(e.target.value);
    }
  },

  beforeMount() {},
  mounted() {},
  destroyed() {}
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
