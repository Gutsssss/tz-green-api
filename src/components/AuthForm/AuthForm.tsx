import { Input } from "../shared/Input/Input";
import { Button } from "../shared/Button/Button";

interface AuthFormProps {
  idInstance: string;
  apiTokenInstance: string;
  onClickAuth: () => void;
  onChangeIdInstance: (value: string) => void;
  onChangeApiTokenInstance: (value: string) => void;
}
export const AuthForm = (props: AuthFormProps) => {
  const {
    apiTokenInstance,
    idInstance,
    onClickAuth,
    onChangeIdInstance,
    onChangeApiTokenInstance,
  } = props;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 py-4">
        <Input
          type="text"
          innerPlaceholder="idInstance"
          value={idInstance}
          fullWidth
          onChange={onChangeIdInstance}
        />
        <Input
          type="text"
          innerPlaceholder="apiTokenInstance"
          value={apiTokenInstance}
          fullWidth
          onChange={onChangeApiTokenInstance}
        />
      </div>
      <Button title="Войти" clickIvent={onClickAuth} />
    </div>
  );
};
