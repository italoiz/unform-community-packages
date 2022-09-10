import { useState, useCallback } from 'react';

export function useRandomPerson() {
  const [loading, setLoading] = useState(false);

  const loadNewPerson = useCallback(async () => {
    setLoading(true);
    const data = await fetch('https://randomuser.me/api/?results=1')
      .then(res => {
        return res.json();
      })
      .then(res => res.results[0]);
    setLoading(false);
    return data;
  }, []);

  return { loading, loadNewPerson };
}
