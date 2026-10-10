import { useNavigate } from "react-router-dom";
import ExLink from "../../lib/components/Link/ExLink";

export default function SidebarDocumentation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-7 mb-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-medium text-muted">Getting Started</h3>
        <div className="flex flex-col gap-2">
          <ExLink navigate={navigate} to="/docs/installation">
            Installation
          </ExLink>
          <ExLink navigate={navigate} to="/docs/usage">
            Usage
          </ExLink>
          <ExLink navigate={navigate} to="/docs/compatibilty">
            Compatibility
          </ExLink>
          <ExLink navigate={navigate} to="/docs/changelog">
            Changelog
          </ExLink>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-medium text-muted">Components</h3>
        <div className="flex flex-col gap-2">
          <ExLink navigate={navigate} to="/docs/components/avatar">
            Avatar
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/alert">
            Alert
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/accordion">
            Accordion
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/link">
            Link
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/breadcrumbs">
            Breadcrumbs
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/badge">
            Badge
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/button">
            Button
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/button-group">
            Button Group
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/dropdown">
            Dropdown
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/input">
            Input
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/select">
            Select
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/textarea">
            Textarea
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/checkbox">
            Checkbox
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/radio">
            Radio
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/combo-box">
            Combo Box
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/date-picker">
            Date Picker
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/date-range">
            Date Range
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/time-selector">
            Time Selector
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/file-picker">
            File Picker
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/code-block">
            Code Block
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/modal">
            Modal
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/flyout">
            Flyout
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/tab">
            Tab
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/tooltip">
            Tooltip
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/explorer-item">
            Explorer Item
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/upload-provider">
            Upload Provider
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/toast">
            Toast
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/toggle">
            Toggle
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/table">
            Table
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/pagination">
            Pagination
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/card">
            Card
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/progress">
            Progress
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/switch">
            Switch
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/skeleton">
            Skeleton
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/image-viewer">
            Image Viewer
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/pdf-viewer">
            PDF Viewer
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/music-player">
            Music Player
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/video-player">
            Video Player
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/chat-bubble">
            Chat Bubble
          </ExLink>
          <ExLink navigate={navigate} to="/docs/components/input-operator">
            Input Operator
          </ExLink>
        </div>
      </div>
    </div>
  );
}
