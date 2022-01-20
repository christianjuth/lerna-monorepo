import { bfs, dfs } from "@christianjuth/graph-search";
import {
  Grid,
  Input,
  Label,
  Select,
  spacing,
  Text,
  TextArea,
} from "@christianjuth/ui";
import { GetStaticProps } from "next";
import { useEffect, useMemo, useState } from "react";
import { Package } from "../components/Package";
import { getReadme } from "../utils";

const PKG = "@christianjuth/graph-search";

function GraphSearch({ readme }: { readme: string }) {
  const [graph, setGraph] = useState("a - b\nb - c\nc - d");
  const [start, setStart] = useState("");
  const [dest, setDest] = useState("");
  const [path, setPath] = useState("");
  const [algorithm, setAlgorithm] = useState("BFS");

  const [neighbors, nodes] = useMemo(() => {
    const matches = graph.match(/[a-z]+\s*-\s*[a-z]+/gi) ?? [];
    const neighborsMap: Record<string, string[]> = {};

    for (const match of matches) {
      const [a, b] = match.split(/\s*-\s*/);

      neighborsMap[a] = neighborsMap[a] ?? [];
      neighborsMap[a].push(b);

      neighborsMap[b] = neighborsMap[b] ?? [];
      neighborsMap[b].push(a);
    }

    return [neighborsMap, Object.keys(neighborsMap)] as const;
  }, [graph]);

  useEffect(() => {
    if (!start || !nodes.includes(start)) {
      setStart(nodes[0] ?? "");
    }
    if (!dest || !nodes.includes(dest)) {
      setDest(nodes.slice(-1)[0] ?? "");
    }
  }, [nodes, start, dest]);

  useEffect(() => {
    const config = {
      start,
      dest,
      getNeighbors: (node: string) => neighbors[node],
    };
    let p: string[] | undefined = undefined;

    switch (algorithm) {
      case "BFS":
        p = bfs(config);
        break;
      case "DFS":
        p = dfs(config);
        break;
    }

    setPath(p?.join(" -> ") ?? "dest unrechable");
  }, [start, dest, neighbors, algorithm])

  return (
    <Package
      pkg={PKG}
      readme={readme}
      demo={
        <Grid.Row cols={2} spacing={spacing(2)}>
          <Grid.Col xs={2}>
            <Label variant="copy-1">
              Graph:
              {(props) => (
                <TextArea
                  {...props}
                  value={graph}
                  onChange={(e) => setGraph(e.target.value)}
                  style={{ minHeight: 150 }}
                />
              )}
            </Label>
          </Grid.Col>

          <Grid.Col xs={1}>
            <Label variant="copy-1">
              Start:
              {(props) => (
                <Select
                  {...props}
                  options={nodes.map((n) => ({
                    label: n,
                    value: n,
                  }))}
                  value={start}
                  onChange={(val) => val && setStart(val.value)}
                />
              )}
            </Label>
          </Grid.Col>

          <Grid.Col xs={1}>
            <Label variant="copy-1">
              Dest:
              {(props) => (
                <Select
                  {...props}
                  options={nodes.map((n) => ({
                    label: n,
                    value: n,
                  }))}
                  value={dest}
                  onChange={(val) => val && setDest(val.value)}
                />
              )}
            </Label>
          </Grid.Col>

          <Grid.Col xs={2}>
            <Label variant="copy-1">
              Algorithm:
              {(props) => (
                <Select
                  {...props}
                  options={["BFS", "DFS"].map((n) => ({
                    label: n,
                    value: n,
                  }))}
                  value={algorithm}
                  onChange={(val) => val && setAlgorithm(val.value)}
                />
              )}
            </Label>
          </Grid.Col>

          <Grid.Col xs={2}>
            <Text variant="copy-1">Path:</Text>
            <Input readOnly value={path} />
          </Grid.Col>
        </Grid.Row>
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

export default GraphSearch;
