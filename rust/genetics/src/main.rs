use rand::Rng;
use std::cmp;
use std::ops::RangeInclusive;

const MUTATION_RATE: f32 = 0.1;
const MAX_GENERATIONS_WITHOUT_IMPROVEMENT: i32 = 10000;

type Genes = Vec<f32>;
type GeneConfig = Vec<RangeInclusive<f32>>;
type Fitness = f64;

fn random_array_item<'a, T>(arr: &Vec<T>) -> &T {
    let mut rng = rand::thread_rng();
    let index = rng.gen_range(0..arr.len());
    arr.get(index).unwrap()
}

fn mutate(genes: &mut Genes, gene_config: &GeneConfig) {
    let mut rng = rand::thread_rng();

    if rng.gen_range(0.0..=1.0) <= MUTATION_RATE {
        let location = rng.gen_range(0..genes.len()) as usize;
        let rn = &gene_config[location];
        genes[location] = rng.gen_range(*rn.start()..=*rn.end());
    }
}

fn breed(a: &Genes, b: &Genes) -> Genes {
    let mut rng = rand::thread_rng();
    let crossover = rng.gen_range(0..a.len());

    let mut new_genens = vec![];

    for i in 0..a.len() {
        new_genens.push(if i < crossover { a[i] } else { b[i] });
    }

    new_genens
}

fn n_most_fit<T>(
    n: usize,
    genes: &Vec<Genes>,
    get_fitness: impl Fn(&T) -> Fitness,
    spawn: impl Fn(&Genes) -> T,
) -> Vec<Genes> {
    let mut entities = vec![];

    for item in genes {
        entities.push(get_fitness(&spawn(item)));
    }

    let mut most_fit = vec![];

    let mut n = cmp::min(n, genes.len());
    while n > 0 {
        let mut max = -f64::INFINITY;
        for fitness in &entities {
            if *fitness > max {
                max = *fitness;
            }
        }

        for i in 0..entities.len() {
            if entities[i] == max {
                let selected = genes[i].clone();
                most_fit.push(selected);
                // negative infinity prevents entity
                // from getting picked twice
                entities[i] = -f64::INFINITY;
                break;
            }
        }
        n -= 1;
    }

    most_fit
}

fn new_parents(n: usize, gene_config: &GeneConfig) -> Vec<Genes> {
    let mut rng = rand::thread_rng();
    let mut new_parent_genes = vec![];

    for _ in 0..n {
        let mut genes = vec![];
        for item in gene_config {
            genes.push(rng.gen_range(*item.start()..=*item.end()));
        }
        new_parent_genes.push(genes);
    }

    new_parent_genes
}

fn evolve<T>(
    gene_config: GeneConfig,
    spawn: &impl Fn(&Genes) -> T,
    get_fitness: &impl Fn(&T) -> Fitness,
    population_size: RangeInclusive<usize>,
    num_of_parents: RangeInclusive<usize>,
    target_fitness: f64,
    mag_generations: i32,
) -> (T, Fitness, Genes, i32) {
    let mut rng = rand::thread_rng();

    let mut parent_genes = new_parents(*num_of_parents.end(), &gene_config);

    let optimal = n_most_fit(1, &mut parent_genes, get_fitness, spawn)[0].clone();
    let mut optimal = (get_fitness(&spawn(&optimal)), optimal, 0);

    let mut generation = 0;
    println!("generation: {}, fitness: {}", generation, optimal.0);

    while generation < mag_generations && optimal.0 < target_fitness {
        // Kill population if no improvement after awhile
        if generation - optimal.2 > MAX_GENERATIONS_WITHOUT_IMPROVEMENT {
            parent_genes = new_parents(*num_of_parents.end(), &gene_config);
            optimal.2 = generation;
            continue;
        }

        let mut new_generation = vec![];

        for _ in 0..rng.gen_range(*population_size.start()..=*population_size.end()) {
            let mut new_genes = breed(
                random_array_item(&parent_genes),
                random_array_item(&parent_genes),
            );
            mutate(&mut new_genes, &gene_config);
            new_generation.push(new_genes);
        }

        let size = rng.gen_range(*num_of_parents.start()..*num_of_parents.end()) as usize;
        parent_genes = n_most_fit(size, &new_generation, &get_fitness, &spawn);

        let fitness = get_fitness(&spawn(&parent_genes[0]));
        if fitness > optimal.0 {
            let most_fit = parent_genes[0].clone();
            optimal = (get_fitness(&spawn(&most_fit)), most_fit, generation);
        }

        println!("generation: {}, fitness: {}", generation, fitness);
        generation += 1;
    }

    (spawn(&optimal.1), optimal.0, optimal.1, optimal.2)
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
    let char_options: Vec<char> = String::from("ABCDEFGHIJKLMNOPQRSTUVWZYZ ")
        .chars()
        .collect();
    let target_string = String::from("TO BE OR NOT TO BE");

    let spawn = &|g: &Genes| -> String {
        let mut out = String::new();

        for item in g {
            out.push(*char_options.get(*item as usize).unwrap());
        }

        out
    };

    let get_fitness = &|s: &String| -> Fitness {
        (target_string.len() as f64) - (string_diff(s, &target_string) as f64)
    };

    let output = evolve(
        (0..target_string.len())
            .map(|_| 0.0..=char_options.len() as f32)
            .collect(),
        spawn,
        get_fitness,
        50..=50,
        4..=5,
        target_string.len() as f64,
        10000,
    );

    println!("{}", output.0);
}
