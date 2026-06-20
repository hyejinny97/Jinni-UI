'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const Iframe = ({
  title,
  children,
  onLoad,
  style,
  ...rest
}: {
  title: string;
  children: React.ReactNode;
  onLoad?: (iframeDoc: Document) => void;
  style?: React.CSSProperties;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const doc = iframe.contentDocument;
      if (doc) {
        const style = doc.createElement('style');
        style.innerHTML = `
          body {
            margin: 0;
            font-family: sans-serif;
          }
        `;
        doc.head.appendChild(style);
        onLoad?.(doc);
        setIframeBody(doc.body);
      }
    };

    if (iframe.contentDocument?.readyState === 'complete') {
      handleLoad();
    } else {
      iframe.addEventListener('load', handleLoad);
      return () => iframe.removeEventListener('load', handleLoad);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      style={{
        width: '100%',
        height: '400px',
        border: 'none',
        ...style
      }}
      {...rest}
    >
      {iframeBody && ReactDOM.createPortal(children, iframeBody)}
    </iframe>
  );
};

export default Iframe;
