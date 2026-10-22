import { useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

export const SeoMeta = ({ title, description }) => {
  const { settings } = useSettings();

  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${settings.companyName}`
      : settings.seoDefaults?.metaTitle || settings.companyName;

    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        description ||
          settings.seoDefaults?.metaDescription ||
          settings.businessPositioning
      );
    }
  }, [title, description, settings]);

  return null;
};

export default SeoMeta;
