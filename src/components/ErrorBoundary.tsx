import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Portfolio App:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetAndReload = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F4F3EF] flex items-center justify-center p-6 text-[#111111] font-sans">
          <div className="max-w-lg w-full bg-white p-8 rounded-2xl border border-[#DCDAD2] shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-[#111111]">
                화면을 불러오는 중 오류가 발생했습니다
              </h1>
              <p className="text-sm text-[#71716A] leading-relaxed">
                로컬 브라우저 캐시 데이터 불일치 또는 렌더링 중 예외가 발생했습니다.
                아래 버튼을 눌러 새로고침하거나 캐시를 초기화해 주세요.
              </p>
            </div>

            {this.state.error && (
              <div className="text-left bg-[#FAF9F5] p-3 rounded-lg border border-[#E5E3DC] text-xs font-mono text-red-600 overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#07732C] text-white text-xs font-mono font-bold hover:bg-[#055822] transition-colors cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-4 h-4" />
                <span>페이지 새로고침</span>
              </button>

              <button
                onClick={this.handleResetAndReload}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#DCDAD2] text-[#555550] text-xs font-mono font-bold hover:bg-[#FAF9F5] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>캐시 초기화 후 재시작</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
