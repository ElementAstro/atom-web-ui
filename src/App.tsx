// MainApp.tsx
import React, { useState, FC, ReactNode, ChangeEvent } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

import AccordionExample from "./examples/AccordionExample";
import AlertExample from "./examples/AlertExample";
import AvatarExample from "./examples/AvatarExample";
import BreadcrumbsExample from "./examples/BreadcrumbsExample";
import ButtonExample from "./examples/ButtonExample";
import ButtonGroupExample from "./examples/ButtonGroupExample";
import CalendarExample from "./examples/CalendarExample";
import CardExample from "./examples/CardExample";
import CarouselExample from "./examples/CarouselExample";
import ChartWrapperExample from "./examples/ChartWrapperExample";
import CheckBoxExample from "./examples/CheckBoxExample";
import CodeBlockExample from "./examples/CodeBlockExample";
import CollapseButtonGroupExample from "./examples/CollapseButtonGroupExample";
import CollapsibleSidebarExample from "./examples/CollapsibleSidebarExample";
import ConfirmDialogExample from "./examples/ConfirmDialogExample";
import DateInputExample from "./examples/DateInputExample";
import DividerExample from "./examples/DividerExample";
import DraggableModalExample from "./examples/DraggableModalExample";
import DrawerExample from "./examples/DrawerExample";
import DropdownExample from "./examples/DropdownExample";
import FeedbackExample from "./examples/FeedbackExample";
import FlowLayoutExample from "./examples/FlowLayoutExample";
import FluidLayoutExample from "./examples/FluidLayoutExample";
import FormExample from "./examples/FormExample";
import GridExample from "./examples/GridExample";
import IconExample from "./examples/IconExample";
import IconSelectorExample from "./examples/IconSelectorExample";
import ImagesExample from "./examples/ImagesExample";
import ImageSliderExample from "./examples/ImageSliderExample";
import ImageUploaderExample from "./examples/ImageUploaderExample";
import InputExample from "./examples/InputExample";
import ListGroupExample from "./examples/ListGroupExample";
import LoadingOverlayExample from "./examples/LoadingOverlayExample";
import LoadingSpinnerExample from "./examples/LoadingSpinnerExample";
import LoadMoreExample from "./examples/LoadMoreExample";
import MasonryExample from "./examples/MasonryExample";
import MenuExample from "./examples/MenuExample";
import ModalExample from "./examples/ModalExample";
import NavExample from "./examples/NavExample";
import NavbarExample from "./examples/NavbarExample";
import NotificationExample from "./examples/NotificationExample";
import NumberInputExample from "./examples/NumberInputExample";
import OffcanvasExample from "./examples/OffcanvasExample";
import PaginationExample from "./examples/PaginationExample";
import PhoneInputExample from "./examples/PhoneInputExample";
import ProgressExample from "./examples/ProgressExample";
import ProgressBarExample from "./examples/ProgressBarExample";
import RatingExample from "./examples/RatingExample";
import RichTextEditorExample from "./examples/RichTextEditorExample";
import SearchBoxExample from "./examples/SearchBoxExample";
import SidebarExample from "./examples/SidebarExample";
import SkeletonScreenExample from "./examples/SkeletonScreenExample";
import SlidesExample from "./examples/SlidesExample";
import StepperExample from "./examples/StepperExample";
import SwitchExample from "./examples/SwitchExample";
import TableExample from "./examples/TableExample";
import TabsExample from "./examples/TabsExample";
import TagExample from "./examples/TagExample";
import TagInputExample from "./examples/TagInputExample";
import TimeInputExample from "./examples/TimeInputExample";
import ToastExample from "./examples/ToastExample";
import TooltipExample from "./examples/TooltipExample";
import ValidatedFormExample from "./examples/ValidatedFormExample";
import VerticalMenuExample from "./examples/VerticalMenuExample";

const App: FC = () => {
  return (
    <div className="p-4">
      <AccordionExample />
      <AlertExample />
      <AvatarExample />
      {/*<BreadcrumbsExample />*/}
      <ButtonExample />
      <ButtonGroupExample />
      {/*<CalendarExample />*/}
      <CardExample />
      <CarouselExample />
      <ChartWrapperExample />
      <CheckBoxExample />
      <CodeBlockExample />
      <CollapseButtonGroupExample />
      <CollapsibleSidebarExample />
      <ConfirmDialogExample />
      <DateInputExample />
      <DividerExample />
      <DraggableModalExample />
      <DrawerExample />
      <DropdownExample />
      <FeedbackExample />
      {/*<FlowLayoutExample />*/}
      {/*<FluidLayoutExample />*/}
      <FormExample />
      <GridExample />
      <IconExample />
      <IconSelectorExample />
      <ImagesExample />
      <ImageSliderExample />
      <ImageUploaderExample />
      <InputExample />
      <ListGroupExample />
      <LoadingOverlayExample />
      <LoadingSpinnerExample />
      <LoadMoreExample />
      <MasonryExample />
      <MenuExample />
      <ModalExample />
      <NavExample />
      {/*<NavbarExample />*/}
      <NotificationExample />
      <NumberInputExample />
      <OffcanvasExample />
      <PaginationExample />
      <PhoneInputExample />
      <ProgressExample />
      <ProgressBarExample />
      <RatingExample />
      <RichTextEditorExample />
      <SearchBoxExample />
      <SidebarExample />
      <SkeletonScreenExample />
      <SlidesExample />
      <StepperExample />
      <SwitchExample />
      <TableExample />
      {/*<TabsExample />*/}
      <TagExample />
      <TagInputExample />
      <TimeInputExample />
      <ToastExample />
      <TooltipExample />
      <ValidatedFormExample />
      <VerticalMenuExample />
    </div>
  );
};

const MainApp = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default MainApp;
