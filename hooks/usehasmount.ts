import { useState, useEffect } from 'react';

const useHasMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

export default useHasMounted;
