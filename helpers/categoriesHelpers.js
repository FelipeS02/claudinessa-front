export const handleScroll = (e) => {
  // first prevent the default behavior
  e.preventDefault();

  // get the href and remove everything before the hash (#)
  const href = e.currentTarget.href;
  const targetId = href.replace(/.*\#/, '');

  const elem = document.getElementById(targetId);
  elem?.scrollIntoView(true);
};
