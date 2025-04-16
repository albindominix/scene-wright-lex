
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ElementType, ScriptElement } from "./types";

interface ElementRendererProps {
  element: ScriptElement;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onContentChange: (id: string, content: string) => void;
}

export function ElementRenderer({ 
  element, 
  isSelected, 
  onSelect, 
  onContentChange 
}: ElementRendererProps) {
  const editableRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isSelected && editableRef.current) {
      editableRef.current.focus();
      
      // For parenthetical, handle special cursor behavior
      if (element.type === ElementType.PARENTHETICAL) {
        const content = editableRef.current.textContent || '';
        if (!content.includes('(') && !content.includes(')')) {
          editableRef.current.textContent = '()';
          
          // Set cursor position between parentheses
          const range = document.createRange();
          const selection = window.getSelection();
          range.setStart(editableRef.current.firstChild || editableRef.current, 1);
          range.setEnd(editableRef.current.firstChild || editableRef.current, 1);
          
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }
    }
  }, [isSelected, element.type]);

  // Apply auto-formatting based on element type
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || '';
    onContentChange(element.id, content);
    
    // Apply auto-formatting transformations
    if (element.type === ElementType.SCENE_HEADING) {
      e.currentTarget.textContent = content.toUpperCase();
    } else if (element.type === ElementType.CHARACTER) {
      e.currentTarget.textContent = content.toUpperCase();
    } else if (element.type === ElementType.TRANSITION) {
      e.currentTarget.textContent = content.toUpperCase();
    } else if (element.type === ElementType.SHOT_SUBHEADING) {
      e.currentTarget.textContent = content.toUpperCase();
    }
  };

  // Handle special behaviors
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // For parenthetical, ensure cursor can't go outside of the parentheses
    if (element.type === ElementType.PARENTHETICAL) {
      const content = e.currentTarget.textContent || '';
      if (content === '()' && e.key === 'Backspace') {
        e.preventDefault(); // Prevent deleting the parentheses
      }
    }
  };

  // For page break, render a special non-editable component
  if (element.type === ElementType.PAGE_BREAK) {
    return (
      <div 
        className={cn("page-break", { selected: isSelected })}
        onClick={() => onSelect(element.id)}
      >
        <hr />
        <span>Page Break</span>
        <hr />
      </div>
    );
  }

  return (
    <div 
      ref={editableRef}
      className={cn(element.type, { selected: isSelected })}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onClick={() => onSelect(element.id)}
      dangerouslySetInnerHTML={{ __html: element.content }}
    />
  );
}
