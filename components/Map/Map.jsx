import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const Map = ({ height, width, className, ...props }) => {
  const w = width || DEFAULT_WIDTH;
  const h = height || DEFAULT_HEIGHT;
  
  return (
    <div className={cn(className, `aspect-[${w}/${h}]`)}>
      <DynamicMap {...props} />
    </div>
  );
};

export default Map;
