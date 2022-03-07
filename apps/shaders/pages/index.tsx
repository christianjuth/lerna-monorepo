import dedent from "dedent";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TabPane, Tabs } from "../components/Tabs";

const Shader = dynamic(() => import("../components/Shader"), { ssr: false });
const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
  grid-gap: 8px;
  padding: 8px;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const Panel = styled.div`
  grid-column: span 1;
  grid-row: span 1;
  display: flex;
  flex-direction: column;
`;

const Controls = styled.div`
  flex: 1;
  background-color: #272a36;
`

// const Button = styled.button`
//   background-color: #272a36;
//   color: white;
//   border-radius: 0;
//   border: none;
//   padding: 10px;
//   font-size: 1.1rem;
//   margin-top: 8px;
//   cursor: pointer;
// `;

const defaultFragShader = dedent`
  // vTextureCoord.x and vTextureCoord.y represent
  // the (x, y) coordinate within the container.
  // Both x and y are in the range of [0-1].
  varying vec2 vTextureCoord;
  // Time in milliseconds.
  uniform float timeMs;

  // takes any float as input and
  // ossolates smoothly between 0 and 1
  float oscillate(float val) {
    return (sin(val) + 1.0) / 2.0;
  }

  void main() {
    float slowedTime = timeMs / 100.0;
    float red = oscillate(vTextureCoord.x + slowedTime);
    float green = oscillate(vTextureCoord.y + slowedTime);
    float blue = oscillate(slowedTime);
    gl_FragColor = vec4(red, green, blue, 1.0);
  }
`;

const Home: NextPage = () => {
  const router = useRouter();
  const urlFragShader = String(router.query.fragShader || defaultFragShader);
  const [fragShader, setFragShader] = useState(urlFragShader);

  useEffect(() => {
    setFragShader(urlFragShader);
  }, [router.isReady]);

  useEffect(() => {
    router.replace({
      query: {
        fragShader,
      },
    });
  }, [fragShader]);

  return (
    <Grid>
      <Panel style={{ overflow: "hidden" }}>
        <Shader fragShader={fragShader} />
      </Panel>
      <Panel>
        <Tabs>
          <TabPane id="fragShader" title="FragmentShader">
            <Editor
              value={fragShader}
              onChange={(newValue) => {
                if (newValue !== fragShader) {
                  setFragShader(newValue);
                }
              }}
            />
          </TabPane>
          <TabPane id="controls" title="Controls">
            <Controls>
              Coming soon...
            </Controls>
          </TabPane>
        </Tabs>
      </Panel>
    </Grid>
  );
};

export default Home;
