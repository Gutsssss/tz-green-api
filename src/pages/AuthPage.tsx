import { PageWrapper } from "@/components/shared/PageWrapper/PageWrapper";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { authStore } from "@/store/authStore/auth";
import { useNavigate } from "react-router";
export const AuthPage = observer(() => {
  const navigate = useNavigate();
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const handleIdInstance = (value: string) => {
    setIdInstance(value);
  };
  const handleApiTokenInstance = (value: string) => {
    setApiTokenInstance(value);
  };
  const handleSubmit = async () => {
    await authStore.login(idInstance, apiTokenInstance);

    if (authStore.isAuthorized) {
      navigate("/", { replace: true });
    }
  };
  return (
    <PageWrapper>
      <p>Страница для входа</p>
      <AuthForm
        idInstance={idInstance}
        onChangeIdInstance={handleIdInstance}
        apiTokenInstance={apiTokenInstance}
        onChangeApiTokenInstance={handleApiTokenInstance}
        onClickAuth={handleSubmit}
      />
    </PageWrapper>
  );
});
