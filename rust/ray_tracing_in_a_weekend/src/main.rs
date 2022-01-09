use rand::Rng;
use std::io::Write;
use std::fs::OpenOptions;
use vec3::*;

mod vec3;

fn save_img(data: &String) {
    let mut f = OpenOptions::new()
        .append(true)
        .create(true)
        .open("./img.ppm")
        .expect("Unable to open file");
    f.write_all(data.as_bytes()).expect("Unable to write data");
}

fn random_color() -> String {
    let mut rng = rand::thread_rng();

    let r = rng.gen_range(0..=255);
    let g = rng.gen_range(0..=255);
    let b = rng.gen_range(0..=255);

    format!("{} {} {} ", r, g, b)
}

fn random_img(width: i32, height: i32) -> String {
    let mut data = format!("P3\n{} {}\n255", width, height);

    for _ in 0..=height {
        let mut row = String::from("\n");
        for _ in 0..=width {
            row.push_str(&random_color());
        }
        data.push_str(&row);
    }

    data
}

fn main() {
    let img = random_img(500, 500);
    // save_img(&img);

    let a = color3![1.0,2.0,3.0];
    let b = color3![1.0,2.0,3.0];

    let c = &a * &b;
    
    println!("{} {} {} {}", a, c, c.unit(), c);
}
