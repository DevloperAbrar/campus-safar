import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';

const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    api.post('/api/analytics/pageview', {
      path: location.pathname,
      referrer: document.referrer
    }).catch(() => {}); // silent fail
  }, [location.pathname]);
};

export default useAnalytics;