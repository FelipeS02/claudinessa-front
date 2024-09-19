'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Skeleton } from '@/components/ui/Skeleton';

const RenderShipments = ({
  shipments,
  value,
  setValue,
  setOpen,
  handleChange,
}) => {
  if (!shipments || shipments.lenght === 0) {
    return (
      <div className='flex flex-col gap-4 p-4'>
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-full' />
        <Skeleton className='h-5 w-full' />
      </div>
    );
  }

  const onSelect = (value) => {
    setValue(value);
    handleChange(value);
    setOpen(false);
  };

  return (
    <Command>
      <CommandInput placeholder='Buscar por zona...' />
      <CommandEmpty>No se encontro la zona.</CommandEmpty>
      <CommandGroup>
        {shipments.map((s) => (
          <CommandItem
            key={s.value}
            value={s.value}
            onSelect={() => onSelect(s.value)}
          >
            <Check
              className={cn(
                'mr-2 h-4 w-4',
                value === s.value ? 'opacity-100' : 'opacity-0'
              )}
            />
            {s.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
};

const ShipmentsSelect = ({
  shipments,
  handleChange, // used to update the state of the parent component
  className,
}) => {
  const [open, setOpen] = useState(false);
  // Update the selector visual state
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen} className='relative'>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(className, 'justify-between')}
        >
          <span className='whitespace-nowrap overflow-hidden text-foreground text-ellipsis'>
            {value
              ? shipments?.find((s) => s.value === value)?.label
              : 'Selecciona una zona'}
          </span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <RenderShipments
          shipments={shipments}
          value={value}
          handleChange={handleChange}
          setValue={setValue}
          setOpen={setOpen}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ShipmentsSelect;
