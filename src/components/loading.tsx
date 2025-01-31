
const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert w-full'>
        <span className='sr-only'>Loading...</span>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
      </div>
    </div>
  );
};

export default Loading;