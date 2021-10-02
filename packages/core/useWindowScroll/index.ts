import { ref } from 'vue-demi'
import { tryOnMounted } from '../../shared/tryOnMounted'
import { useEventListener } from '../useEventListener'
import { ConfigurableWindow, defaultWindow } from '../_configurable'

/**
 * Reactive window scroll.
 *
 * @see https://vueuse.org/useWindowScroll
 * @param options
 */
export function useWindowScroll({ window = defaultWindow }: ConfigurableWindow = {}) {
  if (!window) {
    return {
      x: ref(0),
      y: ref(0),
    }
  }

  const x = ref(window.pageXOffset)
  const y = ref(window.pageYOffset)

  const updateScroll = () => {
    x.value = window.pageXOffset
    y.value = window.pageYOffset
  }

  tryOnMounted(updateScroll)
  useEventListener(window, 'scroll', updateScroll,
    {
      capture: false,
      passive: true,
    },
  )

  return { x, y }
}

export type UseWindowScrollReturn = ReturnType<typeof useWindowScroll>
