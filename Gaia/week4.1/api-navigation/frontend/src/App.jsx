// // import { useState } from 'react'
// // import heroImg from './assets/hero.png'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from './assets/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <section id="center">
// //         <div className="hero">
// //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// //           <img src={reactLogo} className="framework" alt="React logo" />
// //           <img src={viteLogo} className="vite" alt="Vite logo" />
// //         </div>
// //         <div>
// //           <h1>Get started</h1>
// //           <p>
// //             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// //           </p>
// //         </div>
// //         <button
// //           type="button"
// //           className="counter"
// //           onClick={() => setCount((count) => count + 1)}
// //         >
// //           Count is {count}
// //         </button>
// //       </section>

// //       <div className="ticks"></div>

// //       <section id="next-steps">
// //         <div id="docs">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#documentation-icon"></use>
// //           </svg>
// //           <h2>Documentation</h2>
// //           <p>Your questions, answered</p>
// //           <ul>
// //             <li>
// //               <a href="https://vite.dev/" target="_blank">
// //                 <img className="logo" src={viteLogo} alt="" />
// //                 Explore Vite
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://react.dev/" target="_blank">
// //                 <img className="button-icon" src={reactLogo} alt="" />
// //                 Learn more
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //         <div id="social">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#social-icon"></use>
// //           </svg>
// //           <h2>Connect with us</h2>
// //           <p>Join the Vite community</p>
// //           <ul>
// //             <li>
// //               <a href="https://github.com/vitejs/vite" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#github-icon"></use>
// //                 </svg>
// //                 GitHub
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://chat.vite.dev/" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#discord-icon"></use>
// //                 </svg>
// //                 Discord
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://x.com/vite_js" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#x-icon"></use>
// //                 </svg>
// //                 X.com
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#bluesky-icon"></use>
// //                 </svg>
// //                 Bluesky
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>

// //       <div className="ticks"></div>
// //       <section id="spacer"></section>
// //     </>
// //   )
// // }

// // export default App
// import { useState, useEffect } from 'react';

// function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState({
//     fetch: false,
//     create: false,
//     update: false,
//     delete: false,
//   });

//   const [error, setError] = useState(null);
//   const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
//   const [editingUser, setEditingUser] = useState(null);

//   // 1. Buang '/' di hujung supaya tiada double slash
//   const API_BASE = "https://jsonplaceholder.typicode.com";

//   const apiCall = async (endpoint, options = {}) => {
//     const url = `${API_BASE}${endpoint}`;
//     const config = {
//       headers: { 'Content-Type': 'application/json' },
//       ...options,
//     };

//     const response = await fetch(url, config);
//     if (!response.ok) {
//       throw new Error(`API call failed: ${response.status} ${response.statusText}`);
//     }
//     return response.json();
//   };

//   const fetchUsers = async () => {
//     setLoading((prev) => ({ ...prev, fetch: true }));
//     setError(null);
//     try {
//       const userData = await apiCall('/users');
//       setUsers(userData);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading((prev) => ({ ...prev, fetch: false }));
//     }
//   };

//   // 2. Jalankan fetchUsers semasa komponen mula dimuatkan
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const createUser = async (user) => {
//     setLoading((prev) => ({ ...prev, create: true }));
//     setError(null);
//     try {
//       // Pembetulan: Guna 'user' (bukan userData)
//       const createdUser = await apiCall('/users', {
//         method: 'POST',
//         body: JSON.stringify(user),
//       });

//       // Kemaskini state dengan user baru
//       setUsers((prev) => [...prev, createdUser]);
//       return createdUser;
//     } catch (err) {
//       setError(`Failed to create user: ${err.message}`);
//       throw err;
//     } finally {
//       setLoading((prev) => ({ ...prev, create: false }));
//     }
//   };

//   const updateUser = async (userId, userData) => {
//     setLoading((prev) => ({ ...prev, update: true }));
//     setError(null);
//     try {
//       const updatedUser = await apiCall(`/users/${userId}`, {
//         method: 'PUT',
//         body: JSON.stringify(userData),
//       });

//       setUsers((prev) =>
//         prev.map((user) => (user.id === userId ? { ...user, ...userData } : user))
//       );
//       setEditingUser(null);

//       return updatedUser;
//     } catch (err) {
//       setError(`Failed to update user: ${err.message}`);
//       throw err;
//     } finally {
//       setLoading((prev) => ({ ...prev, update: false }));
//     }
//   }; // 3. Penutup fungsi updateUser ditambah di sini!

//   return (
//     <div>
//       <h2>User Management</h2>
//       {loading.fetch && <p>Loading users...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <ul>
//         {users.map((u) => (
//           <li key={u.id}>{u.name} ({u.email})</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UserManagement;

// import NewsAggregator from './NewsAggregator';
// import WeatherApp from './WeatherApp';

// function App() {
//   return (
//     <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
//       <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Dashboard API Integration</h1>
      
//       {/* Susunan secara menegak / sebelah-menyebelah */}
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
//         <NewsAggregator />
//         <WeatherApp />
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from 'react';

// function App() {
//   const [pokemonName, setPokemonName] = useState('ditto'); // Default Pokémon
//   const [searchQuery, setSearchQuery] = useState('');
//   const [pokemon, setPokemon] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchPokemon() {
//       try {
//         setLoading(true);
//         setError(null);

//         // Tarik data berdasarkan pokemonName
//         const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

//         if (!res.ok) {
//           throw new Error("Pokémon tidak dijumpai! Sila semak semula ejaan.");
//         }

//         const data = await res.json();
//         setPokemon(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPokemon();
//   }, [pokemonName]); // Re-fetch bila pokemonName bertukar

//   // Fungsi apabila pengguna submit borang carian
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== '') {
//       setPokemonName(searchQuery);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
//       <h1>Pokédex API</h1>

//       {/* Form Carian */}
//       <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
//         <input
//           type="text"
//           placeholder="Taip nama Pokémon (cth: pikachu)..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
//         />
//         <button type="submit" style={{ padding: '10px 15px', borderRadius: '8px', border: 'none', background: '#ee1515', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
//           Cari
//         </button>
//       </form>

//       {/* Butang Cepat (Quick Select) */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
//         <button onClick={() => setPokemonName('pikachu')} style={{ padding: '5px 10px', cursor: 'pointer' }}>Pikachu</button>
//         <button onClick={() => setPokemonName('charizard')} style={{ padding: '5px 10px', cursor: 'pointer' }}>Charizard</button>
//         <button onClick={() => setPokemonName('mewtwo')} style={{ padding: '5px 10px', cursor: 'pointer' }}>Mewtwo</button>
//         <button onClick={() => setPokemonName('ditto')} style={{ padding: '5px 10px', cursor: 'pointer' }}>Ditto</button>
//       </div>

//       {/* Paparan Result / Loading / Error */}
//       {loading && <h3>Loading Pokémon...</h3>}
//       {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

//       {!loading && !error && pokemon && (
//         <div style={{ border: '2px solid #ee1515', borderRadius: '16px', padding: '20px', background: '#fdfdfd', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
//           <h2 style={{ textTransform: 'capitalize', color: '#333', margin: '0' }}>{pokemon.name}</h2>
//           <p style={{ color: '#666', marginTop: '4px' }}>ID: #{pokemon.id}</p>

//           <img 
//             src={pokemon.sprites?.front_default || pokemon.sprites?.other?.['official-artwork']?.front_default} 
//             alt={pokemon.name} 
//             style={{ width: '150px', height: '150px' }}
//           />

//           <div style={{ textAlign: 'left', marginTop: '10px' }}>
//             <p><strong>Berat:</strong> {pokemon.weight}</p>
//             <p><strong>Tinggi:</strong> {pokemon.height}</p>
            
//             <p><strong>Abilities:</strong></p>
//             <ul>
//               {pokemon.abilities?.map((item, index) => (
//                 <li key={index} style={{ textTransform: 'capitalize' }}>
//                   {item.ability.name} {item.is_hidden && '(Hidden)'}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';

function App() {
  const [character, setCharacter] = useState(null);
  const [charId, setCharId] = useState(1); // Default watak #1 (Rick)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setLoading(true);
        const res = await fetch(`https://rickandmortyapi.com/api/character/${charId}`);
        const data = await res.json();
        setCharacter(data);
      } catch (err) {
        console.error("Gagal mengambil data watak:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacter();
  }, [charId]);

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Rick & Morty API</h1>

      {/* Butang Tukar Watak */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setCharId((prev) => Math.max(prev - 1, 1))} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          ⬅️ before
        </button>
        <button onClick={() => setCharId((prev) => prev + 1)} style={{ padding: '8px 12px', cursor: 'pointer' }}>
           ➡️
        </button>
      </div>

      {loading ? (
        <h3>Loading character...</h3>
      ) : (
        <div style={{ border: '2px solid #00b5cc', borderRadius: '16px', padding: '20px', background: '#f4fbfb' }}>
          <h2>{character?.name}</h2>
          <p><strong>Status:</strong> {character?.status} - {character?.species}</p>
          <img 
            src={character?.image} 
            alt={character?.name} 
            style={{ width: '200px', borderRadius: '50%' }}
          />
          <p style={{ marginTop: '15px' }}><strong>Asal:</strong> {character?.origin?.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;