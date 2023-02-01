export default function namedHexColor(hexColor: string) {
  switch (hexColor) {
    case '#ff6900':
      return 'orange';
    case '#fcb900':
      return 'merigold';
    case '#ffeb3b':
      return 'yellow';
    case '#8ed1fc':
      return 'softblue';
    case '#0693e3':
      return 'blue';
    case '#eb144c':
      return 'red';
    case '#f78da7':
      return 'pink';
    case '#9900ef':
      return 'purple';
    case '#795548':
      return 'brown';
    default:
      return 'primary';
  }
}
