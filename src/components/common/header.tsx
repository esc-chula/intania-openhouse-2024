import BackButton from "./back-button";
import IntaniaOPH2024Logo from "./logo";

export default function Header({ back }: { back?: boolean }) {
  return (
    <div className="relative flex min-h-20 w-full items-center justify-center">
      {back && <BackButton />}
      <div className="relative flex h-16 w-28 items-center justify-center">
        <IntaniaOPH2024Logo className="" />
      </div>
    </div>
  );
}
