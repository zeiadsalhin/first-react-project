import {useEffect} from 'react';

function About() {
  useEffect(() => {
      document.title = 'About Us';
    }, []);

  return (
    <div>
      <h2 className='text-4xl font-semibold'>About Us</h2>
      <div className="w-[3rem] bg-indigo-600/80 mt-4 mx-auto h-1 rounded-2xl"></div>
      <p className='my-5 font-mono opacity-90 flex justify-center gap-2'>
        App created by 
        <a href="https://github.com/zeiadsalhin" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
        Alfa☘
        </a>
      </p>
    </div>
  );
}

export default About;
