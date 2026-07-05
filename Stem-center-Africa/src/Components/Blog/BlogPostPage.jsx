import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import '../../Styles/BlogPostPage.css';

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/yourpage',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/yourpage',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    href: 'https://x.com/yourpage',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/yourphonenumber',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.535 5.845L.057 23.429a.5.5 0 0 0 .609.61l5.684-1.479A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.933 0-3.742-.527-5.289-1.442l-.379-.225-3.932 1.023 1.038-3.821-.247-.394A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/yourpage',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  async function fetchPost() {
    try {
      const { data: postData, error: postError } = await supabase
        .from('blogs')
        .select('slug, category, title, subtitle, author, author_image, date, image, content')
        .eq('slug', slug)
        .single();

      if (postError) throw postError;
      if (!postData) {
        setPost(null);
        setRecentPosts([]);
        return;
      }

      setPost({
        ...postData,
        authorImage: postData.author_image,
      });

      const { data: recentData, error: recentError } = await supabase
        .from('blogs')
        .select('slug, title, image')
        .neq('slug', slug)
        .order('created_at', { ascending: false })
        .limit(4);

      if (recentError) throw recentError;
      setRecentPosts(recentData || []);
    } catch (error) {
      console.error('Failed to load blog post from Supabase:', error);
      setPost(null);
      setRecentPosts([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="post-page post-page--loading">
        <div className="post-page__not-found">
          <h1>Loading…</h1>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="post-page post-page--not-found">
        <div className="post-page__not-found">
          <h1>Post not found</h1>
          <p>We could not find the article you were looking for.</p>
          <Link to="/blog" className="post-page__back-link">
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  const authorAvatarSrc = post.author_image || post.authorImage;

  return (
    <main className="post-page">
      <section className="post-hero">
        <span aria-hidden="true" className="post-hero__glow-right" />
        <p className="post-hero__category mb-4">{post.category}</p>
        <h1 className="post-hero__title">{post.title}</h1>
        <p className="post-hero__subtitle">{post.subtitle}</p>
        <div className="post-hero__meta">
          <div className="post-hero__author-block">
            <img
              className="post-hero__avatar"
              src={authorAvatarSrc}
              alt={`Avatar of ${post.author}`}
            />
            <div className="post-hero__author-text">
              <span className="post-hero__author">{post.author}</span>
              <span className="post-hero__date">{post.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three-column layout: social | main | sidebar ── */}
      <div className="post-layout">

        {/* Social column — sits first on the left */}
        <div className="post-social">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              className="post-social__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${s.name}`}
              title={s.name}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <article className="post-main">
          <div className="post-main__image-wrap">
            <img className="post-main__image" src={post.image} alt={post.title} />
          </div>
          <div className="post-main__content">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="post-sidebar">
          <div className="post-sidebar__card">
            <strong className="post-sidebar__title">Recent Posts</strong>
            {recentPosts.map((item) => (
              <Link key={item.slug} to={`/blog/${item.slug}`} className="recent-post">
                <img className="recent-post__image" src={item.image} alt={item.title} />
                <div className="recent-post__text">
                  <p className="recent-post__title">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </aside>

      </div>

      {/* Mobile sticky bottom bar */}
      <nav className="post-social-mobile" aria-label="Share on social media">
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            className="post-social-mobile__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${s.name}`}
          >
            {s.icon}
          </a>
        ))}
      </nav>
    </main>
  );
}
