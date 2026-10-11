import TimelinePage from "@/pages/TimelinePage";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../shared/root/RootLayout";
import DocumentationLayout from "../shared/documentation/DocumentationLayout";
import AvatarPage from "../pages/AvatarPage";
import AccordionPage from "../pages/AccordionPage";
import ButtonPage from "../pages/ButtonPage";
import LinkPage from "../pages/LinkPage";
import BadgePage from "../pages/BadgePage";
import AlertPage from "../pages/AlertPage";
import BreadcrumbsPage from "../pages/BreadcrumbsPage";
import DropdownPage from "../pages/DropdownPage";
import TooltipPage from "../pages/TooltipPage";
import InputPage from "../pages/InputPage";
import SelectPage from "../pages/SelectPage";
import TextareaPage from "../pages/TextareaPage";
import ModalPage from "../pages/ModalPage";
import ComboBoxPage from "../pages/ComboBoxPage";
import FlyoutPage from "../pages/FlyoutPage";
import TabPage from "../pages/TabPage";
import ExExplorerItemPage from "../pages/ExplorerItemPage";
import UploadProviderPage from "../pages/UploadProviderPage";
import ExUploadProvider from "../lib/components/UploadProvider/ExUploadProvider";
import DatePickerPage from "../pages/DatePickerPage";
import DateRangePage from "../pages/DateRangePage";
import TimeSelectorPage from "../pages/TimeSelectorPage";
import CodeBlockPage from "../pages/CodeBlockPage";
import ButtonGroupPage from "../pages/ButtonGroupPage";
import ToastPage from "../pages/ToastPage";
import ExToastProvider from "../lib/components/Toast/ExToastProvider";
import TablePage from "../pages/TablePage";
import PaginationPage from "../pages/PaginationPage";
import CardPage from "../pages/CardPage";
import ProgressPage from "../pages/ProgressPage";
import SwitchPage from "../pages/SwitchPage";
import SkeletonPage from "../pages/SkeletonPage";
import HomePage from "../pages/HomePage";
import ImageViewerPage from "../pages/ImageViewerPage";
import PDFViewerPage from "../pages/PDFViewerPage";
import VideoPlayerPage from "../pages/VideoPlayerPage";
import MusicPlayerPage from "../pages/MusicPlayerPage";
import CheckboxPage from "../pages/CheckboxPage";
import RadioPage from "../pages/RadioPage";
import FilePickerPage from "../pages/FilePickerPage";
import TogglePage from "../pages/TogglePage";
import ChatBubblePage from "@/pages/ChatBubblePage";
import InputOperatorPage from "@/pages/InputOpertatorPage";
import InputRangePage from "@/pages/InputRangePage";
import TreeViewPage from "@/pages/TreeViewPage";
import StepPage from "@/pages/StepPage";
import MentionPage from "@/pages/MentionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "docs",
        element: <DocumentationLayout />,
        children: [
          {
            path: "components",
            children: [
              {
                path: "accordion",
                element: <AccordionPage />,
              },
              {
                path: "alert",
                element: <AlertPage />,
              },
              {
                path: "avatar",
                element: <AvatarPage />,
              },
              {
                path: "button",
                element: <ButtonPage />,
              },
              {
                path: "button-group",
                element: <ButtonGroupPage />,
              },
              {
                path: "link",
                element: <LinkPage />,
              },
              {
                path: "badge",
                element: <BadgePage />,
              },
              {
                path: "breadcrumbs",
                element: <BreadcrumbsPage />,
              },
              {
                path: "dropdown",
                element: <DropdownPage />,
              },
              {
                path: "input",
                element: <InputPage />,
              },
              {
                path: "select",
                element: <SelectPage />,
              },
              {
                path: "textarea",
                element: <TextareaPage />,
              },
              {
                path: "checkbox",
                element: <CheckboxPage />,
              },
              {
                path: "radio",
                element: <RadioPage />,
              },
              {
                path: "combo-box",
                element: <ComboBoxPage />,
              },
              {
                path: "date-picker",
                element: <DatePickerPage />,
              },
              {
                path: "date-range",
                element: <DateRangePage />,
              },
              {
                path: "time-selector",
                element: <TimeSelectorPage />,
              },
              {
                path: "file-picker",
                element: <FilePickerPage />,
              },
              {
                path: "tooltip",
                element: <TooltipPage />,
              },
              {
                path: "toggle",
                element: <TogglePage />,
              },
              {
                path: "tree-view",
                element: <TreeViewPage />,
              },
              {
                path: "modal",
                element: <ModalPage />,
              },
              {
                path: "flyout",
                element: <FlyoutPage />,
              },
              {
                path: "tab",
                element: <TabPage />,
              },
              {
                path: "code-block",
                element: <CodeBlockPage />,
              },
              {
                path: "explorer-item",
                element: <ExExplorerItemPage />,
              },
              {
                path: "upload-provider",
                element: (
                  <ExUploadProvider uploadButton={true}>
                    <UploadProviderPage />
                  </ExUploadProvider>
                ),
              },
              {
                path: "toast",
                element: (
                  <ExToastProvider>
                    <ToastPage />
                  </ExToastProvider>
                ),
              },
              {
                path: "table",
                element: <TablePage />,
              },
              {
                path: "pagination",
                element: <PaginationPage />,
              },
              {
                path: "card",
                element: <CardPage />,
              },
              {
                path: "progress",
                element: <ProgressPage />,
              },
              {
                path: "chat-bubble",
                element: <ChatBubblePage />,
              },
              {
                path: "switch",
                element: <SwitchPage />,
              },
              {
                path: "skeleton",
                element: <SkeletonPage />,
              },
              {
                path: "image-viewer",
                element: (
                  <ExUploadProvider uploadButton={true}>
                    <ImageViewerPage />
                  </ExUploadProvider>
                ),
              },
              {
                path: "pdf-viewer",
                element: (
                  <ExUploadProvider uploadButton={true}>
                    <PDFViewerPage />
                  </ExUploadProvider>
                ),
              },
              {
                path: "video-player",
                element: (
                  <ExUploadProvider uploadButton={true}>
                    <VideoPlayerPage />
                  </ExUploadProvider>
                ),
              },
              {
                path: "music-player",
                element: (
                  <ExUploadProvider uploadButton={true}>
                    <MusicPlayerPage />
                  </ExUploadProvider>
                ),
              },
              {
                path: "input-operator",
                element: <InputOperatorPage />,
              },
              {
                path: "input-range",
                element: <InputRangePage />,
              },
              {
                path: "step",
                element: <StepPage />,
              },
              {
                path: "timeline",
                element: <TimelinePage />,
              },
              {
                path: "mention",
                element: <MentionPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
