import { ref } from '@nuxtjs/composition-api'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const animation = ($gsap, Elastic) => {
  const TRIGGER = '.content'
  const scrollBackground = ref('')
  $gsap.registerPlugin(ScrollTrigger)

  const killTrigger = () => {
    console.log(1212, scrollBackground)
  }

  const background = ref(null)
  const animationTimeline = (NAVBAR = '.navbar') => {
    const LOGO = '.logo_image'
    const LOGO_WRAPPER = '.logo'
    const HEADER = '.header'
    const SUBTITLE = '.subtitleLogo'
    const CONTENT = '.content'
    const body = document.body
    const onComplete = () => {
      let timing = 0.3
      // $gsap.set(LOGO_WRAPPER, { clearProps: 'all', transform: 'translate(-50%, 0)' })
      $gsap.set(LOGO_WRAPPER, { className: 'logoTop' }, 'start')
      $gsap.to(
        HEADER, {
          opacity: 1,
          duration: 0.5,
          delay: 0.35,
          ease: 'cubic-bezier(.71,.01,.15,1)'
        })
      const nav = document.querySelectorAll(`${NAVBAR} > ul > li`)

      $gsap.fromTo(
        `${NAVBAR} > ul > li`,
        nav.length * 0.12,
        {
          visibility: 'visible',
          opacity: 0,
          x: (index) => {
            return ((index + 1) * 500)
          }
        },
        {
          opacity: 1,
          x: 0,
          delay: () => {
            timing += 0.015
            return timing
          },
          duration: 0.3,
          ease: Elastic.easeOut.config(1, 0.75)
        })

      $gsap.fromTo(
        CONTENT,
        {
          y: '+=300',
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: 'cubic-bezier(.71,.01,.15,1)'
        })

      const timelineLogo = $gsap.timeline()

      timelineLogo.set(LOGO, {
        'clip-path': 'polygon(0 0, 98% 0, 100% 0, 0 0)'
      })
      timelineLogo.set(SUBTITLE, {
        'clip-path': 'polygon(0 0, 98% 0, 100% 0, 0 0)'
      })
      timelineLogo.to(LOGO, {
        'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        duration: 0.3,
        delay: 0.3,
        ease: 'cubic-bezier(.71,.01,.15,1)'
      })
      timelineLogo.to(SUBTITLE, {
        'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        duration: 0.3
      })
      $gsap.set(body, { overflow: 'auto' }, 'start')
    }

    const tl = $gsap.timeline({
      onComplete
    })

    $gsap.to('.background',
      {
        scale: 1,
        duration: 2.5,
        delay: 0.1,
        ease: 'cubic-bezier(.71,.01,.15,1)'
      }
    )
    $gsap.set(body, { overflow: 'hidden' }, 'start')
    tl.set(LOGO_WRAPPER, {
      visibility: 'visible'
    })
    tl.set(LOGO, {
      'clip-path': 'polygon(0 0, 98% 0, 100% 0, 0 0)'
    })
    tl.set(SUBTITLE, {
      'clip-path': 'polygon(0 0, 98% 0, 100% 0, 0 0)'
    })
    tl.to(LOGO, {
      'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      duration: 0.3,
      delay: 1,
      ease: 'cubic-bezier(.71,.01,.15,1)'
    })
    tl.to(SUBTITLE, {
      'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      duration: 0.3
    })
    tl.to(LOGO, {
    'clip-path': 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      duration: 0.3,
      ease: 'cubic-bezier(.71,.01,.15,1)'
    })
    tl.to(SUBTITLE, {
      'clip-path': 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      duration: 0.3
    })
  }
  const getConntetDomElementBounding = () => {
    const element = document.querySelector(TRIGGER)
    if (element) {
      return element.getBoundingClientRect()
    }
    return false
  }

  const animationlogo = () => {
    const logo = document.querySelector('.logo')
    const header = document.querySelector('.header')
    const headerBounding = header.getBoundingClientRect().top
    const top = getConntetDomElementBounding().top
    if (!top) { return }
    ScrollTrigger.matchMedia({
      '(max-width: 450px)' () {
        const tl = $gsap.timeline({
          scrollTrigger: {
            trigger: TRIGGER,
            // start: () => `top ${top}px`,
            start: 10,
            end: () => `top ${headerBounding}`,
            scrub: true
            // markers: true,
          },
          force3D: true
        })
        tl.to('.logo', {
          y: () => {
            return (logo.getBoundingClientRect().top) * -1
          },
          scale: 0.6
        })
      }
    })
  }
  const animateSubtitle = () => {
    const top = getConntetDomElementBounding().top
    if (!top) { return }

    $gsap.to('.subtitleLogo', {
      scrollTrigger: {
        trigger: TRIGGER,
        // start: () => `top ${top}px`,
        start: 10,
        end: () => 100,
        scrub: true
      },
      opacity: 0
    })
  }

  const animateNavbar = (selector = '.navbar') => {
    const top = getConntetDomElementBounding().top
    if (!top) { return }

    $gsap.to(selector, {
      scrollTrigger: {
        trigger: TRIGGER,
        // start: `top ${top}`,
        start: 10,
        end: 100,
        scrub: true
      },
      y: -60,
      opacity: 0
    })
  }

  const animateBackground = () => {
    const height = ref(window.innerHeight / 10)
    console.log(height)
    // $gsap.to('.background',
    //   {
    //     scrollTrigger: {
    //       scrub: true
    //     },
    //     backgroundPosition: `0 ${height.value}px`,
    //     ease: 'none',
    //     force3D: true
    //   })
  }

  return {
    background,
    animationlogo,
    animateSubtitle,
    animateBackground,
    animateNavbar,
    animationTimeline,
    killTrigger
  }
}
export default animation
