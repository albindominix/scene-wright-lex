
import { 
  AlignLeft, 
  Heading2, 
  BookOpen, 
  MessageSquare, 
  Quote, 
  MoveVertical,
  Camera
} from "lucide-react";
import { ElementType, Position } from "./types";

interface ContextMenuProps {
  position: Position;
  onClose: () => void;
  onElementSelect: (elementType: ElementType) => void;
}

export function ContextMenu({ position, onClose, onElementSelect }: ContextMenuProps) {
  return (
    <>
      <div className="context-menu-backdrop" onClick={onClose}></div>
      <div 
        className="context-menu" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
      >
        <button 
          className="context-menu-item" 
          onClick={() => {
            onElementSelect(ElementType.SCENE_HEADING);
            onClose();
          }}
        >
          <Heading2 className="w-4 h-4 mr-2" /> Scene Heading
        </button>
        <button 
          className="context-menu-item" 
          onClick={() => {
            onElementSelect(ElementType.ACTION);
            onClose();
          }}
        >
          <AlignLeft className="w-4 h-4 mr-2" /> Action
        </button>
        <button 
          className="context-menu-item" 
          onClick={() => {
            onElementSelect(ElementType.CHARACTER);
            onClose();
          }}
        >
          <BookOpen className="w-4 h-4 mr-2" /> Character
        </button>
        <button 
          className="context-menu-item" 
          onClick={() => {
            onElementSelect(ElementType.DIALOGUE);
            onClose();
          }}
        >
          <MessageSquare className="w-4 h-4 mr-2" /> Dialogue
        </button>
        <button 
          className="context-menu-item" 
          onClick={() => {
            onElementSelect(ElementType.PARENTHETICAL);
            onClose();
          }}
        >
          <Quote className="w-4 h-4 mr-2" /> Parenthetical
        </button>
        <button 
          className="context-menu-item" 
          onClick={() => {
            onElementSelect(ElementType.TRANSITION);
            onClose();
          }}
        >
          <MoveVertical className="w-4 h-4 mr-2" /> Transition
        </button>
        <button 
          className="context-menu-item" 
          onClick={() => {
            onElementSelect(ElementType.SHOT_SUBHEADING);
            onClose();
          }}
        >
          <Camera className="w-4 h-4 mr-2" /> Shot/Subheading
        </button>
      </div>
    </>
  );
}
