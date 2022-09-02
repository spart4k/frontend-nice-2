<template>
  <div :class="[$style.card, detailPage && $style.detailPage]">
    <div ref="gallery" :class="[$style.gallery, detailPage && $style.detailPage]">
      <template v-if="data.files.length && !$props.withVideo">
        <template v-if="$props.detailPage && data.files.length > 1">
          <N-Slider :slider-item="data.files" />
        </template>
        <template v-else>
          <div v-if="$props.detailPage" :class="[$style.hatContainer, detailPage && $style.detailPage]">
            <div :class="[$style.hat, detailPage && $style.detailPage]">
              <n-lazy-img :detail-page="detailPage" :src="`${$axios.defaults.baseURL}${data.files[0].src}`" :alt="data.title" />
            </div>
          </div>
          <nuxt-link v-else :to="`cards/${data.id}?section=${data.slug}`" tag="div">
            <div :class="[$style.hat]">
              <n-lazy-img :detail-page="detailPage" :src="`${$axios.defaults.baseURL}${data.files[0].src}`" :alt="data.title" />
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
          <video
            ref="videoRef"
            :class="detailPage && $style.detailPage"
            playsinline
            :controls="videoPlay"
            muted
            type="video/mp4"
          >
            <source :src="videoUrl" type="video/ogg; codecs=&quot;theora, vorbis&quot;">
          </video>
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
        <NuxtLink v-if="!$props.detailPage" :class="$style.body__top" tag="div" :to="`cards/${data.id}?section=${data.section.slug}`">
          <h2 :class="$style.title" :style="{ marginBottom: !$props.detailPage ? '1rem' : '0.5rem' }">
            {{ data.title }}
          </h2>
          <div v-if="data.date_event" :class="$style.time">
            {{ dateFormat }}
          </div>
          <!-- <div v-if="isJsonString" :class="$style.cardText">
            <EditorJsParser v-if="isJsonString" :value="JSON.parse(data.text)" :class="!$props.detailPage && $style.parser" />
          </div> -->
          <!-- {{ data.text }} -->
          <div :class="$style.cardText">
            <div :class="$style.parser" v-html="data.text" />
          </div>
          <div v-if="!$props.detailPage" :class="[$style.socials, detailPage && $style.detailPage]" :style="{marginTop: $props.detailPage ? '3rem' : '2rem', borderTop: $props.detailPage ? '.1rem solid rgba(34, 34, 34, 0.1)' : 'none', padding: $props.detailPage ? '3rem 0 1rem' : '0 0 1rem'}">
            <div :class="$style.socialsItem">
              <N-Like v-model="like" :class="$style.likeContainer" :value="like" />
              <div :class="$style.parser">
                {{ data.like_count }}
              </div>
            </div>
            <div v-if="!((windowWidth > 900) && $props.detailPage)" :class="$style.socialsItem" @click="showComments = !showComments; commentHeightSet">
              <N-Icon name="comments" :class="$style.commentsContainer" />
              <div :class="$style.parser">
                {{ !$props.detailPage ? data.comments_count : 'Комментировать' }}
              </div>
            </div>
          </div>
        </NuxtLink>
        <div v-if="$props.detailPage" ref="body" :class="[$style.body__top, detailPage && $style.detailPage]" tag="div">
          <h2 :class="$style.title" :style="{ marginBottom: !$props.detailPage ? '1rem' : '0.5rem' }">
            {{ data.title }}
          </h2>
          <template v-if="$props.detailPage">
            <p :class="$style.authorName">
              автор {{ data.author.user.nickname }}
            </p>
          </template>
          <div v-if="data.date_event" :class="$style.time">
            {{ dateFormat }}
          </div>
          <template v-if="data.price && $props.detailPage">
            <n-loading v-if="priceLoading" :class="$style.loading" purple />
            <div v-else :class="$style.price">
              {{ data.type.name === 'Wire' && $props.detailPage ? wirePrice : totalPrice*itemCounter }}р.
            </div>
            <template v-if="data.type.name === 'Wire'">
              <N-Purchase-Wire :colors="JSON.parse(data.type.blueprint).color" :card_id="data.id" @changeTotalPrice="changeTotalPrice" />
            </template>
            <template v-else>
              <N-Purchase :card_id="data.id" @changeTotalPrice="changeTotalPrice" />
            </template>
          </template>
          <!-- <div v-if="isJsonString" :class="$style.cardText">
            <EditorJsParser v-if="isJsonString" :value="JSON.parse(data.text)" :class="!$props.detailPage && $style.parser" />
          </div> -->
          <div :class="$style.cardText">
            <div :class="$style.parser" v-html="data.text" />
          </div>
          <template>
            <div v-for="item in data.files" :key="item.id" :class="$style.cardAudio">
              <N-Audio v-if="item.file_type_id === 3" :title="item.title" :src="`${$axios.defaults.baseURL}${item.src}`" />
            </div>
          </template>
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
        <div
          v-if="$props.detailPage"
          ref="commentBox"
          :class="[$style.comments,showComments ? $style.show : '']"
          :style="{maxHeight: showComments ? commentHeight : '0'}"
        >
          <N-Input v-if="$store.state.authentication.authorizated" type="textarea" @smilies="commentHeightSet" @sendSticker="sendSticker" @sendMessage="sendComment" />
          <N-Plug v-else @login="login" @registration="registration" />
          <div v-if="comments" :class="$style.commentsContainer">
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
import { computed, nextTick, onMounted, onUnmounted, ref, useContext, useAsync } from '@nuxtjs/composition-api'
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
    const totalPrice = ref(props.data.price)
    const wirePrice = ref(0)
    const priceLoading = ref(false)
    const itemCounter = ref(1)
    const login = () => {
      store.commit('menu/changeKeyMenu', {
        key: 'registration',
        effect: 'fx-slide-from-left'
      })
      store.commit('menu/changeStepMenu', { step: 2 })
      store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
    }
    const registration = () => {
      store.commit('menu/changeKeyMenu', {
        key: 'registration',
        effect: 'fx-slide-from-left'
      })
      store.commit('menu/changeStepMenu', { step: 1 })
      store.commit('menu/changeShowStateBottomSheetMenu', { value: true })
    }
    const addLike = async () => {
      like.value = !like.value
      if (like.value === true) {
        likeCounter.value++
        await store.dispatch('socials/addLike', props.data.id)
      } else {
        likeCounter.value--
        await store.dispatch('socials/removeLike', props.data.id)
      }
    }
    const sendComment = async (val) => {
      const commentData = {
        card_id: props.data.id,
        text: unescape(encodeURIComponent(val)),
        sticker_id: null
      }
      const result = await store.dispatch('socials/addComment', commentData)
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
    const changeTotalPrice = (val) => {
      if (props.data.type.name === 'Wire') {
        if (val.length && val.count) {
          useAsync(async () => {
            try {
                priceLoading.value = true
                const responseCount = await store.dispatch('shop/getPrice', val)
                wirePrice.value = responseCount.data
                priceLoading.value = false
            } catch (e) {
              console.log(e)
            }
          })
        } else {
          wirePrice.value = 0
        }
      } else {
        itemCounter.value = val
      }
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
          videoUrl.value = `${$axios.defaults.baseURL}/${props.data?.files[0]?.src}`
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
      return props.data.date_event?.replace(/:(\w+)/, '')?.replace(/\s/, ' / ') ?? ''
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
      login,
      registration,
      loginMenu,
      sendComment,
      sendSticker,
      totalPrice,
      wirePrice,
      changeTotalPrice,
      priceLoading,
      itemCounter,
      page
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
      width: 100%;
      &.detailPage {
        @media (min-width: $tabletWidth) {
          height: 100%;
        }
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
        object-fit: cover;
        height: 100%;
        &.detailPage {
          @media (min-width: $tabletWidth) {
            object-fit: contain;
          }
        }
      }
    }
    //video {
    //  width: calc(100% + 2px);
    //  margin-left: -1px;
    //  height: 100%;
    //  max-height: 24rem;
    //}
  }
  .parser {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    // line-height: 17px;
    max-height: 3.4rem;
    opacity: 0.8;
    @include regular-text;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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
    .commentsContainer {
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
      @include regular-text-small;
      margin-bottom: .8rem;
    }
    &__top {
    word-break: break-word;
      &.detailPage {
        @media (min-width: $tabletWidth) {
        }
      }
      cursor: pointer;
      .cardText {
        p {
          line-height: 1.7rem;
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
        @include regular-text-bold
      }
      .goodsCounter {
        margin-bottom: 3rem;
      }
      .loading {
        display: block;
        width: 2rem;
        height: 2rem;
        margin-bottom: 1.5rem;
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
      transition: all .5s;
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
      }
    }
    .show {
      opacity: 1;
      margin-top: 3rem;
    }
  }
</style>
