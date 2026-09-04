import { useRef } from 'react';
import { File, ArrowUp, ArrowDown, Trash2, Plus, FileText, Image as ImageIcon, Archive } from 'lucide-react';
import { formatBytes } from '../../utils/fileTools/formatters';
import { Button } from '../common/Button';

export const FileList = ({
  files = [],
  onRemove,
  onMoveUp,
  onMoveDown,
  onAddMore,
  onClearAll,
  allowReorder = true,
  allowAddMore = true,
  accept = '*/*'
}) => {
  const addInputRef = useRef(null);

  if (!files || files.length === 0) return null;

  const totalSize = files.reduce((acc, f) => acc + (f.size || 0), 0);

  const getFileIcon = (file) => {
    const name = file.name.toLowerCase();
    if (name.endsWith('.pdf')) return <FileText className="w-5 h-5 text-rose-600" />;
    if (name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png') || name.endsWith('.webp')) {
      return <ImageIcon className="w-5 h-5 text-purple-600" />;
    }
    if (name.endsWith('.zip')) return <Archive className="w-5 h-5 text-amber-600" />;
    return <File className="w-5 h-5 text-slate-500" />;
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Selected {files.length === 1 ? 'File' : 'Files'} ({files.length})
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Total Size: <span className="font-semibold text-slate-700">{formatBytes(totalSize)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {allowAddMore && (
            <>
              <input
                ref={addInputRef}
                type="file"
                accept={accept}
                multiple
                onChange={(e) => {
                  if (e.target.files && onAddMore) {
                    onAddMore(Array.from(e.target.files));
                  }
                  e.target.value = '';
                }}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => addInputRef.current?.click()}
              >
                Add More
              </Button>
            </>
          )}

          {files.length > 1 && onClearAll && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 px-2 py-1 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Files List */}
      <div className="mt-4 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {files.map((file, idx) => (
          <div
            key={`${file.name}-${file.size}-${idx}`}
            className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100/70 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">
                {idx + 1}
              </span>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200/80 flex-shrink-0">
                {getFileIcon(file)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                  {file.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  {formatBytes(file.size)}
                </p>
              </div>
            </div>

            {/* Actions: Reorder & Remove */}
            <div className="flex items-center gap-1">
              {allowReorder && files.length > 1 && (
                <>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => onMoveUp && onMoveUp(idx)}
                    title="Move Up"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === files.length - 1}
                    onClick={() => onMoveDown && onMoveDown(idx)}
                    title="Move Down"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(idx)}
                  title="Remove File"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

