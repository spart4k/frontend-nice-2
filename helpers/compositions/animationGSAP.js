import { ref } from '@nuxtjs/composition-api'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const animation = ($gsap, Elastic) => {
  const TRIGGER = '.content'
  $gsap.registerPlugin(ScrollTrigger)

  const background = ref(null)
  const animationTimeline = () => {
    const LOGO = '.logo_image'
    const LOGO_WRAPPER = '.logo'
    const HEADER = '.header'
    const SUBTITLE = '.subtitleLogo'
    const NAVBAR = '.navbar'
    const CONTENT = '.content'
    const body = document.body
    const onComplete = () => {
      // $gsap.set(LOGO_WRAPPER, { clearProps: 'all', transform: 'translate(-50%, 0)' })
      $gsap.set(LOGO_WRAPPER, { className: 'logoTop' }, 'start')
      $gsap.to(
        HEADER, {
          opacity: 1,
          duration: 0.5
        })

      $gsap.fromTo(
        NAVBAR,
        {
          x: 100,
          visibility: 'visible'
        },
        {
          x: '0',
          duration: 0.2
        }
        )

      $gsap.fromTo(
        `${NAVBAR} > ul > li`,
        1.2,
        {
          x: (index) => {
            return -(index * 110)
          }
        },
        {
          x: 0,
          ease: Elastic.easeOut.config(1, 0.3)
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
          delay: 1.2
        })

      const timelineLogo = $gsap.timeline()

      timelineLogo.fromTo(LOGO,
        {
          y: '-100%'
        },
        {
          y: 0,
          duration: 0.6
        }
      )
      timelineLogo.fromTo(SUBTITLE,
        {
          y: '-100%'
        },
        {
          y: 0,
          duration: 0.6
        }
      )
      $gsap.set(body, { overflow: 'auto' }, 'start')
    }

    const tl = $gsap.timeline({
      onComplete
    })
    const tlBackground = $gsap.timeline()

    tlBackground.fromTo(background.value,
      {
        scale: 1.2
      },
      {
        scale: 1,
        duration: 3.5
      }
    )

    $gsap.set(body, { overflow: 'hidden' }, 'start')

    tl.to(LOGO, {
      y: 0,
      duration: 0.3,
      delay: 0.3
    })
    tl.to(SUBTITLE, {
      y: 0,
      duration: 0.3
    })
    tl.to(LOGO, {
      y: () => '100%',
      duration: 0.3
    })
    tl.to(SUBTITLE, {
      y: '100%',
      duration: 0.3
    })
  }

  const animationlogo = (logo, contentBounding) => {
    const header = document.querySelector('.header')
    const headerBounding = header.getBoundingClientRect().top
    const top = contentBounding.getBoundingClientRect().top
    ScrollTrigger.matchMedia({
      '(max-width: 900px)' () {
        const tl = $gsap.timeline({
          scrollTrigger: {
            trigger: TRIGGER,
            start: () => `top ${top}px`,
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
  const animateSubtitle = (contentBounding) => {
    const top = contentBounding.getBoundingClientRect().top
    $gsap.to('.subtitleLogo', {
      scrollTrigger: {
        trigger: TRIGGER,
        start: () => `top ${top}px`,
        end: () => 100,
        scrub: true,
        markers: true
      },
      opacity: 0
    })
  }

  const animateNavbar = (contentBounding) => {
    const top = contentBounding.getBoundingClientRect().top
    $gsap.to('.navbar', {
      scrollTrigger: {
        trigger: TRIGGER,
        start: `top ${top}`,
        end: 100,
        scrub: true
      },
      y: -60,
      opacity: 0
    })
  }

  const animateBackground = () => {
    $gsap.to(background.value?.$el,
      {
        backgroundPosition: '0 -200%',
        // scale: 1.2,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          scrub: true
        }
      })
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
