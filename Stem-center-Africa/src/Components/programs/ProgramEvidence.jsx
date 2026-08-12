import { useState } from 'react';
import '../../Styles/ProgramEvidence.css';
import programEvidence from '../../data/programEvidence';

const isMediaUrl = (src) => src && !src.startsWith('PLACEHOLDER_');

const ProgramEvidence = ({ programSlug, programTitle, description, galleryHref }) => {
  const [lightboxItem, setLightboxItem] = useState(null);
  const [galleryStart, setGalleryStart] = useState(0);

  const items = programEvidence
    .filter((item) => item.programSlug === programSlug && item.section === 'program-in-action')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const videoItem = items.find((item) => item.type === 'video');
  const imageItems = items.filter((item) => item !== videoItem);
  const visibleImages = imageItems.slice(galleryStart, galleryStart + 4);
  const hasGalleryLink = Boolean(galleryHref && galleryHref !== '#');
  const featureAvailable = videoItem && isMediaUrl(videoItem.src);
  const hasMoreImages = imageItems.length > 4;
  const canGoNext = galleryStart + 4 < imageItems.length;
  const canGoPrev = galleryStart > 0;

  const openItem = (item) => setLightboxItem(item);

  const handleGalleryNext = () => {
    if (canGoNext) {
      setGalleryStart((current) => Math.min(current + 1, imageItems.length - 4));
    }
  };

  const handleGalleryPrev = () => {
    if (canGoPrev) {
      setGalleryStart((current) => Math.max(current - 1, 0));
    }
  };

  return (
    <section className="pev-section" id="evidence">
      <div className="container pev-container">
        <div className="pev-intro">
          <div className="pev-intro__copy">
            <span className="pev-eyebrow">Program in action</span>
          </div>

          {hasGalleryLink && (
            <a href={galleryHref} className="pev-cta">
              Explore the full gallery <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </a>
          )}
        </div>

        {items.length > 0 ? (
          <div className="pev-showcase">
            <div className="pev-feature-wrap">
              <div
                className={`pev-feature ${featureAvailable ? '' : 'pev-feature--placeholder'}`}
              >
                {featureAvailable ? (
                  <video
                    src={videoItem.src}
                    poster={isMediaUrl(videoItem.poster) ? videoItem.poster : undefined}
                    className="pev-feature__image"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    preload="metadata"
                    aria-label={videoItem.title || 'Featured program video'}
                  />
                ) : (
                  <div className="pev-feature__art" aria-hidden="true">
                    <span className="pev-feature__orb pev-feature__orb--one" />
                    <span className="pev-feature__orb pev-feature__orb--two" />
                    <span className="pev-feature__grid" />
                    <i className="bi bi-play-fill" />
                  </div>
                )}
                <span className="pev-feature__label"><i className="bi bi-play-circle-fill" aria-hidden="true" /> Featured story</span>
                <div className="pev-feature__caption">
                  <p className="pev-feature__kicker">Inside the classroom</p>
                  <h3>{videoItem?.title || 'Classroom experience'}</h3>
                  <p>{videoItem?.caption || 'Watch our students in action'}</p>
                </div>
              </div>
            </div>

            <div className="pev-gallery-shell">
              <div className="pev-grid" aria-label="Program photo gallery">
                {visibleImages.map((item, index) => {
                  const imageAvailable = isMediaUrl(item.src);
                  return (
                    <button
                      type="button"
                      className={`pev-tile pev-tile--${index + 1} ${imageAvailable ? '' : 'pev-tile--placeholder'}`}
                      key={item.slot || `${item.title}-${index}`}
                      onClick={() => openItem(item)}
                      aria-label={imageAvailable ? (item.title || 'View photo') : item.title}
                    >
                      {imageAvailable ? (
                        <img src={item.src} alt={item.caption || item.title || ''} className="pev-tile__image" loading="lazy" />
                      ) : (
                        <span className="pev-tile__art" aria-hidden="true"><i className="bi bi-stars" /></span>
                      )}
                      <span className="pev-tile__shade" />
                      {imageAvailable && <span className="pev-tile__expand"><i className="bi bi-arrows-angle-expand" aria-hidden="true" /></span>}
                    </button>
                  );
                })}
              </div>

              {hasMoreImages && (
                <div className="pev-gallery-controls" aria-label="Gallery navigation">
                  {canGoPrev && (
                    <button type="button" className="pev-gallery-nav pev-gallery-nav--prev" onClick={handleGalleryPrev} aria-label="Previous gallery items">
                      <i className="bi bi-chevron-left" aria-hidden="true" />
                    </button>
                  )}
                  <button type="button" className="pev-gallery-nav pev-gallery-nav--next" onClick={handleGalleryNext} aria-label="Next gallery items" disabled={!canGoNext}>
                    <i className="bi bi-chevron-right" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="pev-empty-state">
            <i className="bi bi-images pev-empty-state__icon" aria-hidden="true" />
            <p className="pev-empty-state__text">New learning moments from {programTitle || 'this program'} will appear here soon.</p>
          </div>
        )}
      </div>

      {lightboxItem && (
        <div className="pev-lightbox" role="dialog" aria-modal="true" aria-label={lightboxItem.title || 'Gallery preview'} onClick={() => setLightboxItem(null)}>
          <button type="button" className="pev-lightbox__close" onClick={() => setLightboxItem(null)} aria-label="Close preview"><i className="bi bi-x-lg" /></button>
          <div className="pev-lightbox__content" onClick={(event) => event.stopPropagation()}>
            {lightboxItem.type === 'video' ? (
              <video src={lightboxItem.src} poster={lightboxItem.poster} controls autoPlay className="pev-lightbox__media" />
            ) : (
              <img src={lightboxItem.src} alt={lightboxItem.caption || lightboxItem.title || ''} className="pev-lightbox__media" />
            )}
            <div className="pev-lightbox__copy">
              <p>{lightboxItem.tag || 'Learning moment'}</p>
              <h3>{lightboxItem.title}</h3>
              {lightboxItem.description && <span>{lightboxItem.description}</span>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProgramEvidence;
