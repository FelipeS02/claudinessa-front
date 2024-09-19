import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <Link
      className='flex items-center text-base gap-1 transition-colors text-neutral-400 max-lg:px-2 max-lg:text-foreground lg:hover:text-foreground'
      href={'/productos'}
      replace={true}
    >
      <ArrowLeft size={18} /> Volver al listado
    </Link>
  );
};

export default BackButton;
