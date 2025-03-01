import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <div className='flex min-w-screen lg:min-w-[40vw] min-h-[70vh]'>
      <div className="my-auto mx-auto">
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-8xl font-black text-red-600/50">404</h2>
      <p className="text-4xl mt-4">Page Not Found</p>
      <Link to="/" className="mt-10 px-4 py-2 focus:ring-2 ring-indigo-700 bg-[#535bf2]/20 text-white rounded hover:bg-[#535bf2]/10">
        Go to Home
      </Link>
    </div>
    </div>
    </div>
  );
}

export default Error404;