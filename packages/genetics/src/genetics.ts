import { v4 as uuid } from "uuid";

const GENETICS_ID = "GRAPH_SEARCH_ID";

type GeneRange = [number, number][];
type Genes = number[];

function getEntityId(entity: any): string {
  if (typeof entity === "object") {
    return entity[GENETICS_ID] ?? (entity[GENETICS_ID] = uuid());
  } else {
    return String(entity);
  }
}

function randomNumber(min: number, max: number, forceInt = false) {
  const num = Math.round(Math.random() * (max - min) + min);
  return forceInt ? Math.round(num) : num;
}

function randomArrayItem<T>(arr: T[]) {
  return arr[randomNumber(0, arr.length - 1, true)];
}

function mutate(
  mutationRate: number,
  forceGenesToBeInt: boolean,
  genes: Genes,
  geneRanges: GeneRange
) {
  if (Math.random() > mutationRate) {
    return genes;
  }

  const newGenes = [...genes];
  const index = randomNumber(0, genes.length - 1, forceGenesToBeInt);
  newGenes[index] = randomNumber(...geneRanges[index], forceGenesToBeInt);
  return newGenes;
}

function breed(parent1: Genes, parent2: Genes, forGenesToBeInts: boolean) {
  const crossOver = randomNumber(0, parent1.length - 1, forGenesToBeInts);
  return [...parent1.slice(0, crossOver), ...parent2.slice(crossOver)];
}

function sortByFitness<T>(
  data: Genes[],
  getFitness: (entity: T) => number,
  spawn: (genes: Genes) => T
) {
  const fitnesses: Record<string, number> = {};
  const genes: Record<string, Genes> = {};

  const entities = data.map((gene) => {
    const entity = spawn(gene);
    const id = getEntityId(entity);
    fitnesses[id] = getFitness(entity);
    genes[id] = gene;
    return entity;
  });

  entities.sort((a, b) => {
    const aFitness = getFitness(a);
    const bFitness = getFitness(b);
    if (aFitness > bFitness) return -1;
    if (bFitness < aFitness) return 1;
    return 0;
  });

  return entities.map((entity) => genes[getEntityId(entity)]);
}

export function evolve<T>({
  geneRanges,
  forGenesToBeInts = true,
  spawn,
  population = [10, geneRanges.length],
  getFitness,
  maxGenerations = 20000,
  targetFitness = Infinity,
  mutationRate = 0.25,
  logPeriod = 100,
  log = false,
  parents = 5,
  maxGenerationsWithoutImprovement = 10000,
}: {
  geneRanges: GeneRange;
  forGenesToBeInts?: boolean;
  spawn: (genes: Genes) => T;
  population?: [number, number] | number;
  getFitness: (entity: T) => number;
  maxGenerations?: number;
  targetFitness?: number;
  mutationRate?: number;
  logPeriod?: number;
  log?: boolean;
  parents?: [number, number] | number;
  maxGenerationsWithoutImprovement?: number;
}) {
  if (typeof population === "number") {
    population = [population, population];
  }
  if (typeof parents === "number") {
    parents = [parents, parents];
  }

  let optimalSolution = {
    genes: null,
    fitness: -Infinity,
    generation: -1,
  };

  let parentsGenes: Genes[] = Array(randomNumber(...parents, true))
    .fill(0)
    .map(() =>
      geneRanges.map((range) => randomNumber(...range, forGenesToBeInts))
    );
  let fitness = getFitness(
    spawn(sortByFitness(parentsGenes, getFitness, spawn)[0])
  );

  let generation = 0;
  while (generation < maxGenerations && fitness < targetFitness) {
    if (
      generation - optimalSolution.generation >
      maxGenerationsWithoutImprovement
    ) {
      break;
    }

    let genes: Genes[] = [];

    for (let i = 0; i < randomNumber(...population, true); i++) {
      const entityGenes = mutate(
        mutationRate,
        forGenesToBeInts,
        breed(
          randomArrayItem(parentsGenes),
          randomArrayItem(parentsGenes),
          forGenesToBeInts
        ),
        geneRanges
      );
      genes.push(entityGenes);
    }

    genes = sortByFitness(genes, getFitness, spawn);

    const fitness = getFitness(spawn(genes[0]));
    if (fitness > optimalSolution.fitness) {
      optimalSolution = {
        genes: genes[0],
        fitness,
        generation,
      };
    }

    parentsGenes = genes.slice(0, randomNumber(...parents));
    if (log && generation % logPeriod === 0) {
      console.log(`generation: ${generation}, fitness: ${fitness}`);
    }
    generation++;
  }

  if (log) {
    console.log(`generation: ${generation}, fitness: ${fitness}`);
  }
  const mostFit = spawn(
    sortByFitness(
      [optimalSolution.genes, ...parentsGenes],
      getFitness,
      spawn
    )[0]
  );

  return {
    result: mostFit,
    generations: generation,
    fitness: getFitness(mostFit),
  };
}
