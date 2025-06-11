// /plugins/v-intersect.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('intersect', {
    mounted(el, binding) {
      const direction = binding.value?.direction || 'left'
      let offset = 60
      if (window.innerWidth < 768) offset = 80
      if (binding.value?.distance) offset = binding.value.distance

      // ①必ず初期位置
      if (direction === 'left') el.style.transform = `translateX(-${offset}%)`
      else if (direction === 'right') el.style.transform = `translateX(${offset}%)`
      el.style.opacity = '0'
      el.style.transition = 'all 0.3s'

      // ②Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transform = 'translateX(0%)'
              el.style.opacity = '1'
            }, 100)
            if (binding.value?.once !== false) observer.disconnect()
          } else if (!binding.value?.once) {
            if (direction === 'left') el.style.transform = `translateX(-${offset}%)`
            else if (direction === 'right') el.style.transform = `translateX(${offset}%)`
          }
        })
      }, {
        threshold: binding.value?.threshold ?? 0
      })
      observer.observe(el)
      el._observer = observer
    },
    unmounted(el) {
      if (el._observer) el._observer.disconnect()
    }
  })
})
