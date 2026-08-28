import { useEffect } from 'react';

/**
 * SEO Component
 * Manages document metadata, Open Graph tags, canonical URLs, and JSON-LD structured data.
 */
export const SEO = ({
  title = 'Free Resume Builder – Create a Professional Resume Online | ResumeForge',
  description = 'Build a professional, ATS-friendly resume in minutes with ResumeForge. Free templates for students, freshers, experienced professionals, engineers, teachers, and all careers. No sign-up required, instant A4 PDF download.',
  canonicalUrl,
  ogType = 'website',
  ogImage = '/og-image.png',
  schemaData
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title.includes('ResumeForge') ? title : `${title} | ResumeForge`;
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'ResumeForge');
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://resumeforge.app');
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 6. JSON-LD Structured Data
    const scriptId = 'structured-data-json-ld';
    let scriptTag = document.getElementById(scriptId);

    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaData);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup custom JSON-LD script if needed
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [title, description, canonicalUrl, ogType, ogImage, schemaData]);

  return null;
};

