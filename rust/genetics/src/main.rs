use std::ops::RangeInclusive;
use std::cmp;

const MUTATION_RATE: f32 = 0.1;

type Genes = Vec<f32>;
type Gene_Config = Vec<RangeInclusive<f32>>;

fn mutate() {

}

fn breed() {

}

fn n_most_fit() {

}

fn evolve<T>(
    gene_config: Vec<RangeInclusive<f32>>,
    spawn: impl Fn(Genes) -> T,
    get_fitness: impl Fn(&T) -> i32,
    population_size: RangeInclusive<i32>,
    num_of_parents: RangeInclusive<i32>, 
) {

    let parent_genes: Vec<Genes> = vec![
        
    ];

}

fn string_diff(a: &String, b: &String) -> i32 {
    let min_len = cmp::min(a.len(), b.len());
    let max_len = cmp::max(a.len(), b.len()); 

    let a: Vec<char> = a.chars().collect();
    let b: Vec<char> = b.chars().collect();

    let mut diff = (max_len - min_len) as i32;
    for i in 0..min_len {
        if a[i] != b[i] {
            diff += 1;
        }
    }
    
    diff
}

fn main() {

    let target_string = String::from("TO BE OR NOT TO BE"); 

    evolve(
        (0..target_string.len()).map(|_| 64.0..=90.0).collect(),
        |g: Genes| -> String { target_string.clone() },
        |s: &String| -> i32 { string_diff(s, &target_string) },
        50..=50,
        4..=5
    );
}

