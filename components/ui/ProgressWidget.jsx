'use client';

import { useEffect, useRef, useState } from 'react';
import { MoveDown, MoveUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const onScroll = (el, setScrolled) => {
  const winScroll = el.scrollTop;

  const height = el.scrollHeight - el.clientHeight;

  const scrolled = (winScroll / height) * 100;

  if (scrolled >= 20) return setScrolled(true);
  return setScrolled(false);
};

const scrollTop = (el) => {
  el.scrollTo({ top: 0, behavior: 'smooth' });
};

// Id of the scrollable element document scroll by default
const ProgressWidget = ({ id }) => {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = id ? document.getElementById(id) : document;

    if (el) {
      ref.current = el;
      el.addEventListener('scroll', () => onScroll(el, setScrolled));
      return () =>
        el.removeEventListener('scroll', () => onScroll(el, setScrolled));
    }
  }, [id]);

  return (
    <div
      className={cn(
        'rounded-full  bg-brand fixed bottom-5 left-5 p-3',
        scrolled
          ? 'hover:scale-105 hover:cursor-pointer animate-slide-in'
          : 'animate-slide-out'
      )}
      onClick={scrolled ? () => scrollTop(ref.current) : null}
    >
      {scrolled ? (
        <MoveUp size={30} color='white' className='animate-appear' />
      ) : (
        <MoveDown size={30} color='white' className='animate-appear' />
      )}
    </div>
  );
};

export default ProgressWidget;
