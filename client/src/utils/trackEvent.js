import api from '../services/api';

const trackEvent = (type, meta = {}) => {
  api.post('/api/analytics/event', { type, meta }).catch(() => {});
};

export default trackEvent;