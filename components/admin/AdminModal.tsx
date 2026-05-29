"use client";

import { useRef } from "react";

export function AdminModal({
  trigger,
  title,
  children
}: {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()}>
        {trigger}
      </button>
      <dialog
        ref={dialogRef}
        className="w-[min(720px,calc(100vw-2rem))] rounded-[1.5rem] border border-blush-100 bg-white p-0 shadow-luxe backdrop:bg-stone-950/45"
      >
        <div className="flex items-center justify-between border-b border-blush-100 px-5 py-4">
          <h2 className="font-display text-2xl font-semibold text-stone-950">{title}</h2>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-blush-100 text-stone-600"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close modal"
          >
            X
          </button>
        </div>
        <div className="max-h-[78svh] overflow-y-auto p-5">{children}</div>
      </dialog>
    </>
  );
}
