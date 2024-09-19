import { ReactNode } from 'react';

export default function ProductDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className='container bg-layout-secondary'>{children}</div>;
}
