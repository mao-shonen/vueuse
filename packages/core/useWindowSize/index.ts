import { ref } from 'vue-demi'
import { tryOnMounted } from '../../shared/tryOnMounted'
import { useEventListener } from '../useEventListener'
import { ConfigurableWindow, defaultWindow } from '../_configurable'

export interface WindowSizeOptions extends ConfigurableWindow {
  initialWidth?: number
  initialHeight?: number
}

/**
 * Reactive window size.
 *
 * @see https://vueuse.org/useWindowSize
 * @param options
 */
export function useWindowSize({ window = defaultWindow, initialWidth = Infinity, initialHeight = Infinity }: WindowSizeOptions = {}) {
  if (!window) {
    return {
      width: ref(initialWidth),
      height: ref(initialHeight),
    }
  }
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const updateSize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  tryOnMounted(updateSize)
  useEventListener(window, 'resize', updateSize, { passive: true })

  return { width, height }
}

export type UseWindowSizeReturn = ReturnType<typeof useWindowSize>
