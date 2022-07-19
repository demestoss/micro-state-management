import { FC } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

const SearchInput: FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="text-xl text-center">Shared search input</div>

      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

const SearchInputDisplay: FC<{ value: string; reset: () => void }> = ({ value, reset }) => {
  if (!value) return null;

  return (
    <div className="space-x-2">
      <span>{value}</span>

      <Button variant="inline" color="critical" onClick={reset}>
        Reset
      </Button>
    </div>
  );
};

export { SearchInput, SearchInputDisplay };
