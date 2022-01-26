import {
  Checkbox,
  Form,
  Grid,
  Input,
  Label,
  Navbar,
  Paper,
  SC,
  StatefulDatepicker,
  Text,
  TextArea,
  theme,
  ToggleSwitch,
  Animation,
  animations,
  ReactChildren,
  AspectRatioBox,
} from "@christianjuth/ui";
import { useBreakPoint } from "@christianjuth/ui/components/Grid/context";
import Image from "next/image";
import { CSSProperties } from "react";
import { use100vh } from "react-div-100vh";
import { MdDesignServices } from "react-icons/md";
import styled from "styled-components";
import architecture1 from "../../assets/architecture1.jpeg";
import bobbyBerkDecor from "../../assets/bobby-berk-decor.jpeg";
import justinaBlakeneyDecor from "../../assets/justina-blakeney-decor.jpeg";
import mitBuilding from "../../assets/mit-building.jpg";
import neumorphicDesign from "../../assets/neumorphic-design.webp";
import thomBrowneFassion from "../../assets/phoebe-bridgers-thom-browne-fassion.jpeg";
import { Section } from "../../components";

function FadeIn({
  children,
  order = 0,
  style,
  animations: animationFns = [animations.fadeIn],
}: {
  children: ReactChildren;
  order?: number;
  style?: CSSProperties;
  animations?: Animation.AnimationFn[];
}) {
  const isDesktop = useBreakPoint("md");

  return (
    <Animation
      animations={animationFns}
      trigger="on-visible"
      config={{
        delay: (isDesktop ? order : 0) * 800,
        duration: 800,
        distance: 50,
      }}
      style={style}
    >
      <SC.FlexCol $centerContent="vertical" style={{ flex: 1 }}>
        {children}
      </SC.FlexCol>
    </Animation>
  );
}

const Highlight = styled.span`
  position: relative;
  color: ${theme.color("accent1", 10, "text")};
  margin: 0 0.15em;
  hyphens: none;
  display: inline-block;

  ::after {
    content: "";
    display: flex;
    position: absolute;
    top: 4px;
    right: -0.2em;
    bottom: 4px;
    left: -0.2em;
    background-color: ${theme.color("accent1", 10)};
    z-index: -1;
    border-radius: 2px;
  }
`;

const Figure = styled.figure`
  padding: 0;
  margin: ${theme.spacing(0, 0, 1)};

  && figcaption {
    display: flex;
    margin-top: ${theme.spacing(1)};
    font-style: italic;
    min-height: 2em;
    line-height: 1.9em;
    color: ${theme.colorPresets.textMuted};
  }
`;

function PresentationOne() {
  const pageHeight = Math.max((use100vh() ?? 0) - Navbar.height("md"), 0);

  return (
    <>
      <Navbar
        defaultItemSize="md"
        dark
        logo={
          <SC.FlexRow $spacing={1} $centerContent="vertical">
            <MdDesignServices size={30} color={theme.color("accent1", 9)} />
            <Text variant="copy-1" style={{ fontWeight: "bold" }} noPadding>
              Presentation 1
            </Text>
          </SC.FlexRow>
        }
        rightItems={[
          { link: { children: "Architecture", href: "#architecture" } },
          { link: { children: "Interiors", href: "#interiors" } },
          { link: { children: "Fassion", href: "#fassion" } },
          { link: { children: "Graphics", href: "#graphics" } },
          { link: { children: "Products", href: "#products" } },
        ]}
      />
      <Section dark style={{ minHeight: pageHeight }}>
        <FadeIn style={{ flex: 1 }} animations={[animations.fadeIn]}>
          <Text variant="h1" style={{ lineHeight: "1.3em" }}>
            What is <Highlight>Good</Highlight> Design to Me?
          </Text>
          <Text variant="h6" style={{ fontStyle: "italic", fontWeight: "300" }}>
            By Christian Juth
          </Text>
        </FadeIn>
      </Section>

      <Section id="architecture">
        <Text variant="h1">Architecture</Text>
        <br />

        <Grid.Row cols={2} spacing={theme.spacing(8)}>
          <Grid.Col xs={2} md={1}>
            <FadeIn order={0}>
              {/* https://worldarchitecture.org/architecture-news/cvpec/big_brooks_scarpa_and_olson_kundig_are_among_winners_for_2017_aia_housing_awards.html */}
              <Figure>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Image src={architecture1} objectFit="cover" layout="fill" />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Blue Lake Retreat- Marble Falls, Texas by Lake|Flato
                  Architects
                </Text>
              </Figure>
              <Text variant="p">
                This house designed by Lake|Flato Architects, is sleak and
                transparent. While this type of design may stand out to many
                people, I think it adhears to Dieter's "Good design is
                Unobtrusive" principle.
              </Text>
            </FadeIn>
          </Grid.Col>

          <Grid.Col xs={2} md={1}>
            <FadeIn order={1}>
              <Figure>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Image src={mitBuilding} objectFit="cover" layout="fill" />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Stata Center on MIT Campus in Cambridge, Massachustets
                </Text>
              </Figure>
              <Text variant="p">
                This is the Stata Center building at MIT and its one of the
                weirdest buildings I've ever seen. In my opinion, it seems like
                someone asked themself "can we build this" and not "should we
                build this." It's very weird, it seems impractical, and it
                sticks out like a sour thumb. I think this breaks many of
                Dieter's design principles since it is not{" "}
                <Highlight>astetic</Highlight> to me, it technically{" "}
                <Highlight>inovative</Highlight> but not in a way that I find is
                useful, and I don't believe it is{" "}
                <Highlight>long-lasting</Highlight> since it so styalistic that
                I don't se this astetic aging well.
              </Text>
            </FadeIn>
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Section id="interiors" dark>
        <Text variant="h1">Interior Design</Text>
        <br />

        <Grid.Row cols={2} spacing={theme.spacing(8)}>
          <Grid.Col xs={2} md={1}>
            <FadeIn order={0}>
              {/* https://worldarchitecture.org/architecture-news/cvpec/big_brooks_scarpa_and_olson_kundig_are_among_winners_for_2017_aia_housing_awards.html */}
              <Figure>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Image
                    src={justinaBlakeneyDecor}
                    objectFit="cover"
                    layout="fill"
                  />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Interior designer Justina Blakeney
                </Text>
              </Figure>
              <Text></Text>
            </FadeIn>
          </Grid.Col>

          <Grid.Col xs={2} md={1}>
            <FadeIn order={1}>
              <Figure>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Image src={bobbyBerkDecor} objectFit="cover" layout="fill" />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Interior designer Bobby Berk
                </Text>
              </Figure>
              <Text></Text>
            </FadeIn>
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Section id="fassion">
        <Text variant="h1">Fassion</Text>
        <br />

        <Grid.Row cols={2} spacing={theme.spacing(8)}>
          <Grid.Col xs={2} md={1}>
            <FadeIn order={0}>
              <Figure>
                <AspectRatioBox aspectRatio={1}>
                  <Image
                    src={thomBrowneFassion}
                    objectFit="cover"
                    layout="fill"
                  />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption"></Text>
              </Figure>
              <Text></Text>
            </FadeIn>
          </Grid.Col>

          <Grid.Col xs={2} md={1}>
            <FadeIn order={1}>
              <Figure>
                <AspectRatioBox aspectRatio={1}>
                  <Image
                    src={thomBrowneFassion}
                    objectFit="cover"
                    layout="fill"
                  />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Pheobe Bridger's Grammy's costume designed by Thom Browne
                </Text>
              </Figure>
              <Text></Text>
            </FadeIn>
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Section id="graphics" dark>
        <Text variant="h1">Graphics Design</Text>
        <br />

        <FadeIn order={0}>
          <Text variant="p" style={{ maxWidth: "50ch" }}>
            This section hits close to home since I'm a UI/UX designer. UI/UX is
            very similar to Graphics Design, except in addition to building
            buitiful interfaces, I also need to worry about making designs
            interactive, responsive, and accesible.
          </Text>
        </FadeIn>
        <br />

        <Grid.Row cols={2} spacing={theme.spacing(8)}>
          <Grid.Col xs={2} md={1}>
            <FadeIn order={1}>
              <Figure>
                <Image
                  src={neumorphicDesign}
                  objectFit="contain"
                  layout="responsive"
                />
                <Text variant="copy-2" htmlTag="figcaption">
                  By Emy Lascan, Accessed Jan 25th 2022
                </Text>
              </Figure>
              <Text variant="p">
                This is an example of Neumorphic design. Neomorphic design is
                sort of controversial and has not recieved widespread addoption.
                It's sort of a child of Skewmorphism, which was popular in
                Apple's iOS 1-6 software for the iPhone. While iOS 7, which left
                Skewmophism, was also controversial at the time, many have
                accepted visually simpler design systems like Material Design
                and Apple's "Cupertino Design." Neomorphism is interesting, but
                I think it reintroduces some of the visual complexity that Apple
                and other companies have moved away from.
              </Text>
              <br />
              <Text variant="p">
                From what I've seen over the past few years many apps like
                Instagram are simplifying their design so letting content stand
                out. Apps like Instagram use primarily neutral colors, letting
                the user's eye be drawn to colorful content instead of the app's
                interface. Since Neomorphsm does not adhear to this content
                first principle, I beleve it is <Highlight>obtrusive</Highlight>{" "}
                and therefore bad design.
              </Text>
            </FadeIn>
          </Grid.Col>

          <Grid.Col xs={2} md={1}>
            <FadeIn order={2}>
              <Figure>
                <Paper>
                  <Form onSubmit={(data) => console.log(data)}>
                    <Label variant="copy-1" noPadding>
                      Toggle switch
                      {(props) => (
                        <ToggleSwitch name="toggleSwitch" {...props} />
                      )}
                    </Label>
                    <Label variant="copy-1" noPadding>
                      Checkbox
                      {(props) => <Checkbox name="checkbox" {...props} />}
                    </Label>
                    <Label variant="copy-1">
                      Text input
                      {(props) => <Input name="username" {...props} />}
                    </Label>
                    <Label variant="copy-1">
                      Text area
                      {(props) => (
                        <TextArea
                          name="textarea"
                          {...props}
                          style={{
                            minHeight: 150,
                          }}
                        />
                      )}
                    </Label>
                    <Label variant="copy-1">
                      Date input
                      {(props) => <StatefulDatepicker name="date" {...props} />}
                    </Label>
                  </Form>
                </Paper>
                <Text variant="copy-2" htmlTag="figcaption">
                  By myself, a work in progress :)
                </Text>
              </Figure>
              <Text variant="p">
                This is a UI library I'm desigining. My style draws inspiration
                from Material Design, Apple's "Cupertino Design", and various
                other places. I like to keep things relativly simple. In my
                opinion, a good website should be pretty, but it should also get
                out of your way.
              </Text>
              <br />

              <Text variant="p">
                I beleive my design adhears to all of Dieter Ram's design
                commandments. Most of the <Highlight>inovation</Highlight> is
                under the hood, but I'm able to auto generate color pallettes in
                a way that I haven't seen other UI frameworks offer. By keeping
                things simple, I hope the design will be{" "}
                <Highlight>long-lasting</Highlight> since it doesn't commit to
                any specific UI design trend. I also think the design is{" "}
                <Highlight>unobtrusive</Highlight>, since it keeps things simple
                and adhears to accesibility specifications implementing expected
                keyboard behaviors.
              </Text>
            </FadeIn>
          </Grid.Col>
        </Grid.Row>

        {/* https://dribbble.com/shots/9527558-Freebie-Neumorphic-UX-UI-Elements */}
      </Section>
      <Section id="products">
        <Text variant="h1">Product Design</Text>
      </Section>
      <Section dark slim>
        <Text variant="copy-1" style={{ fontStyle: "italic" }} noPadding>
          This website is made using React and a UI library I designed myself
        </Text>
      </Section>
    </>
  );
}

export default PresentationOne;
