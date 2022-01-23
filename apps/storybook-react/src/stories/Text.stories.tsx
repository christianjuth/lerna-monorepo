import { Text } from "@christianjuth/ui";
import { Meta, StoryObj } from "@storybook/react/types-6-0";

const meta: Meta = { component: Text, title: "Atoms/Text" };
export default meta;

export const Heading: StoryObj<Text.TextProps> = {
  args: {
    children:
      "This is a test",
      variant: 'h1'
  },
};

export const Truncation: StoryObj<Text.TextProps> = {
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Turpis in eu mi bibendum neque egestas. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Viverra vitae congue eu consequat ac felis donec. Eget nullam non nisi est sit amet facilisis magna etiam. Donec et odio pellentesque diam volutpat. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Tincidunt tortor aliquam nulla facilisi cras. Aliquet sagittis id consectetur purus ut faucibus pulvinar. Quam viverra orci sagittis eu. Cursus metus aliquam eleifend mi. Eu augue ut lectus arcu. Fermentum dui faucibus in ornare. Lobortis feugiat vivamus at augue eget arcu dictum varius duis.",
    numberOfLines: 3
  },
};
