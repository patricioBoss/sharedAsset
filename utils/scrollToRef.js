export default function (ref) {
  return window.scrollTo(0, ref.current.offsetTop || ref.current.wrapperEl.offsetTop);
}
