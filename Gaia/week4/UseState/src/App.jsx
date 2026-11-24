// // // import { useState } from 'react';

// // // ==========================================
// // // PREVIOUS COUNTER & FORM CODE (SAVED FOR LATER)
// // // ==========================================
// // /*
// // import heroImg from './assets/hero.png'
// // import reactLogo from './assets/react.svg'

// // function Counter() {
// //     const [count, setCount] = useState(0); 
// //     const increment = () => setCount(count + 1);
// //     const decrement = () => setCount(count - 1);
// //     const reset = () => setCount(0);

// //     return (
// //         <div>
// //             <h2>Count: {count}</h2>
// //             <button onClick={increment}>+</button>
// //             <button onClick={decrement}>-</button>
// //             <button onClick={reset}>Reset</button>
// //         </div>
// //     );
// // }

// // function UserForm() {
// //   const [firstName, setFirstName] = useState('');
// //   const [lastName, setLastName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [age, setAge] = useState(0);
  
// //   return (
// //     <div>
// //       <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
// //       <input placeholder="Email" value={email} onChange={(e) => setLastName(e.target.value)} />
// //       <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(Number(e.target.value))} />
// //       <h3>Hello, {firstName} {lastName}!</h3>
// //       <p>Email: {email}</p>
// //       <p>Age: {age}</p>
// //     </div>
// //   )
// // }
// // */

// // // // ==========================================
// // // // ACTIVE COMPONENT
// // // // ==========================================
// // // function TodoList() {
// // //   const [todos, setTodos] = useState([]);
// // //   const [inputValue, setInputValue] = useState('');

// // //   const addTodo = () => {
// // //     if (inputValue.trim()) {
// // //       setTodos(prevTodos => [
// // //         ...prevTodos,
// // //         { id: Date.now(), text: inputValue, completed: false }
// // //       ]);
// // //       setInputValue('');
// // //     }
// // //   };

// // //   const toggleTodo = (id) => {
// // //     setTodos(prevTodos =>
// // //       prevTodos.map(todo =>
// // //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
// // //       )
// // //     );
// // //   };

// // //   const deleteTodo = (id) => {
// // //     setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
// // //   };

// // //   return (
// // //     <div>
// // //       <input
// // //         value={inputValue}
// // //         onChange={(e) => setInputValue(e.target.value)}
// // //         placeholder="Add a todo"
// // //       />
// // //       <button onClick={addTodo}>Add</button>
// // //       <ul>
// // //         {todos.map(todo => (
// // //           <li key={todo.id}>
// // //             <span
// // //               style={{
// // //                 textDecoration: todo.completed ? 'line-through' : 'none',
// // //                 cursor: 'pointer'
// // //               }}
// // //               onClick={() => toggleTodo(todo.id)}
// // //             >
// // //               {todo.text}
// // //             </span>
// // //             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // }

// // // export default TodoList;

// // import { useState } from 'react';

// // function TempConverter() {
// //   const [temperature, setTemperature] = useState('');
// //   const [scale, setScale] = useState('c'); // 'c' for Celsius, 'f' for Fahrenheit

// //   // Helper conversion functions
// //   const toCelsius = (f) => ((f - 32) * 5) / 9;
// //   const toFahrenheit = (c) => (c * 9) / 5 + 32;

// //   // Handler for Celsius input change
// //   const handleCelsiusChange = (e) => {
// //     setTemperature(e.target.value);
// //     setScale('c');
// //   };

// //   // Handler for Fahrenheit input change
// //   const handleFahrenheitChange = (e) => {
// //     setTemperature(e.target.value);
// //     setScale('f');
// //   };

// //   // Calculate current values dynamically
// //   const inputVal = parseFloat(temperature);
// //   const isValidNumber = !isNaN(inputVal);

// //   const celsius =
// //     scale === 'f' && isValidNumber
// //       ? toCelsius(inputVal).toFixed(2)
// //       : temperature;

// //   const fahrenheit =
// //     scale === 'c' && isValidNumber
// //       ? toFahrenheit(inputVal).toFixed(2)
// //       : temperature;

// //   return (
// //     <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
// //       <h2>Temperature Converter</h2>

// //       <div style={{ marginBottom: '10px' }}>
// //         <label>Celsius: </label>
// //         <input
// //           type="number"
// //           value={celsius}
// //           onChange={handleCelsiusChange}
// //           placeholder="e.g. 0"
// //         />
// //         <span> °C</span>
// //       </div>

// //       <div>
// //         <label>Fahrenheit: </label>
// //         <input
// //           type="number"
// //           value={fahrenheit}
// //           onChange={handleFahrenheitChange}
// //           placeholder="e.g. 32"
// //         />
// //         <span> °F</span>
// //       </div>
// //     </div>
// //   );
// // }

// // export default TempConverter;

// import { useState } from 'react';

// // Sample products catalog
// const PRODUCTS = [
//   { id: 1, name: 'Apple', price: 2.5 },
//   { id: 2, name: 'Banana', price: 1.2 },
//   { id: 3, name: 'Orange', price: 1.8 },
//   { id: 4, name: 'Mango', price: 3.0 },
// ];

// function ShoppingCart() {
//   const [cart, setCart] = useState([]);

//   // Add item to cart (or increment quantity if already present)
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);

//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }

//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   // Remove single item completely from cart
//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//   };

//   // Decrease quantity (removes item if quantity drops to 0)
//   const decreaseQuantity = (productId) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   // Calculate total price dynamically
//   const totalPrice = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
//       <h2>Products Catalog</h2>
//       <ul>
//         {PRODUCTS.map((product) => (
//           <li key={product.id} style={{ marginBottom: '8px' }}>
//             <span>
//               {product.name} - ${product.price.toFixed(2)}
//             </span>{' '}
//             <button onClick={() => addToCart(product)}>Add to Cart</button>
//           </li>
//         ))}
//       </ul>

//       <hr />

//       <h2>Your Shopping Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul>
//             {cart.map((item) => (
//               <li key={item.id} style={{ marginBottom: '8px' }}>
//                 <span>
//                   {item.name} (${item.price.toFixed(2)}) x {item.quantity} = $
//                   {(item.price * item.quantity).toFixed(2)}
//                 </span>{' '}
//                 <button onClick={() => addToCart(item)}>+</button>{' '}
//                 <button onClick={() => decreaseQuantity(item.id)}>-</button>{' '}
//                 <button onClick={() => removeFromCart(item.id)}>Remove</button>
//               </li>
//             ))}
//           </ul>

//           <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
//         </>
//       )}
//     </div>
//   );
// }

// export default ShoppingCart;


import { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  
  // Form input states
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Handle adding a new expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount || parseFloat(amount) <= 0) return;

    const newExpense = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      category: category,
    };

    setExpenses((prev) => [...prev, newExpense]);

    // Reset form inputs
    setDescription('');
    setAmount('');
    setCategory(CATEGORIES[0]);
  };

  // Handle deleting an expense
  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  // Filter expenses list based on dropdown selection
  const filteredExpenses =
    selectedCategory === 'All'
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  // Calculate total price of filtered expenses
  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h2>Personal Expense Tracker</h2>

      {/* Add Expense Form */}
      <form onSubmit={handleAddExpense} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '8px' }}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginRight: '8px' }}
            required
          />
          <input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            style={{ marginRight: '8px' }}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginRight: '8px' }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button type="submit">Add Expense</button>
        </div>
      </form>

      <hr />

      {/* Filter Section */}
      <div style={{ margin: '15px 0' }}>
        <label>Filter by Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Expenses List */}
      <h3>Expense List</h3>
      {filteredExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul style={{ paddingLeft: '20px' }}>
          {filteredExpenses.map((expense) => (
            <li key={expense.id} style={{ marginBottom: '8px' }}>
              <strong>{expense.description}</strong> - ${expense.amount.toFixed(2)}{' '}
              <em>({expense.category})</em>{' '}
              <button
                onClick={() => handleDeleteExpense(expense.id)}
                style={{ marginLeft: '10px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Total Amount */}
      <h3>
        Total Expenses ({selectedCategory}): ${totalAmount.toFixed(2)}
      </h3>
    </div>
  );
}

export default ExpenseTracker; 
  