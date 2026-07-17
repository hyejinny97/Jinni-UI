/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { getComponents } from './scripts/getComponents';

const srcRoot = path.resolve(__dirname, 'src');

const componentEntries = Object.fromEntries(
  getComponents().map(({ entryName, entryPath }) => [entryName, entryPath])
);

// 절대경로를 src 기준 상대경로로 변환 (확장자 제거)
const toOutputPath = (absPath: string): string | null => {
  const relative = path.relative(srcRoot, absPath);
  // src 바깥을 가리키거나(..) 절대경로면 매핑 포기
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return null;
  }
  // 백슬래시(Windows) → 슬래시로 통일 (Rollup 패턴은 슬래시만 허용)
  return relative
    .replace(/\.(tsx?|jsx?|scss|css)$/, '')
    .split(path.sep)
    .join('/');
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), libInjectCss()],
  resolve: {
    alias: {
      '@/styles': path.join(__dirname, 'src/styles')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTest.ts']
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        'hooks/index': path.resolve(__dirname, 'src/hooks/index.ts'),
        ...componentEntries
      },
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'motion',
        'motion/react',
        'react/jsx-runtime',
        'react/jsx-dev-runtime'
      ],
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src',
        // 공유 청크(hooks, utils 등)를 원본 소스 위치 기준으로 배치
        chunkFileNames: (chunkInfo) => {
          const id = chunkInfo.facadeModuleId;
          const mapped = id ? toOutputPath(id) : null;
          return mapped ? `${mapped}.js` : 'shared/[name]-[hash].js';
        },
        // CSS 등 에셋도 원본 소스 위치 기준으로 배치
        assetFileNames: (assetInfo) => {
          const source = assetInfo.originalFileNames?.[0];
          const mapped = source
            ? toOutputPath(path.resolve(__dirname, source))
            : null;
          return mapped
            ? `${mapped}[extname]`
            : 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
