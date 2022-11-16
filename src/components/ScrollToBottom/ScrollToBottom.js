import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function ScrollToBottom() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  }, [pathname]);

  return null;
}
