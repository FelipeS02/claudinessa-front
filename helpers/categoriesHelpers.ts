export const scrollToElement = (e) => {
  // first prevent the default behavior
  e.preventDefault();

  // get the href and remove everything before the hash (#)
  const href = e.currentTarget.href;
  const targetId = href.replace(/.*\#/, '');

  const elem = document.getElementById(targetId);
  
  if (!elem) return;

  elem?.scrollIntoView({ behavior: 'smooth' });
};

export const onScroll = (setSelectedItem, el) => {
  // Función para manejar el scroll y actualizar la selección del navbar
  const scrollPosition = el.scrollTop;
  const sections = document.querySelectorAll('section'); // Obtener todas las secciones
  // Determina cuál sección está en la parte superior de la vista
  let newSelectedItem = null;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.clientHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      newSelectedItem = section.getAttribute('id');
    }
  });

  // Actualiza el estado del elemento seleccionado
  return setSelectedItem(newSelectedItem);
};

export const getCategoriesName = async () => {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Categories/GetCategoriesName`
  );

  return categories.json();
};
