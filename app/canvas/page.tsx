import type { Metadata } from 'next';
import Canvas from './_components/canvas';

export const metadata: Metadata = {
  title: 'Canvas',
  description:
    'Interactive drawing and presentation workspace with support for custom shapes, slides, and collaborative features. Create, edit and share your visual ideas seamlessly.',
};

export default async function CanvasPage() {
  return <Canvas />;
}
