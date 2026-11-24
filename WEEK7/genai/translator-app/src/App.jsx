import React, { useState } from 'react';

export default function App() {
  const [inputLanguage, setInputLanguage] = useState('English');
  const [outputLanguage, setOutputLanguage] = useState('German');
  const [textInput, setTextInput] = useState('I like programming.');
  const [translation, setTranslation] = useState('Ich programmiere gerne.');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_language: inputLanguage,
          output_language: outputLanguage,
          text_input: textInput,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTranslation(data.translated_text);
      } else {
        setTranslation('Error during translation.');
      }
    } catch (error) {
      console.error('Connection error:', error);
      setTranslation('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Text Translator</h1>

        {/* Dropdowns Row */}
        <div style={styles.row}>
          <div style={styles.column}>
            <label style={styles.label}>Input Language</label>
            <select
              value={inputLanguage}
              onChange={(e) => setInputLanguage(e.target.value)}
              style={styles.select}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Malay">Malay</option>
            </select>
          </div>

          <div style={styles.column}>
            <label style={styles.label}>Output Language</label>
            <select
              value={outputLanguage}
              onChange={(e) => setOutputLanguage(e.target.value)}
              style={styles.select}
            >
              <option value="German">German</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Malay">Malay</option>
            </select>
          </div>
        </div>

        {/* Textareas Row */}
        <div style={styles.row}>
          <div style={styles.column}>
            <label style={styles.label}>Enter text to translate</label>
            <textarea
              rows="5"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              style={styles.textarea}
            />
          </div>

          <div style={styles.column}>
            <label style={styles.label}>Translation</label>
            <textarea
              rows="5"
              value={translation}
              readOnly
              style={{ ...styles.textarea, backgroundColor: '#f9fafb' }}
            />
          </div>
        </div>

        {/* Translate Button */}
        <button
          onClick={handleTranslate}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'TRANSLATING...' : 'TRANSLATE'}
        </button>
      </div>
    </div>
  );
}

// Simple internal CSS styles
const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '650px',
    padding: '30px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '25px',
  },
  row: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: '6px',
    letterSpacing: '0.05em',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    color: '#374151',
    fontSize: '14px',
    resize: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    backgroundColor: '#1967d2',
    color: '#ffffff',
    fontWeight: '600',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '14px',
    letterSpacing: '0.05em',
    marginTop: '10px',
  },
};