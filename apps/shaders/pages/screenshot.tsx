import dedent from "dedent";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Shader = dynamic(() => import("../components/Shader"), { ssr: false });

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

  return (
    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0 }}>
      <Shader fragShader={fragShader} />
    </div>
  );
};

export default Home;
