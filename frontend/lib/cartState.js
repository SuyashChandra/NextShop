import { useContext, createContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our own Custom Provider, We will store our own data(state) and functionality(updaters)  in here and anyone can access it via the consumer!

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider value={{ cartOpen, setCartOpen, openCart, closeCart }}>
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook fir accessing the cart local state
function useCart() {
  // We use a consumer here ti access the local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
