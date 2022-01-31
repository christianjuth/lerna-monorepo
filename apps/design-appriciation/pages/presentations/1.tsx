import {
  Animation,
  animations,
  AspectRatioBox,
  Checkbox,
  Display,
  Form,
  Grid,
  Input,
  Label,
  Navbar,
  Paper,
  ReactChildren,
  SC,
  StatefulDatepicker,
  Text,
  TextArea,
  theme,
  ToggleSwitch,
  Link,
  Divider,
} from "@christianjuth/ui";
import { useBreakPoint } from "@christianjuth/ui/components/Grid/context";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import { MdDesignServices } from "react-icons/md";
import Typist from "react-typist";
import styled from "styled-components";
import architecture1 from "../../assets/architecture1.jpeg";
import bobbyBerkDecor from "../../assets/bobby-berk-decor.jpeg";
import justinaBlakeneyDecor from "../../assets/justina-blakeney-decor.jpeg";
import mitBuilding from "../../assets/mit-building.jpg";
import neumorphicDesign from "../../assets/neumorphic-design.webp";
import thomBrowneFassion from "../../assets/phoebe-bridgers-thom-browne-fassion.jpeg";
import appleSquircle from "../../assets/apple-squircle.png";
import appleTwo from "../../assets/apple-2.jpeg";
import squirckle from "../../assets/squirckle.png";
import hmSweater from "../../assets/hm-sweater.jpeg";
import { Section } from "../../components";
import Head from "next/head";

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

const Highlight = styled.span<{ $animate?: boolean }>`
  position: relative;
  color: ${theme.color("accent1", 10, "text")};
  margin: 0 0.15em;
  hyphens: none;
  display: inline-block;
  z-index: ${theme.zIndex("page", 10)};

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

const HighlightText = styled.span`
  color: ${theme.color("accent1", 6)};
`;

const Figure = styled.figure`
  padding: 0;
  margin: ${theme.spacing(0, 0, 1)};

  && figcaption {
    display: block;
    margin-top: ${theme.spacing(1)};
    font-style: italic;
    min-height: 2em;
    line-height: 1.9em;
    color: ${theme.colorPresets.textMuted};
  }
`;

function PresentationOne() {
  const [pageHeight, setPageHeight] = useState("100vh");

  useEffect(() => {
    setPageHeight(`${window.innerHeight - Navbar.height("md")}px`);
  }, []);

  return (
    <>
      <Head>
        <title>Presentation 1 | Design Appriciation</title>
      </Head>
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
        <SC.FlexCol $centerContent="vertical" style={{ flex: 1 }}>
          <div style={{ minHeight: "max(calc(300px - 15vw), 200px)" }}>
            <Typist cursor={{ show: false }}>
              <Text variant="h1" style={{ lineHeight: "1.3em" }}>
                What is <HighlightText>Good</HighlightText>
                <Display xs={true} lg={false} tag="br" /> Design to Me?
              </Text>
            </Typist>
            <Typist startDelay={3000} cursor={{ show: false }}>
              <Text
                variant="h6"
                style={{ fontStyle: "italic", fontWeight: "300" }}
              >
                By Christian Juth
              </Text>
            </Typist>
          </div>
        </SC.FlexCol>

        <Animation
          animations={[animations.fadeIn]}
          config={{ distance: 5, duration: 1500, delay: 4500 }}
          style={{ position: "absolute", bottom: 30, alignSelf: "center" }}
        >
          <BsChevronCompactDown
            size={40}
            color={theme.colorPresets.textMuted}
          />
        </Animation>
      </Section>

      <Section id="architecture">
        <Text variant="h1">Architecture</Text>
        <br />

        <Grid.Row cols="1fr 1px 1fr" spacing={theme.spacing(8)}>
          <Grid.Col xs={3} md={1}>
            <FadeIn order={0}>
              {/* https://worldarchitecture.org/architecture-news/cvpec/big_brooks_scarpa_and_olson_kundig_are_among_winners_for_2017_aia_housing_awards.html */}
              <Figure>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Image src={architecture1} objectFit="cover" layout="fill" />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Lake|Flato Architects, Blue Lake Retreat, 2018, Marble Falls,
                  Texas
                </Text>
              </Figure>
              <Text variant="p">
                This building designed by Lake/Flato Architects is sleek,
                transparent, and <Highlight>aesthetic</Highlight>. While this
                type of design may stand out to many people, I think it is{" "}
                <Highlight>unobtrusive</Highlight> since it lets the beatify of
                the world around show through. I can't imagine producing a
                building with this much glass is easy. Therefore I would argue
                that it's <Highlight>innovative</Highlight>. I believe this
                adheres to Ram's criteria of good design.
              </Text>
            </FadeIn>
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{ height: "100%" }}>
            <Divider vertical />
          </Grid.Col>

          <Grid.Col xs={3} md={0}>
            <Divider />
          </Grid.Col>

          <Grid.Col xs={3} md={1}>
            <FadeIn order={1}>
              <Figure>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Image src={mitBuilding} objectFit="cover" layout="fill" />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Frank Gehry, MIT Stata Center, 2004, Cambridge Massachusetts
                </Text>
              </Figure>
              <Text variant="p">
                Stata Center on MIT Campus in Cambridge, Massachusetts This is
                the Stata Center building at MIT, and it's one of the weirdest
                buildings I've ever seen. In my opinion, it seems like someone
                asked themself, "can we build this" and not "should we build
                this." It's very weird, it seems impractical, and it sticks out
                like a sour thumb. I think this breaks many of Dieter's design
                principles since it is not <Highlight>aesthetic</Highlight> to
                me. It is technically <Highlight>innovative</Highlight> but not
                in a way that I find useful. I don't believe it is{" "}
                <Highlight>long-lasting</Highlight> since it is so stylistic
                that I don't see this aesthetic aging well.
              </Text>
            </FadeIn>
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Section id="interiors" dark>
        <Text variant="h1">Interior Design</Text>
        <br />

        <Grid.Row cols="1fr 1px 1fr" spacing={theme.spacing(8)}>
          <Grid.Col xs={3} md={1}>
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
                  Justina Blakeney, 2020
                </Text>
              </Figure>
              <Text>
                I love how this design feels warm, friendly, integrated into
                nature and <Highlight>aesthetic</Highlight>. I think the use of
                nature in Blakeney's decor makes this feel{" "}
                <Highlight>long-lasting</Highlight> since nature will never go
                out of style – unless we destroy the planet, then maybe it could
                go out of style :(. Although there is a lot going on, it feels
                like a canvas that highlights what is beautiful about the world
                around us. Therefore, I would argue that it's{" "}
                <Highlight>unobtrusive</Highlight>. I believe this adheres to
                Ram's criteria of good design.
              </Text>
            </FadeIn>
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{ height: "100%" }}>
            <Divider vertical />
          </Grid.Col>

          <Grid.Col xs={3} md={0}>
            <Divider />
          </Grid.Col>

          <Grid.Col xs={3} md={1}>
            <FadeIn order={1}>
              <Figure>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Image src={bobbyBerkDecor} objectFit="cover" layout="fill" />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  VizLine Studio, 2020
                </Text>
              </Figure>
              <Text>
                This design feels sleek, but unlike Blakeney, this feels cold
                and less welcoming. I like that it feels industrial, and
                everything serves a purpose making it feel{" "}
                <Highlight>through to the last detail</Highlight>. I think you
                could argue that this decor is{" "}
                <Highlight>unobtrusive</Highlight> but in a different way than
                Blakeney. VizLine's decor feels trendy, but in a way that is
                committed to a specific style. For that reason, I don't think
                it's as <Highlight>long-lasting</Highlight>. This one could go
                either way for me. I believe it adheres to some of Ram's
                criteria, but not all of them.
              </Text>
            </FadeIn>
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Section id="fassion">
        <Text variant="h1">Fashion</Text>
        <Divider />
        <br />

        <Grid.Row cols="1fr 1px 1fr" spacing={theme.spacing(8)}>
          <Grid.Col xs={3} md={1}>
            <FadeIn order={0}>
              <Text variant="h4">H&M</Text>
              <Figure>
                <AspectRatioBox aspectRatio={0.85}>
                  <Image src={hmSweater} objectFit="cover" layout="fill" />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  H&M, Slim Fit Fine-knit Cotton Sweater, (accessed Jan 30th
                  2022)
                </Text>
              </Figure>
              <Text>
                This is a slim fit sweater designed and sold by H&M. I believe
                it adheres to all of Ram's good design criteria, primarily due
                to its simplicity. It's <Highlight>aesthetic</Highlight>,{" "}
                <Highlight>unobtrusive</Highlight>,{" "}
                <Highlight>long-lasting</Highlight>, and involves{" "}
                <Highlight>as little design as possible</Highlight>. It's not
                the most <Highlight>innovative</Highlight>, but it does what
                it's supposed to do and no more. Its simplicity makes it{" "}
                <Highlight>useful</Highlight> due to its versatility.
              </Text>
            </FadeIn>
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{ height: "100%" }}>
            <Divider vertical />
          </Grid.Col>

          <Grid.Col xs={3} md={0}>
            <Divider />
          </Grid.Col>

          <Grid.Col xs={3} md={1}>
            <FadeIn order={1}>
              <Text variant="h4">Thom Browne</Text>
              <Figure>
                <AspectRatioBox aspectRatio={0.85}>
                  <Image
                    src={thomBrowneFassion}
                    objectFit="cover"
                    layout="fill"
                  />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Thom Browne, Pheobe Bridger's Grammy's outfit, 2021
                </Text>
              </Figure>
              <Text>
                This isn't a very practical example, but I just wanted to throw
                this in here because I thought it was cool. Pheobe Bridgers
                talks about death a lot in her music – which sounds depressing,
                lol. This outfit, to me, is a reminder that we are all just
                skeletons. At the same time, the outfit is{" "}
                <Highlight>Aesthetic</Highlight> and catches your eye. However,
                it is not very practical and seems a bit{" "}
                <Highlight>obtrusive</Highlight> compared to something you can
                wear daily. Since this is such a statement piece, it's not{" "}
                <Highlight>long-lasting</Highlight>. I don't think this adheres
                to Dieter Ram's design criteria, but I also don't think it's
                trying to. It's a statement piece designed for a specific event,
                and it does what it's supposed to.
              </Text>
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
            beautiful interfaces, I also need to worry about making designs
            interactive, responsive, and accessible.
          </Text>
        </FadeIn>

        <Divider />
        <br />

        <Grid.Row cols="1fr 1px 1fr" spacing={theme.spacing(8)}>
          <Grid.Col xs={3} md={1}>
            <Text variant="h4">Neomorphic Design</Text>
            <FadeIn order={1}>
              <Figure>
                <Image
                  src={neumorphicDesign}
                  objectFit="contain"
                  layout="responsive"
                />
                <Text variant="copy-2" htmlTag="figcaption">
                  Emy Lascan, Freebie Neumorphic UX UI Elements, (accessed Jan
                  25th 2022)
                </Text>
              </Figure>
              <Text variant="p">
                This is an example of Neumorphic design. Neomorphic design is
                sort of controversial and has not received widespread adoption.
                It draws inspiration from Skewmorphism, which was popular in
                Apple's iOS 1-6 software for the iPhone. While iOS 7, which left
                Skewmophism, was also controversial at the time, many have
                accepted visually simpler design systems like Material Design
                and Apple's "Cupertino Design." Neomorphism is interesting, but
                it reintroduces some of the visual complexity that Apple and
                other companies have moved away from.
              </Text>
              <br />
              <Text variant="p">
                From what I've seen over the past few years, many apps like
                Instagram are simplifying their design, letting content stand
                out and speak for itself. Apps like Instagram use primarily
                neutral colors, allowing the user's eye to be drawn to colorful
                content instead of the app's interface. Since Neomorphsm does
                not adhere to this content first principle, I believe it is{" "}
                <Highlight>obtrusive</Highlight> and bad design.
              </Text>
            </FadeIn>
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{ height: "100%" }}>
            <Divider vertical />
          </Grid.Col>

          <Grid.Col xs={3} md={0}>
            <Divider />
          </Grid.Col>

          <Grid.Col xs={3} md={1}>
            <Text variant="h4">Typical Design</Text>
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
                This is a UI library I'm designing. My style draws inspiration
                from Material Design, Apple's "Cupertino Design," and various
                other places. I like to keep things relatively simple. In my
                opinion, a good website should be pretty, but it should also get
                out of your way.
              </Text>
              <br />

              <Text variant="p">
                I believe my design adheres to all of Dieter Ram's design
                commandments. Most of the <Highlight>innovation</Highlight> is
                under the hood, but I'm able to auto-generate color palettes in
                a way that I haven't seen other UI frameworks offer. By keeping
                things simple, I hope the design will be{" "}
                <Highlight>long-lasting</Highlight> since it doesn't commit to
                any specific UI design trend. I also think the design is{" "}
                <Highlight>unobtrusive</Highlight> since it keeps things simple
                and adheres to accessibility specifications implementing
                expected keyboard behaviors.
              </Text>
            </FadeIn>
          </Grid.Col>
        </Grid.Row>

        {/* https://dribbble.com/shots/9527558-Freebie-Neumorphic-UX-UI-Elements */}
      </Section>
      <Section id="products">
        <Text variant="h1">Product Design</Text>
        <Divider />

        <br />

        <Grid.Row cols="1fr 1px 1fr" spacing={theme.spacing(8)}>
          <Grid.Col xs={3} md={1}>
            <FadeIn order={0}>
              <Text variant="h4">Mac Mini</Text>

              {/* https://worldarchitecture.org/architecture-news/cvpec/big_brooks_scarpa_and_olson_kundig_are_among_winners_for_2017_aia_housing_awards.html */}
              <Figure>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Image src={appleSquircle} objectFit="cover" layout="fill" />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Apple, Mac mini, latest model (as of Jan 2022)
                </Text>
              </Figure>

              <Text>
                Say what you will about Apple, but I would argue they are first
                in design when it comes to tech (whether you believe the cost is
                justified or not). One thing that catches my eye is Apple's use
                of the "Squirckle" in both hardware and software. Many brands
                use a square with rounded corners, but the problem with this is
                you can easily see the point at which the rounded corner starts.
                The Squirckle is designed to mask the point at which the edge
                begins to curve (see image below).
              </Text>
            </FadeIn>

            <FadeIn order={2}>
              <Figure>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Image src={squirckle} objectFit="cover" layout="fill" />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Image by{" "}
                  <Link href="https://99percentinvisible.org/article/circling-square-designing-squircles-instead-rounded-rectangles/">
                    99percentinvisible.com
                  </Link>
                </Text>
              </Figure>

              <Text>
                I believe Apple's current design language adheres to Dieter
                Ram's principles of good design. The Squirckle sounds silly, but
                it demonstrates attention to creating a pleasing{" "}
                <Highlight>aesthetic</Highlight>. Something about the rounded
                corners feels friendly, simple,{" "}
                <Highlight>unobtrusive</Highlight>, and{" "}
                <Highlight>long-lasting</Highlight> (due to its simplicity).
              </Text>
            </FadeIn>
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{ height: "100%" }}>
            <Divider vertical />
          </Grid.Col>

          <Grid.Col xs={3} md={0}>
            <Divider />
          </Grid.Col>

          <Grid.Col xs={3} md={1}>
            <FadeIn order={1}>
              <Text variant="h4">Apple II</Text>

              <Figure>
                <AspectRatioBox aspectRatio={16 / 9}>
                  <Image src={appleTwo} objectFit="cover" layout="fill" />
                </AspectRatioBox>
                <Text variant="copy-2" htmlTag="figcaption">
                  Apple, Apple II, released 1977
                </Text>
              </Figure>
              <Text>
                It's crazy to see how far Apple has come. I think their new
                design language is objectively better compared to this old
                design, but you could argue the Apple II design is retro and
                nostalgic. This design feels rougher to me. The way the
                computer's casing cuts into the screen feels{" "}
                <Highlight>obtrusive</Highlight> compared to their newer
                products. The sharp edges (compared to the Squirckle) feel less
                approachable and <Highlight>not aesthetic</Highlight>.
              </Text>
            </FadeIn>
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Section dark slim>
        <Text variant="copy-1" style={{ fontStyle: "italic" }} noPadding>
          This website is made using React and a UI library I designed myself.
          Check out the source code{" "}
          <Link href="https://github.com/christianjuth/monorepo/tree/main/apps/design-appriciation">
            here
          </Link>
          .
        </Text>
      </Section>
    </>
  );
}

export default PresentationOne;
