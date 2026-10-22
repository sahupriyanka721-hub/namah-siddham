import React, { createContext, useContext, useState, useEffect } from 'react';
import { publicApi } from '../api/publicApi';

const SettingsContext = createContext();

const defaultSettings = {
  companyName: 'Namah Siddham Corporation Private Limited',
  companyType: 'Private Limited Company',
  cin: 'U77100MP2026PTC087531',
  businessPositioning:
    'A multi-platform digital business company building and operating specialized online marketplaces and aggregator platforms.',
  officialEmail: 'contact@namahsiddham.com',
  grievanceEmail: 'grievance@namahsiddham.com',
  officialPhone: '+91 731 0000000',
  registeredOffice: {
    addressLine1: 'Corporate Tower, Main Road',
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    pincode: '452001',
    fullAddress: 'Registered Office: Indore, Madhya Pradesh, India. CIN: U77100MP2026PTC087531',
  },
  socialLinks: {
    linkedin: 'https://linkedin.com/company/namahsiddham',
    twitter: 'https://twitter.com/namahsiddham',
    facebook: 'https://facebook.com/namahsiddham',
    instagram: 'https://instagram.com/namahsiddham',
  },
  footerContent: {
    aboutText:
      'Namah Siddham Corporation Private Limited is building a portfolio of specialized digital platforms that connect people, services, sellers, and business opportunities through technology-enabled marketplace experiences.',
    copyrightText: '© 2026 Namah Siddham Corporation Private Limited. All rights reserved.',
  },
  seoDefaults: {
    metaTitle: 'Namah Siddham Corporation Private Limited — Multi-Platform Digital Aggregator',
    metaDescription:
      'Namah Siddham Corporation Private Limited is building a portfolio of specialized digital platforms that connect people, services, sellers, and business opportunities through technology-enabled marketplace experiences.',
  },
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await publicApi.getSettings();
      if (res.data?.data) {
        setSettings((prev) => ({ ...prev, ...res.data.data }));
      }
    } catch (err) {
      console.warn('Could not load dynamic settings from API, using default corporate settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
