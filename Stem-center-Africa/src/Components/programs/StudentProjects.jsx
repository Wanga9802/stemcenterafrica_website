import { useState } from 'react';
import '../../Styles/StudentProjects.css';
import programEvidence from '../../data/programEvidence';

const isMediaUrl = (src) => src && !src.startsWith('PLACEHOLDER_');

const StudentProjects = ({ programSlug, programTitle }) => {
  const [lightboxItem, setLightboxItem] = useState(null);
  const items = programEvidence
    .filter((item) => item.programSlug === programSlug && item.section === 'student-projects')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const featuredProject = items.find((item) => item.type === 'video') || items[0];
  const supportingProjects = items.filter((item) => item !== featuredProject).slice(0, 4);
  const featuredVideoAvailable = featuredProject?.type === 'video' && isMediaUrl(featuredProject.src);

  const openItem = (item) => {
    if (isMediaUrl(item.src)) setLightboxItem(item);
  };

  const ProjectVisual = ({ item, featured = false }) => {
    const source = item.type === 'video' ? item.poster : item.src;
    const hasImage = isMediaUrl(source);
    const hasVideo = item.type === 'video' && isMediaUrl(item.src);

    if (hasVideo && !hasImage) {
      return (
        <video
          src={item.src}
          className="spj-project__image"
          autoPlay
          loop
          muted
          playsInline
          controls={featured}
          preload="metadata"
          aria-label={featured ? (item.title || 'Featured student project video') : undefined}
          aria-hidden={featured ? undefined : 'true'}
        />
      );
    }

    return hasImage ? (
      <img src={source} alt={item.caption || item.title || ''} className="spj-project__image" loading="lazy" />
    ) : (
      <div className={`spj-project__art ${featured ? 'spj-project__art--featured' : ''}`} aria-hidden="true">
        <span className="spj-project__shape spj-project__shape--one" />
        <span className="spj-project__shape spj-project__shape--two" />
        <i className={item.type === 'video' ? 'bi bi-play-circle-fill' : 'bi bi-boxes'} />
      </div>
    );
  };

  return (
    <section className="spj-section" id="projects">
      <div className="container spj-container">
        {items.length > 0 ? (
          <>
            <div className="row g-4 align-items-stretch">
              <div className="col-12 col-lg-5">
                <div className="spj-intro">
                  <span className="spj-eyebrow">Student projects</span>
                  <div className="spj-project-description">
                    {featuredProject?.description || 'Student projects from this program.'}
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-7">
                {featuredProject && (
                  <article className="spj-project spj-project--featured spj-project--video-only">
                    <div className="spj-project__visual spj-project__visual--video-only">
                      {featuredVideoAvailable ? (
                        <video
                          src={featuredProject.src}
                          className="spj-project__image"
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          preload="auto"
                          aria-label={featuredProject.title || 'Featured student project video'}
                        />
                      ) : (
                        <ProjectVisual item={featuredProject} featured />
                      )}
                      <span className="spj-project__number">01</span>
                      <span className="spj-project__floating-label">
                        {featuredProject.type === 'video' ? 'Featured showcase' : 'Featured build'}
                      </span>
                      <span className="spj-project__showcase-badge">Showcase</span>
                    </div>
                  </article>
                )}
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="spj-compact-panel">
                  <h3 className="spj-compact-panel__title">view gallery</h3>
                  <div className="row g-3">
                    {supportingProjects.map((item, index) => (
                      <div className="col-12 col-sm-6 col-md-4" key={item.slot || `${item.title}-${index}`}>
                        <article className="spj-project spj-project--compact">
                          <button
                            className="spj-project__thumb"
                            type="button"
                            onClick={() => openItem(item)}
                            aria-label={isMediaUrl(item.src) ? `View ${item.title}` : item.title}
                            disabled={!isMediaUrl(item.src)}
                          >
                            <ProjectVisual item={item} />
                            <span className="spj-project__number">{String(index + 2).padStart(2, '0')}</span>
                            {item.type === 'video' && isMediaUrl(item.src) && (
                              <span className="spj-project__mini-play"><i className="bi bi-play-fill" /></span>
                            )}
                          </button>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="spj-empty-state"><i className="bi bi-box-seam" aria-hidden="true" /><p>Student projects from {programTitle || 'this program'} will be featured here soon.</p></div>
        )}
      </div>

      {lightboxItem && (
        <div className="spj-lightbox" role="dialog" aria-modal="true" aria-label={lightboxItem.title || 'Project preview'} onClick={() => setLightboxItem(null)}>
          <button type="button" className="spj-lightbox__close" onClick={() => setLightboxItem(null)} aria-label="Close preview"><i className="bi bi-x-lg" /></button>
          <div className="spj-lightbox__content" onClick={(event) => event.stopPropagation()}>
            {lightboxItem.type === 'video' ? (
              <video src={lightboxItem.src} poster={isMediaUrl(lightboxItem.poster) ? lightboxItem.poster : undefined} controls autoPlay className="spj-lightbox__media" />
            ) : (
              <img src={lightboxItem.src} alt={lightboxItem.caption || lightboxItem.title || ''} className="spj-lightbox__media" />
            )}
            <div className="spj-lightbox__copy">
              <span>{lightboxItem.tag || 'Student work'}</span>
              <h3>{lightboxItem.title}</h3>
              {lightboxItem.description && <p>{lightboxItem.description}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudentProjects;
