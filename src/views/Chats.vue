<template>
  <div class="column">
    <q-scroll-area
      ref="ScrollArea"
      style="width: 100%; height: calc(100vh - 3.3rem);"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      class="Scroll"
      v-scroll="scroll_fn"
    >
      <q-page class="Chats column q-pa-md" style="auto">
        <transition
          name="slowdown"
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div class="column">
            <div
              ref="dialogsContainer"
              v-for="dialog of dialogs"
              :key="dialog.key"
              class="col"
            >
              <q-chat-message
                name="Me"
                :text="dialog.userMessages"
                :stamp="dialog.timeStamp"
                sent
                bg-color="primary"
                filled
                padding="lg"
                class="col-md-12"
              >
                <template v-slot:avatar class="margin-left">
                  <i class="iconfont margin-left">&#xe736;</i>
                </template>
              </q-chat-message>
              <q-chat-message
                name="Bot"
                :text="dialog.botMessages"
                :stamp="dialog.timeStamp"
                bg-color="amber-7"
                class="col-md-8"
                filled
                padding="lg"
              >
                <template v-slot:avatar>
                  <i class="iconfont margin-right">&#xf09a;</i>
                </template>
              </q-chat-message>
            </div>
          </div>
        </transition>
      </q-page>
    </q-scroll-area>

    <div class="col">
      <form
        class="input-box float-right vertical-bottom absolute-bottom col"
        fixed
      >
        <q-input
          outlined
          color="primary"
          label-color="red"
          v-model="inputMessage"
          type="text"
          class="Input"
          :placeholder="placeMessage"
          hide-bottom-space
          hide-hint
        >
          <!-- :rules="[val=>!!val||'输入不能为空']" -->
          <template v-slot:append>
            <q-btn
              color="primary"
              type="submit"
              icon="check"
              label="发送"
              @click="
                onSend(inputMessage);
                onReset();"
            />
          </template>
        </q-input>
      </form>
    </div>
  </div>
</template>

<script defer>
// @ is an alias to /src
import { debounce } from "quasar";
export default {
  name: "Chats",
  data() {
    return {
      dialogs: [
        
      ],
      dateObj: new Date(),
      lastTime: undefined,
      inputMessage: "",
      placeMessage: "消息",
      alertFlag:false,
      thumbStyle: {
        right: "0.4rem",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "0.6rem",
        opacity: 0.75,
      },

      barStyle: {
        right: "0.2rem",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "1rem",
        opacity: 0.2,
      },
    };
  },
  mounted() {
    // let example = {
    //    userMessages: ["hey, how are you?"],
    //    botMessages: ["fine,what about you?"],
    //    timeStamp: undefined,
    //    something_else: null,
    // };
    // this.dialogs = [];
    // this.lastTime = this.dateObj.toLocaleTimeString(0);
    // for (let i = 0; i < 10; i++) {
    //   // let temp = this.dialogs[0];
    //   console.log(this.lastTime);
    //   example.timeStamp = this.lastTime;
    //   if (i > 0) {
    //     this.dialogs.push(example);
    //     // this.timeStamp.push(this.dateObj.getMinutes() - this.lastTime);
    //   }
    // }

    // const Container = this.$refs["dialogsContainer"];
    // Container.scrollTop = Container.scrollHeight;
  },
  methods: {
    onSend(text) {
      // this.dialogs.push({userMessages:[text],botMessages:[]});
      // this.$set(this.dialogs);
      if (!this.ifInputBlank(text)) {
        this.placeMessage="消息";
        this.alertFlag = false;
        this.axios
          .post("api/dialog", { text: text })
          .then((res) => {
            const recData = res.data;
            this.dialogs.push({
              userMessages: [text],
              botMessages: [recData["text"]],
              // this.dateObj.
              timeStamp: this.dateObj.toLocaleTimeString(0),
              something_else: null,
            });
            console.log(recData);
            // 滑动下拉
            this.fixdialogsHeight();
          })
          .catch((err) => {
            // this.dialogs;
            alert("网络好像出现点意外");
            console.error(err);
          });
      }else{
        this.placeMessage = "输入不能为空！";
        this.alertFlag = true;
      }
    },
    fixdialogsHeight() {
      this.$nextTick(() => {
        const Container = this.$refs["ScrollArea"];

        const dialogsContainer = this.$refs["dialogsContainer"];
        const child = dialogsContainer[0];
        const parentNode = child.parentNode;
        // const dialogsContainer = document.getElementsByClassName("Scroll")
        console.log(parentNode.clientHeight);
        let jumpHeight = parentNode.clientHeight + child.clientHeight;
        console.log(jumpHeight);
        Container.setScrollPosition(jumpHeight, 500);

        // const timer = setInterval(() => {
        //   originHeight+=slice;
        //   if(originHeight>=jumpHeight){
        //     Container.setScrollPosition(jumpHeight);
        //     clearInterval(timer)
        //   }else{
        //     Container.setScrollPosition(originHeight);
        //   }
        // }, 200);
      });
    },
    ifInputBlank(inputMessage) {
      return (
        inputMessage === "" ||
        inputMessage === undefined ||
        inputMessage === null
      );
    },
    caltimeStamp() {
      const date = Date();
      let minutes = ["", date.getMinutes().slice(-2)].join("");
      return minutes;
    },
    onReset() {
      this.inputMessage = "";
    },
    scroll_fn: debounce((position) => {
      // jumpToPosition
      this.setScrollPosition(position);
    }, 200),
    // scrolled(detail){
    //   const position = detail.position;
    //   const direction= detail.direction;
    //   const directionChanged = detail.directionChanged;
    //   const inflexionPosition = detail.inflexionPosition;
    // }
  },
  // watch:{
  //   dialogs:{
  //     handler(oldVal,newVal){

  //     }
  //   }
  // }
  // components: {
  //   // HelloWorld
  // },
};
</script>
<style lang="scss" scoped>
@import "~quasar-styl";
@font-face {
  font-family: 'iconfont';  /* Project id 2530469 */
  src: url('//at.alicdn.com/t/font_2530469_z1k5td71dl.woff2?t=1620323316362') format('woff2'),
       url('//at.alicdn.com/t/font_2530469_z1k5td71dl.woff?t=1620323316362') format('woff'),
       url('//at.alicdn.com/t/font_2530469_z1k5td71dl.ttf?t=1620323316362') format('truetype');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 40px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

$font-size: 20px;
@media screen and (max-width: $breakpoint-xs-max) {
  $font-size: 16px;
}
@media screen and (max-width: $breakpoint-md-max) {
  $font-size: 24px;
}
@media screen and (max-width: $breakpoint-lg-max) {
  $font-size: 32px;
}

// $chat-message-distance:120rem;
// $chat-message-avatar-size:120rem;
// $chat-message-text-padding:120rem;

.slowdown-enter-active,
.slowdown-leave-active {
  transition: opacity 0.5s;
}

.dialogsContainer {
  transition: width 0.3s height 0.3s;
  .dialogBox {
    flex-grow: 2;
    flex-shrink: 1;
    height: 10vh;
    margin: 0 3rem;
    font-size: $font-size;
  }
}

.margin-right {
  margin: 0 8px 0 0;
}
.margin-left {
  margin: 0 0 0 8px;
}
.Chats {
  margin: 0 1.3rem 0 0;
}
.Input {
  font-size: 20px;
  color: brown;

}
.noScroll {
  overflow: hidden;
  overflow-y: hidden;
}
::placeholder{
  color: red;
}
.Input::placeholder{
  opacity: 1;
}
// .Input::-webkit-input-placeholder { /* WebKit browsers */
//     color:    rgb(156, 41, 41);
// }
// .Input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
//     color:    rgb(156, 41, 41);
// }
// .Input::-moz-placeholder { /* Mozilla Firefox 19+ */
//     color:    rgb(156, 41, 41);
// }
// .Input:-ms-input-placeholder { /* Internet Explorer 10+ */
//     color:    rgb(156, 41, 41);
// }
input::placeholder {
  color: red;
  font-size: 1.2em;
  font-style: italic;
}
</style>
