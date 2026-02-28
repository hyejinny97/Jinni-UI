import './Palette.scss';
import { usePalette } from './Palette.hooks';

const Palette = () => {
  const { paletteElRef, sbCanvasElRef, paletteThumbElRef } = usePalette();

  return (
    <div ref={paletteElRef} className="JinniColorBoxPalette">
      <canvas ref={sbCanvasElRef} width={240} height={170} />
      <button ref={paletteThumbElRef} className="JinniColorBoxPaletteThumb" />
    </div>
  );
};

export default Palette;
