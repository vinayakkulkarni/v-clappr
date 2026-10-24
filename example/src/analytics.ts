/**
 * Demo analytics. Plausible and OpenPanel are loaded from `index.html`.
 * GA4 has no measurement ID yet; leave it empty to skip GA4 entirely.
 */
export const GA_MEASUREMENT_ID = '';

type Props = Record<string, string | number | boolean>;

let gaLoaded = false;

export const loadGa = () => {
  if (!GA_MEASUREMENT_ID || gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the raw `arguments` object from the data layer.
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.append(script);
};

export const track = (event: string, props: Props = {}) => {
  window.plausible?.(event, { props });
  window.op?.('track', event, props);
  if (GA_MEASUREMENT_ID) window.gtag?.('event', event, props);
};
