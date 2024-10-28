import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  logError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  storeLocally?: boolean;
  autoRecoverAfter?: number;
  reportError?: (
    error: Error | null,
    errorInfo: React.ErrorInfo | null
  ) => void;
  errorMessage?: string;
  fallbackComponent?: React.ComponentType<{ resetError: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  countdown: number;
  errorLog: string[];
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  timer: NodeJS.Timeout | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      countdown: 0,
      errorLog: [],
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ error, errorInfo: info });

    // 控制台日志
    console.error("Error captured in ErrorBoundary: ", error, info);

    // 触发自定义 onError 回调
    if (this.props.onError) {
      this.props.onError(error, info);
    }

    // 可选：发送日志到远程监控
    if (this.props.logError) {
      this.props.logError(error, info);
    }

    // 存储错误日志到 localStorage
    if (this.props.storeLocally) {
      const errorLog = JSON.parse(localStorage.getItem("errorLog") || "[]");
      errorLog.push({ error: error.toString(), info });
      localStorage.setItem("errorLog", JSON.stringify(errorLog));
      this.setState({ errorLog });
    }

    // 启动自动恢复倒计时（如果启用）
    if (this.props.autoRecoverAfter) {
      this.startCountdown();
    }
  }

  startCountdown() {
    const { autoRecoverAfter } = this.props;
    this.setState({ countdown: autoRecoverAfter || 0 });
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.countdown <= 1) {
          this.resetError();
          return { countdown: 0 };
        }
        return { countdown: prevState.countdown - 1 };
      });
    }, 1000);
  }

  resetError = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReportError = () => {
    if (this.props.reportError) {
      this.props.reportError(this.state.error, this.state.errorInfo);
    } else {
      alert("Thank you for reporting the issue!");
    }
  };

  triggerError = () => {
    throw new Error("This is a manually triggered error.");
  };

  viewErrorLog = () => {
    const errorLog = JSON.parse(localStorage.getItem("errorLog") || "[]");
    alert(JSON.stringify(errorLog, null, 2));
  };

  clearErrorLog = () => {
    localStorage.removeItem("errorLog");
    this.setState({ errorLog: [] });
    alert("Error log cleared.");
  };

  render() {
    if (this.state.hasError) {
      const { errorMessage, fallbackComponent: FallbackComponent } = this.props;

      return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {FallbackComponent ? (
            <FallbackComponent resetError={this.resetError} />
          ) : (
            <div>
              <h1>{errorMessage || "Something went wrong."}</h1>
              {this.state.countdown > 0 && (
                <p>
                  Attempting to recover in {this.state.countdown} seconds...
                </p>
              )}
              <button onClick={this.resetError} style={{ marginTop: "10px" }}>
                Try Again
              </button>
              <button
                onClick={this.handleReportError}
                style={{ marginLeft: "10px" }}
              >
                Report Error
              </button>
            </div>
          )}

          {/* 开发模式下显示错误详情 */}
          {process.env.NODE_ENV === "development" && this.state.errorInfo && (
            <details style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
              <summary>Click to view error details</summary>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return (
      <div>
        {this.props.children}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button onClick={this.triggerError} style={{ marginRight: "10px" }}>
            Trigger Error
          </button>
          <button onClick={this.viewErrorLog} style={{ marginRight: "10px" }}>
            View Error Log
          </button>
          <button onClick={this.clearErrorLog}>Clear Error Log</button>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

export default ErrorBoundary;
