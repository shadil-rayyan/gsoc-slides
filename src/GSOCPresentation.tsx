import { useState } from 'react';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import slides from './slideData.json';

type Block = {
  type: 'paragraph' | 'bullet';
  text: string;
};

type Slide = {
  title: string;
  image?: string;
  blocks: Block[];
};

const GSOCPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSlideChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSlide(parseInt(e.target.value, 10));
  };

  const current = slides[currentSlide] as Slide;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-10 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Google Summer of Code
          </h1>

          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full border"
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun size={28} className="text-yellow-400" />
            ) : (
              <Moon size={28} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Slide Counter */}
        <p className="text-xl mb-6">
          Slide {currentSlide + 1} / {slides.length}
        </p>

        {/* Slide */}
        <div
          className={`rounded-2xl shadow-2xl transition-all duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-14 min-h-[80vh] flex flex-col justify-center`}
        >
          {/* Title */}
          <h2
            className={`text-5xl md:text-6xl font-bold mb-12 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            {current.title}
          </h2>

          {/* Slide Content */}
          <div className="flex flex-col md:flex-row gap-16 items-center justify-center flex-1">
            <ul className="flex-1 space-y-10 text-3xl md:text-4xl leading-relaxed">
              {current.blocks.map((block, idx) => (
                <li key={idx} className="flex items-start gap-6">
                  {block.type === 'bullet' && (
                    <span className="text-blue-500 text-4xl mt-1">•</span>
                  )}
                  <span>{block.text}</span>
                </li>
              ))}
            </ul>

            {currentSlide === 0 && current.image && (
              <img
                src={current.image}
                alt="Profile"
                className="w-56 h-56 md:w-64 md:h-64 rounded-full shadow-xl"
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-4 rounded-full border ${
              currentSlide === 0
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-blue-600 hover:text-white'
            }`}
          >
            <ChevronLeft size={26} />
          </button>

          <select
            value={currentSlide}
            onChange={handleSlideChange}
            className={`text-lg px-4 py-2 rounded border ${
              darkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-white border-gray-300'
            }`}
          >
            {slides.map((slide, index) => (
              <option key={index} value={index}>
                {slide.title}
              </option>
            ))}
          </select>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`p-4 rounded-full border ${
              currentSlide === slides.length - 1
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-blue-600 hover:text-white'
            }`}
          >
            <ChevronRight size={26} />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-lg opacity-80">
          <p>
            Content by{' '}
            <a
              href="https://github.com/shadil-rayyan"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-400 hover:underline"
            >
              Shadil A M
            </a>{' '}
            · Website by{' '}
            <a
              href="https://github.com/vishvamsinh28"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-400 hover:underline"
            >
              Vishvamsinh Vaghela
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default GSOCPresentation;
