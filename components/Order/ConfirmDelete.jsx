'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogHeader,
} from '../ui/AlertDialog';
import { Info, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ConfirmDelete = ({ open, setOpen, onDelete }) => {
  const router = useRouter();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    router.push('/productos');
    onDelete();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className='flex flex-col justify-center items-center'>
        <Info size={140} className='text-brand' />

        <AlertDialogHeader className='items-center space-y-1'>
          <AlertDialogTitle className='tracking-wide'>
            ¡Solo queda un producto en tu orden!
          </AlertDialogTitle>
          <AlertDialogDescription>
            Todavía no vendemos humo... o si?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleCancel}
            className='flex items-center gap-1'
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className='flex items-center gap-1'
          >
            <Trash2 size={16} />
            Eliminar y volver a la carta
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
