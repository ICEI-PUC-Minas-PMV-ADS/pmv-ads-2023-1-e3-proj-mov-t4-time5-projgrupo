import { useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import { useAuth } from "@app/Auth/provider/AuthProvider";
import { ProfilePicture } from "@lib/components/ProfilePicture";
import { Modal, ModalContainer, ModalWrapper, Overlay } from "./HeaderMenu.style";

import { Button } from '@lib/components/Form/Button';
import { Text } from '@lib/components/Text';
import { ButtonLink } from '@lib/components/Form/ButtonLink';


export function HeaderMenu() {
  const { user, Logout } = useAuth();
  const [display, setDisplay] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setDisplay(!display)}>
        <ProfilePicture
          username={user.firstName}
          github={user.github === "" ? null : user.github}
          uri={user.picture === "" ? null : user.picture}
          outline={true}
          size={50}
        />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent
        visible={display}
        onRequestClose={() => setDisplay(false)}
      >
        <Overlay onPress={() => setDisplay(false)}>
          <ModalWrapper>
            <ModalContainer>
              <ButtonLink variant='alt' href={"Profile/" + user.id} radius={'0'}>
                <Text variant='white'>Perfil</Text>
              </ButtonLink>
              <Button variant='alt' onPress={() => Logout()} radius={'0'}>
                <Text variant='white'>Sair</Text>
              </Button>
            </ModalContainer>
          </ModalWrapper>
        </Overlay>
      </Modal>
    </>
  )
}
