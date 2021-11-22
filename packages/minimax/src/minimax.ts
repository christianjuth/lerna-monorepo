interface MinimaxConfig<T> {
  player: string;
  gameState: T;
  leafEvaluator?: (obj: {
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
}

interface MinimaxInternalConfig<T> extends Omit<MinimaxConfig<T>, "gameState"> {
  node: Node<T>;
  alpha?: number;
  beta?: number;
  level: number;
}

class Node<T> {
  gameState: T;
  children: Node<T>[] = [];
  value: number | null = null;

  constructor(gameState: T) {
    this.gameState = gameState;
  }
}

function minimaxInternal<T>({
  player = "",
  node,
  leafEvaluator,
  staticEvaluator,
  getNextGameState,
  isMax = true,
  maxDepth = Number.MAX_SAFE_INTEGER,
  alpha = Number.MIN_SAFE_INTEGER,
  beta = Number.MAX_SAFE_INTEGER,
  level,
  randomizeNextGameStateOrder = false,
}: MinimaxInternalConfig<T>) {
  const childrenData = getNextGameState(node.gameState);

  if (childrenData === undefined || childrenData.length === 0) {
    return leafEvaluator({ gameState: node.gameState, player, level });
  }

  if (maxDepth === 0 && leafEvaluator !== undefined) {
    return staticEvaluator({ gameState: node.gameState, player, level });
  } else {
    const values = [];
    const children = [];
    node.children = children;

    for (const gameState of childrenData) {
      const child = new Node<T>(gameState);

      if (randomizeNextGameStateOrder && Math.random() > 0.5) {
        children.push(child);
      } else {
        children.unshift(child);
      }

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
      });
      values.push(evaluation);

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

  const choice = minimaxInternal<T>({
    node,
    level: 0,
    ...rest,
  });

  for (const child of node.children) {
    if (child.value === choice) {
      return child.gameState;
    }
  }
}

export default minimax;
