type TabProps = {
  tab: string;
  setTab: (tab: string) => void;
  name: string;
  children: React.ReactNode;
};

export default function Tab({ tab, setTab, name, children }: TabProps) {
  return (
    <button
      className={tab === name ? "text-primary" : ""}
      onClick={() => {
        setTab(name);
      }}
    >
      {children}
    </button>
  );
}
