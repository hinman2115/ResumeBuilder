import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS, getProductByPath } from '../../config/products';

/**
 * Reusable SEO Component for ResumeForge & FileForge
 * Automatically identifies product identity or accepts an explicit 'product' prop.
 * Configures dynamic document.title, meta descriptions, Open Graph, Twitter cards, and JSON-LD.
 *
 * @param {string} [title]
 * @param {string} [description]
 * @param {string} [canonicalUrl]
 * @param {'resume' | 'file'} [product]
 * @param {string} [ogType='website']
 * @param {string} [ogImage='/og-image.png']
 * @param {object} [schemaData]
 */
export const SEO = ({
  title,
  description,
  canonicalUrl,
  product,
  ogType = 'website',
  ogImage = '/og-image.png',
  schemaData
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Determine Product Context
    const activeProduct = product
      ? PRODUCTS[product] || PRODUCTS.resume
      : getProductByPath(location?.pathname || (typeof window !== 'undefined' ? window.location.pathname : ''));

    const isFileProduct = activeProduct.id === 'file';

    // 2. Format Dynamic Page Title
    let fullTitle = title;
    if (!fullTitle) {
      fullTitle = isFileProduct
        ? `${PRODUCTS.file.name} — ${PRODUCTS.file.tagline}`
        : `${PRODUCTS.resume.name} — Free Resume Builder`;
    } else {
      // Normalize brand suffix according to active product
      if (isFileProduct) {
        if (!fullTitle.includes('FileForge')) {
          fullTitle = fullTitle.replace(/\s*\|?\s*ResumeForge/gi, '').trim();
          fullTitle = `${fullTitle} — FileForge`;
        }
      } else {
        if (!fullTitle.includes('ResumeForge')) {
          fullTitle = fullTitle.replace(/\s*\|?\s*FileForge/gi, '').trim();
          fullTitle = `${fullTitle} — ResumeForge`;
        }
      }
    }

    document.title = fullTitle;

    // 3. Helper to update or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    const finalDescription = description || activeProduct.description;

    // 4. Standard Meta Tags
    setMetaTag('name', 'description', finalDescription);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 5. Open Graph Tags (Dedicated per product)
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', finalDescription);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', activeProduct.siteName);
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : activeProduct.domain);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', ogImage);

    // 6. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', finalDescription);
    setMetaTag('name', 'twitter:image', ogImage);

    // 7. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 8. JSON-LD Structured Data
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
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [title, description, canonicalUrl, product, ogType, ogImage, schemaData, location.pathname]);

  return null;
};
