use std::io;
mod graph_search;
mod states;
mod queue;

fn get_state(msg: &str) -> &str {
    println!("{}", msg);

    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");

    let out = match states::get_state(&input) {
        Some(x) => x,
        None => get_state(msg)
    };

    out
}

fn main() {
    let edges = states::get_edges();
    let no_neightbors = vec![];

    let start = get_state("Enter start state: ");
    let dest = get_state("Enter dest state: ");

    let path = graph_search::bfs(
        start,
        dest,
        |s: &str| -> &str { s },
        |s: &str| -> &Vec<&str> { 
            match edges.get(s) {
                Some(x) => &x,
                None => &no_neightbors
            }
        }
    );

    println!("Path:");
    for node in path {
        println!("{}", node);
    }
}
