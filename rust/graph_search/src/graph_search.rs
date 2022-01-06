use std::collections::HashMap;
use super::queue;

pub fn bfs<'a, Item: ?Sized>(
    start: &'a Item,
    dest: &'a Item,
    get_id: impl Fn(&'a Item) -> &str, 
    get_neighbors: impl Fn(&'a Item) -> &Vec<&'a Item>
) -> Vec<&'a Item> {
    let mut visited = HashMap::new();
    let mut prev_node = HashMap::<&str, Option<&Item>>::new();
    let mut q = queue::create();

    visited.insert(get_id(start), true);
    prev_node.insert(get_id(start), None);
    queue::enqueue(&mut q, start);

    while queue::size(&q) > 0 {
        let crnt = match queue::dequeue(&mut q) {
            Some(x) => x,
            None => break
        };

        if get_id(crnt) == get_id(dest) {
            break;
        }

        for neighbor in get_neighbors(crnt) {
            if !visited.contains_key(get_id(neighbor)) {
                visited.insert(get_id(neighbor), true);
                prev_node.insert(get_id(neighbor), Some(crnt)); 
                queue::enqueue(&mut q, neighbor);
            }
        }
    }

    let mut path = vec![];

    if !visited.contains_key(get_id(dest)) {
        return path
    }

    let mut crnt = dest;
    loop {
        path.push(crnt);
        let prev = match prev_node.get(get_id(crnt)) {
            Some(x) => x,
            None => break
        };
        match prev {
            Some(x) => crnt = x,
            None => break
        };
    }

    path.reverse();
    path
}