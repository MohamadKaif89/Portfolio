import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";

type DialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Native dialog with a backdrop, Escape to close, and focus moved inside by the browser.
 *
 * @example
 * <Dialog open={open} title="Search" onClose={() => setOpen(false)}>...</Dialog>
 */
export function Dialog({ open, title, onClose, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const ignoreClose = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();

    return () => {
      if (!dialog.open) return;
      ignoreClose.current = true;
      dialog.close();
      ignoreClose.current = false;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={() => {
        if (ignoreClose.current) return;
        onClose();
      }}
      className="w-[min(100%-2rem,40rem)] rounded-sheet border border-line/15 bg-deep p-6 text-ink shadow-lift md:p-8"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <h2 id={titleId} className="font-display text-3xl text-accent-ink">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-pill px-3 py-2 font-sans text-small text-ink hover:text-accent-ink"
        >
          Close
        </button>
      </div>
      {children}
    </dialog>
  );
}
