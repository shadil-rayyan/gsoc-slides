
# 🖥️ Google Summer of Code (GSoC) 2025 Interactive Guide

> A fully interactive, drag-and-drop slide editor and presentation for students exploring Google Summer of Code (GSoC) 2025.  
> Forked and extended from [Vishvamsinh Vaghela](https://github.com/vishvamsinh28)'s original guide.  

**Created by [Shadil A M](https://github.com/shadil-rayyan)**

---

## 📖 Overview

This project is an **interactive presentation tool** designed to guide students through GSoC 2025, covering everything from open source fundamentals to applying successfully:

- What is Open Source & why it matters
- Google Summer of Code program structure and timeline
- Eligibility and selection criteria
- Choosing the right organization
- Proposal writing best practices
- Starting contributions to open-source projects
- Real-world examples and tips from past contributors

Unlike traditional slide decks, this project allows **live editing and dynamic slide reordering** using a JSON-based data structure.

---

## ⚡ Features

- **Drag & Drop Slide Editor**: Reorder slides using an intuitive drag handle.[(local/dev-editor) page]
- **Block Types**: Supports paragraphs, bullet points, images, code snippets, and quotes.
- **Add / Remove Blocks and Slides**: Fully dynamic editing without touching code.
- **Live JSON Preview**: See the current slide structure in real-time.
- **Responsive Layout**: Optimized for desktop and mobile screens.
- **Dark Mode Ready**: Easy to style for presentation or editor view.
- **Forked & Enhanced**: Built on top of the original GSoC guide by Vishvamsinh Vaghela, with extended editing features and UI improvements.

---

## 🛠️ Technologies Used

- **React.js** – Frontend UI
- **Tailwind CSS** – Styling and responsive design
- **Dnd-kit** – Drag-and-drop functionality for slides and blocks
- **Lucide React Icons** – Interactive icons for navigation and UI
- **JSON** – Stores and manages slide content dynamically

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shadil-rayyan/gsoc-slide-editor.git
   cd gsoc-slide-editor


2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000) and start editing slides in real-time!

---

## 🗂️ Slide Structure

Slides are stored in a JSON file (`slideData.json`) with the following structure:

```json
[
  {
    "title": "Slide Title",
    "image": "optional-image-url",
    "blocks": [
      { "type": "paragraph", "text": "Some paragraph text" },
      { "type": "bullet", "text": "Bullet point" },
      { "type": "code", "text": "console.log('Hello World');" },
      { "type": "quote", "text": "This is a quote" },
      { "type": "image", "src": "image-url" }
    ]
  }
]


* Easily add, remove, or edit slides without touching code.
* Supports multiple block types per slide.
* Drag-and-drop reordering updates the JSON structure automatically.

---

## 🎨 UI / UX Highlights

* **Big Slide Preview** – Each slide scales to fill the viewport for a true presentation feel.
* **Block Indicators** – Visual icons indicate block type (`¶`, `•`, `{ }`, `❝`, `🖼`).
* **Editable Titles & Blocks** – Type directly in the UI for instant updates.
* **Real-Time Feedback** – JSON output reflects current state for developers.

---

## 🤝 Contributing

This repository is **open to contributors**!

* Add new block types or slide features.
* Improve styling or dark mode support.
* Optimize drag-and-drop experience.
* Report issues or suggest new content for GSoC slides.

**Please fork the repository, make your changes, and submit a pull request.**

---

## 📜 License

MIT License © 2025 [Shadil A M](https://github.com/shadil-rayyan)

> Forked from [Vishvamsinh Vaghela](https://github.com/vishvamsinh28)'s original GSoC guide, with extended features and improvements.

---



**Made with 💙 for aspiring GSoC contributors.**
