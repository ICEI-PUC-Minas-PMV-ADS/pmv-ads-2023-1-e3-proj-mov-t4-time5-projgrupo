import { useEffect, useState } from "react";
import { useSearchParams } from "expo-router";
import { Page, Text, View } from "@lib/components";
import { Header } from "@lib/components/Header/Header";
import { Profile } from "@app/Auth/provider/service/models/Profile";
import { IHttpService } from "@lib/interfaces/IHttpService";
import Env from "@lib/constants/Env";
import { ButtonLink } from "@lib/components/Form/ButtonLink";

export default function ProfileScreen() {
  const api = new IHttpService<Profile>(Env.API_URL);
  const { id } = useSearchParams();
  const [user, setUser] = useState<Profile | any>(null);

  useEffect(() => {
    api.get(`/users/${id}`).then((response) => {
      setUser(response);
    })
  }, [id]);

  return (
    <Page>
      <Header title={user?.firstName} />
      <Text>Profile</Text>
      <ButtonLink variant='alt' href={"Edit/EditProfile"} radius={'0'}>
        <Text variant='white'>Editar Perfil</Text>
      </ButtonLink>
    </Page>
  );
}
