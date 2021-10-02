import { Ref, ref } from 'vue-demi'
import { tryOnMounted } from '../../shared/tryOnMounted'
import { useEventListener } from '../useEventListener'
import { ConfigurableWindow, defaultWindow } from '../_configurable'

/**
 * Reactively track window focus with `window.onfocus` and `window.onblur`.
 *
 * @see https://vueuse.org/useWindowFocus
 * @param options
 */
export function useWindowFocus({ window = defaultWindow }: ConfigurableWindow = {}): Ref<boolean> {
  if (!window)
    return ref(false)

  const focused = ref(window.document.hasFocus())

  const updateState = (state?: boolean) => {
    focused.value = state ?? window.document.hasFocus()
  }

  tryOnMounted(updateState)
  useEventListener(window, 'blur', () => updateState(false))
  useEventListener(window, 'focus', () => updateState(true))

  return focused
}
