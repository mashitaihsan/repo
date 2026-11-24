import { useState, useEffect } from 'react';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=3.139&longitude=101.6869&current_weather=true"
        );
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (err) {
        console.error("Gagal mengambil data cuaca:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '12px', background: '#f9f9f9' }}>
      <h2>3️⃣ Exercise 2: Weather Forecast (Kuala Lumpur)</h2>
      {loading ? (
        <p>Loading weather...</p>
      ) : (
        <div>
          <p style={{ fontSize: '18px' }}><strong>🌡️ Suhu:</strong> {weather?.temperature} °C</p>
          <p style={{ fontSize: '18px' }}><strong>💨 Kelajuan Angin:</strong> {weather?.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;