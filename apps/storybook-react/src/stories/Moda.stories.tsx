import { Modal, useModalState, Button } from "@christianjuth/ui";
import { Meta, StoryObj } from "@storybook/react/types-6-0";

function ModalExample(props: Modal.Props) {
  const state = useModalState();

  return (
    <>
      <Button onClick={() => state.setOpen(true)}>Open modal</Button>
      <Modal {...props} {...state}>
        test
      </Modal>
    </>
  );
}

const meta: Meta = { component: ModalExample, title: "Atoms/Modal" };
export default meta;

export const BasicUsage: StoryObj<Modal.Props> = {
  args: {
    title: "Title",
  },
};
