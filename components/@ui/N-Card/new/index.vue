<template>
  <div :class="[$style.card, detailPage && $style.detailPage]">
    <div ref="gallery" :class="[$style.gallery, detailPage && $style.detailPage]">
      <template v-if="data.images.length && !$props.withVideo">
        <template v-if="$props.detailPage && data.images.length > 1">
          <N-Slider :slider-item="data.images" />
        </template>
        <template v-else>
          <div v-if="$props.detailPage" :class="[$style.hatContainer, detailPage && $style.detailPage]">
            <div :class="[$style.hat, detailPage && $style.detailPage]">
              <n-lazy-img :src="`${$axios.defaults.baseURL}${data.images[0].src}`" :alt="data.title" />
            </div>
          </div>
          <nuxt-link v-else :to="`cards/${data.id}?section=${data.section.slug}`" tag="div">
            <div :class="[$style.hat]">
              <n-lazy-img :src="`${$axios.defaults.baseURL}${data.images[0].src}`" :alt="data.title" />
            </div>
          </nuxt-link>
        </template>
      </template>
      <template v-else-if="$props.withVideo">
        <div :class="[$style.wrapperVideo, detailPage && $style.detailPage]" @click="videoPlayingChange">
          <N-Button-Play v-if="!videoPlay" />
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
        $props.withAuthor && $style.author,
        detailPage && $style.detailPage
      ]"
    >
      <template>
        <NuxtLink v-if="!$props.detailPage" :class="$style.body__top" tag="div" :to="`cards/${data.id}?section=${data.section.slug}`">
          <h2 :class="$style.title" :style="{ marginBottom: !$props.detailPage ? '1rem' : '0.5rem' }">
            {{ data.title }}
          </h2>
          <template v-if="$props.detailPage && data.author.length>0">
            <p :class="$style.authorName">
              автор {{ data.author }}
            </p>
          </template>
          <div v-if="data.date_event" :class="$style.time">
            {{ dateFormat }}
          </div>
          <template v-if="data.price && $props.detailPage">
            <div :class="$style.price">
              {{ data.price }}р.
            </div>
            <div :class="$style.buyButton">
              Купить
            </div>
          </template>
          <div v-if="isJsonString" :class="$style.cardText">
            <EditorJsParser v-if="isJsonString" :value="JSON.parse(data.text)" :class="!$props.detailPage && $style.parser" />
          </div>
        </NuxtLink>
        <div v-if="$props.detailPage" ref="body" :class="[$style.body__top, detailPage && $style.detailPage]" tag="div">
          <h2 :class="$style.title" :style="{ marginBottom: !$props.detailPage ? '1rem' : '0.5rem' }">
            {{ data.title }}
          </h2>
          <template v-if="$props.detailPage && data.author.length>0">
            <p :class="$style.authorName">
              автор {{ data.author }}
            </p>
          </template>
          <div v-if="data.date_event" :class="$style.time">
            {{ dateFormat }}
          </div>
          <template v-if="data.price && $props.detailPage">
            <div :class="$style.price">
              {{ data.price }}р.
            </div>
            <template v-if="true">
              <N-Wire />
            </template>
            <template v-else>
              <N-Goods-Counter :class="$style.goodsCounter" />
            </template>
            <N-Button :class="$style.buyButton" background-color="#C83F8E">
              Купить
            </N-Button>
          </template>
          <div v-if="isJsonString" :class="$style.cardText">
            <EditorJsParser v-if="isJsonString" :value="JSON.parse(data.text)" :class="!$props.detailPage && $style.parser" />
          </div>
          <template v-if="data.files && $props.detailPage && !$props.withVideo">
            <div v-for="item in data.files" :key="item.id" :class="$style.cardAudio">
              <!-- <p :class="$style.audioName">
                {{ item.title }}
              </p> -->
              <N-Audio v-if="item.src" :title="item.title" :src="`https://nice.c.roky.rocks/${item.src}`" />
            </div>
            <!-- <LiveRadio /> -->
          </template>
        </div>
        <!-- <div v-if="$props.detailPage && (windowWidth > 900) && !showComments" :class="[$style.empty, detailPage && $style.detailPage]" :style="{ height: emptyBlockHeight + 'px' }" /> -->
      </template>
      <div :class="[$style.body__bottom, detailPage && $style.detailPage]">
        <div v-if="$props.detailPage" :class="$style.body__tags" :style="{ marginTop: $props.detailPage ? '1.5rem' : '' }">
          <N-Chip
            v-for="item in data.tags"
            :key="item.id"
            ref="chipsArray"
            :class="$style.chip"
            @click="$emit('clickTag', item.id)"
          >
            {{ item.title }}
          </N-Chip>
          <N-Chip
            v-if="chipsCounter > 0"
            ref="chipExtra"
            :class="$style.chip"
            @click="extraTagShow()"
          >
            +{{ chipsCounter }}
          </N-Chip>
        </div>
        <div :class="[$style.socials, detailPage && $style.detailPage]" :style="{ marginTop: $props.detailPage ? '3rem' : '2rem' }">
          <div :class="$style.socialsItem">
            <N-Like v-model="like" :class="$style.likeContainer" @click="addLike" />
            <div :class="$style.parser">
              <!-- likeCounter -->
              {{ !$props.detailPage ? '0' : 'Нравится' }}
            </div>
          </div>
          <div v-if="!((windowWidth > 900) && $props.detailPage)" :class="$style.socialsItem" @click="showComments = !showComments; commentHeightSet()">
            <N-Icon name="comments" />
            <div :class="$style.parser">
              {{ !$props.detailPage ? '0' : 'Комментировать' }}
            </div>
          </div>
        </div>
        <div v-if="!$props.detailPage && data.tags.length" :class="$style.body__tags" :style="{ marginTop: !$props.detailPage ? '3rem' : '' }">
          <N-Chip
            v-for="item in data.tags"
            :key="item.id"
            ref="chipsArray"
            :class="$style.chip"
            @click="$emit('clickTag', item.id)"
          >
            {{ item.title }}
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
          <N-Input v-if="true" type="textarea" @smilies="commentHeightSet" />
          <N-Plug v-else @login="login" @registration="registration" />
          <transition name="comments">
            <div v-if="true" :class="$style.commentsContainer">
              <div>
                <N-Comment />
                <N-Comment />
                <N-Comment />
                <N-Comment />
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div v-if="$slots.footer" :class="$style.body__footer">
        <slot name="footer" />
      </div>
    </div>
    <portal to="sliderPopup">
      <N-BootomSheet
        ref="loginMenu"
        :max-width="'450px'"
        effect="fx-slide-from-left"
        @closeMenu="closeMenu"
      >
        <N-Sheet :page="page" />
      </N-BootomSheet>
    </portal>
  </div>
</template>

<script lang="js">
import { computed, nextTick, onMounted, onUnmounted, ref, useContext } from '@nuxtjs/composition-api'
import dataProps from '../props'

export default {
  name: 'NCardNew',
  components: {
  },
  props: { ...dataProps.props },
  setup (props) {
    const videoRef = ref(null)
    const showComments = ref(false)
    const like = ref(props.data.liked)
    const likeCounter = ref(props.data.like_count)
    const chipExtra = ref()
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
    const comments = ref(true)
    const login = () => {
      page.value = 'FormAuthLogin'
      loginMenu.value.$children[0].open()
    }
    const registration = () => {
      page.value = 'FormAuthDefault'
      loginMenu.value.$children[0].open()
    }
    const closeMenu = () => {
      loginMenu.value.$children[0].close()
    }
    const addLike = async () => {
      if (like.value === true) {
        likeCounter.value++
        await store.dispatch('like/addLike', props.data.id)
      } else {
        likeCounter.value--
        await store.dispatch('like/removeLike', props.data.id)
      }
    }
    const videoPlayingChange = () => {
      videoPlay.value = !videoPlay.value
      if (videoRef.value.paused === true) {
        videoRef.value.play()
      } else {
        videoRef.value.pause()
      }
    }
    const isJsonString = computed(() => {
      try {
        JSON.parse(props?.data?.text)
      } catch (e) {
        return false
      }
      return true
    })
    const videoUrl = ref()
    const commentHeightSet = () => {
      if (props.detailPage === true) {
        setTimeout(() => {
          commentHeight.value = commentBox.value.scrollHeight + 'px'
          console.log(commentHeight.value)
        }, 0)
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
      windowWidthCount()
      if (windowWidth.value > 900) {
        showComments.value = true
      }
      extraTagHide()
      commentHeightSet()
      comments.value = false
      window.addEventListener('resize', windowWidthCount)
      window.addEventListener('resize', commentHeightSet)
      nextTick(() => {
        if (props.withVideo) {
          videoUrl.value = `${$axios.defaults.baseURL}/${props.data?.files[0]?.src}`
          videoRef.value.src = `${$axios.defaults.baseURL}/${props.data?.files[0]?.src}`
          videoRef.value.load()
        }
      })
    })
    onUnmounted(() => {
      window.addEventListener('resize', windowWidthCount)
      window.addEventListener('resize', commentHeightSet)
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
      comments,
      videoRef,
      commentHeightSet,
      extraTagHide,
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
      closeMenu,
      page
    }
  }
}
</script>
<style lang="scss" module>
  .card {
    background-color: $white;
    //width: 36rem;
    height: fit-content;
    width: 100%;
    border-radius: 2rem;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    &.detailPage {
      @media (min-width: $tabletWidth) {
        width: 114rem;
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
    .socialsItem {
      *+div {
        margin-left: 1rem;
      }
    }
    .socialsItem+.socialsItem{
      margin-left: 3rem;
    }
    &.detailPage {
      @media (min-width: $tabletWidth) {
        padding-top: 3.094rem;
        border-top: .1rem solid rgba(34, 34, 34, 0.1);
        margin-top: 3rem;
      }
    }
    div {
      display: flex;
      align-items: center;
    }
    .likeContainer {
      cursor: pointer;
    }
    .commentsContainer {
      cursor: pointer;
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
    &.author {
      padding: .8rem 1rem 1.3rem;
      p {
        opacity: .4;
        color: $fontColorDefault;
        font-weight: 600;
        @include text-md;
        @include montserratSemiBold;
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
          margin-top: 15px;
        }
      }
      h2 {
        text-decoration-line: underline;
        font-weight: 600;
        @include text;
      }
      p {
        //margin-top: 1.03rem;
        @include text-md;
      }
      .authorName{
        margin-bottom: 1.5rem;
        @include regular-text-bold
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
      margin-top: 3rem;
    }
    .comment {
      margin-left: auto;
    }
    .comments {
      transition: all .6s;
      // overflow: hidden;
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
      margin-top: 2.094rem;
    }
  }
</style>
