import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ExButton from "../../lib/components/Button/ExButton";
import ExLink from "../../lib/components/Link/ExLink";

interface RootSidebarProps {
  isOpen: boolean;
  onClosed: (value: boolean) => void;
}

export default function RootSidebar({ isOpen, onClosed }: RootSidebarProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    onClosed(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="fixed inset-0 z-9999 min-h-dvh w-screen overflow-auto bg-background/90 backdrop-blur-[2px] px-10 py-5"
        >
          <div className="absolute right-9 top-3">
            <ExButton
              size="sm"
              color="secondary"
              variant="text"
              iconOnly
              onClick={() => onClosed(false)}
            >
              <X size={14} />
            </ExButton>
          </div>
          <div className="mt-10 flex flex-col justify-end gap-10">
            {/* Menu */}
            <div className="grid gap-2 justify-items-end">
              <span className="text-muted text-sm font-medium">Menu</span>
              <div className="grid gap-1 justify-items-end">
                <ExLink
                  weight="medium"
                  size="lg"
                  onClick={() => handleNavigate("/")}
                >
                  Home
                </ExLink>
                <ExLink
                  weight="medium"
                  size="lg"
                  onClick={() => handleNavigate("/docs")}
                >
                  Documentation
                </ExLink>
                <ExLink
                  weight="medium"
                  size="lg"
                  onClick={() => handleNavigate("/about")}
                >
                  About
                </ExLink>
              </div>
            </div>

            {/* Getting Started */}
            <div className="grid gap-2 justify-items-end">
              <span className="text-muted text-sm font-medium">
                Getting Started
              </span>
              <div className="grid gap-1 justify-items-end">
                <ExLink
                  weight="medium"
                  size="lg"
                  onClick={() => handleNavigate("/docs/installation")}
                >
                  Installation
                </ExLink>
                <ExLink
                  weight="medium"
                  size="lg"
                  onClick={() => handleNavigate("/docs/usage")}
                >
                  Usage
                </ExLink>
                <ExLink
                  weight="medium"
                  size="lg"
                  onClick={() => handleNavigate("/docs/compability")}
                >
                  Compatibility
                </ExLink>
                <ExLink
                  weight="medium"
                  size="lg"
                  onClick={() => handleNavigate("/docs/changelog")}
                >
                  Changelog
                </ExLink>
              </div>
            </div>

            {/* Components */}
            <div className="grid gap-2 justify-items-end">
              <span className="text-muted text-sm font-medium">Components</span>
              <div className="grid gap-1 justify-items-end">
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/avatar")}
                >
                  Avatar
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/alert")}
                >
                  Alert
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/accordion")}
                >
                  Accordion
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/link")}
                >
                  Link
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/breadcrumbs")}
                >
                  Breadcrumbs
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/badge")}
                >
                  Badge
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/button")}
                >
                  Button
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() =>
                    handleNavigate("/docs/components/button-group")
                  }
                >
                  Button Group
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/dropdown")}
                >
                  Dropdown
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/input")}
                >
                  Input
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/select")}
                >
                  Select
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/textarea")}
                >
                  Textarea
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/checkbox")}
                >
                  Checkbox
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/radio")}
                >
                  Radio
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/date-picker")}
                >
                  Date Picker
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/date-range")}
                >
                  Date Range
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() =>
                    handleNavigate("/docs/components/time-selector")
                  }
                >
                  Time Selector
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/code-block")}
                >
                  Code Block
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/combo-box")}
                >
                  Combo Box
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/modal")}
                >
                  Modal
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/flyout")}
                >
                  Flyout
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/tab")}
                >
                  Tab
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/tooltip")}
                >
                  Tooltip
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() =>
                    handleNavigate("/docs/components/explorer-item")
                  }
                >
                  Explorer Item
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() =>
                    handleNavigate("/docs/components/upload-provider")
                  }
                >
                  Upload Provider
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/toast")}
                >
                  Toast
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/table")}
                >
                  Table
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/pagination")}
                >
                  Pagination
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/card")}
                >
                  Card
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/progress")}
                >
                  Progress
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/switch")}
                >
                  Switch
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/skeleton")}
                >
                  Skeleton
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() =>
                    handleNavigate("/docs/components/image-viewer")
                  }
                >
                  Image Viewer
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() => handleNavigate("/docs/components/pdf-viewer")}
                >
                  PDF Viewer
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() =>
                    handleNavigate("/docs/components/music-player")
                  }
                >
                  Music Player
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() =>
                    handleNavigate("/docs/components/video-player")
                  }
                >
                  Video Player
                </ExLink>
                <ExLink
                  size="lg"
                  weight="medium"
                  onClick={() =>
                    handleNavigate("/docs/components/chat-bubble")
                  }
                >
                  Chat Bubble
                </ExLink>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
