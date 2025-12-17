import { useState } from 'react';
import slidesData from './slideData.json';

type Block = {
  type: 'paragraph' | 'bullet' | 'image' | 'code' | 'quote';
  text?: string;
  src?: string; // for images
};

type Slide = {
  title: string;
  image?: string;
  blocks: Block[];
};

// Component for editing a single block
const SlideBlockEditor = ({
  slideIndex,
  blockIndex,
  block,
  updateBlock,
  removeBlock,
  moveBlock,
}: {
  slideIndex: number;
  blockIndex: number;
  block: Block;
  updateBlock: (i: number, j: number, value: string) => void;
  removeBlock: (i: number, j: number) => void;
  moveBlock: (i: number, j: number, direction: 'up' | 'down') => void;
}) => {
  return (
    <div className="flex gap-3 items-start mb-2">
      <span className="mt-2 text-xs text-gray-500">
        {block.type === 'bullet' ? '•' : block.type === 'paragraph' ? '¶' : block.type === 'code' ? '{ }' : block.type === 'quote' ? '❝' : '🖼'}
      </span>

      {block.type === 'image' ? (
        <input
          type="text"
          className="w-full border p-2"
          placeholder="Image URL..."
          value={block.src || ''}
          onChange={(e) => {
            const value = e.target.value;
            updateBlock(slideIndex, blockIndex, value);
          }}
        />
      ) : (
        <textarea
          className="w-full border p-2"
          rows={block.type === 'paragraph' ? 3 : 2}
          value={block.text}
          placeholder={
            block.type === 'paragraph'
              ? 'Paragraph text...'
              : block.type === 'bullet'
              ? 'Bullet point...'
              : block.type === 'code'
              ? 'Code snippet...'
              : 'Quote...'
          }
          onChange={(e) => updateBlock(slideIndex, blockIndex, e.target.value)}
        />
      )}

      <div className="flex flex-col gap-1">
        <button onClick={() => moveBlock(slideIndex, blockIndex, 'up')} className="text-xs">
          ↑
        </button>
        <button onClick={() => moveBlock(slideIndex, blockIndex, 'down')} className="text-xs">
          ↓
        </button>
        <button onClick={() => removeBlock(slideIndex, blockIndex)} className="text-red-500 text-sm">
          ✕
        </button>
      </div>
    </div>
  );
};

const SlideEditor = () => {
  const [slides, setSlides] = useState<Slide[]>(slidesData as Slide[]);

  // Slide actions
  const updateTitle = (i: number, value: string) => {
    const copy = [...slides];
    copy[i].title = value;
    setSlides(copy);
  };

  const addSlide = () => {
    setSlides([
      ...slides,
      {
        title: 'New Slide',
        blocks: [{ type: 'paragraph', text: '' }],
      },
    ]);
  };

  const removeSlide = (i: number) => {
    const copy = [...slides];
    copy.splice(i, 1);
    setSlides(copy);
  };

  const moveSlide = (i: number, direction: 'up' | 'down') => {
    const copy = [...slides];
    const newIndex = direction === 'up' ? i - 1 : i + 1;
    if (newIndex < 0 || newIndex >= slides.length) return;
    [copy[i], copy[newIndex]] = [copy[newIndex], copy[i]];
    setSlides(copy);
  };

  // Block actions
  const updateBlock = (i: number, j: number, value: string) => {
    const copy = [...slides];
    const block = copy[i].blocks[j];
    if (block.type === 'image') block.src = value;
    else block.text = value;
    setSlides(copy);
  };

  const addBlock = (i: number, type: Block['type']) => {
    const copy = [...slides];
    if (type === 'image') copy[i].blocks.push({ type, src: '' });
    else copy[i].blocks.push({ type, text: '' });
    setSlides(copy);
  };

  const removeBlock = (i: number, j: number) => {
    const copy = [...slides];
    copy[i].blocks.splice(j, 1);
    setSlides(copy);
  };

  const moveBlock = (i: number, j: number, direction: 'up' | 'down') => {
    const copy = [...slides];
    const newIndex = direction === 'up' ? j - 1 : j + 1;
    if (newIndex < 0 || newIndex >= copy[i].blocks.length) return;
    [copy[i].blocks[j], copy[i].blocks[newIndex]] = [copy[i].blocks[newIndex], copy[i].blocks[j]];
    setSlides(copy);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">🛠 Dev Slide Editor</h1>

      {slides.map((slide, i) => (
        <div key={i} className="border border-gray-300 p-5 rounded-lg space-y-4">
          {/* Slide Header */}
          <div className="flex justify-between items-center mb-2">
            <input
              className="w-full text-2xl font-semibold border p-2"
              value={slide.title}
              onChange={(e) => updateTitle(i, e.target.value)}
              placeholder="Slide title"
            />
            <div className="flex gap-2">
              <button onClick={() => moveSlide(i, 'up')} className="text-sm">
                ↑
              </button>
              <button onClick={() => moveSlide(i, 'down')} className="text-sm">
                ↓
              </button>
              <button onClick={() => removeSlide(i)} className="text-red-600 text-sm">
                Delete
              </button>
            </div>
          </div>

          {/* Slide Blocks */}
          {slide.blocks.map((block, j) => (
            <SlideBlockEditor
              key={j}
              slideIndex={i}
              blockIndex={j}
              block={block}
              updateBlock={updateBlock}
              removeBlock={removeBlock}
              moveBlock={moveBlock}
            />
          ))}

          {/* Add Block Buttons */}
          <div className="flex gap-4 mt-2">
            <button onClick={() => addBlock(i, 'paragraph')} className="text-sm text-blue-600">
              + Paragraph
            </button>
            <button onClick={() => addBlock(i, 'bullet')} className="text-sm text-green-600">
              + Bullet
            </button>
            <button onClick={() => addBlock(i, 'image')} className="text-sm text-purple-600">
              + Image
            </button>
            <button onClick={() => addBlock(i, 'code')} className="text-sm text-yellow-600">
              + Code
            </button>
            <button onClick={() => addBlock(i, 'quote')} className="text-sm text-pink-600">
              + Quote
            </button>
          </div>
        </div>
      ))}

      {/* Add Slide Button */}
      <button onClick={addSlide} className="px-4 py-2 bg-green-600 text-white rounded">
        + Add New Slide
      </button>

      {/* JSON Output */}
      <div>
        <h2 className="text-xl font-bold mt-8">📦 Generated JSON</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-[400px]">
          {JSON.stringify(slides, null, 2)}
        </pre>
        <p className="text-sm text-gray-500 mt-2">
          Copy this into <code>slideData.json</code>
        </p>
      </div>
    </div>
  );
};

export default SlideEditor;
