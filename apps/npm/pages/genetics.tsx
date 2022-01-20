import { Package } from "../components/Package";
import { evolve } from "@christianjuth/genetics";
import { useState } from "react";
import styled from "styled-components";
import { GetStaticProps } from "next";
import { getReadme } from "../utils";
import { Input, Button, TextArea, color } from "@christianjuth/ui";
import { useRef } from "react";
import { useEffect } from "react";

const PKG = "@christianjuth/genetics";

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > * {
    margin-bottom: 10px;
  }
`;

const TextAreaStyled = styled(TextArea)`
  width: 100%;
  background-color: transparent;
  color: ${color("gray", 15)};
  border: 1px solid ${color("gray", 3)};
`;

function stringDistance(a: string, b: string) {
  let distance = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) {
      distance++;
    }
  }
  return distance + Math.abs(a.length - b.length);
}

function Genetics({ readme }: { readme: string }) {
  const [target, setTarget] = useState("TO BE OR NOT TO BE");
  const [generations, setGenerations] = useState("");
  const [result, setResult] = useState("");
  const [runtime, setRuntime] = useState("");
  const [running, setRunning] = useState(false);
  const consoleDataRef = useRef("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function run() {
    consoleDataRef.current = "";
    setRunning(true);
    const output = evolve<string>({
      geneRanges: Array(target.length).fill([64, 90]),
      spawn: (genes) => {
        const out = genes
          .map((charCode) => {
            if (charCode >= 65) {
              return String.fromCharCode(charCode);
            } else {
              // Shhhh we are pretending 64
              // is the char code for a space
              return " ";
            }
          })
          .join("");
        consoleDataRef.current += `\n${out}`;
        return out;
      },
      getFitness: (entity) => {
        return target.length - stringDistance(entity, target);
      },
      mutationRate: 0.2,
      targetFitness: target.length,
      population: target.length,
      maxGenerations: 50000,
    });
    setResult(output.result);
    setGenerations(output.generations + "");
    setRuntime(output.runtime / 1000 + "s");
    setRunning(false);
  }

  useEffect(() => {
    const elm = textAreaRef.current;
    if (elm) {
      elm.scrollTop = elm.scrollHeight;
    }
  });

  return (
    <Package
      pkg={PKG}
      readme={readme}
      demo={
        <FlexCol>
          <label>Target phrase:</label>
          <Input
            size="sm"
            value={target}
            onChange={(e) =>
              setTarget(
                e.target.value
                  .replace(/[^a-z-A-Z ]/g, "")
                  .replace(/-/g, "")
                  .toUpperCase()
              )
            }
          />

          <Button size="sm" onClick={run} disabled={running}>
            Run
          </Button>

          <span>Result: {result}</span>
          <span>Runtime: {runtime}</span>
          <span>Generations: {generations}</span>

          <span>Logs:</span>
          <TextAreaStyled
            readOnly
            rows={10}
            value={consoleDataRef.current}
            ref={textAreaRef}
            size='sm'
          />
        </FlexCol>
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let readme: string | null = null;

  try {
    readme = await getReadme(PKG);
  } catch (e) {}

  return {
    props: {
      readme,
    },
    revalidate: 5 * 60,
  };
};

export default Genetics;
