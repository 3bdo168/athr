import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export default function SEO({ title, description, image, type = 'website', path = '' }) {
  const { lang } = useLanguage();
  
  const siteTitle = lang === 'ar' ? 'وكالة أثر الرقمية' : 'Athr Agency';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDesc = lang === 'ar' 
    ? 'نقدم حلول تسويق رقمي متكاملة ومبتكرة تشمل إدارة منصات التواصل، وتصميم وتطوير المواقع، وتصوير وتعديل الفيديوهات، لتعزيز نجاح ومبيعات العلامات التجارية.'
    : 'Athr Agency provides innovative digital marketing, web development, and video editing solutions to elevate your brand\'s success and sales.';
  
  const finalDescription = description || siteDesc;
  // Fallback to the real agency logo
  const ogImage = image || 'https://athr-agency.vercel.app/logo.png';
  const siteUrl = 'https://athr-agency.vercel.app';
  const url = `${siteUrl}${path}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_EG' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Language Alternates */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${path}?lang=en`} />
      <link rel="alternate" hrefLang="ar" href={`${siteUrl}${path}?lang=ar`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${path}`} />
    </Helmet>
  );
}
