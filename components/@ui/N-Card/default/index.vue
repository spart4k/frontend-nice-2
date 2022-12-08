<template>
  <div :class="[$style.card, detailPage && $style.detailPage]">
    <div ref="gallery" :class="[$style.gallery, detailPage && $style.detailPage]">
      <template v-if="sliderImages.length && !$props.withVideo">
        <template v-if="$props.detailPage && sliderImages.length > 0">
          <N-Slider :slider-item="sliderImages" />
        </template>
        <template v-else>
          <div v-if="$props.detailPage" :class="[$style.hatContainer, detailPage && $style.detailPage]">
            <div :class="[$style.hat, detailPage && $style.detailPage]">
              <n-lazy-img :detail-page="detailPage" :src="`${$axios.defaults.baseURL}/${data.files[0].src}`" :alt="data.title" />
            </div>
          </div>
          <nuxt-link v-else :to="`../${data.section.slug}/${data.id}`">
            <div :class="[$style.hat]">
              <n-lazy-img :detail-page="detailPage" :src="`${$axios.defaults.baseURL}/${data.files[0].src}`" :alt="data.title" />
            </div>
          </nuxt-link>
        </template>
      </template>
      <template v-else-if="$props.withVideo">
        <div :class="[$style.wrapperVideo, detailPage && $style.detailPage]">
          <div v-if="!videoPlay" :class="$style.blackout" @click="videoPlayingChange">
            <N-Button type-button="play" :background-color="'rgba(34, 34, 34, 0.8)'">
              <N-Icon :class="$style.icon" name="button-play" />
            </N-Button>
          </div>
          <n-lazy-img v-if="videoPlug" :src="data.files[0].file_type_id === 1 ? `${$axios.defaults.baseURL}/${data.files[0].src}` : require('@/assets/img/videoNoBg.png')" :alt="data.title" :class="$style.plugVideo" />
          <video
            ref="videoRef"
            :class="detailPage && $style.detailPage"
            playsinline
            :controls="videoPlay"
            preload="none"
            type="video/mp4"
            :src="videoUrl"
          />
        </div>
      </template>
    </div>
    <div
      :class="[
        $style.body,
        detailPage && $style.detailPage
      ]"
    >
      <template>
        <!-- <NuxtLink v-if="!$props.detailPage" :class="$style.body__top" tag="div" :to="`../${data.section.slug}/${data.id}`">
          <h2 :class="$style.title" :style="{ marginBottom: !$props.detailPage ? '1rem' : '1.5rem' }">
            {{ data.title }}
          </h2>
          <div v-if="data.date_event" :class="$style.time">
            {{ dateFormat }}
          </div>
          <div :class="$style.cardText">
            <div :class="$style.parser" v-html="data.subtitle" />
          </div>
          <template v-if="data.price && !$props.detailPage">
            <div :class="$style.price">
              {{ data.price }} р.
            </div>
          </template>
          <div v-if="!$props.detailPage" :class="[$style.socials, detailPage && $style.detailPage]" :style="{marginTop: $props.detailPage ? '3rem' : '2rem', borderTop: $props.detailPage ? '.1rem solid rgba(34, 34, 34, 0.1)' : 'none', padding: $props.detailPage ? '3rem 0 1rem' : '0 0 1rem'}">
            <div :class="$style.socialsItem">
              <N-Like v-model="like" :class="$style.likeContainer" :value="like" />
              <div :class="$style.parser">
                {{ data.like_count }}
              </div>
            </div>
            <div v-if="!((windowWidth > 900) && $props.detailPage)" :class="$style.socialsItem" @click="showComments = !showComments; commentHeightSet">
              <N-Icon name="comments" :class="$style.commentsButtonContainer" />
              <div :class="$style.parser">
                {{ !$props.detailPage ? data.comments_count : 'Комментировать' }}
              </div>
            </div>
          </div>
          <div v-if="!$props.detailPage && data.tags.length" :class="$style.body__tags" :style="{ marginTop: !$props.detailPage ? '2rem' : '' }">
            <N-Chip
              v-for="item in data.tags"
              :key="item.id"
              ref="chipsArray"
              :class="$style.chip"
              @click="$emit('clickTag', item.id)"
            >
              {{ item.name }}
            </N-Chip>
            <N-Chip
              v-if="chipsCounter > 0"
              :class="$style.chip"
            >
              +{{ chipsCounter }}
            </N-Chip>
          </div>
        </NuxtLink> -->
        <NuxtLink v-if="!$props.detailPage" :to="`../${data.section.slug}/${data.id}`">
          <div :class="$style.body__top">
            <h2 :class="$style.title" :style="{ marginBottom: !$props.detailPage ? '1rem' : '1.5rem' }">
              {{ data.title }}
            </h2>
            <div v-if="data.date_event" :class="$style.time">
              {{ dateFormat }}
            </div>
            <div :class="$style.cardText">
              <div :class="$style.parser" v-html="data.subtitle" />
            </div>
            <template v-if="data.price && !$props.detailPage">
              <div :class="$style.price">
                {{ data.price }} р.
              </div>
            </template>
            <div v-if="!$props.detailPage" :class="[$style.socials, detailPage && $style.detailPage]" :style="{marginTop: $props.detailPage ? '3rem' : '2rem', borderTop: $props.detailPage ? '.1rem solid rgba(34, 34, 34, 0.1)' : 'none', padding: $props.detailPage ? '3rem 0 1rem' : '0 0 1rem'}">
              <div :class="$style.socialsItem">
                <N-Like v-model="like" :class="$style.likeContainer" :value="like" />
                <div :class="$style.parser">
                  {{ data.like_count }}
                </div>
              </div>
              <div v-if="!((windowWidth > 900) && $props.detailPage)" :class="$style.socialsItem" @click="showComments = !showComments; commentHeightSet">
                <N-Icon name="comments" :class="$style.commentsButtonContainer" />
                <div :class="$style.parser">
                  {{ !$props.detailPage ? data.comments_count : 'Комментировать' }}
                </div>
              </div>
            </div>
            <div v-if="!$props.detailPage && data.tags.length" :class="$style.body__tags" :style="{ marginTop: !$props.detailPage ? '2rem' : '' }">
              <N-Chip
                v-for="item in data.tags"
                :key="item.id"
                ref="chipsArray"
                :class="$style.chip"
                @click="$emit('clickTag', item.id)"
              >
                {{ item.name }}
              </N-Chip>
              <N-Chip
                v-if="chipsCounter > 0"
                :class="$style.chip"
              >
                +{{ chipsCounter }}
              </N-Chip>
            </div>
          </div>
        </NuxtLink>
        <div v-if="$props.detailPage" ref="body" :class="[$style.body__top, detailPage && $style.detailPage]" tag="div">
          <h2 :class="$style.title" :style="{ marginBottom: !$props.detailPage ? '1rem' : '0.5rem' }">
            {{ data.title }}
          </h2>
          <template v-if="$props.detailPage">
            <p v-if="data.authors.length" :class="$style.authorName">
              {{data.authors.length > 1 ? 'авторы:' : 'автор:'}}
              <span v-for="(item, index) in data.authors" :key="index" @click="$emit('clickAuthor', item.id)">
                {{item.name}}{{data.authors.length - 1 === index ? '' : ','}}
              </span>
            </p>
          </template>
          <div v-if="data.date_event" :class="$style.time">
            {{ dateFormat }}
          </div>
          <div :class="$style.cardText">
            <div :class="$style.parserDetail" v-html="data.text" />
          </div>
          <template>
            <!-- <div :class="$style.cardAudio">
              <N-Audio :files="data.files" />
            </div> -->
            <div v-for="item in data.files" :key="item.id" :class="$style.cardAudio">
              <N-Audio v-if="item.file_type_id === 3" :title="item.title" :src="`${$axios.defaults.baseURL}/${item.src}`" :stop="audioStop" @playAudio="playAudio" />
            </div>
          </template>
          <template v-if="data.price && $props.detailPage">
            <div v-if="data.type.name !== 'Wire' && $props.detailPage" :class="$style.price">
              {{ data.price }}р.
            </div>
            <template v-if="data.type.name === 'Wire'">
              <N-Purchase-Wire :price="totalPrice" :colors="JSON.parse(data.type.blueprint).цвет" :card_id="data.id" />
            </template>
            <template v-else>
              <N-Purchase :count="data.count" :card_id="data.id" />
            </template>
          </template>
          <!-- <div v-if="isJsonString" :class="$style.cardText">
            <EditorJsParser v-if="isJsonString" :value="JSON.parse(data.text)" :class="!$props.detailPage && $style.parser" />
          </div> -->
        </div>
      </template>
      <div :class="[$style.body__bottom, detailPage && $style.detailPage]">
        <div v-if="$props.detailPage && data.tags.length" :class="$style.body__tags" :style="{ marginTop: $props.detailPage ? '3rem' : '' }">
          <N-Chip
            v-for="item in data.tags"
            :key="item.id"
            ref="chipsArray"
            :class="$style.chip"
            @click="$emit('clickTag', item.id)"
          >
            {{ item.name }}
          </N-Chip>
          <N-Chip
            v-if="chipsCounter > 0"
            ref="chipExtra"
            :class="$style.chip"
            @click="extraTagShow"
          >
            +{{ chipsCounter }}
          </N-Chip>
        </div>
        <div v-if="$props.detailPage" :class="[$style.socials, detailPage && $style.detailPage]" :style="{marginTop: $props.detailPage ? '3rem' : '2rem', borderTop: $props.detailPage ? '.1rem solid rgba(34, 34, 34, 0.1)' : 'none', padding: $props.detailPage ? '3rem 0 1rem' : '0 0 1rem'}">
          <div :class="$style.socialsItem" @click="addLike">
            <N-Like v-model="like" :class="$style.likeContainer" :value="like" />
            <div :class="$style.parser">
              {{ 'Нравится' }}
            </div>
          </div>
          <div v-if="!((windowWidth > 900) && $props.detailPage)" :class="$style.socialsItem" @click="showComments = !showComments; commentHeightSet">
            <N-Icon :class="$style.commentsSvg" name="comments" />
            <div :class="$style.parser">
              {{ !$props.detailPage ? '0' : 'Комментировать' }}
            </div>
          </div>
        </div>
        <div
          v-if="$props.detailPage"
          ref="commentBox"
          :class="[$style.comments,showComments ? $style.show : '']"
          :style="{maxHeight: showComments ? commentHeight : '0'}"
        >
          <N-Input v-if="$store.state.authentication.authorizated" type="textarea" @smilies="commentHeightSet" @sendSticker="sendSticker" @sendMessage="sendComment" />
          <N-Plug v-else @login="login" @registration="registration" />
          <div :class="$style.commentsContainer">
            <N-Comment
              v-for="(item, index) in proxyComments.data"
              :key="index"
              :nickname="item.user.nickname"
              :text="item.text"
              :time="item.created_at"
              :sticker="item.sticker"
            />
          </div>
        </div>
      </div>
      <div v-if="$slots.footer" :class="$style.body__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { computed, nextTick, onMounted, onUnmounted, ref, useContext } from '@nuxtjs/composition-api'
import dataProps from '../props'

export default {
  name: 'NCardDefault',
  components: {
  },
  props: { ...dataProps.props },
  setup (props) {
    const videoRef = ref(null)
    const showComments = ref(false)
    const like = ref(props.data.liked)
    const likeCounter = ref(props.data.like_count)
    const chipExtra = ref()
    const proxyComments = computed(() => props.comments)
    const chipsCounter = ref(0)
    const chipsWidth = ref(-10)
    const chipsArray = ref()
    const commentHeight = ref()
    const commentBox = ref()
    const loginMenu = ref()
    const windowWidth = ref()
    const page = ref()
    const { $axios } = useContext()
    const { store } = useContext()
    const videoPlay = ref(false)
    const videoPlug = ref(true)
    const totalPrice = ref(props.data.price)
    const wirePrice = ref(1000)
    const audioStop = ref(0)
    const itemCounter = ref(1)
    const sliderImages = computed(() => {
      const array = ref([])
      props.data.files.forEach((item) => {
        if (item.file_type_id === 1) {
          array.value.push(item)
        }
      })
      return array.value
    })
    const playAudio = () => {
      audioStop.value++
    }
    const login = () => {
      if (!store.state.menu.isShowBottomMenu) {
        store.commit('menu/changeKeyMenu', {
          key: 'registration',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 1 })
        store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
        store.commit('menu/changeShowStateBottomSheetLive', { value: true })
      } else if (store.state.menu.isShowBottomMenu) {
        store.commit('menu/changeKeyMenu', {
          key: 'registration',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 1 })
      }
    }
    const registration = () => {
        if (!store.state.menu.isShowBottomMenu) {
        store.commit('menu/changeKeyMenu', {
          key: 'registration',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 2 })
        store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
        store.commit('menu/changeShowStateBottomSheetLive', { value: true })
      } else if (store.state.menu.isShowBottomMenu) {
        store.commit('menu/changeKeyMenu', {
          key: 'registration',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 2 })
      }
    }
    const addLike = async () => {
      if (store.state.authentication.authorizated) {
        like.value = !like.value
        if (like.value === true) {
          likeCounter.value++
          await store.dispatch('socials/addLike', props.data.id)
        } else {
          likeCounter.value--
          await store.dispatch('socials/removeLike', props.data.id)
        }
      } else if (!store.state.menu.isShowBottomMenu) {
        store.commit('menu/changeKeyMenu', {
          key: 'registration',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 1 })
        store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
      } else if (store.state.menu.isShowBottomMenu) {
        store.commit('menu/changeKeyMenu', {
          key: 'registration',
          effect: 'fx-slide-from-left'
        })
        store.commit('menu/changeStepMenu', { step: 1 })
      }
    }
    const sendComment = async (val) => {
      const commentData = {
        card_id: props.data.id,
        text: unescape(encodeURIComponent(val)),
        sticker_id: null
      }
      console.log('send')
      proxyComments.value.data.unshift({
        user: {
          nickname: store.state.authentication.user.nickname
        },
        text: val,
        created_at: Date.now()
      })
      commentHeightSet()
      await store.dispatch('socials/addComment', commentData)
    }
    const sendSticker = async (val) => {
      const stickerData = {
        card_id: props.data.id,
        text: null,
        sticker_id: val
      }
      const result = await store.dispatch('socials/addComment', stickerData)
      if (!result.error) {
        proxyComments.value.data.unshift({
          user: {
            nickname: result.data.user.nickname
          },
          text: result.data.text,
          created_at: result.data.created_at,
          sticker: result.data.sticker
        })
        commentHeightSet()
      }
    }
    const videoPlayingChange = () => {
      if (videoRef.value.paused === true) {
        videoRef.value.play()
        videoPlay.value = true
        videoPlug.value = false
      } else {
        videoRef.value.pause()
        videoPlay.value = false
      }
    }
    const isJsonString = computed(() => {
      try {
        JSON.parse(props?.data?.text)
      } catch (e) {
        return false
        // return true
      }
      return true
    })
    const videoUrl = ref()
    const commentHeightSet = () => {
      // console.log(commentBox)
      if (props.detailPage === true) {
        setTimeout(() => {
          commentHeight.value = commentBox.value.scrollHeight + 'px'
        }, 300)
      }
    }
    const extraTagHide = () => {
      if (chipsArray.value?.length) {
        for (let i = 0; i < chipsArray.value.length; i++) {
          chipsWidth.value += chipsArray.value[i].$el.offsetWidth + 10
        }
        if (chipsWidth.value > 315) {
          for (let i = chipsArray.value.length - 1; chipsWidth.value > 245; i--) {
            chipsWidth.value = chipsWidth.value - (chipsArray.value[i].$el.offsetWidth + 10)
            chipsArray.value[i].$el.style.display = 'none'
            chipsCounter.value++
          }
        }
      }
    }
    const extraTagShow = () => {
      chipsArray.value.forEach(function (item) {
        item.$el.style.display = 'flex'
      })
      chipExtra.value.$el.style.display = 'none'
    }
    const windowWidthCount = () => {
      windowWidth.value = window.innerWidth
    }
    onMounted(() => {
      if (props.detailPage === true) {
        proxyComments.value.data.reverse()
      }
      windowWidthCount()
      if (windowWidth.value > 900) {
        showComments.value = true
      }
      commentHeightSet()
      window.addEventListener('resize', windowWidthCount)
      window.addEventListener('resize', commentHeightSet)
      nextTick(() => {
      extraTagHide()
        if (props.withVideo) {
          videoUrl.value = `${$axios.defaults.baseURL}/${props.data?.files[1]?.src}`
          videoRef.value.src = `${$axios.defaults.baseURL}/${props.data?.files[0]?.src}`
          videoRef.value.load()
        }
      })
    })
    onUnmounted(() => {
      window.removeEventListener('resize', windowWidthCount)
      window.removeEventListener('resize', commentHeightSet)
    })
    const dateFormat = computed(() => {
      const t = props.data.date_event.split(/[- :]/)
      let min = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])).getMinutes()
      const hour = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])).getHours()
      const day = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])).getDate()
      let month = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])).getMonth() + 1
      const year = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])).getFullYear()
      if (String(min).length === 1) {
        min = '0' + min
      }
      if (String(month).length === 1) {
        month = '0' + month
      }
      const totalTime = day + '.' + month + '.' + year + ' / ' + hour + ':' + min
      return totalTime
    })
    return {
      like,
      likeCounter,
      chipsCounter,
      showComments,
      chipsArray,
      isJsonString,
      chipsWidth,
      chipExtra,
      dateFormat,
      commentHeight,
      commentBox,
      videoRef,
      commentHeightSet,
      extraTagHide,
      proxyComments,
      extraTagShow,
      addLike,
      windowWidth,
      windowWidthCount,
      videoUrl,
      videoPlay,
      videoPlayingChange,
      videoPlug,
      login,
      registration,
      loginMenu,
      sendComment,
      audioStop,
      sendSticker,
      totalPrice,
      wirePrice,
      itemCounter,
      page,
      sliderImages,
      playAudio
    }
  }
}
</script>
<style lang="scss" module>
.container {
  border-radius: $border-radius-1;
  background-color: $white;
  position: relative;
  overflow: hidden;
  transform: translate3d(0,0,0);
}
  .card {
    background-color: $white;
    //width: 36rem;
    height: fit-content;
    width: 100%;
    border-radius: 2rem;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    &.detailPage {
      @media (min-width: $tabletWidth) {
        min-width: 40rem;
        max-width: 114rem;
        height: calc(76vh - 7rem);
        margin: 0 auto;
        display: flex;
      }
    }
    .gallery {
      cursor: pointer;
      &.detailPage {
        @media (min-width: $tabletWidth) {
          background: #222222;
          cursor: unset;
          min-width: 50%;
          max-width: 50%;
          :global(.slick-slider) {
            height: 100% !important;
            display: flex;
            :global(.slick-dots) {
              bottom: 0;
            }
            :global(.slick-list) {
              height: 100% !important;
              margin: auto 0;
              :global(.slick-track) {
                height: 100%;
                :global(.slick-slide) {
                  height: 100%;
                  :global(div) {
                    height: 100%;
                    img {
                      display: inline-block;
                      object-fit: contain;
                      height: 100%;
                      width: 100%;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .wrapperVideo {
      position: relative;
      width: calc(100% + 10px);
      margin-left: -5px;
      &.detailPage {
        width: 100%;
        margin-left: 0;
        @media (min-width: $tabletWidth) {
          height: 100%;
        }
      }
      .plugVideo {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .blackout{
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          height: 2.7rem;
          width: 2.7rem;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
      &:after {
        display: block;
        content: '';
        /* 16:9 aspect ratio */
        padding-bottom: 56.25%;
      }
      video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        // object-fit: cover;
        height: 100%;
        &.detailPage {
          @media (min-width: $tabletWidth) {
            object-fit: contain;
          }
        }
      }
    }
  }
  .parser {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    // display: -webkit-box;
    // line-height: 17px;
    // max-height: 3.2rem;
    // opacity: 0.8;
    @include regular-text;
    // -webkit-line-clamp: 3;
    // -webkit-box-orient: vertical;
  }
  .parserDetail{
    word-break: break-word;
    text-overflow: ellipsis;
    // display: -webkit-box;
    opacity: 0.8;
    @include regular-text;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    p {
      margin: 0 !important;
    }
    ul {
      margin: 0 !important;
      li {
        margin: 0 !important;
      }
    }
  }
  .hatContainer {
    &.detailPage {
      @media (min-width: $tabletWidth) {
        height: 100%;
      }
    }
    .hat {
      width: 100%;
      border: none;
      &.detailPage {
        @media (min-width: $tabletWidth) {
          height: 100%;
        }
      }
    }
  }
  .price {
    color: $fontColorDefault;
    @include regular-text-bold;
    margin-bottom:2rem;
    margin-top: 1rem;
  }
  .buyButton {
    margin-bottom: 2rem;
  }
  .empty {
    width: 100%;
  }
  .socials {
    display: flex;
    width: auto;
    padding: 3rem 0 1rem;
    border-top: .1rem solid rgba(34, 34, 34, 0.1);

    .socialsItem {
    cursor: pointer;
      *+div {
        margin-left: 1rem;
      }
    }
    .socialsItem+.socialsItem{
      margin-left: 3rem;
    }
    div {
      display: flex;
      align-items: center;
    }
    .likeContainer {
      cursor: pointer;
    }
    .commentsButtonContainer {
      width: 2.4rem;
      height: 2.4rem;
      cursor: pointer;
    }
    .commentsSvg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
  .body {
    padding: 1.4rem 1.5rem 2.094rem;
    color: $fontColorDefault;
    @include regular-text;
    width: 100%;
    &.detailPage {
      @media (min-width: $tabletWidth) {
        padding: 3rem;
        overflow-y: overlay;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .title {
      text-decoration: none;
      @include text-style-h2;
    }
    .time {
      color: $fontColorDefault;
      @include regular-text-bold;
      margin-bottom: 1.5rem;
    }
    &__top {
    color: $fontColorDefault;
    word-break: break-word;
      &.detailPage {
        cursor: default;
        @media (min-width: $tabletWidth) {
        }
      }
      cursor: pointer;
      .cardText {
        line-height: 1.7rem;
        p {
          line-height: 2.4rem;
        }
        *+* {
          margin-top: 1.5rem;
        }
      }
      h2 {
        text-decoration-line: underline;
      }
      .authorName{
        margin-bottom: 1.5rem;
        @include regular-text-bold;
        cursor: pointer;
      }
      .goodsCounter {
        margin-bottom: 3rem;
      }
    }
    .cardAudio {
      margin-top: 1.5rem;
      .audioName {
      @include regular-text
      }
    }
    &__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 1.039rem;
      .chip {
        cursor: pointer;
      }
    }
    &__footer {
      margin-top: 2rem;
    }
    .comment {
      margin-left: auto;
    }
    .comments {
      will-change: max-height;
      transition: max-height .5s, opacity .5s, margin-top .5s;
      overflow: hidden;
      opacity: 0;
      &__title {
        color: $fontColorDefault;
        @include regular-text-bold;
        }
      .commentsBox {
        // overflow: hidden;
      }
      .commentsContainer {
        margin-top: 3.5rem;
        will-change: max-height;
      }
    }
    .show {
      opacity: 1;
      margin-top: 3rem;
    }
  }
</style>
