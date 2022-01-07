use rand::Rng;
use std::time::Duration;
use async_recursion::async_recursion;

type State = Vec<Vec<bool>>;

fn clear_console() {
    print!("{}[2J", 27 as char);
    print!("{esc}[2J{esc}[1;1H", esc = 27 as char);
}

fn get_neighbors(state: &State, x: usize, y: usize) -> u8 {    
    let mut val = 0;

    let has_left = x > 0;
    let has_up = y > 0;
    let has_right = x < state[0].len() - 1;
    let has_down = y < state.len() - 1;

    if has_up {
        val += if state[y-1][x] { 1 } else { 0 };
    }

    if has_up && has_right {
        val += if state[y-1][x+1] { 1 } else { 0 };
    }

    if has_right {
        val += if state[y][x+1] { 1 } else { 0 }; 
    }

    if has_right && has_down {
        val += if state[y+1][x+1] { 1 } else { 0 }; 
    }

    if has_down {
        val += if state[y+1][x] { 1 } else { 0 };
    }

    if has_down && has_left {
        val += if state[y+1][x-1] { 1 } else { 0 };
    }

    if has_left {
        val += if state[y][x-1] { 1 } else { 0 };
    }

    if has_left && has_up {
        val += if state[y-1][x-1] { 1 } else { 0 };
    }

    val
}

fn next_state(a: &State, b: &mut State) {
    for y in 0..a.len() {
        for x in 0..a[0].len() {
            let val = get_neighbors(a, x, y);
            if a[y][x] && val < 2 || val > 3 {
                // live cell
                b[y][x] = false;
            } 
            else if !a[y][x] && val == 3 {
                // dead cell
                b[y][x] = true;
            }
            else {
                b[y][x] = a[y][x]; 
            }
            
        }
    }
}

fn print(state: &State) {
    clear_console();

    let dark_square = "  ";
    let light_square = "██";

    for row in state {
        let mut row_str = String::new();
        for cell in row {
            if *cell {
                row_str += &light_square;
            } else {
                row_str += &dark_square;
            }
        }
        println!("{}", row_str);
    }
}

fn new_state(width: u32, height: u32) -> State {
    let mut rng = rand::thread_rng();

    let mut state: State = vec![];

    for _ in 0..height {
        let mut row = vec![];
        for _ in 0..width {
            let val = rng.gen_range(0.0..=1.0) <= 0.3;
            row.push(val);
        }
        state.push(row);
    }

    state
}

#[async_recursion]
async fn run(a: &mut State, b: &mut State) {
    print(a);
    next_state(a, b);
    tokio::time::sleep(Duration::from_millis(300)).await;
    run(b, a).await;
}

#[tokio::main]
async fn main() {

    let height = 40;
    let width = 80;

    let mut a = new_state(width, height);
    let mut b = new_state(width, height);

    run(&mut a, &mut b).await;
}