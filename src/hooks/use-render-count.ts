import React, { useEffect, useRef } from "react";

function useRenderCount<T extends HTMLElement>(name?: string): React.Ref<T> {
  const renderCount = useRef(-1);
  const ref = useRef<T>(null);

  useEffect(() => {
    renderCount.current += 1;
    if (!ref.current) return;
    const node = Array.from(ref.current.children).find((node) =>
      node.classList.contains("render-count")
    );

    if (node) {
      node.innerHTML = `${name || "Component"} rendered: ${renderCount.current}`;
    } else {
      const newNode = document.createElement("div");
      newNode.className = "render-count mt-2";
      newNode.innerHTML = `Rendered: ${renderCount.current}`;
      ref.current.appendChild(newNode);
    }
  });

  return ref;
}

export { useRenderCount };
