import Map from '@/components/Map/Map';
import PositionButton from '@/components/Map/PositionButton';
import { Store } from 'lucide-react';

const PickUp = () => {
  const DEFAULT_CENTER = [-34.787859813247074, -58.16018067727867];

  return (
    <div className='flex flex-col gap-3 h-[--_form-height]'>
      <Map
        className='grow w-full z-0'
        width={200}
        height={300}
        center={DEFAULT_CENTER}
        zoom={50}
      >
        {({ TileLayer, Marker }, _l, layer) => (
          <>
            <TileLayer url={layer} />
            <Marker position={DEFAULT_CENTER} />
            <PositionButton />
          </>
        )}
      </Map>
      <div className='flex flex-col'>
        <span className='flex items-center gap-1 font-medium leading-none'>
          <Store size={20} />
          La Nueva Claudinessa
        </span>

        <span className='flex items-center gap-0.5 text-secondary text-sm font-light'>
          Av. Otto Bemberg 5990
        </span>
      </div>
    </div>
  );
};

export default PickUp;
