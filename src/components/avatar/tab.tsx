import { optionImages } from "@/constants/avatar";

type TabProps = {
  tab: string;
  setTab: (tab: keyof typeof optionImages) => void;
  name: keyof typeof optionImages;
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
