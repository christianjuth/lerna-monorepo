import * as PIXI from "pixi.js";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  height: 100%;
  width: 100%;
`;

function createPixi({ container }: { container: HTMLElement }) {
  const app = new PIXI.Application({ resizeTo: container });
  container.replaceChildren(app.view);

  let shader = new PIXI.Filter(undefined, undefined, {
    time: 0.0,
  });

  app.stage.filters = [shader];
  app.stage.filterArea = app.screen;

  app.ticker.add((delta) => {
    shader.uniforms.time += delta / 100;
  });

  return (fragShader: string) => {
    shader = new PIXI.Filter(undefined, fragShader, {
      time: 0.0,
    });
    app.stage.filters = [shader];
    app.stage.filterArea = app.screen;
  };
}

export function Shader({ fragShader }: { fragShader: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const setShaderRef = useRef<(val: string) => any>(() => {});

  useEffect(() => {
    if (ref.current) {
      setShaderRef.current = createPixi({
        container: ref.current,
      });
    }
  }, []);

  useEffect(() => {
    setShaderRef.current(fragShader);
  }, [fragShader]);

  return <Wrap ref={ref} />;
}

export default Shader;
