import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Blogcategory.css';
import { supabase } from '../../lib/supabaseClient';

export default function BlogCategoryCards() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('slug, category, title, subtitle, image, status, created_at')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      setPosts(
        (data || []).map((post) => ({
          slug: post.slug,
          category: post.category,
          title: post.title,
          subtitle: post.subtitle,
          image: post.image,
          tag: post.status ? post.status.charAt(0).toUpperCase() + post.status.slice(1) : '',
        }))
      );
    } catch (error) {
      console.error('Failed to fetch blog posts from Supabase:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="blog-section">
        <p className="blog-empty-message">Loading blog posts…</p>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="blog-section">
        <p className="blog-empty-message">No published blog posts are available right now.</p>
      </section>
    );
  }

  return (
    <section className="blog-section">
      <div className="blog-cards-grid">
        {posts.map((post) => (
          <article key={post.slug} className="blog-card">
            <div className="blog-card__image-wrap">
              <img className="blog-card__img" src={post.image} alt={post.title} />
            </div>

            <div className="blog-card__body">
              <p className="blog-card__category">{post.category}</p>
              <h3 className="blog-card__title">{post.title}</h3>
              <p className="blog-card__subtitle">{post.subtitle}</p>

              <div className="blog-card__footer">
                <Link to={`/blog/${post.slug}`} className="blog-card__read-btn">
                  Read more
                </Link>
                <span className="blog-card__tag">{post.tag}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
