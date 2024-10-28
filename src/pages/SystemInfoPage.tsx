import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Tabs from "../components/Tabs";
import ChartWrapper from "../components/ChartWrapper";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Grid from "../components/Grid";
import ButtonGroup from "../components/ButtonGroup";

interface CpuUsageProps {
  usage: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Panel = styled.div`
  max-width: 4xl;
  margin: auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CpuUsage: React.FC<CpuUsageProps> = ({ usage }) => (
  <Card title="CPU 使用率" bgColor="rgba(173, 216, 230, 0.3)">
    <p>{usage.toFixed(2)}%</p>
  </Card>
);

interface MemoryUsageProps {
  usage: number;
}

const MemoryUsage: React.FC<MemoryUsageProps> = ({ usage }) => (
  <Card title="内存使用率" bgColor="rgba(144, 238, 144, 0.3)">
    <p>{usage.toFixed(2)}%</p>
  </Card>
);

interface StorageSpaceProps {
  space: number;
}

const StorageSpace: React.FC<StorageSpaceProps> = ({ space }) => (
  <Card title="存储空间" bgColor="rgba(255, 255, 224, 0.3)">
    <p>{space.toFixed(2)} GB</p>
  </Card>
);

interface NetworkStatusProps {
  status: string;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ status }) => (
  <Card title="网络状态" bgColor="rgba(216, 191, 216, 0.3)">
    <p>{status}</p>
  </Card>
);

interface CpuTemperatureProps {
  temperature: number;
}

const CpuTemperature: React.FC<CpuTemperatureProps> = ({ temperature }) => (
  <Card title="CPU 温度" bgColor="rgba(255, 182, 193, 0.3)">
    <p>{temperature.toFixed(2)} °C</p>
  </Card>
);

interface GpuTemperatureProps {
  temperature: number;
}

const GpuTemperature: React.FC<GpuTemperatureProps> = ({ temperature }) => (
  <Card title="GPU 温度" bgColor="rgba(255, 160, 122, 0.3)">
    <p>{temperature.toFixed(2)} °C</p>
  </Card>
);

interface NetworkSpeedProps {
  upload: number;
  download: number;
}

const NetworkSpeed: React.FC<NetworkSpeedProps> = ({ upload, download }) => (
  <>
    <Card title="上传速度" bgColor="rgba(173, 216, 230, 0.3)">
      <p>{upload.toFixed(2)} Mbps</p>
    </Card>
    <Card title="下载速度" bgColor="rgba(135, 206, 250, 0.3)">
      <p>{download.toFixed(2)} Mbps</p>
    </Card>
  </>
);

interface Process {
  name: string;
  memory: string;
  threads: number;
}

interface ProcessListProps {
  processes: Process[];
}

const ProcessList: React.FC<ProcessListProps> = ({ processes }) => (
  <div>
    <h3 className="font-medium mt-4 mb-2">进程列表</h3>
    <ul className="bg-gray-100 p-4 rounded-lg mb-4">
      {processes.map((proc, index) => (
        <li key={index} className="flex justify-between border-b py-2 text-sm">
          <span>{proc.name}</span>
          <span>{proc.memory} MB</span>
          <span>{proc.threads} 线程</span>
        </li>
      ))}
    </ul>
  </div>
);

const SystemInfoPanel: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [memoryUsage, setMemoryUsage] = useState<number>(0);
  const [storageSpace, setStorageSpace] = useState<number>(0);
  const [networkStatus, setNetworkStatus] = useState<string>("Online");
  const [cpuTemp, setCpuTemp] = useState<number>(0);
  const [gpuTemp, setGpuTemp] = useState<number>(0);
  const [uploadSpeed, setUploadSpeed] = useState<number>(0);
  const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [cpuData, setCpuData] = useState<number[]>([]);
  const [memoryData, setMemoryData] = useState<number[]>([]);
  const [refreshInterval, setRefreshInterval] = useState<number>(3000);

  useEffect(() => {
    const fetchSystemInfo = () => {
      setCpuUsage(Math.random() * 100);
      setMemoryUsage(Math.random() * 100);
      setStorageSpace(Math.random() * 500);
      setNetworkStatus(Math.random() > 0.5 ? "Online" : "Offline");
      setCpuTemp(Math.random() * 100);
      setGpuTemp(Math.random() * 100);
      setUploadSpeed(Math.random() * 100);
      setDownloadSpeed(Math.random() * 100);

      // 模拟进程列表
      setProcesses(
        Array.from({ length: 5 }, (_, index) => ({
          name: `Process-${index + 1}`,
          memory: (Math.random() * 200).toFixed(2),
          threads: Math.floor(Math.random() * 10) + 1,
        }))
      );

      // 更新数据点
      setCpuData((prev) => [...prev, Math.random() * 100]);
      setMemoryData((prev) => [...prev, Math.random() * 100]);
    };

    const interval = setInterval(fetchSystemInfo, refreshInterval);
    fetchSystemInfo();

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const chartData = {
    labels: Array.from({ length: cpuData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: "CPU 使用率",
        data: cpuData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "内存使用率",
        data: memoryData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const tabs = [
    {
      label: "系统信息",
      content: (
        <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
          <CpuUsage usage={cpuUsage} />
          <MemoryUsage usage={memoryUsage} />
          <StorageSpace space={storageSpace} />
          <NetworkStatus status={networkStatus} />
          <CpuTemperature temperature={cpuTemp} />
          <GpuTemperature temperature={gpuTemp} />
          <NetworkSpeed upload={uploadSpeed} download={downloadSpeed} />
        </Grid>
      ),
    },
    {
      label: "进程列表",
      content: <ProcessList processes={processes} />,
    },
    {
      label: "使用图表",
      content: (
        <ChartWrapper
          type="line"
          data={chartData}
          options={{ responsive: true }}
          theme="light"
          customClass="my-custom-chart-wrapper"
          customChartClass="my-custom-chart"
          ariaLabel="系统使用图表"
        />
      ),
    },
  ];

  const buttons = [
    { label: "快速刷新", value: "fast", icon: null },
    { label: "慢速刷新", value: "slow", icon: null },
  ];

  const handleButtonClick = (value: string) => {
    if (value === "fast") {
      setRefreshInterval(1000);
    } else if (value === "slow") {
      setRefreshInterval(5000);
    }
  };

  return (
    <Panel>
      <Title>系统信息面板</Title>
      <Tabs tabs={tabs} />
      <ButtonGroup
        buttons={buttons}
        onButtonClick={handleButtonClick}
        orientation="horizontal"
        size="medium"
        variant="primary"
      />
      <Input
        type="number"
        value={refreshInterval.toString()}
        onChange={(e) => setRefreshInterval(Number(e.target.value))}
        placeholder="刷新间隔（毫秒）"
      />
    </Panel>
  );
};

export default SystemInfoPanel;
