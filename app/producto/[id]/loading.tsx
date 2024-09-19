import Logo from '@/public/images/minlogo.webp';
import Image from 'next/image';

const loading = () => {
  return (
    <div className='size-screen flex justify-center items-center bg-layout'>
      <Image
        src={Logo}
        width={200}
        height={200}
        alt='loader-logo'
        className='animate-ping size-28'
      />
    </div>
  );
};

export default loading;
