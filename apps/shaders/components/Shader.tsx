import * as PIXI from "pixi.js";
import { useEffect, useMemo, useRef, useState } from "react";
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
  position: relative;
`;

const CanvasContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Error = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: #c0392b;
  padding: 8px;
  font-size: 1.1rem;
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
  const [error, setError] = useState("");

  const minifiedShader = useMemo(() => minifyShader(fragShader), [fragShader]);

  useEffect(() => {
    setError("");
  }, [minifiedShader]);

  useEffect(() => {
    if (ref.current) {
      setShaderRef.current = createPixi({
        container: ref.current,
      });

      const defaultErrorLogger = window.console.error;
      window.console.error = (e) => {
        defaultErrorLogger(e);
        if (/ERROR:/.test(e)) {
          setError(e);
        }
      };

      return () => {
        window.console.error = defaultErrorLogger;
      };
    }
  }, []);

  useEffect(() => {
    setShaderRef.current(fragShader);
  }, [minifiedShader]);

  return (
    <Wrap>
      <CanvasContainer ref={ref} />
      {error && <Error>{error}</Error>}
    </Wrap>
  );
}

export default Shader;
