import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { FileEdit, Eye, Github } from 'lucide-react';

const defaultMarkdown = `# Welcome to my Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And ~~strike through~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true
    });

    // Convert markdown to HTML and sanitize
    const rawHtml = marked(markdown);
    const cleanHtml = DOMPurify.sanitize(rawHtml);
    setPreview(cleanHtml);
  }, [markdown]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileEdit className="w-6 h-6" />
            Markdown Previewer
          </h1>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-200 transition-colors"
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 mt-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Editor Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 flex items-center gap-2">
              <FileEdit className="w-5 h-5" />
              <h2 className="font-semibold">Editor</h2>
            </div>
            <textarea
              id="editor"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[calc(100vh-16rem)] p-4 font-mono text-gray-800 resize-none focus:outline-none"
              spellCheck="false"
            />
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <h2 className="font-semibold">Preview</h2>
            </div>
            <div
              id="preview"
              className="prose max-w-none p-6 h-[calc(100vh-16rem)] overflow-auto"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;