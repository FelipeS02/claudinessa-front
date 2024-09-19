import Header from '@/components/Layout/Header';
import MenuLayout from '@/components/Layout/Menu/MenuLayout';

export default function ProductsLayout({ children }) {
  return (
    <div className='flex flex-col w-full overflow-hidden max-h-auto lg:max-h-screen'>
      <Header />
      <MenuLayout>{children}</MenuLayout>
    </div>
  );
}
