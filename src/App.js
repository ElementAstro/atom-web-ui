import React, { useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import Dropdown from "./components/Dropdown";
import Table from "./components/Table";
import Carousel from "./components/Carousel";
import ProgressBar from "./components/ProgressBar";
import Icon from "./components/Icon";
import Feedback from "./components/Feedback";
import ValidatedForm from "./components/ValidatedForm";
import SearchBox from "./components/SearchBox";
import Calendar from "./components/Calendar";
import Switch from "./components/Switch";
import { Accordion, AccordionItem } from "./components/Accordion";
import LoadingSpinner from "./components/LoadingSpinner";
import Rating from "./components/Rating";
import Tag from "./components/Tag";
import Avatar from "./components/Avatar";
import Menu from "./components/Menu";
import Pagination from "./components/Pagination";
import TagInput from "./components/TagInput";
import Notification from "./components/Notification";
import Alert from "./components/Alert";
import ConfirmDialog from "./components/ConfirmDialog";
import Divider from "./components/Divider";
import Tooltip from "./components/Tooltip";
import LoadMore from "./components/LoadMore";
import Sidebar from "./components/Sidebar";
import ImageSlider from "./components/ImageSlider";
import Tabs from "./components/Tabs";
import ImageUploader from "./components/ImageUploader";
import Progress from "./components/Progress";
import VerticalMenu from "./components/VerticalMenu";
import CodeBlock from "./components/CodeBlock";
import CheckBox from "./components/CheckBox";
import RichTextEditor from "./components/RichTextEditor";
import ButtonGroup from "./components/ButtonGroup";
import CollapseButtonGroup from "./components/CollapseButtonGroup";
import TimeInput from "./components/TimeInput";
import DateInput from "./components/DateInput";
import PhoneInput from "./components/PhoneInput";
import SkeletonScreen from "./components/SkeletonScreen";
import LoadingOverlay from "./components/LoadingOverlay";
import Stepper from "./components/Stepper";
import Breadcrumbs from "./components/Breadcrumbs";
import ListGroup from "./components/ListGroup";
import Images from "./components/Images";
import Offcanvas from "./components/Offcanvas";
import Navbar from "./components/Navbars";
import Navs from "./components/Nav";
import FluidLayout from "./components/FluidLayout";
import FlowLayout from "./components/FlowLayout";
import Grid from "./components/Grid";
import DraggableModal from "./components/DraggableModal";
import CollapsibleSidebar from "./components/CollapsibleSidebar";
import IconSelector from "./components/IconSelector";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaCoffee, FaBeer } from "react-icons/fa";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;
const Contact = () => <div>Contact</div>;

const App = () => {
  const { toggleTheme } = useTheme();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [time, setTime] = useState("12:00");
  const [date, setDate] = useState("2023-10-01");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
  const [itemsAA, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
  ]);
  const sidebarItems = ['首页', '关于', '服务', '联系'];
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconSelect = (iconId) => {
    setSelectedIcon(iconId);
  };

  const [content, setContent] = useState("<p>Start typing...</p>");
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
  const [isModalOpenA, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const buttons = [
    {
      label: "Coffee",
      value: "coffee",
      icon: <FaCoffee />,
      tooltip: "Get Coffee",
      active: true,
    },
    {
      label: "Beer",
      value: "beer",
      icon: <FaBeer />,
      tooltip: "Get Beer",
      disabled: false,
      loading: false,
    },
    {
      label: "Loading",
      value: "loading",
      tooltip: "Loading...",
      loading: true,
    },
  ];

  const sidebarContent = (
    <ul>
      <li className="text-white">Item 1</li>
      <li className="text-white">Item 2</li>
      <li className="text-white">Item 3</li>
    </ul>
  );

  const mainContent = (
    <div>
      <p className="text-white">This is the main content area.</p>
    </div>
  );

  const handleSidebarToggle = (isOpen) => {
    console.log("Sidebar is now", isOpen ? "open" : "closed");
  };

  const handleButtonClick = (value) => {
    console.log("Button clicked:", value);
  };

  const handleToggle = (isOpen) => {
    console.log("Collapse toggled:", isOpen);
  };

  const handleButtonHover = (value) => {
    console.log("Button hovered:", value);
  };

  const handleButtonFocus = (value) => {
    console.log("Button focused:", value);
  };

  const handleButtonBlur = (value) => {
    console.log("Button blurred:", value);
  };

  const handleContentChange = (html) => {
    setContent(html);
  };

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const totalPages = 5; // 假设总共5页

  // 模拟数据
  const data = Array.from({ length: 20 }, (_, idx) => ({
    id: idx + 1,
    name: `Item ${idx + 1}`,
    description: `Description for Item ${idx + 1}`,
  }));

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
  ];

  // 示例图片数据
  const images = [
    "https://via.placeholder.com/600/92c952",
    "https://via.placeholder.com/600/771796",
    "https://via.placeholder.com/600/24f355",
  ];

  const tabs = [
    { label: "Tab 1", content: "Content of Tab 1" },
    { label: "Tab 2", content: "Content of Tab 2" },
    { label: "Tab 3", content: "Content of Tab 3" },
  ];

  const handleStepClick = (index) => {
    setCurrentStep(index);
    console.log(`Step ${index + 1} clicked`);
  };

  const items = [
    { label: "家", link: "/" },
    { label: "分类", link: "/category" },
    { label: "产品", link: "/product" },
  ];

  const handleItemClick = (item) => {
    console.log("Breadcrumb item clicked:", item);
  };

  const itemsA = ["Item 1", "Item 2", "Item 3", "Item 4"];

  const handleItemClickA = (item) => {
    console.log("List item clicked:", item);
  };

  const handleItemHover = (item) => {
    console.log("List item hovered:", item);
  };

  const handleImageClick = (image) => {
    console.log("Image clicked:", image);
  };

  const handleImageHover = (image) => {
    console.log("Image hovered:", image);
  };

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLinkClick = (link) => {
    console.log("Link clicked:", link);
  };

  const handleNavClick = (value) => {
    console.log("Nav clicked:", value);
  };

  const handleHover = (value) => {
    console.log("Nav hovered:", value);
  };

  const handleFocus = (value) => {
    console.log("Nav focused:", value);
  };

  const handleBlur = (value) => {
    console.log("Nav blurred:", value);
  };

  const handleDragEnd = (newItems) => {
    setItems(newItems);
    console.log("Items reordered:", newItems);
  };

  return (
    <div className="p-4">
      <Button onClick={toggleTheme}>Toggle Theme</Button>

      <Divider title="卡片示例" />

      <Card title="示例卡片">
        <p>这是卡片内的内容。</p>
        <Input label="示例输入" />
      </Card>

      <Divider title="按钮示例" />

      <Button
        variant="primary"
        size="large"
        onClick={() => console.log("Primary Button Clicked")}
      >
        Primary Button
      </Button>
      <Button
        variant="secondary"
        size="medium"
        onClick={() => console.log("Secondary Button Clicked")}
      >
        Secondary Button
      </Button>
      <Button
        variant="alert"
        size="small"
        onClick={() => console.log("Alert Button Clicked")}
      >
        Alert Button
      </Button>
      <Button
        variant="success"
        size="large"
        isLoading={true}
        onClick={() => console.log("Success Button Clicked")}
      >
        Success Button
      </Button>
      <Button
        variant="primary"
        size="large"
        onClick={() => console.log("Button clicked")}
        ripple={true}
      >
        Click Me
      </Button>

      <Divider title="按钮组" />

      <ButtonGroup
        buttons={buttons}
        onButtonClick={handleButtonClick}
        size="large"
      />

      <Divider title="折叠按钮组" />

      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={buttons}
        onButtonClick={handleButtonClick}
        onToggle={handleToggle}
        onButtonHover={handleButtonHover}
        onButtonFocus={handleButtonFocus}
        onButtonBlur={handleButtonBlur}
        direction="vertical" // 可以切换为 vertical
      />

      <Divider title="输入框示例" />

      <TimeInput
        value={time}
        onChange={(newTime) => setTime(newTime)}
        label="Select Time"
        onFocus={() => console.log("Input focused")}
        onBlur={() => console.log("Input blurred")}
        onHover={() => console.log("Input hovered")}
      />
      <DateInput
        value={date}
        onChange={(newDate) => setDate(newDate)}
        label="Select Date"
        onFocus={() => console.log("Input focused")}
        onBlur={() => console.log("Input blurred")}
        onHover={() => console.log("Input hovered")}
      />
      <PhoneInput
        value={phone}
        onChange={(newPhone) => setPhone(newPhone)}
        label="Phone Number"
        onFocus={() => console.log("Input focused")}
        onBlur={() => console.log("Input blurred")}
        onHover={() => console.log("Input hovered")}
      />

      <Divider title="下拉菜单" />

      <Dropdown options={["选项 1", "选项 2", "选项 3"]} />

      <Divider title="复选框" />

      <CheckBox
        checked={isChecked}
        onChange={handleChange}
        label="Dark Sci-Fi CheckBox"
        size="large"
        onToggle={(checked) => console.log("Toggled:", checked)}
        onHover={() => console.log("Hovered")}
        onFocus={() => console.log("Focused")}
        onBlur={() => console.log("Blurred")}
      />

      <Divider title="表格示例" />

      <Table
        data={data}
        columns={columns}
        onRowSelect={(row) => console.log("Row selected:", row)}
        onRowDelete={(row) => console.log("Row deleted:", row)}
        onRowEdit={(row) => console.log("Row edited:", row)}
      />

      <Divider title="轮播图" />

      <Carousel
        items={[
          <div className="h-64 bg-red-200">Slide 1</div>,
          <div className="h-64 bg-green-200">Slide 2</div>,
          <div className="h-64 bg-blue-200">Slide 3</div>,
        ]}
      />

      <Divider title="Toast 通知" />

      <Button
        variant="primary"
        size="large"
        onClick={() => setToastVisible(true)}
      >
        Show Toast
      </Button>
      {toastVisible && (
        <Toast
          message="This is a toast notification!"
          onClose={() => setToastVisible(false)}
          duration={5000}
          onOpen={() => console.log("Toast opened")}
          onCloseComplete={() => console.log("Toast closed")}
          variant="success"
        />
      )}

      <Divider title="模态框" />

      <Button variant="primary" size="large" onClick={() => setModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onOpen={() => console.log("Modal opened")}
        onCloseComplete={() => console.log("Modal closed")}
        size="large"
        position="center"
        variant="primary"
        header={<h2 className="text-lg font-bold text-white">模态框头部</h2>}
        footer={
          <Button
            variant="secondary"
            size="medium"
            onClick={() => setModalOpen(false)}
          >
            Close
          </Button>
        }
      >
        <p className="text-gray-300">模态框内容在这里。</p>
      </Modal>

      <Divider title="进度条" />

      <ProgressBar progress={70} />

      <Divider title="图标示例" />

      <Icon icon="coffee" />

      <Divider title="反馈表单" />

      <Feedback />

      <Divider title="验证表单" />

      <ValidatedForm />

      <Divider title="搜索框" />

      <SearchBox
        placeholder="输入搜索内容..."
        onSearch={(val) => console.log(val)}
      />

      <Divider title="日历选择" />

      <Calendar />

      <Divider title="切换开关" />

      <Switch
        checked={isChecked}
        onChange={handleChange}
        label="Dark Sci-Fi Switch"
        size="large"
        onToggle={(checked) => console.log("Toggled:", checked)}
        onHover={() => console.log("Hovered")}
        onFocus={() => console.log("Focused")}
        onBlur={() => console.log("Blurred")}
      />

      <Divider title="折叠面板" />
      <Accordion>
        <AccordionItem title="折叠面板 1">
          <p>这里是折叠面板 1 的内容。</p>
        </AccordionItem>
        <AccordionItem title="折叠面板 2">
          <p>这里是折叠面板 2 的内容。</p>
        </AccordionItem>
      </Accordion>

      <Divider title="加载动画" />
      <LoadingSpinner />

      <Divider title="评分组件" />
      <Rating onRate={(rate) => setRating(rate)} />

      <Divider title="标签示例" />
      <Tag onClick={() => console.log("标签被点击")}>示例标签</Tag>

      <Divider title="头像展示" />
      <Avatar src="https://via.placeholder.com/150" alt="User Avatar" />

      <Divider title="菜单示例" />
      <Menu items={["菜单项 1", "菜单项 2", "菜单项 3"]} />

      <Divider title="分页组件" />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {notificationVisible && (
        <Notification
          message="这是通知消息"
          type="success"
          onClose={() => setNotificationVisible(false)}
        />
      )}

      {alertVisible && (
        <Alert
          message="这是警告信息"
          severity="error"
          onClose={() => setAlertVisible(false)}
        />
      )}

      <Divider title="确认对话框" />
      <ConfirmDialog
        isOpen={confirmOpen}
        message="你确定要继续吗？"
        onConfirm={() => {
          console.log("Confirmed!");
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />

      <Divider title="标签输入" />
      <TagInput
        onTagAdd={(tag) => console.log("Tag added:", tag)}
        onTagRemove={(tag) => console.log("Tag removed:", tag)}
      />

      {/*
      <Divider title="幻灯片组件" />
      <Slides
        slides={[
          <div className="h-64 bg-red-400 text-white">幻灯片 1</div>,
          <div className="h-64 bg-green-400 text-white">幻灯片 2</div>,
        ]}
      />*/}

      <Divider title="元素工具提示" />
      <Tooltip text="这是一个提示">
        <Button>悬停我查看提示</Button>
      </Tooltip>

      <Divider title="侧边栏" />
      <Sidebar items={["首页", "关于", "联系"]} />

      <Divider title="加载更多" />
      <LoadMore onClick={() => setLoadMoreVisible(false)} />
      {loadMoreVisible && <p>更多内容正在加载...</p>}

      <Divider title="图片轮播" />
      <ImageSlider images={images} />

      <Divider title="标签页" />
      <DndProvider backend={HTML5Backend}>
        <Tabs
          tabs={tabs}
          onTabChange={(tab) => console.log(`Active tab: ${tab}`)}
          onTabClose={(tab) => console.log(`Closed tab: ${tab}`)}
        />
      </DndProvider>

      <Divider title="图片上传" />
      <ImageUploader onUpload={(file) => setSelectedImage(file)} />

      {selectedImage && (
        <p>
          上传的图片：
          <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" />
        </p>
      )}

      <Divider title="进度条" />
      <Progress value={50} max={100} />

      <Divider title="垂直菜单" />
      <VerticalMenu
        items={["菜单项 1", "菜单项 2", "菜单项 3"]}
        onItemSelect={(index) => console.log("Item selected:", index)}
      />

      <Divider title="代码块" />
      <CodeBlock code={`const x = 10;\nconsole.log(x);`} />

      <Divider title="富文本编辑器" />
      <RichTextEditor
        value={content}
        onChange={handleContentChange}
        maxWidth="600px"
        maxHeight="400px"
      />

      <Divider title="骨架屏" />
      <SkeletonScreen width="100%" height="20px" shape="rectangle" />
      <SkeletonScreen width="50px" height="50px" shape="circle" />
      <SkeletonScreen
        width="100%"
        height="20px"
        shape="rectangle"
        onHover={() => console.log("Hovered")}
        onFocus={() => console.log("Focused")}
        onBlur={() => console.log("Blurred")}
      />

      <Divider title="加载遮罩" />
      <Button variant="primary" size="large" onClick={() => setIsLoading(true)}>
        Show Loading
      </Button>
      {isLoading && (
        <LoadingOverlay
          loadingText="Please wait..."
          onShow={() => console.log("Loading overlay shown")}
          onHide={() => console.log("Loading overlay hidden")}
        />
      )}
      <Button
        variant="secondary"
        size="large"
        onClick={() => setIsLoading(false)}
      >
        Hide Loading
      </Button>

      <Divider title="Stepper" />
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      <Divider title="面包屑导航" />
      <Router>
        <Breadcrumbs
          items={items}
          onItemClick={handleItemClick}
          variant="primary"
          separator=">"
          customClass="text-lg"
        />
        <Routes>
          <Route exact path="/" component={Modal} />
          <Route path="/category" component={Modal} />
          <Route path="/product" component={Modal} />
        </Routes>
      </Router>

      <Divider title="列表组件" />
      <ListGroup
        items={itemsA}
        onItemClick={handleItemClickA}
        onItemHover={handleItemHover}
        variant="primary"
        customClass="w-64"
      />

      <Divider title="图片组件" />
      <Images
        images={images}
        onImageClick={handleImageClick}
        onImageHover={handleImageHover}
        customClass="w-full"
      />

      <Divider title="通知消息" />
      <Button
        variant="primary"
        size="large"
        onClick={() => setOffcanvasOpen(true)}
      >
        打开侧边栏
      </Button>
      <Offcanvas
        isOpen={isOffcanvasOpen}
        onClose={() => setOffcanvasOpen(false)}
        onOpen={() => console.log("侧边栏已打开")}
        onCloseComplete={() => console.log("侧边栏已关闭")}
        customClass="custom-offcanvas"
        closeButtonContent="✖"
      >
        <h2 className="text-lg font-bold text-white">侧边栏内容</h2>
        <p className="text-gray-300">这是侧边栏内部的内容。</p>
      </Offcanvas>

      <Divider title="导航栏" />
      <Router>
        <Navbar brand="我的品牌" links={links} onLinkClick={handleLinkClick} />
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Routes>
      </Router>

      <Divider title="导航" />
      <Navs
        items={items}
        onNavClick={handleNavClick}
        onHover={handleHover}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <Divider title="流体布局" />
      <FluidLayout
        sidebarContent={sidebarContent}
        mainContent={mainContent}
        onSidebarToggle={handleSidebarToggle}
        customClass="custom-fluid-layout"
      />

      <Divider title="流布局" />
      <DndProvider backend={HTML5Backend}>
        <FlowLayout
          items={itemsAA}
          onItemClick={handleItemClick}
          onItemHover={handleItemHover}
          onDragEnd={handleDragEnd}
          customClass="custom-flow-layout"
          draggable={true}
        />
      </DndProvider>

      <Divider title="可拖动模态框" />
      <Button variant="primary" size="large" onClick={handleOpenModal}>
        打开模态框
      </Button>
      <DraggableModal isOpen={isModalOpenA} onClose={handleCloseModal}>
        <h2>模态框内容</h2>
        <p>这是一个可拖动的模态框。</p>
      </DraggableModal>

      <Divider title="可折叠侧边栏" />
      <CollapsibleSidebar
        items={sidebarItems}
        tooltip="点击展开/折叠"
        borderWidth="2"
        animation="transition-all duration-300 ease-in-out"
        icon="🔍"
        fullscreen={false}
      />

<IconSelector
        onSelectIcon={handleIconSelect}
        theme="light"
        tooltip="选择一个图标"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        size="3rem"
        color="blue"
        border={true}
        borderColor="border-gray-300"
        searchPlaceholder="搜索图标..."
        itemsPerPage={6}
      />
      {selectedIcon && (
        <div className="mt-4">
          <h2 className="text-xl">已选择的图标:</h2>
          <div className="flex items-center mt-2">
            {selectedIcon === "home" && <AiOutlineHome size="3rem" />}
            {selectedIcon === "user" && <AiOutlineUser size="3rem" />}
            {selectedIcon === "settings" && <AiOutlineSetting size="3rem" />}
            {/* 添加更多图标的条件渲染 */}
          </div>
        </div>
      )}
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
