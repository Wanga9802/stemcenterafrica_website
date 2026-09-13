import { useState, useEffect } from 'react';
import { Download, CalendarPlus, X } from 'lucide-react';
import '../Styles/TopBanner.css';

const DISMISS_KEY = 'sca_top_banner_dismissed';

function TopBanner() {
  const [visible, setVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallHint, setShowInstallHint] = useState(false);
  const [installHintText, setInstallHintText] = useState('');

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');

    const updateStandaloneState = () => {
      setIsStandalone(mediaQuery.matches || window.navigator.standalone === true);
    };

    updateStandaloneState();
    setIsIOS(/iPhone|iPad|iPod/i.test(window.navigator.userAgent));

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateStandaloneState);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateStandaloneState);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setInstallHintText('On iPhone or iPad, tap the Share button and choose Add to Home Screen.');
      setShowInstallHint(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return;
    }

    setInstallHintText('Your browser is not offering the install prompt right now. Use the browser menu and choose Install app or Add to Home Screen.');
    setShowInstallHint(true);
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, 'true');
    setVisible(false);
  };

  const showInstallButton = !isStandalone;

  if (!visible) return null;

  return (
    <div className="top-banner">
      <div className="top-banner__content">
        <span className="top-banner__message">
          Bring STEM Center Africa to your school or organization
        </span>
        <div className="top-banner__actions">
          <a href="/book-outreach" className="top-banner__btn top-banner__btn--primary">
            <CalendarPlus size={14} />
            Book a school visit
          </a>
          {showInstallButton && (
            <button
              type="button"
              className="top-banner__btn top-banner__btn--ghost"
              onClick={handleInstallClick}
            >
              <Download size={14} />
              Install app
            </button>
          )}
        </div>
        {showInstallHint && (
          <p className="top-banner__ios-hint">{installHintText}</p>
        )}
      </div>
      <button
        type="button"
        className="top-banner__dismiss"
        onClick={handleDismiss}
        aria-label="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default TopBanner;