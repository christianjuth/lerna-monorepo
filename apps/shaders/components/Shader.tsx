import * as PIXI from "pixi.js";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

function minifyShader(shaderCode: string): string {
  return shaderCode
    .replace(/\/\/[^\n]+/g, "")
    .replace(/(\n|\s)+/g, " ")
    .trim();
}

const Wrap = styled.div`
  height: 100%;
  width: 100%;
`;

function createPixi({ container }: { container: HTMLElement }) {
  const app = new PIXI.Application({ resizeTo: container });
  container.replaceChildren(app.view);

  let shader = new PIXI.Filter(undefined, undefined, {
    timeMs: 0.0,
  });

  app.stage.filters = [shader];
  app.stage.filterArea = app.screen;

  app.ticker.add((delta) => {
    shader.uniforms.timeMs += delta;
  });

  return (fragShader: string) => {
    shader = new PIXI.Filter(undefined, fragShader, {
      timeMs: 0.0,
    });
    app.stage.filters = [shader];
    app.stage.filterArea = app.screen;
  };
}

export function Shader({ fragShader }: { fragShader: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const setShaderRef = useRef<(val: string) => any>(() => {});

  const minifiedShader = useMemo(() => minifyShader(fragShader), [fragShader]);

  useEffect(() => {
    if (ref.current) {
      setShaderRef.current = createPixi({
        container: ref.current,
      });
    }
  }, []);

  useEffect(() => {
    setShaderRef.current(minifiedShader);
  }, [minifiedShader]);

  return <Wrap ref={ref} />;
}

export default Shader;
