"use client";

import { useCallback, useState } from "react";
import clsx from "clsx";

type Tab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

interface Props {
  tabs: Tab[];
}

export const Tabs = ({ tabs = [] }: Props) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const renderContent = useCallback(() => {
    const activeTabContent = tabs.find((tab) => tab.key === activeTab)?.content;

    return activeTabContent;
  }, [activeTab, tabs]);

  return (
    <div className="mb-3">
      {tabs.map((tab) => (
        <button
        key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={clsx("border-b-2 border-[#E0E4EF] pb-4 px-4 text-sm font-normal font", {
            "border-b-2 border-primary": activeTab === tab.key,
          })}
        >
          {tab.label}
        </button>
      ))}
      {renderContent()}
    </div>
  );
};
