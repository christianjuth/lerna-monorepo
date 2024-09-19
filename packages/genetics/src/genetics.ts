type GeneRange = [number, number][];
type Genes = number[];

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

  const index = randomNumber(0, genes.length - 1, forceGenesToBeInt);
  genes[index] = randomNumber(...geneRanges[index], forceGenesToBeInt);
  return genes;
}

function breed(parent1: Genes, parent2: Genes) {
  const crossOver = randomNumber(0, parent1.length - 1, true);
  return [...parent1.slice(0, crossOver), ...parent2.slice(crossOver)];
}

function nMostFit<T>(
  n: number,
  data: Genes[],
  getFitness: (entity: T) => number,
  spawn: (genes: Genes) => T
) {
  data = [...data];
  const ouput: Genes[] = [];
  let mostFitOutput = -Infinity;
  const fitnesses = data.map((item) => getFitness(spawn(item)));
  n = Math.min(n, data.length);

  while (n > 0) {
    n--;

    let mostFitIndex = -1;
    let mostFitValue: number | null = null;

    for (let i = 0; i < fitnesses.length; i++) {
      const fitness = fitnesses[i];
      if (
        fitness !== undefined &&
        (mostFitValue === null || fitness > mostFitValue)
      ) {
        mostFitIndex = i;
        mostFitValue = fitness;
      }
    }

    if (mostFitValue && mostFitValue > mostFitOutput) {
      ouput.unshift(data[mostFitIndex]);
      mostFitOutput = mostFitValue;
    } else {
      ouput.push(data[mostFitIndex]);
    }
    delete data[mostFitIndex];
    delete fitnesses[mostFitIndex];
  }

  return ouput;
}

export function evolve<T>({
  geneRanges,
  forGenesToBeInts = true,
  spawn,
  population = geneRanges.length / 3,
  getFitness,
  maxGenerations = 20000,
  targetFitness = Infinity,
  mutationRate = 0.25,
  logPeriod = 100,
  log = false,
  parents = 4,
  maxGenerationsWithoutImprovement = 20000,
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
  const startTime = Date.now();

  if (typeof population === "number") {
    population = [population, population];
  }
  if (typeof parents === "number") {
    parents = [parents, parents];
  }

  let optimalSolution = {
    genes: null as Genes | null,
    fitness: -Infinity,
    generation: -1,
  };

  let parentsGenes: Genes[] = [];
  function resetParents() {
    parentsGenes = Array(randomNumber(...(parents as [number, number]), true))
      .fill(0)
      .map(() =>
        geneRanges.map((range) => randomNumber(...range, forGenesToBeInts))
      );
  }
  resetParents();

  let fitness = getFitness(
    spawn(nMostFit(1, parentsGenes, getFitness, spawn)[0])
  );

  let generation = 0;
  while (generation < maxGenerations && fitness < targetFitness) {
    if (
      generation - optimalSolution.generation >
      maxGenerationsWithoutImprovement
    ) {
      resetParents();
      optimalSolution.generation = generation;
      continue;
    }

    parentsGenes = Array(randomNumber(...population, true))
      .fill(0)
      .map(() =>
        mutate(
          mutationRate,
          forGenesToBeInts,
          breed(randomArrayItem(parentsGenes), randomArrayItem(parentsGenes)),
          geneRanges
        )
      );

    parentsGenes = nMostFit(
      randomNumber(...parents),
      parentsGenes,
      getFitness,
      spawn
    );

    fitness = getFitness(spawn(parentsGenes[0]));
    if (fitness > optimalSolution.fitness) {
      optimalSolution = {
        genes: parentsGenes[0],
        fitness,
        generation,
      };
    }

    if (log && generation % logPeriod === 0) {
      console.log(`generation: ${generation}, fitness: ${fitness}`);
    }
    generation++;
  }

  if (log) {
    console.log(`generation: ${generation}, fitness: ${fitness}`);
  }
  const mostFit = spawn(
    nMostFit(1, [optimalSolution.genes!, ...parentsGenes], getFitness, spawn)[0]
  );

  return {
    optimalGenes: optimalSolution.genes!,
    result: mostFit,
    generations: generation,
    fitness: getFitness(mostFit),
    runtime: Date.now() - startTime,
  };
}
