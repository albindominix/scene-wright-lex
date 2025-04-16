
import { useState, useRef, useEffect } from "react";
import { ElementType, ScriptElement, Position } from "./types";
import { EditorToolbar } from "./EditorToolbar";
import { ContextMenu } from "./ContextMenu";
import { ElementRenderer } from "./ElementRenderer";
import "./styles.css";

// Simple ID generator function since we can't use UUID
let nextId = 1;
const generateId = () => `element-${nextId++}`;

export default function ScriptEditor() {
  const [elements, setElements] = useState<ScriptElement[]>([
    { id: generateId(), type: ElementType.SCENE_HEADING, content: "INT. CAFE - DAY" }
  ]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<Position | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Handle selecting an element
  const handleElementSelect = (id: string) => {
    setSelectedElementId(id);
  };

  // Handle changing element content
  const handleContentChange = (id: string, content: string) => {
    setElements(prevElements => 
      prevElements.map(el => el.id === id ? { ...el, content } : el)
    );
  };

  // Convert the current element to a different type
  const handleElementTypeChange = (elementType: ElementType) => {
    if (selectedElementId) {
      setElements(prevElements => 
        prevElements.map(el => 
          el.id === selectedElementId ? { ...el, type: elementType } : el
        )
      );
    } else {
      // If no element is selected, create a new one
      const newElement: ScriptElement = {
        id: generateId(),
        type: elementType,
        content: getDefaultContentForType(elementType)
      };
      
      setElements(prevElements => [...prevElements, newElement]);
      setSelectedElementId(newElement.id);
    }
  };

  // Get default content based on element type
  const getDefaultContentForType = (type: ElementType): string => {
    switch (type) {
      case ElementType.SCENE_HEADING:
        return "INT. LOCATION - TIME";
      case ElementType.CHARACTER:
        return "CHARACTER";
      case ElementType.PARENTHETICAL:
        return "()";
      case ElementType.TRANSITION:
        return "CUT TO:";
      case ElementType.MONTAGE_BEGIN:
        return "BEGIN MONTAGE:";
      case ElementType.MONTAGE_END:
        return "END MONTAGE";
      case ElementType.FLASHBACK_BEGIN:
        return "FLASHBACK:";
      case ElementType.FLASHBACK_END:
        return "END FLASHBACK";
      default:
        return "";
    }
  };

  // Handle keydown events for the editor
  const handleEditorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      
      // If an element is selected, determine what type the next element should be
      if (selectedElementId) {
        const currentElement = elements.find(el => el.id === selectedElementId);
        
        if (currentElement) {
          let nextElementType = ElementType.ACTION;
          
          // Determine the next element type based on the current element type
          switch (currentElement.type) {
            case ElementType.SCENE_HEADING:
              nextElementType = ElementType.ACTION;
              break;
            case ElementType.ACTION:
              // If the action text is ALL CAPS, it might be a character cue
              if (currentElement.content === currentElement.content.toUpperCase() && 
                  currentElement.content.trim().length > 0) {
                nextElementType = ElementType.CHARACTER;
              } else {
                nextElementType = ElementType.ACTION;
              }
              break;
            case ElementType.CHARACTER:
              nextElementType = ElementType.DIALOGUE;
              break;
            case ElementType.DIALOGUE:
              nextElementType = ElementType.CHARACTER;
              break;
            case ElementType.PARENTHETICAL:
              nextElementType = ElementType.DIALOGUE;
              break;
            case ElementType.TRANSITION:
              nextElementType = ElementType.SCENE_HEADING;
              break;
            default:
              nextElementType = ElementType.ACTION;
              break;
          }
          
          // Create the new element and add it after the current one
          const newElement: ScriptElement = {
            id: generateId(),
            type: nextElementType,
            content: getDefaultContentForType(nextElementType)
          };
          
          // Find the index of the current element
          const currentIndex = elements.findIndex(el => el.id === selectedElementId);
          
          // Insert the new element after the current one
          const newElements = [...elements];
          newElements.splice(currentIndex + 1, 0, newElement);
          
          setElements(newElements);
          setSelectedElementId(newElement.id);
        }
      } else {
        // If no element is selected or we're on an empty line, show context menu
        if (editorRef.current) {
          const rect = editorRef.current.getBoundingClientRect();
          setContextMenuPosition({
            x: rect.left + 20,
            y: rect.top + 100
          });
        }
      }
    }
  };

  // Handle clipboard paste to strip formatting
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    
    if (selectedElementId) {
      setElements(prevElements => 
        prevElements.map(el => 
          el.id === selectedElementId ? { ...el, content: text } : el
        )
      );
    }
  };

  // Simple auto-detection of formatting based on content patterns
  const detectElementType = (content: string): ElementType => {
    content = content.trim();
    
    // Scene heading detection (INT./EXT.)
    if (content.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E)/i)) {
      return ElementType.SCENE_HEADING;
    }
    
    // Character detection (ALL CAPS)
    if (content === content.toUpperCase() && content.length > 0 && 
        !content.match(/^(INT\.|EXT\.|I\/E)/i) &&
        !content.match(/^(FADE|CUT|DISSOLVE|SMASH|MATCH|JUMP)/i)) {
      return ElementType.CHARACTER;
    }
    
    // Transition detection
    if (content.match(/^(FADE (OUT|IN)|CUT TO:|DISSOLVE TO:|SMASH CUT TO:|MATCH CUT TO:|JUMP CUT TO:|FADE TO BLACK\.)$/i) || 
        (content === content.toUpperCase() && content.endsWith("TO:")) ||
        content.endsWith("TO BLACK.")) {
      return ElementType.TRANSITION;
    }
    
    // Parenthetical detection
    if (content.startsWith('(') && (content.endsWith(')') || content === '(')) {
      return ElementType.PARENTHETICAL;
    }
    
    // Default to action
    return ElementType.ACTION;
  };

  // Add an element at the beginning or end if there are no elements
  useEffect(() => {
    if (elements.length === 0) {
      const newElement: ScriptElement = {
        id: generateId(),
        type: ElementType.SCENE_HEADING,
        content: "INT. LOCATION - DAY"
      };
      setElements([newElement]);
      setSelectedElementId(newElement.id);
    }
  }, [elements]);

  return (
    <div className="script-editor-container">
      <EditorToolbar onElementSelect={handleElementTypeChange} />
      
      <div 
        ref={editorRef}
        className="editor-container" 
        onKeyDown={handleEditorKeyDown}
        onPaste={handlePaste}
      >
        {elements.map(element => (
          <ElementRenderer
            key={element.id}
            element={element}
            isSelected={selectedElementId === element.id}
            onSelect={handleElementSelect}
            onContentChange={handleContentChange}
          />
        ))}
        
        {elements.length === 0 && (
          <div className="editor-placeholder">
            INT. LOCATION - DAY
          </div>
        )}
      </div>
      
      {contextMenuPosition && (
        <ContextMenu
          position={contextMenuPosition}
          onClose={() => setContextMenuPosition(null)}
          onElementSelect={handleElementTypeChange}
        />
      )}
    </div>
  );
}
