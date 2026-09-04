/**
 * Central Catalog & Configuration for ResumeForge File Tools
 */

export const TOOL_CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'pdf', label: 'PDF Tools' },
  { id: 'document', label: 'Document Tools' },
  { id: 'utility', label: 'File Utilities' }
];

export const FILE_TOOLS = [
  // ==========================================
  // CATEGORY 1: PDF TOOLS
  // ==========================================
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    slug: 'merge-pdf',
    route: '/file-tools/merge-pdf',
    description: 'Combine multiple PDF files into one clean, ordered document.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'available',
    icon: 'Layers',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-700',
    metaTitle: 'Merge PDF Online Free – Combine PDF Files | ResumeForge',
    metaDescription: 'Merge and combine multiple PDF documents into a single file online. 100% free, private in-browser processing, and fast download.',
    accept: { 'application/pdf': ['.pdf'] },
    acceptSummary: 'PDF documents only (.pdf)',
    multiple: true,
    maxFiles: 30,
    maxFileSizeMB: 50,
    features: [
      'Drag and drop files to reorder pages seamlessly',
      '100% client-side privacy — files never leave your browser',
      'No size or file count limits during local processing',
      'Instant download of single merged PDF'
    ],
    faq: [
      {
        question: 'Are my files uploaded to your servers when merging?',
        answer: 'No. All PDF processing happens directly inside your web browser using modern WebAssembly and JavaScript. Your documents remain 100% confidential.'
      },
      {
        question: 'Can I rearrange the order of PDFs before merging?',
        answer: 'Yes! Use the Up and Down arrow buttons or drag to place your PDF files in the exact sequence you desire.'
      }
    ]
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    slug: 'split-pdf',
    route: '/file-tools/split-pdf',
    description: 'Separate one PDF into individual pages or extract specific page ranges.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'available',
    icon: 'Scissors',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    iconBg: 'bg-indigo-100 text-indigo-700',
    metaTitle: 'Split PDF Online Free – Extract Pages from PDF | ResumeForge',
    metaDescription: 'Split PDF pages online for free. Extract custom page ranges or save all pages as separate PDF documents directly in your browser.',
    accept: { 'application/pdf': ['.pdf'] },
    acceptSummary: 'PDF documents only (.pdf)',
    multiple: false,
    maxFiles: 1,
    maxFileSizeMB: 60,
    features: [
      'Extract custom page ranges (e.g. 1-3, 5, 8-10)',
      'Option to unpack all pages into individual files inside a ZIP',
      'Live total page count detection',
      'Completely private in-memory processing'
    ],
    faq: [
      {
        question: 'How do I specify which pages to split?',
        answer: 'You can choose "All Pages as ZIP" to separate every page, or choose "Custom Range" and type commas or dashes like "1-3, 5, 7".'
      }
    ]
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    slug: 'compress-pdf',
    route: '/file-tools/compress-pdf',
    description: 'Reduce PDF file size while keeping visual clarity for emails and portals.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'available',
    icon: 'Minimize2',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    iconBg: 'bg-sky-100 text-sky-700',
    metaTitle: 'Compress PDF Online Free – Reduce PDF File Size | ResumeForge',
    metaDescription: 'Reduce your PDF file size online without losing readability. Instant client-side compression for job applications, emails, and uploads.',
    accept: { 'application/pdf': ['.pdf'] },
    acceptSummary: 'PDF documents only (.pdf)',
    multiple: false,
    maxFiles: 1,
    maxFileSizeMB: 100,
    features: [
      'Object stream compression and metadata dictionary optimization',
      'Shows exact byte savings and percentage reduced',
      'Ideal for meeting 2MB application portal limits',
      'Safe and private client-side optimization'
    ],
    faq: [
      {
        question: 'Will compressing my resume damage the text sharpness?',
        answer: 'No. The standard compression mode optimizes PDF streams and object tables losslessly, ensuring vector fonts and layout lines stay crisp.'
      }
    ]
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    slug: 'pdf-to-jpg',
    route: '/file-tools/pdf-to-jpg',
    description: 'Convert PDF document pages into high-resolution JPG images.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'available',
    icon: 'Image',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-100 text-amber-700',
    metaTitle: 'PDF to JPG Converter Free Online | ResumeForge',
    metaDescription: 'Convert PDF pages into high quality JPG images online. Export single pages as JPG or download all pages packaged in a ZIP.',
    accept: { 'application/pdf': ['.pdf'] },
    acceptSummary: 'PDF documents only (.pdf)',
    multiple: false,
    maxFiles: 1,
    maxFileSizeMB: 50,
    features: [
      'Crisp 2x high-DPI canvas rendering',
      'Instant preview thumbnails of rendered pages',
      'Multi-page documents packaged as ZIP',
      'Runs locally using HTML5 Canvas'
    ],
    faq: [
      {
        question: 'How do I download multiple converted pages?',
        answer: 'If your PDF contains multiple pages, ResumeForge bundles all converted high-res JPG files into a single convenient ZIP file.'
      }
    ]
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    slug: 'jpg-to-pdf',
    route: '/file-tools/jpg-to-pdf',
    description: 'Transform JPG, PNG, or WebP images into a single professional PDF document.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'available',
    icon: 'FileImage',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    iconBg: 'bg-purple-100 text-purple-700',
    metaTitle: 'JPG to PDF Converter Free Online | ResumeForge',
    metaDescription: 'Convert JPG, PNG, and images into a single PDF document online. Customize orientation and page fitting with instant download.',
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    acceptSummary: 'Images (.jpg, .jpeg, .png, .webp)',
    multiple: true,
    maxFiles: 50,
    maxFileSizeMB: 50,
    features: [
      'Supports JPG, JPEG, PNG, and WebP',
      'Automatic orientation and A4 canvas fitting',
      'Reorder images before generating PDF',
      'Preserves original color reproduction'
    ],
    faq: [
      {
        question: 'Can I combine multiple photos into one PDF?',
        answer: 'Yes! Upload multiple images at once, rearrange their order with the arrow buttons, and click Convert.'
      }
    ]
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    slug: 'pdf-to-word',
    route: '/file-tools/pdf-to-word',
    description: 'Convert PDF documents into editable Microsoft Word (.docx) files.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'coming-soon',
    icon: 'FileText',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100 text-slate-600',
    metaTitle: 'PDF to Word Converter Online | ResumeForge',
    metaDescription: 'Convert PDF files to editable DOCX documents online. Coming soon to ResumeForge file tools.',
    features: ['Accurate typography preservation', 'Editable paragraph conversion', 'Table structure recognition']
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    slug: 'word-to-pdf',
    route: '/file-tools/word-to-pdf',
    description: 'Transform DOCX documents into clean, immutable PDF files.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'coming-soon',
    icon: 'FileCode2',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100 text-slate-600',
    metaTitle: 'Word to PDF Converter Online | ResumeForge',
    metaDescription: 'Convert Word DOCX files into PDF documents online. Coming soon to ResumeForge file tools.',
    features: ['Flawless font embedding', 'Fixed print margins', 'Cross-platform fidelity']
  },
  {
    id: 'pdf-to-png',
    title: 'PDF to PNG',
    slug: 'pdf-to-png',
    route: '/file-tools/pdf-to-png',
    description: 'Export PDF pages as lossless, transparent PNG graphic files.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'coming-soon',
    icon: 'ImagePlus',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100 text-slate-600',
    metaTitle: 'PDF to PNG Converter Online | ResumeForge',
    metaDescription: 'Convert PDF pages to lossless PNG images. Coming soon to ResumeForge.',
    features: ['Lossless pixel clarity', 'Transparent background support', 'High-DPI rasterization']
  },
  {
    id: 'png-to-pdf',
    title: 'PNG to PDF',
    slug: 'png-to-pdf',
    route: '/file-tools/png-to-pdf',
    description: 'Combine transparent PNG graphics and screenshots into a PDF.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'coming-soon',
    icon: 'FileCheck',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100 text-slate-600',
    metaTitle: 'PNG to PDF Converter Online | ResumeForge',
    metaDescription: 'Convert PNG graphics to PDF documents. Coming soon to ResumeForge.',
    features: ['Alpha transparency preservation', 'Multi-image sequencing', 'Custom margin control']
  },
  {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    slug: 'rotate-pdf',
    route: '/file-tools/rotate-pdf',
    description: 'Permanently rotate sideways or upside-down PDF pages by 90, 180, or 270 degrees.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'coming-soon',
    icon: 'RotateCw',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100 text-slate-600',
    metaTitle: 'Rotate PDF Online | ResumeForge',
    metaDescription: 'Rotate PDF pages permanently online. Coming soon to ResumeForge.',
    features: ['Per-page rotation preview', 'Bulk 90° clockwise/counter-clockwise', 'Lossless metadata preservation']
  },
  {
    id: 'reorder-pdf-pages',
    title: 'Reorder PDF Pages',
    slug: 'reorder-pdf-pages',
    route: '/file-tools/reorder-pdf-pages',
    description: 'Rearrange, sort, or delete individual pages inside a multi-page PDF.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    status: 'coming-soon',
    icon: 'ArrowUpDown',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100 text-slate-600',
    metaTitle: 'Reorder PDF Pages Online | ResumeForge',
    metaDescription: 'Rearrange and organize pages in your PDF file with visual drag and drop. Coming soon.',
    features: ['Visual page grid', 'Drag-and-drop page sequencing', 'Single-click page deletion']
  },

  // ==========================================
  // CATEGORY 2: DOCUMENT TOOLS
  // ==========================================
  {
    id: 'text-to-pdf',
    title: 'Text to PDF',
    slug: 'text-to-pdf',
    route: '/file-tools/text-to-pdf',
    description: 'Convert plain text (.txt) files or code snippets into formatted PDF pages.',
    category: 'document',
    categoryLabel: 'Document Tools',
    status: 'coming-soon',
    icon: 'FileText',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100 text-slate-600',
    metaTitle: 'Text to PDF Converter Online | ResumeForge',
    metaDescription: 'Convert plain text files and code into clean PDFs. Coming soon to ResumeForge.',
    features: ['Monospace & serif font options', 'Automatic line wrapping & pagination', 'Configurable margins']
  },

  // ==========================================
  // CATEGORY 3: FILE UTILITIES
  // ==========================================
  {
    id: 'create-zip',
    title: 'Create ZIP',
    slug: 'create-zip',
    route: '/file-tools/create-zip',
    description: 'Compress multiple files and documents into a single .zip archive.',
    category: 'utility',
    categoryLabel: 'File Utilities',
    status: 'available',
    icon: 'Archive',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    iconBg: 'bg-teal-100 text-teal-700',
    metaTitle: 'Create ZIP Archive Online Free | ResumeForge',
    metaDescription: 'Zip and compress multiple files into a single archive file online. Free, secure client-side compression without uploading files.',
    accept: { '*/*': [] },
    acceptSummary: 'Any files (documents, images, PDFs, archives)',
    multiple: true,
    maxFiles: 50,
    maxFileSizeMB: 150,
    features: [
      'Compress any file types together',
      'Custom archive naming',
      'Deflate level 6 compression for optimal space saving',
      'No data uploaded to servers — 100% private'
    ],
    faq: [
      {
        question: 'What types of files can I add to a ZIP?',
        answer: 'You can add any files: PDFs, images, spreadsheets, code files, documents, and videos.'
      }
    ]
  },
  {
    id: 'extract-zip',
    title: 'Extract ZIP',
    slug: 'extract-zip',
    route: '/file-tools/extract-zip',
    description: 'Open, inspect, and extract files from a .zip archive directly in your browser.',
    category: 'utility',
    categoryLabel: 'File Utilities',
    status: 'available',
    icon: 'FolderArchive',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-100 text-blue-700',
    metaTitle: 'Extract ZIP Archive Online Free – Unzip Files | ResumeForge',
    metaDescription: 'Unzip and extract files from ZIP archives directly in your browser. Download individual files or all files with zero server uploads.',
    accept: {
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip'],
      'multipart/x-zip': ['.zip']
    },
    acceptSummary: 'ZIP archives only (.zip)',
    multiple: false,
    maxFiles: 1,
    maxFileSizeMB: 100,
    features: [
      'Inspect archive contents and folder structures',
      'Download individual files with one click',
      'Batch extraction without installing extra software',
      'Instant client-side decompression'
    ],
    faq: [
      {
        question: 'Do I need to install WinZip or 7-Zip?',
        answer: 'No! ResumeForge unpacks standard ZIP archives natively inside your browser.'
      }
    ]
  },
  {
    id: 'rename-files',
    title: 'Rename Files',
    slug: 'rename-files',
    route: '/file-tools/rename-files',
    description: 'Batch rename multiple files with prefixes, suffixes, numbering, and patterns.',
    category: 'utility',
    categoryLabel: 'File Utilities',
    status: 'coming-soon',
    icon: 'FileEdit',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100 text-slate-600',
    metaTitle: 'Batch File Renamer Online | ResumeForge',
    metaDescription: 'Rename files in bulk online with pattern replacements. Coming soon.',
    features: ['Sequential numbering', 'Case conversion', 'Search & replace strings']
  },
  {
    id: 'combine-files',
    title: 'Combine Files',
    slug: 'combine-files',
    route: '/file-tools/combine-files',
    description: 'Package multiple heterogeneous files into an organized portfolio package.',
    category: 'utility',
    categoryLabel: 'File Utilities',
    status: 'coming-soon',
    icon: 'Package',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100 text-slate-600',
    metaTitle: 'Combine Files Online | ResumeForge',
    metaDescription: 'Combine multiple files into a portfolio bundle. Coming soon.',
    features: ['Unified document packaging', 'Index table of contents', 'Multi-format compilation']
  }
];

export const getToolBySlug = (slug) => {
  return FILE_TOOLS.find(tool => tool.slug === slug || tool.id === slug);
};

export const getToolsByCategory = (category) => {
  if (!category || category === 'all') return FILE_TOOLS;
  return FILE_TOOLS.filter(tool => tool.category === category);
};

