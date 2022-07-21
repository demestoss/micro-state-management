import { FC, PropsWithChildren } from "react";
import { MemoedButton } from "../../components/Button";
import { Input } from "../../components/Input";

const SearchInput: FC<PropsWithChildren<{ value: string; onChange: (v: string) => void }>> = ({
  value,
  onChange,
  children,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="text-xl text-center">{children} - shared text</div>

      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

const SearchInputDisplay: FC<{ value: string; reset: () => void }> = ({ value, reset }) => {
  if (!value) return null;

  return (
    <div className="space-x-2">
      <span>{value}</span>

      <MemoedButton variant="inline" color="critical" onClick={reset}>
        Reset
      </MemoedButton>
    </div>
  );
};

export { SearchInput, SearchInputDisplay };
