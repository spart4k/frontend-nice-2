import { ref } from '@nuxtjs/composition-api'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const animation = ($gsap, Elastic) => {
  const TRIGGER = '.content'
  $gsap.registerPlugin(ScrollTrigger)

  const background = ref(null)
  const animationTimeline = (NAVBAR = '.navbar', elementAnimate, display) => {
    const onComplete = (a, v) => {
      document.querySelector('.logo').classList.add('animationEnd')
    }
    const tl = $gsap.timeline({
      delay: 1,
      onComplete
    })
    const SUBTITLE = '.subtitleLogo'
    const backgroundElement = document.querySelector('.background')
    const logo = document.querySelector('.logo')
    const nav = document.querySelectorAll(`${NAVBAR} > ul > li`)
    const content = document.querySelector('.content')

    tl.set(logo, {
      scale: 0
    })

    tl.to(logo, {
      scale: 5
    })

    tl.to(logo, 0.3, {
      scale: 0.5,
      top: '-=35%',
      ease: 'cubic-bezier(.71,.01,.15,1)'
    })

    $gsap.to(backgroundElement, 4, {
      scale: 1,
      delay: 1
      // ease: Elastic.easeOut.config(11,0.3)
    }, '-=0.3')

    $gsap.to(elementAnimate, {
      x: () => {
        return '100vw'
      },
      delay: (index) => {
        return $gsap.utils.random(0.5, index * 0.05, 0.1)
      },
      duration: (index) => {
        return $gsap.utils.random(0.5, index * 0.13, 0.1)
      },
      ease: 'cubic-bezier(.71,.01,.15,1)'
    }, '-=3.7')

    tl.to(logo, 0.4, {
      keyframes: {
        scale: [0.5, 1.2, 1]
      }
    })

    tl.to(logo, 0.5, {
      top: display === 'sm' ? '7.9rem' : '2.9rem',
      ease: 'cubic-bezier(.71,.01,.15,1)'
    }, '-=0.5')

    tl.to(SUBTITLE, {
      opacity: 1
    })

    let timing = 0.3 - 0.015

    tl.fromTo(
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

      tl.fromTo(
        content,
        0.6,
        {
          y: 370,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5
          // ease: 'cubic-bezier(.71,.01,.15,1)'
        }, '-=1')
  }
  const getConntetDomElementBounding = () => {
    const element = document.querySelector(TRIGGER)
    if (element) {
      return element.getBoundingClientRect()
    }
    return false
  }

  const animationlogo = () => {
    ScrollTrigger.matchMedia({
      '(max-width: 450px)' () {
        const tl = $gsap.timeline({
          scrollTrigger: {
            trigger: TRIGGER,
            start: 10,
            end: () => 'top +=50',
            scrub: true,
            markers: true
          },
          force3D: true
        })
        tl.to('.logo', {
          top: '1rem',
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
      }
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
    // const height = ref(window.innerHeight / 10)
    // console.log(height)
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
    animationTimeline
  }
}
export default animation
