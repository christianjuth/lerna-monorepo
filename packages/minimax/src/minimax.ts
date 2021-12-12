interface MinimaxConfig<T> {
  player: string;
  gameState: T;
  leafEvaluator: (obj: {
    gameState: T;
    player: string;
    level: number;
  }) => number;
  staticEvaluator?: (obj: {
    gameState: T;
    player: string;
    level: number;
  }) => number;
  getNextGameState: (gameState: T, player?: string) => T[];
  isMax?: boolean;
  maxDepth?: number;
  randomizeNextGameStateOrder?: boolean;
  hashGameState?: (gameState: T) => string;
}

interface MinimaxInternalConfig<T> extends Omit<MinimaxConfig<T>, "gameState"> {
  node: Node<T>;
  alpha?: number;
  beta?: number;
  level: number;
  dictionary: Record<string, number>;
}

class Node<T> {
  gameState: T;
  children: Node<T>[] = [];
  value: number | null = null;

  constructor(gameState: T) {
    this.gameState = gameState;
  }
}

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function minimaxInternal<T>({
  player = "",
  node,
  leafEvaluator,
  staticEvaluator,
  getNextGameState,
  isMax = true,
  maxDepth = Number.MAX_SAFE_INTEGER,
  alpha = -Infinity,
  beta = Infinity,
  level,
  randomizeNextGameStateOrder = false,
  dictionary,
  hashGameState,
}: MinimaxInternalConfig<T>) {
  const childrenData = getNextGameState(node.gameState);
  if (randomizeNextGameStateOrder) {
    shuffle(childrenData);
  }
  const gameStateId = hashGameState ? hashGameState(node.gameState) : null;

  if (gameStateId && dictionary[gameStateId]) {
    const val = dictionary[gameStateId];
    node.value = val;
    return val;
  }

  if (childrenData === undefined || childrenData.length === 0) {
    const val = leafEvaluator({ gameState: node.gameState, player, level });
    gameStateId && (dictionary[gameStateId] = val);
    node.value = val;
    return val;
  } else if (maxDepth === 0 && staticEvaluator !== undefined) {
    const val = staticEvaluator({ gameState: node.gameState, player, level });
    gameStateId && (dictionary[gameStateId] = val);
    node.value = val;
    return val;
  } else {
    const values = [];
    const children: Node<T>[] = [];
    node.children = children;

    for (const gameState of childrenData) {
      const child = new Node<T>(gameState);
      children.push(child);

      const evaluation = minimaxInternal<T>({
        player,
        node: child,
        leafEvaluator,
        staticEvaluator,
        getNextGameState,
        isMax: !isMax,
        maxDepth: maxDepth - 1,
        alpha,
        beta,
        level: level + 1,
        dictionary,
        hashGameState,
        randomizeNextGameStateOrder,
      });
      values.push(evaluation);

      // if (isMax ? evaluation >= beta : evaluation <= alpha) {
      //   break
      // }

      if (isMax) {
        alpha = Math.max(alpha, evaluation);
      } else {
        beta = Math.min(beta, evaluation);
      }

      if (beta <= alpha) {
        break;
      }
    }

    if (isMax) {
      node.value = Math.max(...values);
    } else {
      node.value = Math.min(...values);
    }

    return node.value;
  }
}

export function minimax<T>({ gameState, ...rest }: MinimaxConfig<T>) {
  const node = new Node<T>(gameState);
  const dictionary: Record<string, number> = {};

  const choice = minimaxInternal<T>({
    node,
    level: 0,
    dictionary,
    ...rest,
  });

  for (const child of node.children) {
    if (child.value === choice) {
      return {
        gameState: child.gameState,
        value: child.value,
      };
    }
  }

  return {};
}

export default minimax;
