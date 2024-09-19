'use client';
import { ArrowLeft } from 'lucide-react';

const CloseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      after='Volver al listado'
      className={
        'bg-primary items-center rounded-lg p-2 gap-1 flex text-base cursor-pointer text-foreground md:after:content-[attr(after)] '
      }
    >
      <ArrowLeft size={'1.5em'} />
    </button>
  );
};

export default CloseButton;
