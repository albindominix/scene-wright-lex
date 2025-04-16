
import { Button } from "@/components/ui/button";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  ListOrdered,
  Quote,
  Heading2,
  BookOpen,
  MessageSquare,
  MoveVertical,
  Scissors,
  Camera,
  Film,
  FileText,
} from "lucide-react";
import { ElementType } from "./types";

interface EditorToolbarProps {
  onElementSelect: (elementType: ElementType) => void;
}

export function EditorToolbar({ onElementSelect }: EditorToolbarProps) {
  return (
    <div className="editor-toolbar">
      <div className="toolbar-group screenplay-elements">
        <Button
          variant="ghost"
          size="sm"
          title="Scene Heading"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.SCENE_HEADING)}
        >
          <Heading2 className="w-4 h-4 mr-1" /> Scene
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Action"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.ACTION)}
        >
          <AlignLeft className="w-4 h-4 mr-1" /> Action
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Character"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.CHARACTER)}
        >
          <BookOpen className="w-4 h-4 mr-1" /> Character
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Dialogue"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.DIALOGUE)}
        >
          <MessageSquare className="w-4 h-4 mr-1" /> Dialogue
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Parenthetical"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.PARENTHETICAL)}
        >
          <Quote className="w-4 h-4 mr-1" /> Paren
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Transition"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.TRANSITION)}
        >
          <MoveVertical className="w-4 h-4 mr-1" /> Trans
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Shot/Subheading"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.SHOT_SUBHEADING)}
        >
          <Camera className="w-4 h-4 mr-1" /> Shot
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="General Note"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.GENERAL_NOTE)}
        >
          <FileText className="w-4 h-4 mr-1" /> Note
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Page Break"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.PAGE_BREAK)}
        >
          <Scissors className="w-4 h-4 mr-1" /> Break
        </Button>
      </div>
      
      <div className="toolbar-group special-blocks">
        <Button
          variant="ghost"
          size="sm"
          title="Begin Montage"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.MONTAGE_BEGIN)}
        >
          <Film className="w-4 h-4 mr-1" /> Montage
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="End Montage"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.MONTAGE_END)}
        >
          End Montage
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Begin Flashback"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.FLASHBACK_BEGIN)}
        >
          Flashback
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="End Flashback"
          className="toolbar-button"
          onClick={() => onElementSelect(ElementType.FLASHBACK_END)}
        >
          End FB
        </Button>
      </div>
    </div>
  );
}
