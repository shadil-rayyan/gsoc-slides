import { useState } from "react";
import slidesData from "./slideData.json";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* ---------------- TYPES ---------------- */

type Block = {
  type: "paragraph" | "bullet" | "image" | "code" | "quote";
  text?: string;
  src?: string;
};

type Slide = {
  title: string;
  image?: string;
  blocks: Block[];
};

/* ---------------- BLOCK EDITOR ---------------- */

const SlideBlockEditor = ({
  slideIndex,
  blockIndex,
  block,
  updateBlock,
  removeBlock,
}: {
  slideIndex: number;
  blockIndex: number;
  block: Block;
  updateBlock: (i: number, j: number, value: string) => void;
  removeBlock: (i: number, j: number) => void;
}) => {
  return (
    <div className="flex gap-3 items-start mb-2">
      <span className="mt-2 text-xs text-gray-500">
        {block.type === "bullet"
          ? "•"
          : block.type === "paragraph"
          ? "¶"
          : block.type === "code"
          ? "{ }"
          : block.type === "quote"
          ? "❝"
          : "🖼"}
      </span>

      {block.type === "image" ? (
        <input
          type="text"
          className="w-full border p-2"
          placeholder="Image URL..."
          value={block.src || ""}
          onChange={(e) => updateBlock(slideIndex, blockIndex, e.target.value)}
        />
      ) : (
        <textarea
          className="w-full border p-2"
          rows={block.type === "paragraph" ? 3 : 2}
          value={block.text || ""}
          placeholder={`${block.type}...`}
          onChange={(e) => updateBlock(slideIndex, blockIndex, e.target.value)}
        />
      )}

      <button
        onClick={() => removeBlock(slideIndex, blockIndex)}
        className="text-red-500 text-sm"
      >
        ✕
      </button>
    </div>
  );
};

/* ---------------- SORTABLE SLIDE ---------------- */

const SortableSlide = ({
  slide,
  index,
  updateTitle,
  removeSlide,
  addBlock,
  updateBlock,
  removeBlock,
}: {
  slide: Slide;
  index: number;
  updateTitle: (i: number, v: string) => void;
  removeSlide: (i: number) => void;
  addBlock: (i: number, t: Block["type"]) => void;
  updateBlock: (i: number, j: number, v: string) => void;
  removeBlock: (i: number, j: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-300 p-5 rounded-lg space-y-4 bg-white"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 text-sm"
      >
        ☰ Drag Slide
      </div>

      {/* Title */}
      <input
        className="w-full text-2xl font-semibold border p-2"
        value={slide.title}
        onChange={(e) => updateTitle(index, e.target.value)}
      />

      {/* Blocks */}
      {slide.blocks.map((block, j) => (
        <SlideBlockEditor
          key={j}
          slideIndex={index}
          blockIndex={j}
          block={block}
          updateBlock={updateBlock}
          removeBlock={removeBlock}
        />
      ))}

      {/* Add Block */}
      <div className="flex gap-4">
        {(["paragraph", "bullet", "image", "code", "quote"] as const).map(
          (t) => (
            <button
              key={t}
              onClick={() => addBlock(index, t)}
              className="text-sm text-blue-600"
            >
              + {t}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => removeSlide(index)}
        className="text-red-600 text-sm"
      >
        Delete Slide
      </button>
    </div>
  );
};

/* ---------------- MAIN EDITOR ---------------- */

const SlideEditor = () => {
  const [slides, setSlides] = useState<Slide[]>(slidesData as Slide[]);

  const updateTitle = (i: number, v: string) => {
    const copy = [...slides];
    copy[i].title = v;
    setSlides(copy);
  };

  const addSlide = () => {
    setSlides([
      ...slides,
      { title: "New Slide", blocks: [{ type: "paragraph", text: "" }] },
    ]);
  };

  const removeSlide = (i: number) => {
    const copy = [...slides];
    copy.splice(i, 1);
    setSlides(copy);
  };

  const addBlock = (i: number, type: Block["type"]) => {
    const copy = [...slides];
    copy[i].blocks.push(
      type === "image" ? { type, src: "" } : { type, text: "" }
    );
    setSlides(copy);
  };

  const updateBlock = (i: number, j: number, v: string) => {
    const copy = [...slides];
    copy[i].blocks[j].type === "image"
      ? (copy[i].blocks[j].src = v)
      : (copy[i].blocks[j].text = v);
    setSlides(copy);
  };

  const removeBlock = (i: number, j: number) => {
    const copy = [...slides];
    copy[i].blocks.splice(j, 1);
    setSlides(copy);
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSlides((items) => arrayMove(items, active.id, over.id));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">🛠 Drag & Drop Slide Editor</h1>

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          items={slides.map((_, i) => i)}
          strategy={verticalListSortingStrategy}
        >
          {slides.map((slide, i) => (
            <SortableSlide
              key={i}
              slide={slide}
              index={i}
              updateTitle={updateTitle}
              removeSlide={removeSlide}
              addBlock={addBlock}
              updateBlock={updateBlock}
              removeBlock={removeBlock}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        onClick={addSlide}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        + Add Slide
      </button>

      <pre className="bg-black text-green-400 p-4 rounded max-h-[400px] overflow-auto">
        {JSON.stringify(slides, null, 2)}
      </pre>
    </div>
  );
};

export default SlideEditor;
