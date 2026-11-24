import { useState } from 'react';

// ==========================================
// 1. MODULE 1: WEATHER DASHBOARD (Exercise 1)
// ==========================================

function WeatherDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [location, setLocation] = useState('Kuala Lumpur');
  const [showDetails, setShowDetails] = useState(false);

  const weather = { temp: 32, condition: 'Sunny', humidity: '75%', wind: '12 km/h' };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
        <h3>1. Weather Dashboard</h3>
        <p>Please log in to view weather updates.</p>
        <button onClick={() => setIsLoggedIn(true)} style={{ padding: '6px 12px', cursor: 'pointer' }}>Log In</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: weather.temp > 25 ? '#fff3cd' : '#e2e3e5' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>1. Weather Dashboard</h3>
        <button onClick={() => setIsLoggedIn(false)} style={{ fontSize: '12px', cursor: 'pointer' }}>Log Out</button>
      </div>
      <p style={{ marginTop: '10px' }}><strong>{location}</strong> ☀️</p>
      <p>Temperature: <strong>{weather.temp}°C</strong> ({weather.condition})</p>
      <button onClick={() => setShowDetails(!showDetails)} style={{ cursor: 'pointer' }}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div style={{ marginTop: '10px', fontSize: '14px', borderTop: '1px solid #ddd', paddingTop: '8px' }}>
          <p style={{ margin: '4px 0' }}>Humidity: {weather.humidity}</p>
          <p style={{ margin: '4px 0' }}>Wind Speed: {weather.wind}</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. MODULE 2: TASK MANAGER (Exercise 2)
// ==========================================
function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete Conditional Rendering Slides', category: 'Work', priority: 'High', completed: false, isOverdue: true },
    { id: 2, title: 'Buy grocery supplies', category: 'Personal', priority: 'Low', completed: true, isOverdue: false },
    { id: 3, title: '30-minute cardio workout', category: 'Health', priority: 'Medium', completed: false, isOverdue: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h3 style={{ marginTop: 0 }}>2. Task Manager</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', borderBottom: '1px solid #eee' }}>
            <span>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft: '8px' }}>{task.title}</span>
              {!task.completed && task.isOverdue && <span style={{ color: 'red', marginLeft: '8px', fontSize: '12px', fontWeight: 'bold' }}>⚠ Overdue!</span>}
            </span>
            <span style={{ fontSize: '12px', padding: '2px 6px', borderRadius: '4px', color: '#fff', backgroundColor: task.priority === 'High' ? '#d9534f' : '#5cb85c' }}>
              {task.priority}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ==========================================
// 3. MODULE 3: PRODUCT CATALOG (Example 2)
// ==========================================
function ProductCatalog() {
  const [products] = useState([
    { id: 101, name: 'Wireless Headphones', category: 'Electronics', price: 299, inStock: true },
    { id: 102, name: 'Ergonomic Desk Chair', category: 'Furniture', price: 450, inStock: false },
    { id: 103, name: 'Cotton Hoodie', category: 'Apparel', price: 80, inStock: true },
  ]);

  const [inStockOnly, setInStockOnly] = useState(false);
  const displayedProducts = products.filter(p => !inStockOnly || p.inStock);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h3 style={{ marginTop: 0 }}>3. Advanced Product Filter & Sort</h3>
      <label style={{ fontSize: '14px', marginBottom: '12px', display: 'block', cursor: 'pointer' }}>
        <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} style={{ marginRight: '6px' }} />
        Show In Stock Only
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        {displayedProducts.map(p => (
          <div key={p.id} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px', opacity: p.inStock ? 1 : 0.5, backgroundColor: '#f8f9fa' }}>
            <strong style={{ display: 'block' }}>{p.name}</strong>
            <p style={{ margin: '4px 0' }}>${p.price}</p>
            <span style={{ color: p.inStock ? 'green' : 'red', fontSize: '12px', fontWeight: 'bold' }}>
              {p.inStock ? '✓ In Stock' : '✖ Out of Stock'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. MODULE 4: NESTED COMMENTS (Example 3)
// ==========================================
function CommentItem({ comment, onAddReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddReply(comment.id, replyText);
    setReplyText('');
    setShowReplyForm(false);
  };

  return (
    <div style={{ padding: '10px', marginBottom: '8px', borderLeft: '3px solid #0275d8', backgroundColor: '#f8f9fa' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>{comment.author}</strong>
        <span style={{ fontSize: '11px', color: '#888' }}>{comment.timestamp}</span>
      </div>
      <p style={{ margin: '6px 0', fontSize: '14px' }}>{comment.text}</p>
      
      <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
        <button onClick={() => setShowReplyForm(!showReplyForm)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#0275d8' }}>
          💬 {showReplyForm ? 'Cancel' : 'Reply'}
        </button>
        {comment.replies && comment.replies.length > 0 && (
          <button onClick={() => setShowReplies(!showReplies)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#666' }}>
            {showReplies ? `▼ Hide (${comment.replies.length})` : `▶ Show (${comment.replies.length})`}
          </button>
        )}
      </div>

      {showReplyForm && (
        <form onSubmit={handleReplySubmit} style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
          <input
            type="text"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '4px 8px', backgroundColor: '#0275d8', color: '#fff', border: 'none', borderRadius: '4px' }}>Post</button>
        </form>
      )}

      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div style={{ marginLeft: '16px', marginTop: '8px' }}>
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} onAddReply={onAddReply} />
          ))}
        </div>
      )}
    </div>
  );
}

function NestedCommentsSystem() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Alex Developer',
      text: 'Does React support deep component recursion?',
      timestamp: '2h ago',
      replies: [
        {
          id: 11,
          author: 'Sarah Engineer',
          text: 'Yes! As long as you have a base condition.',
          timestamp: '1h ago',
          replies: [],
        },
      ],
    },
  ]);

  const addReplyRecursive = (list, parentId, newReply) => {
    return list.map((item) => {
      if (item.id === parentId) return { ...item, replies: [...item.replies, newReply] };
      if (item.replies && item.replies.length > 0) return { ...item, replies: addReplyRecursive(item.replies, parentId, newReply) };
      return item;
    });
  };

  const handleAddReply = (parentId, text) => {
    const newReply = { id: Date.now(), author: 'You', text, timestamp: 'Just now', replies: [] };
    setComments(addReplyRecursive(comments, parentId, newReply));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h3 style={{ marginTop: 0 }}>4. Nested Comments System</h3>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onAddReply={handleAddReply} />
      ))}
    </div>
  );
}

// ==========================================
// 5. MAIN ENTRY POINT: ALL-IN-ONE PORTAL
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px' }}>React Practice Portal</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>All Conditional Rendering exercises consolidated in one view.</p>

      {/* Navigation Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('all')}
          style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: activeTab === 'all' ? 'bold' : 'normal', backgroundColor: activeTab === 'all' ? '#0275d8' : '#e0e0e0', color: activeTab === 'all' ? '#fff' : '#000', border: 'none', borderRadius: '4px' }}
        >
          Show All
        </button>
        <button
          onClick={() => setActiveTab('weather')}
          style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: activeTab === 'weather' ? 'bold' : 'normal', backgroundColor: activeTab === 'weather' ? '#0275d8' : '#e0e0e0', color: activeTab === 'weather' ? '#fff' : '#000', border: 'none', borderRadius: '4px' }}
        >
          Weather
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: activeTab === 'tasks' ? 'bold' : 'normal', backgroundColor: activeTab === 'tasks' ? '#0275d8' : '#e0e0e0', color: activeTab === 'tasks' ? '#fff' : '#000', border: 'none', borderRadius: '4px' }}
        >
          Task Manager
        </button>
        <button
          onClick={() => setActiveTab('products')}
          style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: activeTab === 'products' ? 'bold' : 'normal', backgroundColor: activeTab === 'products' ? '#0275d8' : '#e0e0e0', color: activeTab === 'products' ? '#fff' : '#000', border: 'none', borderRadius: '4px' }}
        >
          Product Filter
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: activeTab === 'comments' ? 'bold' : 'normal', backgroundColor: activeTab === 'comments' ? '#0275d8' : '#e0e0e0', color: activeTab === 'comments' ? '#fff' : '#000', border: 'none', borderRadius: '4px' }}
        >
          Comments
        </button>
      </div>

      <hr style={{ border: '0.5px solid #eee', marginBottom: '20px' }} />

      {/* Conditional Rendering of Views */}
      {activeTab === 'all' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <WeatherDashboard />
          <TaskManager />
          <ProductCatalog />
          <NestedCommentsSystem />
        </div>
      )}

      {activeTab === 'weather' && <WeatherDashboard />}
      {activeTab === 'tasks' && <TaskManager />}
      {activeTab === 'products' && <ProductCatalog />}
      {activeTab === 'comments' && <NestedCommentsSystem />}
    </div>
  );
} 
