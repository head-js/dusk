import type { DuskContainer } from '../../types/dusk.types';
import { Image } from 'antd';


export default function WidgetImage(props: DuskContainer['slots']) {
  const src = props.src || 'https://dummyimage.com/375x230/cccccc/ffffff.png?text=fallback';
  const blur = `${src}?x-oss-process=image/blur`;

  return (
    <Image src={src} preview={false} width="100%"
      placeholder={<Image src={blur} preview={false} width="100%" />}
    />);
}
