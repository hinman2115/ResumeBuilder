import { Link } from 'react-router-dom';
import { FileText, Layers } from 'lucide-react';
import { PRODUCTS } from '../../config/products';

/**
 * Reusable ProductBrand Component
 * Renders consistent, accessible branding for ResumeForge or FileForge.
 *
 * @param {'resume' | 'file'} [product='resume']
 * @param {'sm' | 'md' | 'lg'} [size='md']
 * @param {boolean} [showBadge=true]
 * @param {boolean} [showTagline=false]
 * @param {boolean} [link=true]
 * @param {string} [className='']
 */
export const ProductBrand = ({
  product = 'resume',
  size = 'md',
  showBadge = true,
  showTagline = false,
  link = true,
  className = ''
}) => {
  const isFileProduct = product === 'file';
  const config = isFileProduct ? PRODUCTS.file : PRODUCTS.resume;

  const sizeStyles = {
    sm: {
      iconBox: 'w-7 h-7 rounded-lg',
      icon: 'w-3.5 h-3.5',
      title: 'text-base font-bold',
      badge: 'text-[9px] px-1.5 py-0.5',
      tagline: 'text-[11px]'
    },
    md: {
      iconBox: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl',
      icon: 'w-4 h-4 sm:w-5 sm:h-5',
      title: 'text-lg sm:text-xl font-bold',
      badge: 'text-[10px] px-2 py-0.5',
      tagline: 'text-xs'
    },
    lg: {
      iconBox: 'w-12 h-12 rounded-2xl',
      icon: 'w-6 h-6',
      title: 'text-2xl sm:text-3xl font-extrabold',
      badge: 'text-xs px-2.5 py-0.5',
      tagline: 'text-sm'
    }
  }[size] || sizeStyles.md;

  const content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon Box */}
      <div
        className={`${sizeStyles.iconBox} flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105 ${
          isFileProduct
            ? 'bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500'
            : 'bg-[#30313A] group-hover:bg-slate-700'
        }`}
      >
        {isFileProduct ? (
          <Layers className={sizeStyles.icon} />
        ) : (
          <FileText className={sizeStyles.icon} />
        )}
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`${sizeStyles.title} tracking-tight text-[#2F3038]`}>
            {isFileProduct ? (
              <>
                File<span className="text-indigo-600">Forge</span>
              </>
            ) : (
              <>
                Resume<span className="text-brand-600">Forge</span>
              </>
            )}
          </span>

          {showBadge && (
            <span
              className={`font-bold uppercase tracking-wider rounded-full border ${sizeStyles.badge} ${
                isFileProduct
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200/80'
                  : 'bg-brand-50 text-brand-700 border-brand-200/60'
              }`}
            >
              {isFileProduct ? 'PDF & Tools' : 'Free'}
            </span>
          )}
        </div>

        {showTagline && (
          <p className={`${sizeStyles.tagline} text-[#6F707A] font-normal mt-0.5`}>
            {config.tagline}
          </p>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link
        to={config.homePath}
        className="group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-lg"
        aria-label={`${config.name} - ${config.tagline}`}
      >
        {content}
      </Link>
    );
  }

  return content;
};
