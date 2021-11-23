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
    hashGameState?: (gameState: T) => string;
}
export declare function minimax<T>({ gameState, ...rest }: MinimaxConfig<T>): T;
export default minimax;
