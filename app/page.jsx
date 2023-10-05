import Image from 'next/image';
import Logo from '../public/images/logo.png';
import Milanesa from '../public/images/milanesas.jpg';
import Empanadas from '../public/images/empanadas.jpg';
import Burger from '../public/images/burger.jpg';

import styles from './page.module.css';
import Text from '@/components/Text/Text';
import textTypes from '@/components/Text/textTypes';
import LinkButton from '@/components/Button/LinkButton';

const Header = () => {
  return (
    <>
      <header className={`f-centered underline ${styles.header}`}>
        <Image
          src={Logo}
          alt='logo'
          width={400}
          quality={60}
          style={{ height: 'auto', width: '70%', maxWidth: '400px' }}
        />
      </header>
      <section className={`f-centered underline ${styles.section}`}>
        <Text type={textTypes.productName} color={'brand'}>
          ABIERTO HASTA LAS 23 HS
        </Text>
      </section>
    </>
  );
};

const Display = () => {
  return (
    <div className={`${styles.displayWrap} f-centered`}>
      <div className={styles.displayText}>
        <Text type={textTypes.display} color={'brand'}>
          HECHO <br /> CON <br /> AMOR
        </Text>
        <br />
        <span className={styles.dclarification}>
          <span style={{ color: 'var(--brand-color)' }}>*</span> Desde 2022
        </span>
      </div>
      <LinkButton href={'/productos'} size='lg' color='primary'>
        PEDÍ AHORA
      </LinkButton>
    </div>
  );
};

const AboutItem = ({ img, title, info }) => {
  return (
    <div className={`${styles.aboutItem}`}>
      <div className={styles.aboutInfo}>
        <Text type={textTypes.aboutTitle} color={'brand'}>
          {title}
        </Text>

        <Text type={textTypes.productName} color={'brand'}>
          {info}
        </Text>
      </div>
      <div className={`${styles.aboutImg} f-centered`}>
        <Image
          src={img}
          alt={title}
          placeholder='blur'
          quality={100}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
    </div>
  );
};

export default function Landing() {
  return (
    <main className={styles.wrapper}>
      <Header />
      <Display />
      <div className={`${styles.aboutLayout} f-centered`}>
        <AboutItem
          img={Burger}
          title={'Hamburguesas bajoneras'}
          info={'Si, caimos del cielo'}
        />
        <AboutItem
          img={Empanadas}
          title='Las Mejores de Hudson'
          info={
            <>
              Crocantes, jugosas & abundantes. <br />
              Empanadas hechas para cambiarte la vida
            </>
          }
        />
        <AboutItem
          img={Milanesa}
          title='Milanesas como las de mamá'
          info='Doraditas por fuera, tiernas por dentro.'
        />
      </div>
    </main>
  );
}
