import { useState, useEffect } from 'react';

function NewsAggregator() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopNews() {
      try {
        setLoading(true);
        const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
        const storyIds = await res.json();

        const top5Ids = storyIds.slice(0, 5);
        const storyPromises = top5Ids.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((r) => r.json())
        );

        const stories = await Promise.all(storyPromises);
        setArticles(stories);
      } catch (err) {
        console.error("Gagal mengambil berita:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTopNews();
  }, []);

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '12px', background: '#f9f9f9' }}>
      <h2>📰 Exercise 1: Latest News</h2>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <ul style={{ paddingLeft: '20px' }}>
          {articles.map((item) => (
            <li key={item.id} style={{ marginBottom: '10px' }}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsAggregator;

