type ClickOutsideOptions = {
  ignore?: string | string[];
  forceInclude?: string | string[];
};

export function clickOutside(node: HTMLElement, options?: ClickOutsideOptions) {
  const exclude: string[] = options?.ignore
    ? Array.isArray(options.ignore)
      ? options.ignore
      : [options.ignore]
    : [];
  const include: string[] = options?.forceInclude
    ? Array.isArray(options.forceInclude)
      ? options.forceInclude
      : [options.forceInclude]
    : [];

  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const foundToInclude = include.some((selector) => target.closest(selector));
    const foundToExclude = exclude.some((selector) => target.closest(selector));

    if (!node || event.defaultPrevented) return;

    if ((!event.target || foundToExclude) && !foundToInclude) {
      return;
    }
    if (!node.contains(target) || foundToInclude) {
      node.dispatchEvent(new CustomEvent('click_outside'));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
