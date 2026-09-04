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
    if (name.endsWith('.pdf')) return <FileText className="w-4 h-4 text-rose-600" />;
    if (name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png') || name.endsWith('.webp')) {
      return <ImageIcon className="w-4 h-4 text-purple-600" />;
    }
    if (name.endsWith('.zip')) return <Archive className="w-4 h-4 text-amber-600" />;
    return <File className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="w-full bg-white rounded-[16px] border border-[#E1E2E7] p-5 shadow-[0_1px_3px_rgba(47,48,56,0.04)]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[#F0F1F5]">
        <div>
          <h4 className="text-[15px] font-semibold text-[#2F3038]">
            Selected {files.length === 1 ? 'File' : 'Files'} ({files.length})
          </h4>
          <p className="text-[12px] text-[#6F707A] mt-0.5">
            Total Size: <span className="font-semibold text-[#2F3038]">{formatBytes(totalSize)}</span>
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
              className="text-[12px] font-medium text-[#6F707A] hover:text-[#ef4444] px-2 py-1 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Files List */}
      <div className="mt-3.5 space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {files.map((file, idx) => (
          <div
            key={`${file.name}-${file.size}-${idx}`}
            className="flex items-center justify-between gap-3 p-3 rounded-[12px] bg-[#F7F7FA] border border-[#E1E2E7] hover:bg-white hover:border-[#cbd5e1] transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="w-5 h-5 rounded-[6px] bg-white border border-[#E1E2E7] flex items-center justify-center text-[11px] font-bold text-[#6F707A] flex-shrink-0">
                {idx + 1}
              </span>
              <div className="p-1.5 rounded-[8px] bg-white border border-[#E1E2E7] flex-shrink-0">
                {getFileIcon(file)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-[#2F3038] truncate">
                  {file.name}
                </p>
                <p className="text-[11px] text-[#6F707A]">
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
                    aria-label={`Move ${file.name} up`}
                    className="p-1 rounded-[6px] text-[#6F707A] hover:text-[#2F3038] hover:bg-white disabled:opacity-25 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === files.length - 1}
                    onClick={() => onMoveDown && onMoveDown(idx)}
                    title="Move Down"
                    aria-label={`Move ${file.name} down`}
                    className="p-1 rounded-[6px] text-[#6F707A] hover:text-[#2F3038] hover:bg-white disabled:opacity-25 disabled:pointer-events-none transition-colors"
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
                  aria-label={`Remove ${file.name}`}
                  className="p-1.5 rounded-[6px] text-[#6F707A] hover:text-[#ef4444] hover:bg-[#fff0f0] transition-colors ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
