import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return (
    <div>
      <h1 className='text-yellow-400 font-black text-4xl'>{formattedTime}</h1>
    </div>
  );
};

export default Clock;