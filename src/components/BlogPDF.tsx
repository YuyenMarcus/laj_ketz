'use client';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

type BlogPDFProps = {
  pdfUrl: string;
};

export default function BlogPDF({ pdfUrl }: BlogPDFProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-[#1F5F3A]/30 bg-white shadow-lg dark:bg-[#04150c]">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
}
