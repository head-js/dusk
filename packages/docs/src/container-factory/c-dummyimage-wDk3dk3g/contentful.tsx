import type { DuskContainer } from '../../types/dusk.types';
import WidgetImage from './widget-image';


export default function Contentful({ slots }: DuskContainer) {
  return <WidgetImage {...slots} />;
}
