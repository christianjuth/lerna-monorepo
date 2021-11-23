interface SearchParams<T> {
    start: T;
    dest: T;
    getNeighbors: (node: T) => T[];
    getHeuristicDistance?: (node: T, dest: T) => number;
}
export declare function dfs<T>(config: SearchParams<T>): T[];
export declare function bfs<T>(config: SearchParams<T>): T[];
export declare function bidirectionalBfs<T>(config: SearchParams<T>): T[];
export declare function bestFirstSearch<T>(config: SearchParams<T>): T[];
export declare function validatePath<T>(path: T[] | undefined, getNeighbors: (node: T) => T[]): boolean;
export {};
